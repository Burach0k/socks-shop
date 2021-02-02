create type Roles as enum ('admin', 'client');

CREATE TABLE USERS(
    id SERIAL PRIMARY KEY,
    hash character(300) NOT NULL,
    name varchar(20) NOT NULL,
    UNIQUE (name),
    roles Roles[] NOT NULL
);