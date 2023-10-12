import { words } from './wordsProcessing'

export const chooseWord = () => {
    return words[Math.floor(Math.random * words.length)]
}
export const wordProposal = (word) => {}
