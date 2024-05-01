CREATE TABLE collectives (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    c_address VARCHAR(255),
    c_wallet VARCHAR(255),
    c_pool VARCHAR(255),
    salt VARCHAR(255)
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(255),
    fid INTEGER,
    collective_id INTEGER REFERENCES collectives(id) ON DELETE CASCADE
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question VARCHAR(255),
    correct_response VARCHAR(255),
    options json NOT null default '[]' :: json,
    expires_at timestamp null
);


CREATE TABLE user_question_responses (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    correct_response BOOLEAN,
    is_onchain BOOLEAN DEFAULT false,
    response VARCHAR(255)
);



/* -------------------- SEED DATA BELOW -------------------------------------- */

INSERT INTO questions (id, question, expires_at, correct_response, options) 
VALUES 
    (1, 'When was the Farcaster github org created?', '2024-05-03 10:00:00-00'::timestamp AT TIME ZONE 'MST', 'Jan 2022', '["Jan 2022", "April 2022", "Dec 2022"]'::json),
    (2, 'When was the Farcaster OG NFT snapshot taken?', '2024-05-04 10:00:00-00'::timestamp AT TIME ZONE 'MST', 'Oct 2023', '["Dec 2022", "May 2023", "Oct 2022", "Feb 2024"]'::json),
    (3, 'When did Farcaster first cross 10k DAU?', '2024-05-05 10:00:00-00'::timestamp AT TIME ZONE 'MST', 'Feb 2024', '["Oct 2023", "Dec 2023", "Feb 2024", "Mar 2024"]'::json);


INSERT INTO collectives (id, name) 
VALUES 
    (1, 'OG'),
    (2, 'new'),
    (3, 'power-badge');
