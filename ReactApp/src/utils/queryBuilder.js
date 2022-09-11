import { BETWEEN, GREATER_THAN_OR_EQUAL, IS, LESS_THAN_OR_EQUAL } from "../constants/compareOperator"

const getFieldAlias = (fieldName, fieldMap) =>{
    return fieldMap[fieldName] ? fieldMap[fieldName] : fieldName
}
const transformFilter = (filter, fieldMap) => {
    const items = filter.items.map(i => {
        const field = getFieldAlias(i.lhs.key, fieldMap)
        if(i.operator === BETWEEN){
            return {
                field: field,
                type: 'range',
                upper_bound: i.rhs.upperbound,
                lower_bound: i.rhs.lowerbound
            }
        }
        else if(i.operator === LESS_THAN_OR_EQUAL){
            return {
                field: field,
                type: 'range',
                upper_bound: i.rhs
            }
        }
        else if(i.operator == GREATER_THAN_OR_EQUAL){
            return {
                field: field,
                type: 'range',
                lower_bound: i.rhs
            }
        }
        else {
            return {
                field: field,
                type: i.operator == IS ? 'equal' : 'not_equal',
                value: i.rhs
            }
        }
    })
    return items
}

const transformSort = (sort, fieldMap) => {
    const field = getFieldAlias(sort.key, fieldMap)
    return {
        field: field,
        type: sort.order.toUpperCase()
    }

}

const transformSlice= (order) => {
    return {
        page_number: order.pageNumber,
        page_size: order.pageSize
    }
}

export const queryToApiBody = (query, fieldMap) => {
    const op = query.filter.combineLogic == 'AND' ? 'must' : 'should'
    const filterItems = transformFilter(query.filter, fieldMap)
    const sortPart = transformSort(query.sort, fieldMap)
    const slicePart = transformSlice(query.slice)

    return {
        op: op,
        filters: filterItems,
        order: sortPart,
        size: slicePart
    }
}