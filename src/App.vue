<script>
import json from './assets/words.json'
export default {
    data() {
        return {
            json: json,
            word: '',
            soluces: [],
            message: '',
            gamemode: false,
            helper: [],
            hint: true,
            stats: { win: 0, loss: 0, winstreak: 0, winloss: 0 }
        }
    },
    methods: {
        randomWord() {
            let index = Math.floor(Math.random() * this.json.length - 1)
            let badword = true
            while (badword) {
                if (
                    this.json[index].length > 4 &&
                    this.json[index].length < 8 &&
                    this.json[index] === this.json[index].toLowerCase()
                ) {
                    badword = false
                } else {
                    index = Math.floor(Math.random() * this.json.length - 1)
                }
            }
            let something = this.json[index]
            this.word = something
            this.helper = []
            for (let index = 0; index < this.word.length; index++) {
                const element = this.word[index]
                if (index == 0 || element == this.word[0]) {
                    this.helper.push(this.word[0])
                } else {
                    this.helper.push('*')
                }
            }
        },
        getSolucesGiven() {
            console.log(this.soluces)
        },
        launchGame() {
            this.gamemode = !this.gamemode
            this.soluces = []
            this.hint = true
            this.randomWord()
        },
        getHint() {
            if (this.hint) {
                if (confirm('Êtes-vous sur de vouloir un indice ?')) {
                    console.log('can hint')
                    this.hint = false
                    let badLetter = true,
                        randomLetterIndex
                    console.log(randomLetterIndex, this.word.length)
                    while (badLetter) {
                        randomLetterIndex = Math.floor(Math.random() * this.word.length)
                        console.log(randomLetterIndex)
                        if (this.helper[randomLetterIndex] == '*') {
                            badLetter = false
                        }
                    }
                    console.log(this.helper)
                    this.helper[randomLetterIndex] = this.word[randomLetterIndex].toUpperCase()
                }
            }
        },
        abandon() {
            if (confirm('Êtes-vous sur de vouloir abandonner ?')) {
                alert(`Vous avez perdu, le mot était ${this.word.toUpperCase()}`)
                localStorage.setItem('lose', this.stats.loss + 1 || 1)
                localStorage.setItem('winstreak', 0)
                this.updateStats()
                this.gamemode = false
            }
        },
        verifyWord() {
            if (this.message.length == this.word.length) {
                let temp = [],
                    tempword = this.word.split('')
                for (let index = 0; index < this.message.length; index++) {
                    if (this.word[index] == this.message[index]) {
                        tempword.splice(tempword.indexOf(this.message[index]), 1)
                        temp.push(2)
                    } else if (tempword.includes(this.message[index])) {
                        temp.push(1)
                        tempword.splice(tempword.indexOf(this.message[index]), 1)
                    } else {
                        temp.push(0)
                    }
                }
                this.soluces.push({ solucegiven: this.message, response: temp })
                if (this.message == this.word) {
                    alert(
                        `Vous avez gagné, le mot était ${this.word.toUpperCase()} trouvé en ${
                            this.soluces.length
                        }`
                    )
                    localStorage.setItem('win', this.stats.win + 1 || 1)
                    localStorage.setItem('winstreak', parseInt(this.stats.winstreak) + 1 || 1)
                    this.updateStats()
                    this.gamemode = false
                } else if (this.soluces.length == 7) {
                    alert(`Vous avez perdu, le mot était ${this.word.toUpperCase()}`)
                    localStorage.setItem('lose', this.stats.loss + 1 || 1)
                    localStorage.setItem('winstreak', 0)
                    this.updateStats()
                    this.gamemode = false
                }
                this.message = ''
            }
        },
        test() {
            console.log({
                winloss: localStorage.getItem('winloss') || 0,
                winstreak: localStorage.getItem('winstreak') || 0,
                win: localStorage.getItem('win') || 0,
                loss: localStorage.getItem('lose') || 0
            })
            console.log(this.helper, this.soluces)
        },
        ratio() {
            let ratio,
                win = parseInt(this.stats.win || 0),
                lose = parseInt(this.stats.loss || 0)
            ratio = win / (win + lose)
            localStorage.setItem('winloss', ratio)
            this.stats.winloss = ratio
            console.log(
                `Win => ${win}(${typeof win}),
Lose => ${lose}(${typeof lose}),
WinStreak => ${this.stats.winstreak}(${typeof this.stats.winstreak}),
Ratio => ${ratio}(${typeof ratio})`
            )
        },
        updateStats() {
            this.stats = {
                winloss: parseFloat(localStorage.getItem('winloss')) || 0,
                winstreak: parseInt(localStorage.getItem('winstreak')) || 0,
                win: parseInt(localStorage.getItem('win')) || 0,
                loss: parseInt(localStorage.getItem('lose')) || 0
            }
            this.ratio()
        }
    },
    watch: {
        message(value) {
            if (value.length == this.word.length) {
                this.verifyWord()
            }
        }
    },
    mounted() {
        if (
            localStorage.winloss == undefined ||
            localStorage.winstreak == undefined ||
            localStorage.win == undefined ||
            localStorage.lose == undefined
        ) {
            localStorage.setItem('winloss', 0)
            localStorage.setItem('winstreak', 0)
            localStorage.setItem('win', 0)
            localStorage.setItem('lose', 0)
        }
        this.updateStats()
    }
}
</script>

