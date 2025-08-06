package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func (app *application) healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	type envelope struct {
		Data any `json:"data"`
	}

	data := map[string]string{
		"status":  "ok",
		"env":     app.config.env,
		"version": version,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	err := json.NewEncoder(w).Encode(&envelope{Data: data})
	if err != nil {
		log.Panic(err)
	}
}
