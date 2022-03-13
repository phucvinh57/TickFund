import ShortUniqueId from 'short-unique-id'

export const shortKey = new ShortUniqueId({
    length: 6,
    dictionary: 'alphanum'
})

export const isObject = obj => (typeof obj === 'object' && obj !== null)
