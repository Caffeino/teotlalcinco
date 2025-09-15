package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/Caffeino/teotlalcinco/internal/store"
	"github.com/go-chi/chi/v5"
)

type RegisterProfilePayload struct {
	FirstName string `json:"first_name" validate:"required,max=255"`
	LastName  string `json:"last_name" validate:"required,max=255"`
	Bio       string `json:"bio"`
	PhotoUrl  string `json:"photo_url"`
	BannerUrl string `json:"banner_url"`
}

type UserProfile struct {
	*store.User
	*store.Profile
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

	profile := &store.Profile{
		UserID:    user.ID,
		FirstName: payload.FirstName,
		LastName:  payload.LastName,
		Bio:       payload.Bio,
		PhotoUrl:  payload.PhotoUrl,
		BannerUrl: payload.BannerUrl,
	}

	ctx := r.Context()

	if err := app.store.Profile.Create(ctx, profile); err != nil {
		app.internalServerErrorResponse(w, r, err)
		return
	}

	userProfile := UserProfile{
		User:    user,
		Profile: profile,
	}

	if err := app.jsonResponse(w, http.StatusCreated, userProfile); err != nil {
		app.internalServerErrorResponse(w, r, err)
	}
}

func (app *application) getProfileHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := strconv.ParseInt(chi.URLParam(r, "userID"), 10, 64)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	// TODO... Load the user profile

	response := map[string]string{
		"userID":  fmt.Sprintf("%v", userID),
		"message": "output after token middleware",
	}

	if err := app.jsonResponse(w, http.StatusOK, response); err != nil {
		app.internalServerErrorResponse(w, r, err)
	}
}
