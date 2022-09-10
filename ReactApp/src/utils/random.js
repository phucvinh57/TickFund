import { COMP_STR, DATE_TIME_TYPE } from '../resource'
import { removeAccents, reduceValuesToString } from '../utils'

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

    if (op === COMP_STR.eq) { return propertyVal === comparedValue }
    else if (op === COMP_STR.lt) { return propertyVal < comparedValue }
    else if (op === COMP_STR.gt) { return propertyVal > comparedValue }
    else if (op === COMP_STR.uneq) { return propertyVal !== comparedValue }
    else if (op === COMP_STR.lte) { return propertyVal <= comparedValue }
    else if (op === COMP_STR.gte) { return propertyVal >= comparedValue }
}

export const multiFilter = (arr, filterOptions) => {
    const OP = filterOptions.logic === 'AND' ? '&&' : '||'
    const initVal = OP === '&&' ? true : false
    const filteredResult = arr.filter(ele => filterOptions.filters.map(option => evalComp(ele,
        option.association.key,
        option.operator,
        option.comparedValue,
        option.association.type)).reduce((prev, cur) => eval(`prev ${OP} cur`), initVal))
    return filteredResult
}

export const dateToString = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') 
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export const ISO8601_week_no = (dt) => {
    const dayMillis = 86400000
    const weekMillis = dayMillis * 7

    var firstDateOfYear = new Date(dt.getFullYear(), 0, 1)

    var tdt = new Date(dt.valueOf());
    var weekStart = 1
    var dayn = 8 - firstDateOfYear.getDay()
    if(dayn < 4) weekStart = 0

    var firstWeekDate = new Date(firstDateOfYear.valueOf() + dayMillis * (dayn - 1))
    
    if (tdt < firstWeekDate) return weekStart;
    else {
        var weekNum = weekStart + Math.ceil((tdt - firstWeekDate) / weekMillis);
        return weekNum
    }
}

