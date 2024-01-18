import rawWords from "../assets/words.json";

export const normalizeWord = (word: string) =>
    word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const filteredWords = rawWords.filter(
    (word) =>
        word == word.toLowerCase() && word.length >= 4 && word.length <= 8,
);
export const words = filteredWords.map((word) => normalizeWord(word));
export const randomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

export interface WordProposition {
    valid: boolean;
    proposition: string;
    word: WordPropositionArray[];
}
export interface WordPropositionArray {
    char: string;
    status: number;
}

export const oldCheckWord = (
    wordToTrove: string,
    proposition: string,
): WordProposition => {
    if (wordToTrove.length != proposition.length) throw Error;
    let charListOfWordToTrove = wordToTrove.split("");
    return {
        valid: wordToTrove == proposition,
        proposition,
        word: proposition.split("").map((char, index) => {
            let valueReturn = { char, status: 0 };
            console.log(charListOfWordToTrove);
            if (char == wordToTrove[index]) {
                charListOfWordToTrove = charListOfWordToTrove.filter(
                    (v) =>
                        v !=
                        charListOfWordToTrove[
                            charListOfWordToTrove.indexOf(char)
                        ],
                );
                valueReturn.status = 2;
            } else if (wordToTrove.includes(char)) {
                console.log(
                    charListOfWordToTrove,
                    charListOfWordToTrove.indexOf(char),
                );
                charListOfWordToTrove = charListOfWordToTrove.filter(
                    (v) => index != charListOfWordToTrove.indexOf(char),
                );
                valueReturn.status = 1;
            }
            return valueReturn;
        }),
    };
};

export const newCheckWord = (
    wordToTrove: string,
    proposition: string,
): WordProposition => {
    console.log(wordToTrove, proposition);
    if (wordToTrove.length != proposition.length) throw Error;
    let charListOfWordToTrove = wordToTrove.split("");
    return {
        valid: wordToTrove == proposition,
        proposition,
        word: proposition.split("").map((char, index) => {
            let status = 0;
            if (char == wordToTrove[index]) {
                status = 2;
            } else if (charListOfWordToTrove.includes(char)) {
                status = 1;
                charListOfWordToTrove[index] = "*";
            }
            return { char, status: status };
        }),
    };
};

export const firstWord = (propositions: WordProposition[], word: string) => {
    let first: WordProposition = {
        valid: false,
        proposition: "",
        word: word.split("").map((w) => ({ char: "*", status: -1 })),
    };
    first.word[0] = {
        char: word[0],
        status: 2,
    };
    propositions.forEach((proposition) => {
        for (let i = 0; i < proposition.word.length; i++) {
            const char = proposition.word[i];
            if (char.status == 2) {
                first.word[i] = {
                    char: word[i],
                    status: 2,
                };
            }
        }
    });
    console.log(first);
    return first;
};
