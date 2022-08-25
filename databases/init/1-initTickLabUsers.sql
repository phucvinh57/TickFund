-- Creates the new database
CREATE DATABASE IF NOT EXISTS tickfund;
ALTER DATABASE tickfund CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE DATABASE IF NOT EXISTS `ticklab_users`;
USE `ticklab_users`;

CREATE TABLE IF NOT EXISTS department (
    ID SMALLINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL UNIQUE
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
    department_id SMALLINT NOT NULL,
    expertise ENUM ('IT', 'ME', 'DEE') NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (department_id) REFERENCES department(ID)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS personal_link (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    `url` TEXT,
    `account_id` VARCHAR(8) NOT NULL,

    FOREIGN KEY (`account_id`) REFERENCES account(ID)
        ON DELETE CASCADE ON UPDATE CASCADE
);