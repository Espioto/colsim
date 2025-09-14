import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import GameProvider from './context/GameContext.jsx'
import './main.css' // Assuming this is your primary global CSS

// Determine the base path based on the environment
const basename = import.meta.env.DEV ? '/' : '/colsim'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <GameProvider>
        <App />
      </GameProvider>
    </BrowserRouter>
  </React.StrictMode>
)