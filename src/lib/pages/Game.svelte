<script lang="ts">
    import {
        firstWord,
        randomWord,
        newCheckWord,
        normalizeWord,
    } from "../words";
    import type { WordProposition } from "../words";
    import Proposition from "../components/Proposition.svelte";
    import type { Writable } from "svelte/store";
    import { get } from "svelte/store";
    import { updateStat } from "../libs";

    export let status: Writable<string>;
    let statusData = "";
    status.subscribe((val: string) => {
        statusData = val;
    });
    $: classes = `${statusData == "game" ? "" : "hidden"}`;

    const wordToTrove = randomWord();
    let propositionList: WordProposition[] = [];
    $: firstRow = firstWord(propositionList, wordToTrove);
    let input = "";
    const addWord = () => {
        let propositionGiven = input;
        input = "";
        propositionList.push(
            newCheckWord(
                wordToTrove,
                normalizeWord(propositionGiven.toLowerCase()),
            ),
        );

        console.log(propositionList);
        if (propositionList.at(-1).valid) {
            alert(
                `Vous avez gagné, le mot était ${wordToTrove.toUpperCase()} trouvé en ${
                    propositionList.length
                }`,
            );
            updateStat("win", 1);
        } else if (propositionList.length == 6) {
        }
    };
    $: input.length == wordToTrove.length && addWord();
    $: nbPropositions = propositionList.length;
    console.log(wordToTrove);
</script>

<div class={classes}>
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
</div>
