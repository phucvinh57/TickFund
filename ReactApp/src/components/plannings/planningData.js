import { getRandomDate, getRandomItem, prettyDate } from "../../utils"
import nhancu from '../../assets/nhancu.jpg'
import vinh from '../../assets/vinh.jpg'
import kiettran from '../../assets/kiettran.jpg'

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
        chi : ['tiền nhà', 'tiền điện', 'tiền nước', 'thiết bị', 'duy trì server', 'vật dụng', 'viễn thông'],
        thu : ['quỹ lab', 'đề tài', 'dự án', 'quỹ đầu tư', 'tài trợ']
    }
    
    for (const property in kind) {
        kind[property].map(el => {
            categories.push({
                    name: el,
                    kind: property,
                    img: "https://picsum.photos/400/300"
                })
            }
        )
    }
    return categories
}

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

const category = genCategory()

export const db = Array.from({length: 10}).map(() => ({
        id: makeid(10),
        time: prettyDate( getRandomDate( new Date(2021, 1, 1), new Date(2022,12,31) ) ),
        money: getRandomItem(Array.from({length: 10}, (_, i) => (i % 3 !== 0) ? i * 5 : (i !== 0) ? i * 2 : i + 10 )) + "000 đ",
        category: getRandomItem([...category].map( ({ name, kind }) => ({ name, kind }) )),
        user: getRandomItem([...persons].map(el => el.name))
    }) 
)

