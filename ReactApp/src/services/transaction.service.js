import { EMPTY_AVATAR } from "../resource";
import { shortKey } from "../utils/utils";
import { tfServiceHTTPCommon } from "./httpCommon";
const path = '/transactions/'

export const transactionService = {
    getTransactions: async function (query) {
        return { data: generateTransaction(10) }

    },
    getTransactionDetailById: async function (id) {
        return { data: sampleTransactionDetail }
    },
    addTransactions: async function (data) {
        return tfServiceHTTPCommon.post(path, data)
    }
}

const sampleTransactionDetail = {
    notes: "WTF is this shit ?",
    attachments: [{
        path: "https://img.freepik.com/premium-photo/beautiful-moraine-lake-banff-national-park-alberta-canada_131985-98.jpg?w=2000",
        name: "tiendien.jpg"
    }, {
        path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkCjCYadENpINBJAQqJZXNrIF599mZq1WKANcpzsiGIQkK9kfif6AN9HkededCr_g0kC4&usqp=CAU",
        name: "anh_giao_dich.png"
    }]
}

const generateTransaction = function (numberOfTransactions) {
    return [...Array(numberOfTransactions).keys()].map(idx => {
        return {
            "id": shortKey(),
            "user": {
                "name": "Cù Đỗ  Thanh Nhân",
                "username": "kudoshinichi",
                "avatarUrl": EMPTY_AVATAR,
                "ID": "1915940"
            },
            "time": "2022/03/30 06:24:24",
            "amount": 300000,
            "category": {
                "name": "Tiền điện",
                "type": "Thu",
                "icon": "1f606"
            }
        }
    })
}