import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import DetailView from './routes/DetailView'
import Layout from './routes/Layout'
import About from './components/About'
import Contact from './components/Contact'
import Blog from './components/Blog'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'


import { BrowserRouter, Route, Routes } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
      <Route path='/' element={<Dashboard />} />
      <Route path="about" element={<About />} />
      <Route path="blog" element={<Blog />} />
      <Route path="contact" element={<Contact />} />

    <Route index={false} path="#" element={<DetailView />} />
    </Route>
  </Routes>
 
  <Footer/>

</BrowserRouter>
)

// Path: cryptohustlelite\src\App.jsx
