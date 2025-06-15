import React, { useEffect } from 'react'
import  {Routes,Route, Navigate}from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home'
import Setting from './pages/Setting'
import SignIn from './pages/SignIn'
import Signup from './pages/Signup'
import Profile from './pages/Profile.jsx'
import { userAuthStore } from './store/useAuthStore.js'
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'
const App = () => {
  const{authUser,checkAuth,isCheckingAuth}=userAuthStore()
  const{theme}=useThemeStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  console.log(authUser);
  if(isCheckingAuth && !authUser){
    <Loader/>
  }
  
  return (
  <div data-theme={theme} className="min-h-screen bg-base-100">
  <Navbar/>
  <Routes>
    <Route path='/' element={authUser ?<Home/>:<Navigate to="/signin"/>}/>
    <Route path='/setting'element={<Setting/>}/>
    <Route path='/signin' element={!authUser ?<SignIn/>:<Navigate to="/"/>}/>
    <Route path='/signup' element={!authUser?<Signup/>:<Navigate to="/"/>}/>
    <Route path='/profile' element={authUser ? <Profile/>: <Navigate to="/signin"/>}/>
  </Routes>
  <Toaster/>
  </div>
  
  )
}

export default App


