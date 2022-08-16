-- Creates the new database
CREATE DATABASE IF NOT EXISTS tickfund;
ALTER DATABASE tickfund CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE DATABASE IF NOT EXISTS `ticklab_users`;
USE `ticklab_users`;

CREATE TABLE IF NOT EXISTS department (
    dname VARCHAR(50) PRIMARY KEY
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
    expertise ENUM ('IT', 'ME', 'DEE') NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (dname) REFERENCES department(dname)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS personal_link (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    `url` TEXT,
    `account_id` VARCHAR(8) NOT NULL,

    FOREIGN KEY (`account_id`) REFERENCES account(ID)
        ON DELETE CASCADE ON UPDATE CASCADE
);