CREATE USER IF NOT EXISTS 'auth_service'@'localhost';
GRANT SELECT ON `ticklab_users`.department TO 'auth_service'@'localhost';
GRANT SELECT, INSERT ON `ticklab_users`.account TO 'auth_service'@'localhost';

ALTER USER 'auth_service'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

