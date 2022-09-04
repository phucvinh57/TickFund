export const userTableHeaders = [{
    label: "Tên thành viên",
    association: {
        key: "name",
        type: "text"
    },
    sort: true,
    filter: false
}, {
    label: 'Chuyên môn',
    association: {
        key: 'expertise',
        type: 'select',
        options: [{
            value: "IT",
            label: "IT"
        }, {
            value: "ME",
            label: "Cơ khí"
        }, {
            value: "DEE",
            label: "Điện"
        }]
    },
    sort: false,
    filter: true
}, {
    label: 'Vai trò',
    association: {
        key: 'role',
        type: 'select',
        options: [{
            value: 1,
            label: "Admin"
        }, {
            value: 2,
            label: "Thủ quỹ"
        }, {
            value: 3,
            label: "Thành viên"
        }]
    },
    sort: false,
    filter: true
}, {
    label: "Thuộc ban",
    association: {
        key: "department",
        type: "select",
        options: [{
            value: 1,
            label: "Ban Phát triển dự án"
        }, {
            value: 2,
            label: "Ban Nghiên cứu khoa học"
        }, {
            value: 3,
            label: "Ban Phát triển đội nhóm và con người"
        }]
    }
}, {
    label: 'Trạng thái',
    association: {
        key: 'active',
        type: 'select',
        options: [{
            value: true,
            label: "Đang hoạt động"
        }, {
            value: false,
            label: "Không còn họat động"
        }]
    },
    sort: false,
    filter: true
}]