CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(255),
    fid INTEGER
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question VARCHAR(255),
    options json NOT null default '[]' :: json;
    expires_at timestamp null
);

CREATE TABLE channels (
    id SERIAL PRIMARY KEY,
    followers INTEGER,
    name VARCHAR(255) UNIQUE NOT NULL,
    c_address VARCHAR(255),
    c_wallet VARCHAR(255),
    c_pool VARCHAR(255),
    salt VARCHAR(255),
    question_id INT,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE user_question_responses (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    correct_response VARCHAR(255)
    is_onchain BOOLEAN DEFAULT false,
    response VARCHAR(255),
    channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE
);