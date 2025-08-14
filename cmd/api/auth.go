package main

import (
	"net/http"

	"github.com/Caffeino/teotlalcinco/internal/store"
	"github.com/Caffeino/teotlalcinco/utils"
)

type RegisterUserPayload struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string `json:"email" validate:"required,email,max=200"`
	Password string `json:"password" validate:"required,min=8,max=70"`
}

type UserWithToken struct {
	*store.User
	Token string `json:"token"`
}

func (app *application) loginUserHandler(w http.ResponseWriter, r *http.Request) {
	// TODO...
}

func (app *application) registerUserHandler(w http.ResponseWriter, r *http.Request) {
	var payload RegisterUserPayload

	if err := readJSON(w, r, &payload); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	if err := Validate.Struct(payload); err != nil {
		inputErrors := inputValidationErrors(err)
		app.inputErrorResponse(w, r, inputErrors)
		return
	}

	ctx := r.Context()

	// Check if the user already exists. If not, continue with registration.
	if _, err := app.store.Users.GetByEmail(ctx, payload.Email); err == nil {
		app.badRequestResponse(w, r, err)
		return
	}

	user := &store.User{
		Username: payload.Username,
		Email:    payload.Email,
	}

	if err := user.Password.HashPassword(payload.Password); err != nil {
		app.internalServerErrorResponse(w, r, err)
		return
	}

	plainToken, hashToken := utils.GenerateHashToken()

	err := app.store.Users.CreateAndInvite(ctx, user, hashToken, app.config.mail.expInvitation)
	if err != nil {
		return
	}

	userWithToken := UserWithToken{
		User:  user,
		Token: plainToken,
	}

	if err := app.jsonResponse(w, http.StatusOK, userWithToken); err != nil {
		app.internalServerErrorResponse(w, r, err)
		return
	}
}

func (app *application) activeUserHandler(w http.ResponseWriter, r *http.Request) {
	// TODO...
}
