import { useState } from 'react'
import Pokemonlist from './components/Pokemonlist';
import Teamslist from './components/Teamslist';
import Login from './components/Login';
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
          <Login />
          {/* <Teamslist /> */}
          {/* <Pokemonlist /> */}
        </main>
      </div>
    </>
  )
}

export default App
