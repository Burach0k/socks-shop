DELETE FROM USERS;

ALTER TABLE USERS
ADD UNIQUE (name);

create type Roles as enum ('admin', 'client');

ALTER TABLE USERS
ADD roles Roles[] NOT NULL;