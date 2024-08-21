import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Sidebar from './components/Sidebar'; // 引入組件
import TrainerForm from './components/TrainerForm'; // 引入組件
import PokemonList from './components/PokemonList'; // 引入組件

import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', 'flex-direction': 'column' }}>
        <Sidebar />
        <header className="App-header">
          {/* <h1>Pokemon!</h1> */}
        </header>
        <main style={{ flex: 1, 'margin-left': '250px' }}>
          <Routes>
            <Route path="/trainer-form" element={<TrainerForm />} />
            <Route path="/pokemon-list" element={<PokemonList />} />
            {/* <PokemonList /> */}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
