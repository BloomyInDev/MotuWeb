import rawWords from './assets/words.json'
export const words = rawWords.filter((word) => {
    word == word.toLowerCase() && word.length >= 4 && word.length <= 8
})
