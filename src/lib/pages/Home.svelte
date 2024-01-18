<script>
    // Enabling TS don't work in this file for whatever reason, so use JSDoc instead

    import { get } from "svelte/store";
    import Button from "../components/Button.svelte";

    /** @type {import('svelte/store').Writable<string>} */
    export let status;
    let statusData = "";
    status.subscribe((/** @type {string} */ val) => {
        statusData = val;
    });
    $: classes = `${statusData == "home" ? "" : "hidden"}`;
</script>

<div class={classes}>
    <div class="flex justify-center flex-col items-center">
        <Button
            act={() => {
                status.set("game");
            }}>Commencer</Button
        >
    </div>
</div>
