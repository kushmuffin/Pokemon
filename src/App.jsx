import { useState } from 'react'
import Pokemonlist from './components/Pokemonlist';
import Login from './components/Login';
import TeamsOverview from './components/TeamsOverview';
import PlayersList from './components/PlayersList';
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
          <TeamsOverview />
          <PlayersList />
          {/* <Pokemonlist /> */}
        </main>
      </div>
    </>
  )
}

export default App
