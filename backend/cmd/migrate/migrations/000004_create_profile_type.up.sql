CREATE TABLE IF NOT EXISTS profile_type (
    id bigserial PRIMARY KEY,
    type varchar(50) NOT NULL UNIQUE,
    description text
);

INSERT INTO profile_type(type, description) VALUES ('user', '');