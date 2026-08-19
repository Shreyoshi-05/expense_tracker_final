import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './app/Home'
import Login from './app/Login'
import Signin from './app/Signin'
import Nav from './app/Nav'
import Add from './app/Add'
import Pay from './app/Pay'
import Contact from './app/Contact'

function App() {
  const [count, setCount] = useState(0);
  const hideNavRoutes = ["/login", "/signin", "/contact"];

  return (
    <>
    {!hideNavRoutes.includes(location.pathname) && <Nav />}
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/add" element={<Add />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/pay" element={<Pay />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
    </Routes>
    </>
  )
}

export default App
