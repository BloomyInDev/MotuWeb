import { render } from 'preact'
import { LocationProvider, Router, Route } from 'preact-iso'

import { Home } from './pages/Home/index.jsx'
import { Game } from './pages/Game/index.jsx'
import { NotFound } from './pages/_404.jsx'
import './style.css'

export function App() {
    return (
        <LocationProvider>
            <h1 class="text-4xl mb-2 text-center">MotuWeb</h1>
            <main>
                <Router>
                    <Route path="/" component={Home} />
                    <Route path="/game" component={Game} />
                    <Route default component={NotFound} />
                </Router>
            </main>
            <div class="absolute bottom-1 right-1">
                <div class="bg-gray-500 p-2 rounded-lg text-center">
                    <p>
                        Fait avec ❤️ par
                        <a
                            href="https://github.com/BloomyInDev"
                            class="text-gray-300 before:content-['_']"
                        >
                            Bloomy
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://github.com/BloomyInDev/MotuWeb"
                            class="text-gray-300"
                        >
                            Code Source
                        </a>
                    </p>
                    <p>Version 2.0</p>
                </div>
            </div>
        </LocationProvider>
    )
}

render(<App />, document.getElementById('app'))
