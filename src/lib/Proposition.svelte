<script lang="ts">
    import type { WordProposition } from "../lib/words";
    import CharProposition from "./CharProposition.svelte";
    export let word: WordProposition;
</script>

<div class="flex flex-row border-white border-2 border-b-0 w-fit">
    {#each word.word as char}
        <CharProposition char={char.char} status={char.status} />
    {/each}
</div>
