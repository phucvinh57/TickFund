CREATE USER IF NOT EXISTS 'auth_service';
GRANT SELECT ON `ticklab_users`.department TO 'auth_service';
GRANT SELECT, INSERT ON `ticklab_users`.account TO 'auth_service';

ALTER USER 'auth_service' IDENTIFIED WITH mysql_native_password BY '123456';

CREATE USER IF NOT EXISTS `tickfund_app`;
GRANT ALL ON tickfund.* TO 'tickfund_app';
ALTER USER 'tickfund_app' IDENTIFIED WITH mysql_native_password BY '123456';
