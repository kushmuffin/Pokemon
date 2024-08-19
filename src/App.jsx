import { useState } from 'react'
import PokemonList from './components/PokemonList';
import Login from './components/Login';
import TeamsOverview from './components/nbabackpu/TeamsOverview';
import PlayersList from './components/nbabackpu/PlayersList';
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          {/* <h1>NBA player from nation</h1> */}
        </header>
        <main>
          {/* <Login /> */}
          {/* <TeamsOverview /> */}
          {/* <PlayersList /> */}
          <PokemonList />
        </main>
      </div>
    </>
  )
}

export default App
