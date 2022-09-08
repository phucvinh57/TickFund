export const BETWEEN = "in range"
export const IS = "là"
export const LESS_THAN_OR_EQUAL = "<="
export const GREATER_THAN_OR_EQUAL = ">="
export const NOT_IS = "không là"

export function getOperators(dataType) {
    const operators = []
    if (dataType === "select") {
        operators.push(IS)
        operators.push(NOT_IS)
    } else if (dataType === "date") {
        operators.push(BETWEEN)
    }
    else if (dataType === "number") {
        operators.push(...[BETWEEN, LESS_THAN_OR_EQUAL, GREATER_THAN_OR_EQUAL])
    }

    return operators
}