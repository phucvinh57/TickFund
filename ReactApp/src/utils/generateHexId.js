import ShortUniqueId from 'short-unique-id'

export const generateHexId = new ShortUniqueId({
    length: 8,
    dictionary: 'hex'
})