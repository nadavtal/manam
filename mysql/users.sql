CREATE TABLE users (
	ID   INT    AUTO_INCREMENT NOT NULL,
	firstName VARCHAR(30) NOT NULL,
	lastName VARCHAR(30) NOT NULL,
	email VARCHAR(30) NOT NULL,
	password VARCHAR(30) NOT NULL,
	role VARCHAR(20) NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY (ID)
);
drop table users;
SELECT * from users;
truncate table users;
