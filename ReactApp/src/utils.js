import ShortUniqueId from 'short-unique-id'
import { isValidElement } from 'react'

export const shortKey = new ShortUniqueId({
    length: 6,
    dictionary: 'alphanum'
})

export const generateHexId = new ShortUniqueId({
    length: 8,
    dictionary: 'hex'
})

export const isObject = obj => (typeof obj === 'object' && obj !== null)

export const reduceValuesToString = obj => {
    let str
    if (Array.isArray(obj)) {
        str = ''
        obj.forEach(value => {
            str += reduceValuesToString(value)
        })
    }
    else if (isObject(obj)) {
        str = ''
        if (isValidElement(obj.component)) str += obj.val
        else {
            let keys = Object.keys(obj)
            keys.forEach(key => {
                str += reduceValuesToString(obj[key])
            })
        }
    } else {
        str = obj.toString()
    }
    return str
}

export const removeAccents = str => {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

export const getRandomDate = (start, end) => {
    let min = start.getTime()
    let max = end.getTime()
    let rand = Math.floor(Math.random() * (max - min) + min)
    return new Date(rand);
}
export const prettyDate = date => {
    return date.toISOString().slice(0, 19).replace('T', ' ').replaceAll('-', '/')
}
export const getRandomItem = arr => {
    const newArr = [...arr]
    let idx = Math.floor(Math.random() * newArr.length);
    return newArr[idx]
}

// Mock Database, which will transform to an API service later
export class MockDatabase {
    #db
    #currLength //COUNT
    constructor(db) {
        this.#db = db
        this.#currLength = db.length
    }
    search(query, start, end) {
        const matches = this.#db.filter(value => {
            let str = removeAccents(reduceValuesToString(value))
                .replaceAll(' ', '').toLowerCase()
            let normalQuery = removeAccents(reduceValuesToString(query))
                .replaceAll(' ', '').toLowerCase()
            return str.match(normalQuery) !== null
        })
        console.log(matches)
        this.#currLength = matches.length
        return matches.slice(start, end)
    }
    slice(start, end) {
        this.#currLength = this.#db.length
        return this.#db.slice(start, end)
    }

    getCurrLength() {
        return this.#currLength
    }

    sort(key, order) {
        if (order === 'inc')
            this.#db.sort((row1, row2) => row1[key].localeCompare(row2[key]))
        else this.#db.sort((row1, row2) => -row1[key].localeCompare(row2[key]))

        // this.#db.forEach(row => console.log(row[key]))
    }
}