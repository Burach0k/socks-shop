CREATE TABLE USERS(
    id SERIAL PRIMARY KEY,
    hash character(300),
    name varchar(20) NOT NULL
);