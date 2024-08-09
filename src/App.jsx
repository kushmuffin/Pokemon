import { useState } from 'react'
import Pokemonlist from './components/Pokemonlist';
import Teamslist from './components/Teamslist';
import './App.css'


function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          {/* <h1>NBA player from nation</h1> */}
        </header>
        <main>
          <Teamslist />
          {/* <Pokemonlist /> */}
        </main>
      </div>
    </>
  )
}

export default App
