import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './app/Home'
import Login from './app/Login'
import Signin from './app/Signin'
import Nav from './app/Nav'
import Add from './app/Add'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/add" element={<Add />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
    </Routes>
    </>
  )
}

export default App
