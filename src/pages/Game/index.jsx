import { randomWord, checkWord } from '../../scripts/words'
import { WordProposition } from '../../components/Proposition'
export function Game() {
    const wordChoosen = randomWord()
    let value = '',
        listProposition = []
    const setValue = (v) => {
        value = v
    }
    const resetValue = (e) => {
        e.target.value = ''
        setValue('')
    }
    const onInputInInput = (e) => {
        setValue(e.target.value)
        console.log(value, wordChoosen)
        if (value.length == wordChoosen.length) {
            listProposition.push(checkWord(wordChoosen, value))
            console.log(listProposition.at(-1))
            resetValue(e)
        }
    }

    return (
        <div class="game">
            <input
                class="bg-white text-black"
                type="text"
                onInput={onInputInInput}
            />
            {listProposition.map((proposition) => (
                <WordProposition word={listProposition} />
            ))}
            <p>Gaming time</p>
        </div>
    )
}
