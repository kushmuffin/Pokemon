import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TrainerProvider } from './components/TrainerContext'; // 引入 TrainerProvider
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar'; // 引入組件
import TrainerForm from './components/TrainerForm'; // 引入組件
import Pokemon from './components/PokemonList'; // 引入組件
import Area from './components/Area'; // 引入組件
import Abilities from './components/AbilitiesList'; // 引入組件
import Moves from './components/MovesList'; // 引入組件

import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <TrainerProvider>
      <Router>
        <div className="App" style={{ display: 'flex', width: '100%' }}>
          <Sidebar />
          <Header />
          <main>
            <Routes>
              <Route path="/trainerform" element={<TrainerForm />} />
              <Route path="/pokemonlist" element={<Pokemon />} />
              <Route path="/area" element={<Area />} />
              <Route path="/abilities" element={<Abilities />} />
              <Route path="/moves" element={<Moves />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TrainerProvider>
  );
}

export default App
