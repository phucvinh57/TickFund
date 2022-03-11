import ShortUniqueId from 'short-unique-id'

export const shortKey = new ShortUniqueId({
    length: 4,
    dictionary: 'hex'
})

export const isObject = obj => (typeof obj === 'object' && obj !== null)
