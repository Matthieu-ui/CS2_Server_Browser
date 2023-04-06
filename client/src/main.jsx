import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import DetailView from './routes/DetailView'
import Layout from './routes/Layout'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'


import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index={true} element={<App />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route index={false} path="#" element={<DetailView />} />
  </Routes>
 
  <Footer/>

</BrowserRouter>
)

// Path: cryptohustlelite\src\App.jsx
