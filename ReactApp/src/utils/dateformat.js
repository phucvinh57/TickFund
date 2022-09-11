export const dateToString = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') 
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export const dateTimeToString = (date) => {
    return  date.toLocaleTimeString([], {hour12: false}) + ' ' + dateToString(date)
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