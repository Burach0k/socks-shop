CREATE TABLE comments(
	id SERIAL PRIMARY KEY,
	text varchar(500) NOT NULL,
	userId INTEGER REFERENCES users (id) NOT NULL,
	date timestamp NOT NULL,
	sockId INTEGER REFERENCES socks (id) NOT NULL,
	parentId INTEGER REFERENCES comments (id)
);

alter table socks add likes integer[];
alter table users add subscribes integer[];
