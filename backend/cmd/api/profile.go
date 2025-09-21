package main

import (
	"net/http"

	"github.com/Caffeino/teotlalcinco/internal/store"
)

type RegisterProfilePayload struct {
	FirstName string `json:"first_name" validate:"required,max=255"`
	LastName  string `json:"last_name" validate:"required,max=255"`
	Bio       string `json:"bio"`
	PhotoUrl  string `json:"photo_url"`
	BannerUrl string `json:"banner_url"`
}

type ProfileEnvelope struct {
	*store.User
	Profile *store.Profile `json:"profile"`
}

func (app *application) getProfileHandler(w http.ResponseWriter, r *http.Request) {
	// Get user from Contex
	user := getUserFromCtx(r)

	profile, err := app.store.Profile.GetByUserID(r.Context(), user.ID)
	if err != nil && err != store.ErrNotFound {
		app.internalServerErrorResponse(w, r, err)
		return
	}

	userProfile := ProfileEnvelope{
		User:    user,
		Profile: profile,
	}

	if err := app.jsonResponse(w, http.StatusOK, userProfile); err != nil {
		app.internalServerErrorResponse(w, r, err)
	}
}

func (app *application) registerProfileHandler(w http.ResponseWriter, r *http.Request) {
	var payload RegisterProfilePayload

	if err := readJSON(w, r, &payload); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	if err := Validate.Struct(payload); err != nil {
		inputErrors := inputValidationErrors(err)
		app.inputErrorResponse(w, r, inputErrors)
		return
	}

	user := getUserFromCtx(r)

	ctx := r.Context()

	if err := app.store.Profile.AlreadyExists(ctx, user.ID); err != nil {
		switch err {
		case store.ErrProfileExists:
			app.badRequestResponse(w, r, err)
		default:
			app.internalServerErrorResponse(w, r, err)
		}

		return
	}

	profile := &store.Profile{
		UserID:    user.ID,
		FirstName: payload.FirstName,
		LastName:  payload.LastName,
		Bio:       payload.Bio,
		PhotoUrl:  payload.PhotoUrl,
		BannerUrl: payload.BannerUrl,
	}

	if err := app.store.Profile.Create(ctx, profile); err != nil {
		app.internalServerErrorResponse(w, r, err)
		return
	}

	userProfile := ProfileEnvelope{
		User:    user,
		Profile: profile,
	}

	if err := app.jsonResponse(w, http.StatusCreated, userProfile); err != nil {
		app.internalServerErrorResponse(w, r, err)
	}
}
