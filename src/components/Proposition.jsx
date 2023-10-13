export function FirstWord(props) {
    const { word } = props
    return (
        <div class="flex flex-row">
            {word.map((char) =>
                char.char == '*' ? (
                    <CharProposition char={char.char} status={char.status} />
                ) : (
                    <div class="h-10 w-10 bg-gray-500 flex justify-center items-center">
                        <p>{char.char}</p>
                    </div>
                )
            )}
        </div>
    )
}
export function WordProposition(props) {
    const { word } = props
    return (
        <div class="flex flex-row">
            {word.map((char) => (
                <CharProposition char={char.char} status={char.status} />
            ))}
        </div>
    )
}
export function CharProposition(props) {
    // status => 0 = Nope, 1 = In Word, 2 = Valid place
    const { char, status } = props
    const bgCol =
        status == 0
            ? 'bg-red-500'
            : status == 1
            ? 'bg-orange-500'
            : 'bg-green-500'
    return (
        <div class={`h-10 w-10 ${bgCol} flex justify-center items-center`}>
            <p>{char}</p>
        </div>
    )
}
