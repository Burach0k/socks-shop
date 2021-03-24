CREATE TABLE SOCKS(
 	id SERIAL PRIMARY KEY,
    name varchar(20) NOT NULL,
    image bytea,
    daeFile bytea,
	userId INTEGER REFERENCES users (id),
    likes integer[]
);