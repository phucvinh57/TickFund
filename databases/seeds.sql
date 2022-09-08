INSERT INTO
    tickfund.category
VALUES
    ('Tiền điện', NULL, 'EXPENSE'),
    ('Tiền nhà', NULL, 'EXPENSE');

INSERT INTO
    tickfund.`planning` (
        `ID`,
        `amount`,
        `start_date`,
        `is_repeat`,
        `has_end_date`,
        `cycle_mode`,
        `cycle_unit`,
        `end_date`,
        `countdown`,
        `category_name`,
        `user_id`
    )
VALUES
    (
        'a5dzxc1as',
        50000,
        '2022-08-14',
        0,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'Tiền nhà',
        NULL
    );

INSERT INTO
    tickfund.role (`ID`, `name`)
VALUES
    (1, 'Thành viên'),
    (2, 'Thủ quỹ'),
    (3, 'Quản trị viên');

INSERT INTO
    tickfund.user
VALUES
    ('1915940', 1);

INSERT INTO
    `resource` (`ID`, `name`)
VALUES
    (1, 'Giao dịch'),
    (2, 'Dự trù'),
    (3, 'Tài khoản'),
    (4, 'Nhóm quyền');

INSERT INTO
    tickfund.action (`ID`, `name`)
VALUES
    (1, 'CREATE'),
    (2, 'READ'),
    (3, 'UPDATE'),
    (4, 'DELETE'),
    (5, 'DISABLE');

INSERT INTO tickfund.resource_action (`resource_id`, `action_id`)
VALUES
    (1, 1), (1, 5),
    (2, 1), (2, 3), (2, 4),
    (3, 1), (3, 3), (3, 5),
    (4, 1), (4, 2), (4, 3), (4, 4);

INSERT INTO tickfund.permission (`role_id`, `resource_id`, `action_id`)
VALUES
    (3, 1, 1), (3, 1, 5),
    (3, 2, 1), (3, 2, 3), (3, 2, 4),
    (3, 3, 1), (3, 3, 3), (3, 3, 5),
    (3, 4, 1), (3, 4, 2), (3, 4, 3), (3, 4, 4);

INSERT INTO
    ticklab_users.`department` (`ID`, `name`)
VALUES
    (1, 'Ban Phát triển Dự án'),
    (2, 'Ban Nghiên cứu Khoa học'),
    (3, 'Ban Phát triển đội nhóm');

INSERT INTO
    ticklab_users.`account` (
        `ID`,
        `username`,
        `name`,
        `phone`,
        `email`,
        `password`,
        `avatarURL`,
        `birthday`,
        `department_id`,
        `expertise`,
        `active`
    )
VALUES
    (
        '1915940',
        'vinh.np',
        'Nguyễn Phúc Vinh',
        '0373395726',
        'npvinh0507@gmail.com',
        NULL,
        'https://scontent-sin6-3.xx.fbcdn.net/',
        '2022-08-24',
        1,
        'IT',
        1
    );
transaction.amount

ALTER TABLE tickfund.planning
ADD next_due date;

INSERT INTO `transaction` VALUES 
('1659543244836-1915940',43000,'2022-01-06','Tiền điện','1915940','1915940','EXPENSE',NULL,'2022-08-03 16:14:04'),
('1659543268270-1915940',43000,'2022-01-07','Tiền điện','1915940','1915940','EXPENSE',NULL,'2022-08-03 16:14:28'),
('1659543610186-1915940',43000,'2022-01-06','Tiền nhà','1915940','1915940','EXPENSE',NULL,'2022-08-03 16:20:10'),
('1659597276552-1915940',43000,'2022-01-06','Tiền điện','1915940','1915940','EXPENSE',NULL,'2022-08-04 07:14:36'),
('1660148034852-1915940',83000,'2022-01-07','Tiền điện','1915940','1915940','EXPENSE',NULL,'2022-08-10 16:13:54'),
('1660148152074-1915940',83000,'2021-12-31','Tiền điện','1915940','1915940','EXPENSE',NULL,'2022-08-10 16:16:13'),
('1660153370083-1915940',83000,'2022-01-07','Tiền điện','1915940','1915940','EXPENSE',NULL,'2022-08-10 17:43:17'),
('1660153370088-1915940',80000,'2022-01-07','Tiền điện','1915940','1915940','EXPENSE',NULL,'2022-08-10 17:46:17'),
('1660153370089-1915940',66000,'2022-01-01','Tiền điện','1915940','1915940','EXPENSE',NULL,'2022-08-24 17:46:17'),
('1661596459572-1915940',83000,'2022-01-07','Tiền điện','1915940','1915940','EXPENSE',NULL,'2022-08-27 10:34:19'),
('1661596459577-1915940',100000,'2022-01-02','Quỹ lab','1915940','1915940','INCOME',NULL,'2022-09-04 10:34:19');

INSERT INTO `planning` VALUES ('1659543244836-1915940',10000,'2022-01-01',1,0,'CYCLE','DAY',NULL,3,'Quỹ lab','1915940','2022-01-01'),
('1661354587588-1915940',400000,'2022-01-15',1,NULL,NULL,'MONTH',NULL,3,'Quỹ lab','1915940','2022-01-15'),
('1661354587590-1915940',100000,'2021-12-15',1,NULL,'CYCLE','MONTH',NULL,1,'Quỹ lab','1915940','2021-12-15');