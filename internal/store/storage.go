package store

import (
	"context"
	"database/sql"
)

type Storage struct {
	Users interface {
		CreateAndInvite(ctx context.Context) error
	}
}

func NewStorage(db *sql.DB) Storage {
	return Storage{
		Users: &UserStore{db},
	}
}
