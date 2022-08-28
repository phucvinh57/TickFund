INSERT INTO
    tickfund.user
VALUES
    ('1915940', NULL);

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
    tickfund.resource (`ID`, `name`)
VALUES
    (1, 'planning'),
    (2, 'transaction');

INSERT INTO
    tickfund.action (`ID`, `name`)
VALUES
    (1, 'SELECT'),
    (2, 'INSERT'),
    (3, 'UPDATE'),
    (4, 'DELETE');

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