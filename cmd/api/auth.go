package main

import "net/http"

type RegisterUserPayload struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string `json:"email" validate:"required,email,max=200"`
	Password string `json:"password" validate:"required,min=8,max=70"`
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

	data := map[string]string{"status": "ok"}

	if err := app.jsonResponse(w, http.StatusOK, data); err != nil {
		app.internalServerErrorResponse(w, r, err)
		return
	}
}

func (app *application) activeUserHandler(w http.ResponseWriter, r *http.Request) {
	// TODO...
}
