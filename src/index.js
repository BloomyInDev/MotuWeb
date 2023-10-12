import './style.css'

let scores = ['winloss', 'winstreak', 'wincount', 'losecount']
scores.forEach((e) => {
    if (localStorage.getItem(e) == null) {
        localStorage.setItem(e, '0')
    }
})
let stats = {
    winloss: parseFloat(localStorage.getItem('winloss')) || 0,
    winstreak: parseInt(localStorage.getItem('winstreak')) || 0,
    wincount: parseInt(localStorage.getItem('wincount')) || 0,
    losscount: parseInt(localStorage.getItem('losecount')) || 0
}
console.table(stats)
document.getElementById('winloss').innerText = stats.winloss.toString()
document.getElementById('winstreak').innerText = stats.winstreak.toString()
document.getElementById('wincount').innerText = stats.wincount.toString()
document.getElementById('losscount').innerText = stats.losscount.toString()

let home = document.querySelector('#home')
let game = document.querySelector('#game')

document.getElementById('btn-launch-game').addEventListener('click', (ev) => {
    home.classList.add('hidden')
    game.classList.remove('hidden')
})
