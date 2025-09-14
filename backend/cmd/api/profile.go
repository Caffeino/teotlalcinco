package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

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
