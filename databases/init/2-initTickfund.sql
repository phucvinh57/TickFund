CREATE DATABASE IF NOT EXISTS tickfund;
ALTER DATABASE tickfund CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE tickfund;

CREATE TABLE IF NOT EXISTS category (
    `name` VARCHAR(255) PRIMARY KEY,
    icon TEXT,
    `type` ENUM('INCOME', 'EXPENSE') NOT NULL
);

CREATE TABLE IF NOT EXISTS `role` (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS `resource` (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS `action` (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS permission (
    role_id INT,
    action_id INT,
    resource_id INT,
    PRIMARY KEY (role_id, action_id, resource_id),
    FOREIGN KEY (role_id) REFERENCES `role`(ID) ON DELETE CASCADE,
    FOREIGN KEY (action_id) REFERENCES `action`(ID) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES `resource`(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user (
    ID VARCHAR(50) PRIMARY KEY,
    role_id INT,

    FOREIGN KEY (role_id) REFERENCES `role`(ID)
);

CREATE TABLE IF NOT EXISTS planning (
    ID VARCHAR(64) PRIMARY KEY,
    amount INT UNSIGNED NOT NULL,
    `start_date` DATE NOT NULL,
    is_repeat BOOLEAN NOT NULL,
    has_end_date BOOLEAN,
    cycle_mode ENUM('CYCLE', 'COUNTDOWN'),
    cycle_unit ENUM('DAY', 'WEEK', 'MONTH', 'QUARTER', 'YEAR'),
    end_date DATE,
    countdown SMALLINT UNSIGNED,
    category_name VARCHAR(255) NOT NULL,
    `type` ENUM('INCOME', 'EXPENSE') NOT NULL,
    `user_id` VARCHAR(50),
    FOREIGN KEY (`user_id`) REFERENCES user(ID) ON DELETE SET NULL,
    FOREIGN KEY (category_name) REFERENCES category(`name`) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `transaction` (
    ID VARCHAR(64) PRIMARY KEY,
    amount INT UNSIGNED NOT NULL,
    history DATE NOT NULL,
    category_name VARCHAR(255) NOT NULL,
    user_id VARCHAR(50),
    creator_id INT NOT NULL,
    `type` ENUM('INCOME', 'EXPENSE'),
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attachment (
    ID VARCHAR(64) PRIMARY KEY,
    transaction_id VARCHAR(64) NOT NULL,
    `url` TEXT NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES `transaction`(ID)
);