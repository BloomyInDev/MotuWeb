export function WordProposition(props) {
    const { word } = props
    console.log(word)
    return (
        <div class="flex flex-row border-white border-2 border-b-0 w-fit">
            {word.word.map((char) => (
                // eslint-disable-next-line react/jsx-key
                <CharProposition char={char.char} status={char.status} />
            ))}
        </div>
    )
}
export function CharProposition(props) {
    // status => 0 = Nope, 1 = In Word, 2 = Valid place
    const { char, status } = props
    let bgCol = 'bg-gray-500'
    if (status == 0) bgCol = 'bg-red-500'
    else if (status == 1) bgCol = 'bg-orange-500'
    else if (status == 2) bgCol = 'bg-green-500'
    return (
        <div
            class={`h-10 w-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 ${bgCol} flex justify-center items-center`}
        >
            <p class="lg:text-xl xl:text-2xl">{char.toUpperCase()}</p>
        </div>
    )
}
