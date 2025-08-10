CREATE TABLE IF NOT EXISTS roles (
    id bigserial PRIMARY KEY,
    name varchar(50) NOT NULL UNIQUE,
    level int NOT NULL DEFAULT 0,
    description text
);

INSERT INTO
    roles(name, level, description)
VALUES (
    'contributor',
    1,
    'A contributor to handle some basic tasks. Lowest level'
);

INSERT INTO
    roles(name, level, description)
VALUES (
    'moderator',
    2,
    'A moderator can update other users posts'
);

INSERT INTO
    roles(name, level, description)
VALUES (
    'admin',
    3,
    'The administrator role is one level below a SU and some functions are: validating events, adding categories, etc.'
);

INSERT INTO
    roles(name, level, description)
VALUES (
    'su',
    100,
    'A super user has full access and can modify any functionality of the system / application.'
);