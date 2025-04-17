import React, { createContext, useContext, useEffect, useState } from 'react'
import{BrowserRouter,Routes,Route, useNavigate, } from "react-router-dom"
import Signup from './component/auth/signup/Signup'
import Login from './component/auth/login/Login'
import Landingpage from './component/page/Landingpage'
import SingleUser from './component/page/SingleUser'
import Home from './component/page/Home'
import axios from "axios"
import { dataContext } from './component/context/UserContext'
// import "./App.css"



const App = () => {


  let{userData,setUserData,loading}=useContext(dataContext)
  if (loading) {
    return <h4 className='text-center mt-5 pt-5'>Loading...</h4>; // or a spinner
  }
  return (
    
   
   <Routes>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/landingpage' element={<Landingpage/>}/>
   
    <Route path='/' element={userData?<Home/>:<Login/>}/>
   </Routes>
   
   
  
  
  )
}

export default App