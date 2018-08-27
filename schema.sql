DROP DATABASE IF EXISTS Xylo;

CREATE DATABASE Xylo;

CREATE TABLE songs (
  id SERIAL,
  name VARCHAR(255),
  song VARCHAR[],
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
