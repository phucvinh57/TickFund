import Transaction from "../components/exchanges/transaction"
import History from "../components/exchanges/history"
import Category from "../components/exchanges/category"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { getRandomDate, getRandomItem, prettyDate } from "../utils";
import { EMPTY_AVATAR } from "../resource";

const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const genCategory = () => {
    let categories = []
    const kind = {
        Chi : ['tiền nhà', 'tiền điện', 'tiền nước', 'thiết bị', 'duy trì server', 'vật dụng', 'viễn thông'],
        Thu : ['quỹ lab', 'đề tài', 'dự án', 'quỹ đầu tư', 'tài trợ']
    }
    
    for (const property in kind) {
        kind[property].map(el => {
            categories.push({
                    val: el,
                    kind: property,
                    img: "https://picsum.photos/400/300"
                })
            }
        )
    }
    return categories
}

const genUser = () => {
    const persons = [
        'Nguyễn Phúc Vinh',
        'Cù Đỗ Thanh Nhân',
        'Trần Hà Tuấn Kiệt',
        'Nguyễn Quang Anh', 
        'Vũ Nguyễn Minh Huy', 
        'Ngô Minh Hồng Thái'
    ]
    return Array.from({length: persons.length}).map( 
        (el) => {
            return {
                val: getRandomItem(persons),
                img: EMPTY_AVATAR
            }
        }
    ) 
}



const genTransaction = (amount, categories, users) => {
    return Array.from({length: amount}).map(() => {
        return {
            id: makeid(10),
            time: prettyDate(getRandomDate(new Date(2021, 1, 1), new Date())),
            money: getRandomItem(Array.from({length: 100}, (_, i) => (i % 3 !== 0) ? i * 5 : (i !== 0) ? i * 2 : i + 10 )) + "000 đ",
            category: getRandomItem(categories),
            user: getRandomItem(users),
            notes: getRandomItem( Array.from({length: 10}, (_, i) =>  dummy_text.substring(i)) ),
            attachments: []
        }
    })
}

export default function Exchanges() {
    const [ history, setHistory ] = useState(transaction)

    const handleChange = (transaction) => {
        const _history = [transaction, ...history]
        setHistory(_history)
    }
    console.log(history)

    return <div>
        <Transaction
            init={transaction[0]}
            users={users}
            categories={categories}
            onClick={handleChange}
        ></Transaction>     
        <Category data={categories} />
        <History DB={history}/>
    </div>
}




const dummy_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus. Ipsum consequat nisl vel pretium lectus quam id leo in. Blandit libero volutpat sed cras ornare arcu dui. Odio morbi quis commodo odio aenean."

const users = genUser()

const categories = genCategory()

const transaction = genTransaction(20, categories , users)





const DUMMY_TRANSACTION = {

}