package main

import (
	"net/http"
	"time"

	"github.com/Caffeino/teotlalcinco/internal/mailer"
	"github.com/Caffeino/teotlalcinco/internal/store"
	"github.com/Caffeino/teotlalcinco/utils"
	"github.com/go-chi/chi/v5"
	"github.com/golang-jwt/jwt/v5"
)

type RegisterUserPayload struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string `json:"email" validate:"required,email,max=200"`
	Password string `json:"password" validate:"required,min=8,max=70"`
}

type LoginUserPayload struct {
	Email    string `json:"email" validate:"required,email,max=200"`
	Password string `json:"password" validate:"required,min=8,max=70"`
}

type UserWelcomeEmailData struct {
	Username      string
	ActivationURL string
}

type RegisterUserEnvelope struct {
	*store.User
	Token string `json:"token"`
}

type LoginUserEnvelope struct {
	Token    string `json:"token"`
	IsActive bool   `json:"is_active"`
}

func (app *application) loginUserHandler(w http.ResponseWriter, r *http.Request) {
	var payload LoginUserPayload

	if err := readJSON(w, r, &payload); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	if err := Validate.Struct(payload); err != nil {
		inputErrros := inputValidationErrors(err)
		app.inputErrorResponse(w, r, inputErrros)
		return
	}

	user, err := app.store.Users.GetByEmail(r.Context(), payload.Email)
	if err != nil {
		switch err {
		case store.ErrNotFound:
			app.unauthorizedErrorResponse(w, r, err)
		default:
			app.internalServerErrorResponse(w, r, err)
		}

		return
	}

	if err := user.Password.Compare(payload.Password); err != nil {
		app.unauthorizedErrorResponse(w, r, err)
		return
	}

	if !user.IsActive {
		envelope := LoginUserEnvelope{IsActive: user.IsActive}
		if err := app.jsonResponse(w, http.StatusOK, envelope); err != nil {
			app.internalServerErrorResponse(w, r, err)
		}

		return
	}

	claims := jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(app.config.auth.token.exp).Unix(),
		"iat": time.Now().Unix(),
		"nbf": time.Now().Unix(),
		"iss": app.config.auth.token.iss,
		"aud": app.config.auth.token.iss,
	}

	token, err := app.authenticator.GenerateToken(claims)
	if err != nil {
		app.internalServerErrorResponse(w, r, err)
		return
	}

	envelope := LoginUserEnvelope{
		Token:    token,
		IsActive: user.IsActive,
	}

	if err := app.jsonResponse(w, http.StatusCreated, envelope); err != nil {
		app.internalServerErrorResponse(w, r, err)
	}
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

	if err := app.store.Users.AlreadyExists(ctx, payload.Username, payload.Email); err != nil {
		switch err {
		case store.ErrUserExists:
			app.badRequestResponse(w, r, err)
		default:
			app.internalServerErrorResponse(w, r, err)
		}

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
	// Create an new user with inactive status and create invitation.
	err := app.store.Users.CreateAndInvite(ctx, user, hashToken, app.config.mail.expInvitation)
	if err != nil {
		app.internalServerErrorResponse(w, r, err)
		return
	}

	// Send email with the activation token
	isProdEnv := app.config.env == "production"
	welcomeData := UserWelcomeEmailData{
		Username:      user.Username,
		ActivationURL: utils.UserActivationURL(app.config.frontendURL, plainToken),
	}

	status, err := app.mailer.Send(mailer.UserWelcomeTmpl, user.Username, user.Email, welcomeData, !isProdEnv)
	if err != nil {
		app.logger.Errorw("error sending welcome email", "error", err)

		// Rollback user creation if email fails (SAGA pattern)
		if err := app.store.Users.DeleteAndUninvite(ctx, user.ID); err != nil {
			app.logger.Errorw("error deleting user", "error", err)
		}

		app.internalServerErrorResponse(w, r, err)
		return
	}

	app.logger.Infow("email sent", "status code", status)

	envelope := RegisterUserEnvelope{
		User:  user,
		Token: plainToken,
	}

	if err := app.jsonResponse(w, http.StatusOK, envelope); err != nil {
		app.internalServerErrorResponse(w, r, err)
		return
	}
}

func (app *application) activeUserHandler(w http.ResponseWriter, r *http.Request) {
	token := chi.URLParam(r, "token")

	if err := app.store.Users.ActivateToken(r.Context(), token); err != nil {
		switch err {
		case store.ErrNotFound:
			app.notFoundResponse(w, r, err)
		default:
			app.internalServerErrorResponse(w, r, err)
		}

		return
	}

	app.noContentResponse(w, http.StatusNoContent)
}
