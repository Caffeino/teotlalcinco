package main

import (
	"log"
	"time"

	"github.com/Caffeino/teotlalcinco/internal/db"
	"github.com/Caffeino/teotlalcinco/internal/env"
	"github.com/Caffeino/teotlalcinco/internal/mailer"
	"github.com/Caffeino/teotlalcinco/internal/store"
	"go.uber.org/zap"
)

const version = "0.0.1"

func main() {
	cfg := config{
		addr:        env.GetString("ADDR", ":8080"),
		env:         env.GetString("ENV", "development"),
		frontendURL: env.GetString("FRONTEND_URL", "http://localhost:5173"),
		db: dbConfig{
			addr:         env.GetString("DB_ADDR", "postgres://postgres:adminpass@localhost/teo5?sslmode=disable"),
			maxOpenConns: env.GetInt("DB_MAX_OPEN_CONNS", 30),
			maxIdleConns: env.GetInt("DB_MAX_IDLE_CONS", 30),
			maxIdleTime:  env.GetString("DB_MAX_IDLE_TIME", "15m"),
		},
		mail: mailConfig{
			expInvitation: time.Hour * 24 * 3, // 3 days
			senderName:    env.GetString("SENDER_NAME", ""),
			senderEmail:   env.GetString("SENDER_EMAIL", ""),
			maxRetries:    env.GetInt("MAX_RETRIES", 3),
			sendGrid: sendGridConfig{
				apiKey: env.GetString("SENDGRID_API_KEY", ""),
			},
		},
	}

	// Logger
	logger := zap.Must(zap.NewProduction()).Sugar()
	defer logger.Sync()

	// DB connection
	db, err := db.New(cfg.db.addr, cfg.db.maxOpenConns, cfg.db.maxIdleConns, cfg.db.maxIdleTime)
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()
	logger.Info("database connection pool established")

	// Mailer
	mailer, err := mailer.NewSendgrid(
		cfg.mail.sendGrid.apiKey,
		cfg.mail.senderName,
		cfg.mail.senderEmail,
		cfg.mail.maxRetries,
	)
	if err != nil {
		logger.Fatal(err)
	}

	store := store.NewStorage(db)

	app := &application{
		config: cfg,
		store:  store,
		logger: logger,
		mailer: mailer,
	}

	mux := app.mount()

	log.Fatal(app.run(mux))
}
