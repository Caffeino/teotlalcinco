package store

import (
	"context"
	"database/sql"
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
