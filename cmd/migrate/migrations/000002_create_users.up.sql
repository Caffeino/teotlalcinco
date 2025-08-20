CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS users (
    id bigserial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    email citext UNIQUE NOT NULL,
    password bytea NOT NULL,
    is_active boolean NOT NULL DEFAULT FALSE,
    role_id int REFERENCES roles(id) DEFAULT 0,
    created_at timestamp(0) with time zone NOT NULL DEFAULT NOW()
);