import React, { useEffect, useState } from 'react'
import './App.css'
import 'vite/modulepreload-polyfill'
import Landing from './components/landing'

const App = () => {

  const [backendData, setBackendData] = useState([{}])

  //use effect to fetch data from backend server
  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        setBackendData(data)
      })

  }, [])



  // if backendData.users is true, then map through the array and return a div for each user

  return (
    <div>
      <Landing />

      <div className="flex flex-col justify-center items-center bg-slate-900 p-5 drop-shadow-xl">
      <p className="font-thin ">Node + Express + React + Vite + TailwindCSS - A simple boilerplate for a full stack application.</p>

  </div>
      <div className='pt-5 font-mono'>
        {(backendData.uses) ? backendData.uses.map((uses, index) => {
          return <div key={index}>{uses}</div>
        }) : <div>loading...</div>
        }
      </div>
    </div>
  );
}

export default App