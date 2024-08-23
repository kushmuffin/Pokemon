import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar'; // 引入組件
import TrainerForm from './components/TrainerForm'; // 引入組件
import PokemonList from './components/PokemonList'; // 引入組件
import { TrainerProvider } from './components/TrainerContext'; // 引入 TrainerProvider

import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <TrainerProvider>
      <Router>
        <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
          <Sidebar />
          <Header />
          <main style={{ flex: 1, marginLeft: '250px' }}>
            <Routes>
              <Route path="/trainer-form" element={<TrainerForm />} />
              <Route path="/pokemon-list" element={<PokemonList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TrainerProvider>
  );
}

export default App
