import { useState } from 'react'
import Pokemonlist from './components/Pokemonlist';
import './App.css'


function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Pokemon App</h1>
        </header>
        <main>
          <Pokemonlist />
        </main>
      </div>
    </>
  )
}

export default App
