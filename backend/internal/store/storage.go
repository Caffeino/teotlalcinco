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
	ErrAlreadyExists  = errors.New("an user with that username or email already exists")
)

type Storage struct {
	Users interface {
		AlreadyExists(ctx context.Context, username, email string) error
		CreateAndInvite(ctx context.Context, user *User, token string, exp time.Duration) error
		DeleteAndUninvite(ctx context.Context, userID int64) error
		ActivateToken(ctx context.Context, token string) error
		GetByEmailAndStatus(ctx context.Context, email string, isActive bool) (*User, error)
	}
}

func NewStorage(db *sql.DB) Storage {
	return Storage{
		Users: &UserStore{db},
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
