CREATE TABLE IF NOT EXISTS profile (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    bio text,
    photo_url text,
    banner_url text,
    profile_type_id int REFERENCES profile_type(id) NOT NULL DEFAULT 1,
    created_at timestamp(0) with time zone NOT NULL DEFAULT NOW(),
    updated_at timestamp(0) with time zone NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
)