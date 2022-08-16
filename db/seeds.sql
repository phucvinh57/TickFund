INSERT INTO tickfund.user VALUES ('1915940', NULL);

INSERT INTO tickfund.category VALUES
('Tiền điện', NULL, 'EXPENSE'),
('Tiền nhà', NULL, 'EXPENSE');

INSERT INTO tickfund.`planning` (
    `ID`, `amount`, `start_date`,
    `is_repeat`, `has_end_date`, `cycle_mode`,
    `cycle_unit`, `end_date`, `countdown`,
    `category_name`,`type`, `user_id`
)
VALUES
('a5dzxc1as', 50000, '2022-08-14', 0, NULL, NULL, NULL, NULL, NULL, 'Tiền nhà', 'INCOME', NULL);

INSERT INTO tickfund.role (`ID`, `name`) VALUES
(1, 'Thành viên'),
(2, 'Thủ quỹ'),
(3, 'Quản trị viên');

INSERT INTO tickfund.resource (`ID`, `name`) VALUES
(1, 'planning'),
(2, 'transaction');

INSERT INTO tickfund.action (`ID`, `name`) VALUES
(1, 'SELECT'),
(2, 'INSERT'),
(3, 'UPDATE'),
(4, 'DELETE');
