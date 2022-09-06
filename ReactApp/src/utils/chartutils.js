import { ISO8601_week_no } from "./utils"
export const getRecordLabel = (record) => {

    var label = []
    if('year' in record) label.push(record.year)

    if('month' in record) label.push(String(record.month).padStart(2, '0'))

    if('day' in record) label.push(String(record.day).padStart(2, '0'))
    
    if('week' in record) label.push(String(record.week).padStart(2, '0'))

    return label.join('-')
}

export const reduceRecordByTime = (records) => {
    const clonedArr = JSON.parse(JSON.stringify(records))
    return clonedArr.reduce((prev, cur) => {
        const curLabel = getRecordLabel(cur)
        const matchIndex = prev.findIndex(t => getRecordLabel(t) === curLabel && t.category_type === cur.category_type)
        if(matchIndex >= 0){
           prev[matchIndex].sum = cur.sum + prev[matchIndex].sum
           return prev
        }
        else{
          return [cur, ...prev]
        }
      }, [])
}

export const reduceRecordByCategory = (records) => {
    const clonedArr = JSON.parse(JSON.stringify(records))
    var map = new Map()
    records.forEach(r => {
        if(map.has(r.category_name)){
            const prev = map.get(r.category_name)
            prev.sum = prev.sum + r.sum
        }
        else {
            map.set(r.category_name, r)
        }
    })

    return Array.from(map.values())
}

export const generateIntervalLabel = (interval, dt) => {
    if(interval === 'day'){
        const day = String(dt.getDate()).padStart(2, '0')
        const month = String(dt.getMonth() + 1).padStart(2, '0')
        const year = dt.getFullYear()
        return `${year}-${month}-${day}`
    }
    else if(interval === 'week'){
        const week = String(ISO8601_week_no(dt)).padStart(2, '0')
        const year = dt.getFullYear()
        return `${year}-${week}`
    }
    else if(interval === 'month'){
        const month = String(dt.getMonth() + 1).padStart(2, '0')
        const year = dt.getFullYear()

        return `${year}-${month}`
    }
    else if(interval === 'year'){
        const year = dt.getFullYear()

        return `${year}`
    }
}

function fillMissingDay(start, end, records){
    const dayMillis = 86400000

    var cur = start
    var lineData = []
    while(cur <= end){
        var label = generateIntervalLabel('day', cur)

        var matchRecord = records.find(r => getRecordLabel(r) === label)
        lineData.push(
            {
                x: label,
                y: matchRecord ? matchRecord.sum : 0
            }
        )

        cur = new Date(cur.valueOf() + dayMillis)
    }

    return lineData
}

function fillMissingWeek(start, end, records){
    const dayMillis = 86400000
    const weekMilis = dayMillis * 7

    var cur = start
    var lineData = []
    while(cur <= end || ISO8601_week_no(cur) === ISO8601_week_no(end)){
        var label = generateIntervalLabel('week', cur)

        var matchRecord = records.find(r => getRecordLabel(r) === label)
        lineData.push(
            {
                x: label,
                y: matchRecord ? matchRecord.sum : 0
            }
        )
        
        const nextWeekDay = new Date(cur.valueOf() + weekMilis)
        const followingDay = new Date(cur.valueOf() + dayMillis)

        // special case when reach end of year
        if(ISO8601_week_no(nextWeekDay) === ISO8601_week_no(followingDay)){
            cur = nextWeekDay
        }
        else {
            for (let i = 0; i < 7; i++) {
                cur = new Date(cur.valueOf() + dayMillis)
                if(ISO8601_week_no(cur) === ISO8601_week_no(nextWeekDay)){
                    break;
                }
            }
        }
    }

    return lineData
}

function fillMissingMonth(start, end, records){
    var cur = start
    var lineData = []
    while(cur <= end || cur.getMonth() === end.getMonth()){

        var label = generateIntervalLabel('month', cur)

        var matchRecord = records.find(r => getRecordLabel(r) === label)
        lineData.push(
            {
                x: label,
                y: matchRecord ? matchRecord.sum : 0
            }
        )

        if(cur.getMonth() != 11){
            cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1)
        }
        else {
            cur = new Date(cur.getFullYear() + 1, 0, 1)
        }
    }

    return lineData
}


function fillMissingYear(start, end, records){
    var cur = start
    var lineData = []
    while(cur.getFullYear() <= end.getFullYear()){
        var label = generateIntervalLabel('year', cur)

        var matchRecord = records.find(r => getRecordLabel(r) === label)
        lineData.push(
            {
                x: label,
                y: matchRecord ? matchRecord.sum : 0
            }
        )
        cur = new Date(cur.getFullYear() + 1, 0, 1)
    }

    return lineData
}
export const genInRangeDataSetWithMissing = (filter, records) => {
    if(filter.interval === 'day') return fillMissingDay(filter.start, filter.end, records)
    else if(filter.interval === 'week') return fillMissingWeek(filter.start, filter.end, records)
    else if(filter.interval === 'month') return fillMissingMonth(filter.start, filter.end, records)
    else if(filter.interval === 'year') return fillMissingYear(filter.start, filter.end, records)
}

export const genOutRangeDataSet = (filter, records) => {
    const startLabel = generateIntervalLabel(filter.interval, filter.start)

    return records
            .filter(r => getRecordLabel(r) < startLabel)
            .map(r => {return {
                y: r.sum,
                x: getRecordLabel(r)
            };})
}

export const translateDateUnit = (str) => {
    if(str === 'day') return 'Năm-Tháng-Ngày'
    else if(str == 'week') return 'Năm-Tuần'
    else if(str === 'month') return 'Năm-Tháng'
    else if(str === 'year') return 'Năm'
}

export const mergePlanningByTime = (transactions, plannings) => {
    const reduceTransactions = reduceRecordByTime(transactions)
    const reducedPlannings = reduceRecordByTime(plannings)

    const map = new Map()
    reduceTransactions.forEach(t => {
        const key = getRecordLabel(t) + t.category_type
        map.set(key, t)
    })

    reducedPlannings.forEach(p => {
        const key = getRecordLabel(p) + p.category_type
        if(map.has(key)){
            var prev = map.get(key)
            prev.sum = prev.sum + p.sum
        }
        else {
            map.set(key, p)
        }
    })

    return Array.from(map.values())
}

export const calculateTotal = (incomes, expenses, prevBalance) => {
    var clonedIncomes = [...incomes]
    var clonedExpense = [...expenses]

    if(clonedIncomes.length < clonedExpense.length){
        clonedIncomes = [...Array(clonedExpense.length - clonedIncomes.length).keys(), ...clonedIncomes]
    }
    else {
        clonedExpense = [...Array(clonedIncomes.length - clonedExpense.length).keys(), ...clonedExpense]
    }

    var accumulate = prevBalance
    var newData = []
    clonedIncomes.forEach((i, idx) => {
        accumulate = accumulate + i - clonedExpense[idx]
        newData.push(accumulate)
    })

    return newData
}