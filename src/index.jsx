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
        </LocationProvider>
    )
}

render(<App />, document.getElementById('app'))
