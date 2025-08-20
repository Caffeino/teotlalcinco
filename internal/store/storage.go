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
)

type Storage struct {
	Users interface {
		GetByEmail(ctx context.Context, email string) (*User, error)
		CreateAndInvite(ctx context.Context, user *User, token string, exp time.Duration) error
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
