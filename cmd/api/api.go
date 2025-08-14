package main

import (
	"log"
	"net/http"
	"time"

	"github.com/Caffeino/teotlalcinco/internal/store"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"go.uber.org/zap"
)

type application struct {
	config config
	store  store.Storage
	logger *zap.SugaredLogger
}

type config struct {
	addr string
	env  string
	db   dbConfig
	mail mailConfig
}

type dbConfig struct {
	addr         string
	maxOpenConns int
	maxIdleConns int
	maxIdleTime  string
}

type mailConfig struct {
	expInvitation time.Duration
}

func (app *application) mount() http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// Set a timeout value on the request context (ctx), that will signal
	// through ctx.Done() that the request has timed out and further
	// processing should be stopped.
	r.Use(middleware.Timeout(60 * time.Second))

	r.Route("/v1", func(r chi.Router) {
		// Health Check Test Endpoint
		r.Get("/health", app.healthCheckHandler)

		// Users Handler
		r.Route("/users", func(r chi.Router) {
			// Public routes
			r.Route("/auth", func(r chi.Router) {
				r.Post("/login", app.loginUserHandler)
				r.Post("/register", app.registerUserHandler)
				r.Put("/active/{token}", app.activeUserHandler)
			})
		})
	})

	return r
}

func (app *application) run(mux http.Handler) error {
	srv := &http.Server{
		Addr:         app.config.addr,
		Handler:      mux,
		WriteTimeout: time.Second * 30,
		ReadTimeout:  time.Second * 10,
		IdleTimeout:  time.Minute,
	}

	log.Printf("server has started on: %v", app.config.addr)

	if err := srv.ListenAndServe(); err != nil {
		return err
	}

	return nil
}
