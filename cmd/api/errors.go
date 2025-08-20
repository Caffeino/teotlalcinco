package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

type InputErrros struct {
	Errors []string `json:"errors"`
}

func inputValidationErrors(err error) *InputErrros {
	if fieldErrors, ok := err.(validator.ValidationErrors); ok {
		inputErr := InputErrros{
			Errors: make([]string, len(fieldErrors)),
		}

		for i, fe := range fieldErrors {
			switch fe.Tag() {
			case "required":
				inputErr.Errors[i] = fmt.Sprintf("The %s field is required", fe.Field())
			case "email":
				inputErr.Errors[i] = fmt.Sprintf("The %s field must be a valid email address", fe.Field())
			case "min":
				inputErr.Errors[i] = fmt.Sprintf("The %s field must be at least %s characters long", fe.Field(), fe.Param())
			case "max":
				inputErr.Errors[i] = fmt.Sprintf("The %s field must have a maximum of %s characters.", fe.Field(), fe.Param())
			default:
				inputErr.Errors[i] = fmt.Sprintf("%s failed validation on %s tag\n", fe.Field(), fe.Tag())
			}
		}

		return &inputErr
	}

	return &InputErrros{Errors: []string{"Internal server error"}}
}
