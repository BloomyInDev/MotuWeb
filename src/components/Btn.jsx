export function Btn(props) {
    const { title, url, color } = props
    return (
        <a class="p-1 rounded-md bg-slate-500 text-white" href={url}>
            {title}
        </a>
    )
}
