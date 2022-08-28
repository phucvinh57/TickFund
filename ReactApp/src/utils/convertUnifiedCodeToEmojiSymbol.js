import data from "@emoji-mart/data"

export const convertUnifiedCodeToEmojiSymbol = function (unified) {
    for (let item of Object.values(data.emojis)) {
        if (item.skins[0].unified === unified) return item.skins[0].native
    }
    return null
}