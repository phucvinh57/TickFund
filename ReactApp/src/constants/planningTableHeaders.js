// For filter, data type must be select, number, date
// If select, only have IS operator
// If date, only have BETWEEN operator
// If number, can have BETWEEN, LTE, GTE

export const planningTableHeaders = [{
    label: 'Mã dự trù',
    association: {
        key: 'id',
        type: 'text'
    },
    sort: true,
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
    label: 'Số tiền',
    association: {
        key: 'amount',
        type: 'number'
    },
    sort: true,
    filter: true
}, {
    label: 'Tên danh mục',
    association: {
        key: 'categoryName',
        type: 'select',
        options: [{
            value: "Tiền nhà",
            label: "Tiền nhà"
        }, {
            value: "Tiền điện",
            label: "Tiền điện"
        }]
    },
    sort: false,
    filter: false
}, {
    label: 'Lặp lại',
    association: {
        key: 'countdown',
        type: 'number'
    },
    sort: true,
    filter: true
}, {
    label: 'Ngày xử lý tiếp theo',
    association: {
        key: 'nextDue',
        type: 'date' // Select
    },
    sort: true,
    filter: true
}];