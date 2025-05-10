import React, { createContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

export const dataContext = createContext()
const UserContext = ({ children }) => {
    let navigate= useNavigate()
    const [loading, setLoading] = useState(true);
    const [userData,setUserData]= useState(null)
    const serverUrl ="http://localhost:6800"

    // get user for authenticate
    const getUserData=async()=>{
        try {
            let {data} = await axios.get(serverUrl + "/getuserdata",{
                withCredentials:true
            })
          setUserData(data)
        } catch (error) {
            navigate("/login")
       
            console.log(error);
            
        }finally {
            setLoading(false); // done loading regardless of success or fail
          }

    }
    const value ={
        serverUrl,userData,setUserData,getUserData,loading
    }

    useEffect(()=>{
getUserData()
    },[])

    return (
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    )
}

export default UserContext