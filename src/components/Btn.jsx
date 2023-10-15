export function BtnUrl(props) {
    const { title, url } = props
    return (
        <a class="p-1 rounded-md bg-slate-500 text-white" href={url}>
            {title}
        </a>
    )
}
export function BtnAct(props) {
    const { title, act } = props
    return (
        <button class="p-1 rounded-md bg-slate-500 text-white" onClick={act}>
            {title}
        </button>
    )
}