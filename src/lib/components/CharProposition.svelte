<script lang="ts">
    export let char: string;
    export let status: number;
    let bgCol = "bg-gray-500";
    if (status == 0) bgCol = "bg-red-500";
    else if (status == 1) bgCol = "bg-orange-500";
    else if (status == 2) bgCol = "bg-green-500";
</script>

<div
    class={`h-10 w-10 lg:w-14 lg:h-14 xl:w-20 xl:h-20 ${bgCol} flex justify-center items-center`}
>
    <p class="lg:text-xl xl:text-2xl">{char.toUpperCase()}</p>
</div>
