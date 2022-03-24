-- Used by root user, not by programmed service
DROP DATABASE IF EXISTS `users`;
CREATE DATABASE IF NOT EXISTS `users`;
USE `users`;

CREATE TABLE IF NOT EXISTS department (
    dname VARCHAR(20) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS account (
    username VARCHAR(20) PRIMARY KEY,
    `name` VARCHAR(30) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(50) ,
    `password` VARCHAR(100) NOT NULL,
    avatarURL VARCHAR(255),
    birthday DATE,
    dname VARCHAR(20),
    FOREIGN KEY (dname) REFERENCES department(dname)
        ON DELETE SET NULL ON UPDATE CASCADE
);

