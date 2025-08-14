package utils

import (
	"crypto/sha256"
	"encoding/hex"

	"github.com/google/uuid"
)

func GenerateHashToken() (plainToken string, hashToken string) {
	plainToken = uuid.New().String()
	hash := sha256.Sum256([]byte(plainToken))
	hashToken = hex.EncodeToString(hash[:])

	return
}
