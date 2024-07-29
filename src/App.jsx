import { useState } from 'react'
import Pokemon from './components/Pokemon';
import './App.css'


function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Pokemon App</h1>
        </header>
        <main>
          <Pokemon />
        </main>
      </div>
    </>
  )
}

export default App
