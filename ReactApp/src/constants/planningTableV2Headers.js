// For filter, data type must be select, number, date
// If select, only have IS operator
// If date, only have BETWEEN operator
// If number, can have BETWEEN, LTE, GTE

export const planningTableV2Headers = [{
    label: 'Mã dự trù',
    association: {
        key: 'id',
        type: 'text'
    },
    sort: true,
    filter: false
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
    label: 'Loại',
    association: {
        key: 'categoryType',
        type: 'select',
        options: [{
            value: 'INCOME', 
            label: 'Thu'
        }, {
            value: 'EXPENSE', 
            label: 'Chi'
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
    label: 'Ngày bắt đầu',
    association: {
        key: 'startDate',
        type: 'date' // Select
    },
    sort: true,
    filter: true
}];