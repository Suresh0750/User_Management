import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Loginpage from './pages/user/Loginpage.tsx'
import Navbar from './component/Navbar.tsx'
import Home from './pages/user/HomePage.tsx'
import SignUp from './pages/user/SignUp.tsx'


function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path='/login' element={<Loginpage/>}></Route>
        <Route path='/signUp' element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
