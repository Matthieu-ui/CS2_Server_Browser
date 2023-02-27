import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <main className='bg-slate-600 min-h-screen flex flex-col drop-shadow-lg'>
      <App />
    </main>
  </React.StrictMode>,
)
