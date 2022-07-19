-- Use as root
CREATE USER IF NOT EXISTS 'user'@'localhost';
GRANT ALL ON `tickfund`.* TO 'user'@'localhost';

ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'user';

