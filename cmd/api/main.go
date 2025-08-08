package main

import (
	"log"

	"github.com/Caffeino/teotlalcinco/internal/db"
	"github.com/Caffeino/teotlalcinco/internal/env"
	"github.com/Caffeino/teotlalcinco/internal/store"
)

const version = "0.0.1"

func main() {
	cfg := config{
		addr: env.GetString("ADDR", ":8080"),
		env:  env.GetString("ENV", "development"),
		db: dbConfig{
			addr:         env.GetString("DB_ADDR", "postgres://postgres:adminpass@localhost/teo5?sslmode=disable"),
			maxOpenConns: env.GetInt("DB_MAX_OPEN_CONNS", 30),
			maxIdleConns: env.GetInt("DB_MAX_IDLE_CONS", 30),
			maxIdleTime:  env.GetString("DB_MAX_IDLE_TIME", "15m"),
		},
	}

	// DB connection
	db, err := db.New(cfg.db.addr, cfg.db.maxOpenConns, cfg.db.maxIdleConns, cfg.db.maxIdleTime)
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()
	log.Printf("database connection pool established")

	store := store.NewStorage(db)

	// App Core:
	// The following structure is responsible for injecting the app dependencies.
	// These dependencies make up each isolated layer for all the services
	// required at runtime of the app.
	app := &application{
		config: cfg,
		store:  store,
	}

	mux := app.mount()

	log.Fatal(app.run(mux))
}
