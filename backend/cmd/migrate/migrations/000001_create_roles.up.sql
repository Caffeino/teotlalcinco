CREATE TABLE IF NOT EXISTS roles (
    id bigserial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE,
    level int NOT NULL DEFAULT 0,
    description text
);

INSERT INTO roles(name, level, description) VALUES ('user', 0, '');

INSERT INTO
    roles(name, level, description)
VALUES (
    'su',
    1,
    'A super user has full access and can modify any functionality of the system / application.'
);