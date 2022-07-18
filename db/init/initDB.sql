-- Creates the new database
CREATE DATABASE IF NOT EXISTS tickfund;

-- Creates the user
CREATE USER IF NOT EXISTS 'user' IDENTIFIED BY 'user';

-- Gives all privileges to the new user on the newly created database
GRANT ALL ON tickfund.* to 'user';