import { Btn } from '../../components/Btn'

export function Home() {
    const data = {
        wincount: parseInt(localStorage.getItem('wincount')) || 0,
        losecount: parseInt(localStorage.getItem('losecount')) || 0,
        winstreak: parseInt(localStorage.getItem('winloss')) || 0,
        winloss: parseInt(localStorage.getItem('winloss')) || 0,
    }
    return (
        <div class="home text-yellow-100">
            <Btn title="Commencer" url="/game" />
            <p>Les data sont {JSON.stringify(data)}</p>
        </div>
    )
}
