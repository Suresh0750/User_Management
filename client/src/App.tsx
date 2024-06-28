import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Loginpage from './pages/user/Loginpage.tsx'
import Navbar from './component/Navbar.tsx'
import Home from './pages/user/HomePage.tsx'
import SignUp from './pages/user/SignUp.tsx'
import ProfilePage from './pages/user/ProfilePage.tsx'
import AdminLogin from './pages/admin/AdminLogin.tsx'
import Dashboard from './pages/admin/Dashboard.tsx'


function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path='/login' element={<Loginpage/>}></Route>
        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/profile' element={<ProfilePage/>} ></Route>
        <Route path="/AdminLogin" element ={<AdminLogin/>} ></Route>
        <Route path="/Dashboard" element = {<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
