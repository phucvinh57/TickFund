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
        `type`,
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
        'INCOME',
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