DROP DATABASE IF EXISTS Xylo;

CREATE DATABASE Xylo;

CREATE TABLE songs (
  id SERIAL,
  name VARCHAR(255),
  notes VARCHAR(1000)
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
