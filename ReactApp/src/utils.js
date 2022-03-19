import ShortUniqueId from 'short-unique-id'
import { isValidElement } from 'react'
import { COMP_STR, DATE_TIME_TYPE } from './resource'

export const shortKey = new ShortUniqueId({
    length: 6,
    dictionary: 'alphanum'
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

    query(searchStr, filterOptions, sortOption) {
        sortOption && this.sort(sortOption.key, sortOption.order)

        const searchResult = searchStr ? this.search(searchStr, 0) : this.#db
        const filterResult = filterOptions ? multiFilter(searchResult, filterOptions) : searchResult

        return filterResult
    }

    search(query, start, end = null) {
        const matches = this.#db.filter(value => {
            let str = removeAccents(reduceValuesToString(value))
                .replaceAll(' ', '').toLowerCase()
            let normalQuery = removeAccents(reduceValuesToString(query))
                .replaceAll(' ', '').toLowerCase()
            return str.match(normalQuery) !== null
        })
        console.log(matches)
        this.#currLength = matches.length
        return end ? matches.slice(start, end) : matches.slice(start)
    }

    slice(start, end) {
        this.#currLength = this.#db.length
        return end ? this.#db.slice(start, end) : this.#db.slice(start)
    }

    getCurrLength() {
        return this.#currLength
    }

    sort(key, order) {
        if (order === 'inc')
            this.#db.sort((row1, row2) => row1[key].localeCompare(row2[key]))
        else this.#db.sort((row1, row2) => -row1[key].localeCompare(row2[key]))

        this.#db.forEach(row => console.log(row[key]))
    }

    filter(filterOptions, start, end = null) {
        const matches = multiFilter(this.#db, filterOptions)
        this.#currLength = matches.length
        return end ? matches.slice(start, end) : matches.slice(start)
    }
}

const evalComp = (ele, key, op, comparedValue, type) => {
    if (type === DATE_TIME_TYPE) {
        comparedValue = prettyDate(new Date(comparedValue))
    }

    const propertyVal = ele[key].val ? ele[key].val : ele[key] // check if ele[key] is object

    if(op === COMP_STR.eq) {return propertyVal === comparedValue}
    else if(op === COMP_STR.lt) {return propertyVal < comparedValue}
    else if(op === COMP_STR.gt) {return propertyVal > comparedValue}
    else if(op === COMP_STR.uneq) {return propertyVal !== comparedValue}
    else if(op === COMP_STR.lte) {return propertyVal <= comparedValue}
    else if(op === COMP_STR.gte) {return propertyVal >= comparedValue}
}

export const multiFilter = (arr, filterOptions) => {
    const OP = filterOptions.logic == 'AND' ? '&&' : '||'
    const initVal = OP === '&&' ? true : false 
    const filteredResult = arr.filter(ele => filterOptions.filters.map( option => evalComp(ele, 
                                        option.association.key,
                                        option.operator,
                                        option.comparedValue,
                                        option.association.type)).reduce((prev, cur) => eval(`prev ${OP} cur`), initVal))
    return filteredResult
}