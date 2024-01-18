<script lang="ts">
    import { firstWord, randomWord, newCheckWord } from "./lib/words";
    import type { WordProposition } from "./lib/words";
    import Proposition from "./lib/Proposition.svelte";
    const wordToTrove = randomWord();
    let propositionList: WordProposition[] = [];
    $: firstRow = firstWord(propositionList, wordToTrove);
    let input = "";
    const addWord = () => {
        let propositionGiven = input;
        input = "";
        propositionList.push(newCheckWord(wordToTrove, propositionGiven));

        console.log(propositionList);
    };
    $: input.length == wordToTrove.length && addWord();
    $: nbPropositions = propositionList.length;
    console.log(wordToTrove);
</script>

<main class="bg-gradient-to-br from-blue-800 to-sky-500 min-h-screen p-2">
    <h1 class="text-4xl mb-2 text-center">MotuWeb</h1>

    <div class="flex justify-center flex-col items-center">
        <div class="w-fit border-b-2 border-white m-2">
            <Proposition word={firstRow} />
            {#key input}
                {#each propositionList as proposition}
                    <Proposition word={proposition} />
                {/each}
            {/key}
        </div>
        <div
            class="w-full flex flex-col m-2 justify-center items-center max-w-lg mx-0"
        >
            <input
                class="m-1 p-1 bg-white text-black max-w-lg w-full rounded-lg"
                type="text"
                bind:value={input}
            />
            <div
                class="max-w-lg w-full flex flex-col justify-center items-center"
            >
                <button
                    class="m-1 p-1 border-white border-2 bg-slate-500 text-white w-full rounded-lg"
                >
                    Indice ?
                </button>
                <button
                    class="m-1 p-1 border-white border-2 bg-slate-500 text-white w-full rounded-lg"
                >
                    Abandon
                </button>
            </div>
        </div>
    </div>

    <div class="absolute bottom-1 right-1">
        <div class="bg-gray-500 p-2 rounded-lg text-center text-gray-300">
            <p>
                Fait avec ❤️ par
                <a
                    href="https://github.com/BloomyInDev"
                    class="text-gray-200 before:content-['_']"
                >
                    Bloomy
                </a>
            </p>
            <p>
                <a
                    href="https://github.com/BloomyInDev/MotuWeb"
                    class="text-gray-200"
                >
                    Code Source
                </a>
            </p>
            <p>Version 2.0</p>
        </div>
    </div>
</main>
