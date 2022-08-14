DROP USER IF EXISTS 'auth_service'@'%';
DROP USER IF EXISTS 'tickfund_app'@'%';

CREATE USER 'auth_service'@'%';
GRANT SELECT ON `ticklab_users`.department TO 'auth_service'@'%';
GRANT SELECT, INSERT ON `ticklab_users`.account TO 'auth_service'@'%';
ALTER USER 'auth_service'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

CREATE USER `tickfund_app`@'%';
GRANT ALL ON tickfund.* TO 'tickfund_app'@'%';
ALTER USER 'tickfund_app'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
