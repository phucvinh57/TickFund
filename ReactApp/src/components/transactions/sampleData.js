// import { EMPTY_AVATAR } from '../../resource';
// import { getRandomDate, getRandomItem, prettyDate } from '../../utils/utils';
 
// const dummy_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus. Ipsum consequat nisl vel pretium lectus quam id leo in. Blandit libero volutpat sed cras ornare arcu dui. Odio morbi quis commodo odio aenean."

// export const makeid = (length) => {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() *
//             charactersLength));
//     }
//     return result;
// }

// export const genCategory = () => {
//     let categories = []
//     const type = {
//         Chi: ['Tiền nhà', 'Tiền điện', 'Tiền nước', 'Thiết bị', 'Duy trì server', 'Vật dụng', 'Viễn thông'],
//         Thu: ['Quỹ lab', 'Đề tài', 'Dự án', 'Quỹ đầu tư', 'Tài trợ']
//     }

//     for (const property in type) {
//         type[property].forEach(el => {
//             categories.push({
//                 name: el,
//                 type: property,
//                 icon: '1f606'
//             })
//         }
//         )
//     }
//     return categories
// }

// export const genUser = () => {
//     const persons = [
//         'Nguyễn Phúc Vinh',
//         'Cù Đỗ Thanh Nhân',
//         'Trần Hà Tuấn Kiệt',
//         'Nguyễn Quang Anh',
//         'Vũ Nguyễn Minh Huy',
//         'Ngô Minh Hồng Thái'
//     ]
//     return Array.from({ length: persons.length }).map(
//         (_, idx) => {
//             return {
//                 name: persons[idx],
//                 img: EMPTY_AVATAR
//             }
//         }
//     )
// }

// export const genTransaction = (amount) => {
//     const categories = genCategory()
//     const users = genUser()
//     return Array.from({ length: amount }).map(() => {
//         return {
//             id: makeid(10),
//             time: prettyDate(getRandomDate(new Date(2021, 1, 1), new Date())),
//             money: getRandomItem(Array.from({ length: 100 }, (_, i) => (i % 3 !== 0) ? i * 5 : (i !== 0) ? i * 2 : i + 10)) + "000 VND",
//             category: getRandomItem(categories),
//             user: getRandomItem(users),
//             notes: getRandomItem(Array.from({ length: 10 }, (_, i) => dummy_text.substring(i))),
//             attachments: []
//         }
//     })
// }