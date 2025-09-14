package store

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/hex"
	"time"
)

type User struct {
	ID        int64  `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  password
	Role      Role   `json:"role"`
	CreatedAt string `json:"created_at"`
	IsActive  bool   `json:"is_active"`
}

type UserStore struct {
	db *sql.DB
}

func (s *UserStore) AlreadyExists(ctx context.Context, username, email string) error {
	query := `SELECT COUNT(*) FROM users WHERE username = $1 OR email = $2`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	var count int

	err := s.db.QueryRowContext(ctx, query, username, email).Scan(&count)
	if err != nil {
		return err
	}

	if count > 0 {
		return ErrAlreadyExists
	}

	return nil
}

func (s *UserStore) GetByEmailAndStatus(ctx context.Context, email string, isActive bool) (*User, error) {
	query := `
		SELECT u.id, u.username, u.email, u.password, u.is_active, u.created_at, r.*
		FROM users u
		JOIN roles r ON u.role_id = r.id
		WHERE u.email = $1 AND u.is_active = $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	user := &User{}

	err := s.db.QueryRowContext(
		ctx,
		query,
		email,
		isActive,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Password.hash,
		&user.IsActive,
		&user.CreatedAt,
		&user.Role.ID,
		&user.Role.Name,
		&user.Role.Level,
		&user.Role.Description,
	)
	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return user, nil
}

func (s *UserStore) GetByID(ctx context.Context, userID int64) (*User, error) {
	query := `
		SELECT u.id, u.username, u.email, u.password, u.is_active, u.created_at, r.*
		FROM users u
		JOIN roles r ON u.role_id = r.id
		WHERE u.id = $1 AND u.is_active = true
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	user := &User{}

	err := s.db.QueryRowContext(
		ctx,
		query,
		userID,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Password.hash,
		&user.IsActive,
		&user.CreatedAt,
		&user.Role.ID,
		&user.Role.Name,
		&user.Role.Level,
		&user.Role.Description,
	)
	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return user, nil
}

func (s *UserStore) CreateAndInvite(ctx context.Context, user *User, token string, exp time.Duration) error {
	// transaction wrapper
	return withTx(s.db, ctx, func(tx *sql.Tx) error {
		if err := s.create(ctx, tx, user); err != nil {
			return err
		}

		if err := s.createInvitation(ctx, tx, user.ID, token, exp); err != nil {
			return err
		}

		return nil
	})
}

func (s *UserStore) create(ctx context.Context, tx *sql.Tx, user *User) error {
	query := `
		INSERT INTO users (username, email, password, role_id)
		VALUES ($1, $2, $3, (SELECT id FROM roles WHERE name = $4))
		RETURNING id, created_at
	`
	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	role := user.Role.Name
	if role == "" {
		role = "user"
	}

	err := tx.QueryRowContext(
		ctx,
		query,
		user.Username,
		user.Email,
		user.Password.hash,
		role,
	).Scan(
		&user.ID,
		&user.CreatedAt,
	)

	if err != nil {
		return err
	}

	return nil
}

func (s *UserStore) createInvitation(ctx context.Context, tx *sql.Tx, userID int64, token string, exp time.Duration) error {
	query := `INSERT INTO invitations (token, user_id, expiry) values ($1, $2, $3)`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	_, err := tx.ExecContext(ctx, query, token, userID, time.Now().Add(exp))
	if err != nil {
		return err
	}

	return nil
}

func (s *UserStore) DeleteAndUninvite(ctx context.Context, userID int64) error {
	return withTx(s.db, ctx, func(tx *sql.Tx) error {
		if err := s.delete(ctx, tx, userID); err != nil {
			return err
		}

		if err := s.deleteInvitations(ctx, tx, userID); err != nil {
			return err
		}

		return nil
	})
}

func (s *UserStore) delete(ctx context.Context, tx *sql.Tx, userID int64) error {
	query := `DELETE FROM users WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	_, err := tx.ExecContext(ctx, query, userID)
	if err != nil {
		return err
	}

	return nil
}

func (s *UserStore) deleteInvitations(ctx context.Context, tx *sql.Tx, userID int64) error {
	query := `DELETE FROM invitations WHERE user_id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	_, err := tx.ExecContext(ctx, query, userID)
	if err != nil {
		return err
	}

	return nil
}

func (s *UserStore) ActivateToken(ctx context.Context, token string) error {
	return withTx(s.db, ctx, func(tx *sql.Tx) error {
		// Tx1. Find the user that this token belongs to
		user, err := s.getByInvitation(ctx, tx, token)
		if err != nil {
			return err
		}

		// Tx2. Update the user (is_active = true)
		user.IsActive = true
		if err := s.update(ctx, tx, user); err != nil {
			return err
		}

		// Tx3. Clean invitations
		if err := s.deleteInvitations(ctx, tx, user.ID); err != nil {
			return err
		}

		return nil
	})
}

func (s *UserStore) getByInvitation(ctx context.Context, tx *sql.Tx, token string) (*User, error) {
	query := `
		SELECT u.id, u.username, u.email, u.role_id, u.is_active, u.created_at
		FROM users u
		JOIN invitations i ON u.id = i.user_id
		WHERE i.token = $1 AND i.expiry > $2
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	hash := sha256.Sum256([]byte(token))
	hashToken := hex.EncodeToString(hash[:])

	user := &User{}

	err := tx.QueryRowContext(
		ctx,
		query,
		hashToken,
		time.Now(),
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Role.ID,
		&user.IsActive,
		&user.CreatedAt,
	)
	if err != nil {
		switch err {
		case sql.ErrNoRows:
			return nil, ErrNotFound
		default:
			return nil, err
		}
	}

	return user, nil
}

func (s *UserStore) update(ctx context.Context, tx *sql.Tx, user *User) error {
	query := `
		UPDATE users
		SET username = $1, email = $2, is_active = $3, role_id = $4
		WHERE id = $5
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	_, err := tx.ExecContext(
		ctx,
		query,
		user.Username,
		user.Email,
		user.IsActive,
		user.Role.ID,
		user.ID,
	)

	if err != nil {
		return err
	}

	return nil
}
