CREATE TABLE IF NOT EXISTS invitations (
    token bytea PRIMARY KEY,
    user_id bigint NOT NULL,
    expiry timestamp(0) with time zone NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);