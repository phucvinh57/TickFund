DROP USER IF EXISTS 'auth_service'@'%';
DROP USER IF EXISTS 'tickfund_app'@'%';

CREATE USER 'auth_service'@'%';
GRANT SELECT ON `ticklab_users`.* TO 'auth_service'@'%';
GRANT INSERT, UPDATE ON `ticklab_users`.account TO 'auth_service'@'%';

-- Fill the password below
ALTER USER 'auth_service'@'%' IDENTIFIED WITH mysql_native_password BY '';

CREATE USER `tickfund_app`@'%';
GRANT ALL ON tickfund.* TO 'tickfund_app'@'%';

-- Fill the password below
ALTER USER 'tickfund_app'@'%' IDENTIFIED WITH mysql_native_password BY '';
