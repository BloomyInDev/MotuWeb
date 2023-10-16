import { BtnAct, BtnUrl } from '@components/Btn'
import { useState, useEffect } from 'preact/hooks'

export function Home() {
    const [statDropdownOpen, setStatDropdownOpen] = useState(false)
    const switchStatDropdownOpen = () => {
        setStatDropdownOpen(!statDropdownOpen)
    }
    const [classListDropdown, setClassListDropdown] = useState('hidden')
    useEffect(() => {
        if (statDropdownOpen) {
            setClassListDropdown('opacity-100')
        } else {
            setClassListDropdown('opacity-0')
        }
    }, [statDropdownOpen])
    const data = {
        wincount: parseInt(localStorage.getItem('wincount'), 10) || 0,
        losecount: parseInt(localStorage.getItem('losecount'), 10) || 0,
        winstreak: parseInt(localStorage.getItem('winloss'), 10) || 0,
    }
    data.winloss = data.wincount / (data.wincount + data.losecount)
    return (
        <div class="flex flex-col justify-center items-center">
            <div class="m-2">
                <BtnUrl title="Commencer" url="/game" />
            </div>
            <div class="m-2">
                <BtnAct
                    title="Voir les statistiques"
                    act={switchStatDropdownOpen}
                />
            </div>

            <div
                class={`${classListDropdown} transition-all delay-0 duration-300 bg-gray-500 p-2 rounded-lg`}
            >
                <table class="w-full">
                    <tr class="border-b-2 border-gray-400">
                        <th class="text-center">Parties gagnées</th>
                        <td class="text-xl">{data.wincount}</td>
                    </tr>
                    <tr class="border-b-2 border-gray-400">
                        <th class="text-center">Parties perdues</th>
                        <td class="text-xl">{data.losecount}</td>
                    </tr>
                    <tr class="border-b-2 border-gray-400">
                        <th class="text-center">Parties gagnées d'affilé</th>
                        <td class="text-xl">{data.winstreak}</td>
                    </tr>
                    <tr class="border-b-2 border-gray-400">
                        <th class="text-center">
                            Ratio partie gagnées/perdues
                        </th>
                        <td class="text-xl">{data.winloss}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
