'use client'
import React, { useState, useContext } from 'react'
import { TrainerContext } from './TrainerContext'
import greatball from '../assets/greatball.png'

const Login = () => {
  const { setTrainerName } = useContext(TrainerContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
  if (username === 'ash' && password === 'pikachu') {
    localStorage.setItem('isLoggedIn', 'true')
    window.location.reload() // 讓 App.jsx 重新渲染主畫面
  } else {
    setError('帳號或密碼錯誤')
  }
}

  return (
    <div className="login-bg">
      <div className="login-card">
        <img src={greatball} alt="Logo" className="login-logo" />
        <h2 className="login-title">Pokemon Trainer Login</h2>
        <p className="login-desc">請輸入您的訓練家帳號與密碼</p>
        {error && <p className="logo-pwd-error">{error}</p>}
        <div className="login-input-wrap">
          <span className="login-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="帳號"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="login-input-wrap">
          <span className="login-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A4.75 4.75 0 007.75 6.75v3.75m8.75 0a2.25 2.25 0 11-4.5 0m4.5 0h-4.5m0 0V6.75m0 3.75a2.25 2.25 0 11-4.5 0m4.5 0h-4.5" />
            </svg>
          </span>
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>
        <button
          onClick={handleLogin}
          className="login-btn"
        >
          登入
        </button>
        <div className="login-hint">預設帳號：ash  密碼：pikachu</div>
      </div>
    </div>
  )
}

export default Login
