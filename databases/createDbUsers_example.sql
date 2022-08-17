DROP USER IF EXISTS '<user_centerdata>'@'%';
DROP USER IF EXISTS '<user_tickfund>'@'%';

CREATE USER '<user_centerdata>'@'%';
GRANT SELECT ON `ticklab_users`.* TO '<user_centerdata>'@'%';
GRANT INSERT, UPDATE ON `ticklab_users`.account TO '<user_centerdata>'@'%';

-- Fill the password below
ALTER USER '<user_centerdata>'@'%' IDENTIFIED WITH mysql_native_password BY '';

CREATE USER `<user_tickfund>`@'%';
GRANT ALL ON tickfund.* TO '<user_tickfund>'@'%';

-- Fill the password below
ALTER USER '<user_tickfund>'@'%' IDENTIFIED WITH mysql_native_password BY '';
