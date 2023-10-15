import { BtnUrl } from '@components/Btn'

export function Home() {
    const data = {
        wincount: parseInt(localStorage.getItem('wincount'), 10) || 0,
        losecount: parseInt(localStorage.getItem('losecount'), 10) || 0,
        winstreak: parseInt(localStorage.getItem('winloss'), 10) || 0,
        winloss: parseInt(localStorage.getItem('winloss'), 10) || 0,
    }
    return (
        <div class="home text-yellow-100">
            <BtnUrl title="Commencer" url="/game" />
            <p>Les data sont {JSON.stringify(data)}</p>
        </div>
    )
}
