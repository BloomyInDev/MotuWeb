import { randomWord, checkWord } from '@scripts/words'
import { WordProposition } from '@components/Proposition'
import { useState } from 'preact/hooks'
export function Game() {
    // eslint-disable-next-line no-unused-vars
    const [wordChoosen, setWordChoosen] = useState(randomWord())
    const [propositionList, setPropositionList] = useState([])
    const addToPropositionList = (proposition) => {
        setPropositionList((prevPropositionList) => [...prevPropositionList,proposition])
    }
    // eslint-disable-next-line no-unused-vars
    const [firstRow, setFirstRow] = useState({word:wordChoosen.split('').map((char,i)=>{return i==0?{char,status:2}:{char:'*',status:-1}})})
    let value = ''
    const setValue = (v) => {
        value = v
    }
    const resetValue = (e) => {
        e.target.value = ''
        setValue('')
    }
    const onInputInInput = (e) => {
        setValue(e.target.value)
        if (value.length == wordChoosen.length) {
            addToPropositionList(checkWord(wordChoosen,value))
            resetValue(e)
        }
    }

    return (
        <div class="flex justify-center flex-col items-center">
            <div class="w-fit border-b-2 border-white m-2">
                <WordProposition word={firstRow} />
                {propositionList.map((proposition) => (
                    // eslint-disable-next-line react/jsx-key
                    <WordProposition word={proposition} />
                ))}
            
            </div>
            <div class="w-full flex flex-col m-2 justify-center items-center max-w-lg mx-0">
                <input
                    class="m-1 p-1 bg-white text-black max-w-lg w-full rounded-lg"
                    type="text"
                    onInput={onInputInInput}
                />
                <div className="max-w-lg w-full flex flex-col justify-center items-center">
                    <button class="m-1 p-1 border-white border-2 bg-slate-500 text-white w-full rounded-lg">Indice ?</button>
                    <button class="m-1 p-1 border-white border-2 bg-slate-500 text-white w-full rounded-lg">Abandon</button>
                </div>
            </div>
        </div>
    )
}