<template>
    <h1>MotuWeb</h1>
    <div class="homeishere" v-show="!gamemode">
        <button @click="launchGame" class="btn btn-primary">Commencer</button>
        <button @click="test" class="btn btn-danger">Test</button>
        <p>Vous avez gagné {{ stats.winstreak }} parties d'affilé</p>
        <p>Vous avez gagné {{ stats.win }} parties et perdu {{ stats.loss }} parties</p>
        <p>Rapport Gagné/Perdu de {{ stats.winloss }}</p>
    </div>
    <div class="gameishere" v-show="gamemode">
        <div class="game">
            <p class="theword">La longueur du mot est {{ word.length }}</p>
            <div class="helper soluces">
                <div class="word">
                    <div class="letter" v-for="item in this.helper" :key="item">
                        <div v-if="item == '*'" class="unknown">
                            {{ item.toUpperCase() }}
                        </div>
                        <div v-else class="good">
                            {{ item.toUpperCase() }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="soluces">
                <div class="word" v-for="item in this.soluces" :key="item">
                    <div class="letter" v-for="(letter, index) in item.solucegiven" :key="letter">
                        <div v-if="item.response[index] == 2" class="good">
                            {{ letter.toUpperCase() }}
                        </div>
                        <div v-else-if="item.response[index] == 1" class="inword">
                            {{ letter.toUpperCase() }}
                        </div>
                        <div v-else class="bad">
                            {{ letter.toUpperCase() }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="typezone">
                <div class="input-group">
                    <input
                        v-model="message"
                        v-on:keyup.enter="verifyWord"
                        type="text"
                        class="form-control"
                        placeholder="Proposez ici"
                        aria-label="Recipient's username with two button addons"
                    />
                    <button @click="abandon" class="btn btn-secondary" type="button">
                        Abandoner
                    </button>
                    <button @click="getHint" class="btn btn-secondary" type="button" v-if="hint">
                        Obtenir un indice
                    </button>
                    <button
                        @click="givehint"
                        class="btn btn-secondary"
                        type="button"
                        disabled
                        v-else
                    >
                        Obtenir un indice
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="bottom">
        <div class="littlebubble">
            <p>Fait avec ❤️ par <a href="https://github.com/BloomyInDev">Bloomy</a></p>
            <p><a href="https://github.com/BloomyInDev/MotuWeb">Code Source</a></p>
            <p>Version 1.4</p>
        </div>
    </div>
</template>
<style scoped>
.game {
    width: fit-content;
}
.soluces {
    border-style: solid;
    border-width: 2px;
    border-color: #888888;
    width: fit-content;
}
@media screen and (min-width: 600px) {
    .letter {
        width: 60px;
        height: 60px;
        font-size: 150%;
    }
    .word {
        height: 60px;
        width: fit-content;
        display: flex;
        justify-content: stretch;
    }
    .littlebubble {
        position: absolute;
        bottom: 2%;
        right: 1%;
        background: gray;
        padding: 10px;
        border-radius: 8px;
        width: fit-content;
        line-height: 0.2;
        text-align: center;
    }
    .littlebubble a {
        text-decoration: none;
        color: rgb(210, 210, 210);
    }
}
@media screen and (max-width: 600px) {
    .letter {
        width: 40px;
        height: 40px;
        font-size: 120%;
    }
    .word {
        height: 40px;
        width: fit-content;
        display: flex;
        justify-content: stretch;
    }
    .littlebubble {
        position: absolute;
        bottom: 0;
        background: gray;
        padding: 10px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        width: 100%;
        line-height: 0.2;
        text-align: center;
    }
    .littlebubble a {
        text-decoration: none;
        color: rgb(210, 210, 210);
    }
}
.good {
    background-color: #01be01;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bad {
    background-color: #ad0000;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.inword {
    background-color: #ff9100;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.unknown {
    background-color: #6d6d6d;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
