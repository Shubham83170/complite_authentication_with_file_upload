import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const SingleUser = () => {
     const [allData, setAllData] = useState(null)
    //   const reverse =[].concat(allData).reverse()
    const navigate = useNavigate()
    
      const allUser = async()=>{
        const res = await axios.get("http://localhost:6800/landing")
        const User= res.data
       

        setAllData(User[User.length - 1])
      }
     
      const logOut =async()=>{
        await axios.post("http://localhost:6800/logout")
      }
      useEffect(()=>{
        allUser()
      },[])
    return (
        <div className='bg-dark' style={{minHeight:"100vh"}}>
          <div className="container-fluid" >
         
          {
            allData?(<div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5 " style={{maxWidth:"400px"}} >
            <div className="card text-center shadow-sm bg-secondary text-white border border-warning  border-2">
              <img
                src={allData.profileImage}
                className="rounded-circle mx-auto mt-4 border border-warning border-2"
                alt="Profile"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{allData.name}</h5>
                <p className="card-text">{allData.email}</p>
              </div>
              <button type="button" className="btn btn-success" onClick={()=>navigate("/landingpage")}>all users</button>
              <button type="button" className="btn btn-danger" onClick={()=>logOut()}>log out</button>
            </div>
         
            </div>
          </div>): <p className="text-white text-center pt-5">Loading...</p>
          }
         
        </div>
        </div>
      )
}

export default SingleUser