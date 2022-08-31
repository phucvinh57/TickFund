import {
    shortKey,
    getRandomDate,
    getRandomItem,
    generateHexId
} from "../../utils/utils";

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
        type: 'number'
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

export const cycleOptions = ['day', 'week', 'month', 'year']

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

export const repeatModes = ['cycle', 'countdown']

export default function randLogData() {
    const data = []
    for (let i = 0; i < 15; ++i) {
        let rand = {
            amount: Math.floor(Math.random() * (10000000 - 5000) + 5000),
            category: getRandomItem(categories),
            id: generateHexId(),
            isRepeat: Math.floor(Math.random()) === 1,
            repeat: {
                cycle: getRandomItem(cycleOptions),
                endDate: '',
                hasEndDay: Math.floor(Math.random()) === 1,
                mode: getRandomItem(repeatModes),
                times: 0
            },
            startDate: getRandomDate(new Date(2021, 1, 1), new Date()).toISOString().slice(0, 10),
            trader: ''
        }
        data.push(rand)
    }
    return data
}