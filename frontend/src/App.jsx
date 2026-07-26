import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './app/Home'
import Login from './app/Login'
import Signin from './app/Signin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
    </Routes>
  )
}

export default App
