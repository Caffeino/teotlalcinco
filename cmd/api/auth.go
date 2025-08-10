package main

import "net/http"

type RegisterUserPayload struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (app *application) loginUserHandler(w http.ResponseWriter, r *http.Request) {
	// TODO...
}

func (app *application) registerUserHandler(w http.ResponseWriter, r *http.Request) {
	var payload RegisterUserPayload

	if err := readJSON(w, r, &payload); err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}

	type envelope struct {
		Data any `json:"error"`
	}

	if err := writeJSON(w, http.StatusOK, &envelope{Data: payload}); err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}
}

func (app *application) activeUserHandler(w http.ResponseWriter, r *http.Request) {
	// TODO...
}
