package main

import (
	"fmt"
	"net/http"
	"strings"
)

func (app *application) jsonResponse(w http.ResponseWriter, status int, data any) error {
	type envelope struct {
		Data any `json:"data"`
	}

	return writeJSON(w, status, &envelope{Data: data})
}

func (app *application) noContentResponse(w http.ResponseWriter, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
}

func (app *application) internalServerErrorResponse(w http.ResponseWriter, r *http.Request, err error) {
	app.logger.Errorw(setRequestInfo(r, "Internal Server Error"), "error", err.Error())
	writeJSONError(w, http.StatusInternalServerError, "the server encountered a problem")
}

func (app *application) badRequestResponse(w http.ResponseWriter, r *http.Request, err error) {
	app.logger.Warnw(setRequestInfo(r, "Bad Request"), "error", err.Error())
	writeJSONError(w, http.StatusBadRequest, err.Error())
}

func (app *application) notFoundResponse(w http.ResponseWriter, r *http.Request, error error) {
	app.logger.Warnw(setRequestInfo(r, "Not Found"), "error", error.Error())
	writeJSON(w, http.StatusNotFound, "not found")
}

func (app *application) inputErrorResponse(w http.ResponseWriter, r *http.Request, err *InputErrros) {
	type envelope struct {
		Error []string `json:"error"`
	}

	app.logger.Warnw(setRequestInfo(r, "Bad Request"), "error", strings.Join(err.Errors, ", "))
	writeJSON(w, http.StatusBadRequest, &envelope{Error: err.Errors})
}

func setRequestInfo(r *http.Request, info string) string {
	return fmt.Sprintf("[%s][%s]%s", r.Method, info, r.URL.Path)
}
