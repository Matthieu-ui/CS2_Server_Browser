import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Layout from './routes/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import PostView from './pages/PostView'



import { BrowserRouter, Route, Routes } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/postview/:id" element={<PostView />} />
      </Route>

    

    </Routes>

  </BrowserRouter>
)

// Path: cryptohustlelite\src\App.jsx
