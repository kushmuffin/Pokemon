import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { TrainerProvider } from './components/TrainerContext'
import Login from './components/Login'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import TrainerForm from './components/TrainerForm'
import Pokemon from './components/Pokemonlist'
import Area from './components/Area'
import Abilities from './components/AbilitiesList'
import Moves from './components/MovesList'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
  }, [])

  return (
    <TrainerProvider>
      {isLoggedIn ? (
        <Router>
          <div className="App ">
            <Sidebar />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<TrainerForm />} />
                <Route path="/trainerform" element={<TrainerForm />} />
                <Route path="/pokemon" element={<Pokemon />} />
                <Route path="/area" element={<Area />} />
                <Route path="/abilities" element={<Abilities />} />
                <Route path="/moves" element={<Moves />} />
              </Routes>
            </main>
          </div>
        </Router>
      ) : (
        <Login />
      )}
    </TrainerProvider>
  )
}

export default App
