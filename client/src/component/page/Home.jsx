import React, { useContext } from 'react'
import { dataContext } from '../context/UserContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Home = () => {

    let {userData,setUserData,serverUrl,getUserData}=useContext(dataContext)
    let navigate= useNavigate()
    
    // for log out
    const logOut = async()=>{
      try {
        await axios.post(serverUrl + "/logout",{},{
          withCredentials:true //withCredentials se hmara jwt token cookies me save hota h
        })
        setUserData(null)
        getUserData()
      } catch (error) {
        console.log(error);
        
      }
     
    }
    return (
      <div className='bg-dark' style={{minHeight:"100vh"}}>
        <div className="container-fluid" >
       
        <div className="row d-flex justify-content-center"   >
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5 " style={{maxWidth:"400px"}} >
          <div className="card text-center shadow-sm bg-secondary text-white border border-warning  border-2">
            <img
              src={userData.profileImage}
              className="rounded-circle mx-auto mt-4 border border-warning border-2"
              alt="Profile"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{userData.name}</h5>
              <p className="card-text">{userData.email}</p>
            </div>
       <div className='d-flex align-iten-center justify-content-center gap-3 mb-3'>
       <button type="button" className="btn btn-success" onClick={()=>navigate("/landingpage")}>all users</button>
       <button type="button" className="btn btn-danger" onClick={()=>logOut()}>log out</button>
       </div>
          </div>
       
          </div>
        </div>
       
      </div>
      </div>
    )
}

export default Home