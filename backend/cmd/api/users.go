package main

import (
	"net/http"

	"github.com/Caffeino/teotlalcinco/internal/store"
)

func getUserFromCtx(r *http.Request) *store.User {
	user, _ := r.Context().Value(userCtxType).(*store.User)
	return user
}
