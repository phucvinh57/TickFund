import { shortKey } from '../../utils'

export const headers = [{
    label: 'Mã dự trù',
    association: {
        key: 'id',
        type: 'text'
    },
    sortable: false
}, {
    label: 'Tên danh mục',
    association: {
        key: 'categoryName',
        type: 'text'
    },
    sortable: false
}, {
    label: 'Loại',
    association: {
        key: 'categoryType',
        type: 'select',
        options: ['Thu', 'Chi']
    },
    sortable: false
}, {
    label: 'Số tiền',
    association: {
        key: 'amount',
        type: 'number' // Select
    },
    sortable: true
}, {
    label: 'Ngày bắt đầu',
    association: {
        key: 'startDate',
        type: 'date' // Select
    },
    sortable: true
}];

export const categoryType = ['Thu', 'Chi']

export const categories = [{
    name: 'Tiền nhà',
    type: 'Chi'
}, {
    name: 'Tiền điện',
    type: 'Chi'
}, {
    name: 'Tiền thiết bị',
    type: 'Chi'
}, {
    name: 'Tiền dự án',
    type: 'Thu'
}, {
    name: 'Tiền nước',
    type: 'Chi'
}, {
    name: 'Tiền đầu tư',
    type: 'Thu'
}]

export const users = [{
    id: shortKey(),
    name: 'Nguyễn Phúc Vinh'
}, {
    id: shortKey(),
    name: 'Cù Đỗ Thanh Nhân'
}, {
    id: shortKey(),
    name: 'Trần Hà Tuấn Kiệt',
}]