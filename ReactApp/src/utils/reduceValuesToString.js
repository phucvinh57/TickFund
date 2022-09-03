import { isValidElement } from "react"
import { isObject } from "./isObject"

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