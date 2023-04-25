import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Layout from './routes/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import PostView from './routes/PostView'
import Account from './pages/Account'
import PostViewPage from './pages/PostViewPage'

import { BrowserRouter, Route, Routes } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route
      className="flex flex-col justify-between h-screen"
      element={<Layout />}> 
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/account" element={<Account />} />

        {/* routes */}
        <Route path="/posts/:id" element={<PostViewPage />} />
      </Route>
    </Routes>

  </BrowserRouter>
)

// Path: cryptohustlelite\src\App.jsx
