import { useState } from 'react'
import Pokemonlist from './components/Pokemonlist';
import Fruitslist from './components/Teamslist';
import './App.css'


function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Pokemon App</h1>
        </header>
        <main>
          <Fruitslist />
          {/* <Pokemonlist /> */}
        </main>
      </div>
    </>
  )
}

export default App
