import { useState } from 'react'
import './App.css'
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import Loginpage from './pages/user/Loginpage.tsx'
import Navbar from './component/Navbar.tsx'
import Home from './pages/user/HomePage.tsx'
import SignUp from './pages/user/SignUp.tsx'
import ProfilePage from './pages/user/ProfilePage.tsx'
import AdminLogin from './pages/admin/AdminLogin.tsx'
import Dashboard from './pages/admin/Dashboard.tsx'
import AddUser from './pages/admin/AddUser.tsx'
import AdminEdit from './pages/admin/AdminEdit.tsx'
import {  useSelector } from 'react-redux'
import UserProtect from './pages/UserProduct.tsx'




function App() {
  
  const userLogOut = useSelector((state: any) => state?.user?.userLogOut);
  const adminLogOut = useSelector((state: any) => state?.admin?.adminLogout);
  console.log(userLogOut)

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path='/login' element={!userLogOut ? <Loginpage/>: <Navigate to={"/profile"} />}></Route>
        <Route path='/signUp' element={!userLogOut ? <SignUp/> : <Navigate to={"/profile"}/>}> </Route>
        <Route path='/profile' element={userLogOut ? <ProfilePage/>: <Navigate to={"/login"} />} />
        <Route path="/AdminLogin" element ={!adminLogOut ? <AdminLogin/> :<Navigate to ={"/Dashboard"}/>} ></Route>
        <Route path="/Dashboard" element = {adminLogOut ? <Dashboard/> : <Navigate to={"/AdminLogin"}/>}></Route>
        <Route path="/addUser" element={<AddUser/>}></Route>
        <Route path="/editUser" element={<AdminEdit/>} ></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
