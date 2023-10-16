import rawWords from '../assets/words.json'

const filteredWords = rawWords.filter(
    (word) => word == word.toLowerCase() && word.length >= 4 && word.length <= 8
)
export const words = filteredWords.map((word) =>
    word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
)
export const randomWord = () => {
    return words[Math.floor(Math.random() * words.length)]
}
export const checkWord = (wordToTrove, proposition) => {
    if (wordToTrove.length != proposition.length) throw Error
    let charListOfWordToTrove = wordToTrove.split('')
    return {
        valid: wordToTrove == proposition,
        proposition,
        word: proposition.split('').map((char, index) => {
            let valueReturn = { char, status: 0 }
            console.log(charListOfWordToTrove)
            if (char == wordToTrove[index]) {
                charListOfWordToTrove = charListOfWordToTrove.filter(
                    (v) =>
                        v !=
                        charListOfWordToTrove[
                            charListOfWordToTrove.indexOf(char)
                        ]
                )
                valueReturn.status = 2
            } else if (wordToTrove.includes(char)) {
                charListOfWordToTrove = charListOfWordToTrove.filter(
                    (v) => v != charListOfWordToTrove.indexOf(char)
                )
                valueReturn.status = 1
            }
            return valueReturn
        }),
    }
}
