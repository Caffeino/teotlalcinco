package store

import (
	"context"
	"database/sql"
	"errors"
	"time"
)

var (
	QueryTimeDuration = time.Second * 5
	ErrNotFound       = errors.New("resource not found")
	ErrUserExists     = errors.New("an user with that username or email already exists")
	ErrProfileExists  = errors.New("this user's profile already exists")
)

type Storage struct {
	Users interface {
		AlreadyExists(ctx context.Context, username, email string) error
		CreateAndInvite(ctx context.Context, user *User, token string, exp time.Duration) error
		DeleteAndUninvite(ctx context.Context, userID int64) error
		ActivateToken(ctx context.Context, token string) error
		GetByEmail(ctx context.Context, email string) (*User, error)
		GetByID(ctx context.Context, userID int64) (*User, error)
	}
	Profile interface {
		AlreadyExists(ctx context.Context, userID int64) error
		Create(ctx context.Context, profile *Profile) error
		GetByUserID(ctx context.Context, userID int64) (*Profile, error)
	}
}

func NewStorage(db *sql.DB) Storage {
	return Storage{
		Users:   &UserStore{db},
		Profile: &ProfileStore{db},
	}
}

func withTx(db *sql.DB, ctx context.Context, fn func(*sql.Tx) error) error {
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	if err := fn(tx); err != nil {
		_ = tx.Rollback()

		return err
	}

	return tx.Commit()
}
