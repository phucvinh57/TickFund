export const transactionTableHeaders = [{
    label: 'Mã giao dịch',
    association: {
        key: 'id',
        type: 'text'
    },
    sort: false,
    filter: false
}, {
    label: 'Người giao dịch',
    association: {
        key: 'user',
        type: 'select',
        options: [{
            value: "1915940", // user id
            label: "Nguyễn Phúc Vinh" // user's name
        }]
    },
    sort: false,
    filter: true
}, {
    label: 'Thời gian',
    association: {
        key: 'time',
        type: 'date',
    },
    sort: true,
    filter: true
}, {
    label: 'Số tiền',
    association: {
        key: 'money',
        type: 'number'
    },
    sort: true,
    filter: true
}, {
    label: 'Danh mục',
    association: {
        key: 'category',
        type: 'select',
        options: [{
            value: "Tiền điện",
            label: "Tiền điện"
        }, {
            value: "Tiền nhà",
            label: "Tiền nhà"
        }]
    },
    sort: false,
    filter: true
}];