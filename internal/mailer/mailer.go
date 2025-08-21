package mailer

import (
	"embed"
	"errors"

	"github.com/sendgrid/sendgrid-go"
)

const (
	UserWelcomeTmpl = "user_invitation.tmpl"
)

//go:embed "templates"
var FS embed.FS

func NewSendgrid(apiKey, senderName, senderEmail string, maxRetries int) (*SendGridMailer, error) {
	if apiKey == "" {
		return &SendGridMailer{}, errors.New("api key is required")
	}

	return &SendGridMailer{
		senderName:  senderName,
		senderEmail: senderEmail,
		maxRetries:  maxRetries,
		apiKey:      apiKey,
		client:      sendgrid.NewSendClient(apiKey),
	}, nil
}

type Client interface {
	Send(tmplFile, username, email string, data any, isSandbox bool) (int, error)
}
