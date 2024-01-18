<script>
    export let act;
</script>

<button class="p-1 rounded-md bg-slate-500 text-white" on:click={act}>
    <slot />
</button>
