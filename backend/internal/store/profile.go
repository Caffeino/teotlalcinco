package store

import (
	"context"
	"database/sql"
)

type Profile struct {
	ID          int64       `json:"id"`
	UserID      int64       `json:"user_id"`
	FirstName   string      `json:"first_name"`
	LastName    string      `json:"last_name"`
	Bio         string      `json:"bio"`
	PhotoUrl    string      `json:"photo_url"`
	BannerUrl   string      `json:"banner_url"`
	ProfileType ProfileType `json:"type"`
	CreatedAt   string      `json:"created_at"`
	UpdatedAt   string      `json:"updated_at"`
}

type ProfileType struct {
	ID   int64  `json:"id"`
	Type string `json:"type"`
}

type ProfileStore struct {
	db *sql.DB
}

func (s *ProfileStore) AlreadyExists(ctx context.Context, userID int64) error {
	query := `SELECT COUNT(*) FROM profile WHERE user_id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	var count int

	err := s.db.QueryRowContext(ctx, query, userID).Scan(&count)
	if err != nil {
		return err
	}

	if count > 0 {
		return ErrProfileExists
	}

	return nil
}

func (s *ProfileStore) Create(ctx context.Context, profile *Profile) error {
	query := `
		INSERT INTO profile (user_id, first_name, last_name, bio, photo_url, banner_url, profile_type_id)
		VALUES ($1, $2, $3, $4, $5, $6, (SELECT id FROM profile_type WHERE type = $7))
		RETURNING id, profile_type_id, created_at, updated_at
	`
	ctx, cancel := context.WithTimeout(ctx, QueryTimeDuration)
	defer cancel()

	profileType := profile.ProfileType.Type
	if profileType == "" {
		profileType = "user"
	}

	err := s.db.QueryRowContext(
		ctx,
		query,
		profile.UserID,
		profile.FirstName,
		profile.LastName,
		profile.Bio,
		profile.PhotoUrl,
		profile.BannerUrl,
		profileType,
	).Scan(
		&profile.ID,
		&profile.ProfileType.ID,
		&profile.CreatedAt,
		&profile.UpdatedAt,
	)

	if err != nil {
		return err
	}

	return nil
}
