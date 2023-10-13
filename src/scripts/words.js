import rawWords from '../assets/words.json'

export const words = rawWords.filter(
    (word) => word == word.toLowerCase() && word.length >= 4 && word.length <= 8
)
export const randomWord = () => {
    return words[Math.floor(Math.random() * words.length)]
}
export const checkWord = (wordToTrove, proposition) => {
    if (wordToTrove.length != proposition.length) throw Error
    let charListOfWordToTrove = wordToTrove.split('')
    return {
        valid: wordToTrove == proposition,
        proposition: proposition,
        word: proposition.split('').map((char, index) => {
            let valueReturn = { char: char, status: 0 }
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
            console.warn(charListOfWordToTrove)
            return valueReturn
        }),
    }
}
