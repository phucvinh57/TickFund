import Account from "./account";
import Activity from "./activity";

import {
    getRandomDate,
    getRandomItem,
    prettyDate
} from "../../utils";

import nhancu from '../../assets/nhancu.jpg'
import vinh from '../../assets/vinh.jpg'
import kiettran from '../../assets/kiettran.jpg'

export default function randLogData() {
    let randAccount = getRandomItem(persons)
    let randActivity = getRandomItem(activities)
    let linkText = getRandomItem(randActivity.link.text)

    return {
        time: prettyDate(getRandomDate(new Date(2021, 1, 1), new Date())),
        account: {
            val: randAccount.name,
            component: <Account img={randAccount.img} name={randAccount.name} />
        },
        activity: {
            val: randAccount.name + ' ' + randActivity.content.toLowerCase()
                + ' ' + linkText,
            component: <Activity content={randActivity.content} link={{
                href: randActivity.link.href,
                text: linkText
            }} />
        }
    }
}

export const numItemsPerPage = 20
const persons = [{
    img: vinh,
    name: 'Nguyễn Phúc Vinh'
}, {
    img: nhancu,
    name: 'Cù Đỗ Thanh Nhân'
}, {
    img: kiettran,
    name: 'Trần Hà Tuấn Kiệt'
}]

const activities = [{
    content: 'Thêm dự trù',
    link: {
        href: 'https://github.com/phucvinh57/TickFund',
        text: ['tiền nhà', 'tiền điện', 'tiền thiết bị', 'duy trì server', 'mua bàn ghế']
    }
}, {
    content: 'Thêm giao dịch',
    link: {
        href: 'https://github.com/phucvinh57/TickFund',
        text: ['tiền nhà', 'tiền điện', 'tiền thiết bị', 'duy trì server', 'mua bàn ghế', 'đóng quỹ lab hàng tháng']
    }
}, {
    content: 'Yêu cầu giải ngân',
    link: {
        href: 'https://github.com/phucvinh57/TickFund',
        text: ['mua bàn ghế', 'mua máy khoan']
    }
}, {
    content: 'Thêm tài khoản',
    link: {
        href: 'https://github.com/phucvinh57/TickFund',
        text: ['Nguyễn Quang Anh', 'Vũ Nguyễn Minh Huy', 'Ngô Minh Hồng Thái']
    }
}, {
    content: 'Thêm nhóm quyền',
    link: {
        href: 'https://github.com/phucvinh57/TickFund',
        text: ['Quản lý quyền truy cập', 'Giám sát hệ thống']
    }
}, {
    content: 'Chỉnh sửa nhóm quyền',
    link: {
        href: 'https://github.com/phucvinh57/TickFund',
        text: ['Quản lý tài khoản', 'Thủ quỹ', 'Thành viên', 'Quản lý quyền truy cập', 'Giám sát hệ thống']
    }
}]

export const headers = [{
    label: 'Tài khoản',
    association: {
        key: 'account',
        type: 'select',
        options: persons.map(person => person.name)
    },
    sortable: 'false'
}, {
    label: 'Thời gian',
    association: {
        key: 'time',
        type: 'datetime-local'
    },
    sortable: true
}, {
    label: 'Hoạt động',
    association: {
        key: 'activity',
        type: 'text',
    },
    sortable: false
}]