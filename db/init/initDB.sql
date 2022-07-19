-- Creates the new database
CREATE DATABASE IF NOT EXISTS tickfund;

DROP DATABASE IF EXISTS `ticklab_users`;
CREATE DATABASE IF NOT EXISTS `ticklab_users`;
USE `ticklab_users`;

CREATE TABLE IF NOT EXISTS department (
    dname VARCHAR(20) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS account (
    ID VARCHAR(8) PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    `name` VARCHAR(30),
    phone VARCHAR(15),
    email VARCHAR(50) ,
    `password` VARCHAR(100) NOT NULL,
    avatarURL VARCHAR(255),
    birthday DATE,
    dname VARCHAR(20),
    FOREIGN KEY (dname) REFERENCES department(dname)
        ON DELETE SET NULL ON UPDATE CASCADE
);