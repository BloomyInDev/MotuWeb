<script lang="ts">
    import Game from "./lib/pages/Game.svelte";
    import Home from "./lib/pages/Home.svelte";
    import { writable, get } from "svelte/store";
    const status = writable("home"); // This is to navigate in the website
</script>

<main class="bg-gradient-to-br from-blue-800 to-sky-500 min-h-screen p-2">
    <h1 class="text-4xl mb-2 text-center">MotuWeb</h1>

    <Home {status} />
    <Game {status} />

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
            <p>Version 2.1</p>
        </div>
    </div>
</main>
