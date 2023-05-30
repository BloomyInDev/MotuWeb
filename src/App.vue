<script>
import json from './assets/words.json'
export default {
    data() {
        return {
            count: 0,
            json: json,
            word: '',
            soluces: [],
            message: ''
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
        },
        getSolucesGiven() {
            console.log(this.soluces)
        }
    },
    watch: {
        message(value) {
            if (value.length == this.word.length) {
                this.soluces.push(value)
                if (value == this.word) {
                    alert(`You won, the word was ${this.word}`)
                } else if (this.soluces.push == 6) {
                    alert(`You loose, the word was ${this.word}`)
                }
                this.message = ''
            }
        }
    },
    mounted() {
        this.randomWord()
    }
}
</script>

<template>
    <div class="gameishere">
        <p class="theword">Le mot est {{ word }}</p>
        <div class="soluces">
            <div class="word" v-for="item in this.soluces" :key="item">
                <div class="letter" v-for="(letter, index) in item" :key="letter">
                    <div v-if="letter == word[index]" class="good">{{ letter }}</div>
                    <div v-else-if="word.includes(letter)" class="inword">{{ letter }}</div>
                    <div v-else class="bad">{{ letter }}</div>
                </div>
            </div>
        </div>
        <div class="typezone">
            <button @click="randomWord">Random Word</button>
            <button @click="getSolucesGiven">Get Soluces</button>
            <input v-model="message" placeholder="Proposez ici" />
        </div>
    </div>
</template>
<style scoped>
.soluces {
    border-style: solid;
    border-width: 2px;
    border-color: #888888;
    width: fit-content;
}
.letter {
    width: 50px;
    height: 50px;
    font-size: 120%;
}
.word {
    height: 50px;
    width: fit-content;
    display: flex;
    justify-content: stretch;
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
</style>
