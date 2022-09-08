import ShortUniqueId from 'short-unique-id'

export const shortKey = new ShortUniqueId({
    length: 6,
    dictionary: 'alphanum'
})
