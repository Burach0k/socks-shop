ALTER TABLE users
DROP COLUMN hash;

ALTER TABLE users
ADD password varchar(20) NOT NULL default '1';