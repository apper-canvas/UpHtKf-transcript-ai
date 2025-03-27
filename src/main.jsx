import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { PlaylistProvider } from './context/PlaylistContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaylistProvider>
        <App />
      </PlaylistProvider>
    </BrowserRouter>
  </React.StrictMode>,
)