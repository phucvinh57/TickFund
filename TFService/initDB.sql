-- Creates the new database
CREATE DATABASE tickfund;

-- Creates the user
CREATE USER 'tickfund_app'@'%' IDENTIFIED BY 'tfservice';

-- Gives all privileges to the new user on the newly created database
GRANT ALL ON tickfund.* to 'tickfund_app'@'%';


CREATE DATABASE ticklab_users;

-- Creates the user
CREATE USER 'tl_users'@'%' IDENTIFIED BY 'users_Ticklab2022';

-- Gives all privileges to the new user on the newly created database
GRANT ALL ON ticklab_users.* to 'tl_users'@'%';