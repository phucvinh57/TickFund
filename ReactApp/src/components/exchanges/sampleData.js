
import { getRandomDate, getRandomItem, prettyDate } from '../../utils';

export let makeid = (length) => {
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
                    name: el,
                    kind: property,
                    img: "https://picsum.photos/400/300"
                })
            }
        )
    }
    return categories
}

export const category = genCategory()

const genTransaction = (amount, categories) => {
    return Array.from({length: amount}).map(() => {
        return {
            id: makeid(10),
            time: prettyDate(getRandomDate(new Date(2021, 1, 1), new Date())),
            money: getRandomItem(Array.from({length: 100}, (_, i) => (i % 3 !== 0) ? i * 5 : (i !== 0) ? i * 2 : i + 10 )) + "000 đ",
            category: getRandomItem([...categories].map(el => el.kind + " " + el.name)),
        }
    })
}

export const history = genTransaction(200, category);

