import React, { useEffect, useState } from 'react'
import axios from "axios"

const Landingpage = () => {
  const [allData, setAllData] = useState([])
  // last user show in 
  const reverse =[].concat(allData).reverse()

  // get all user 
  const allUser = async()=>{
    const res = await axios.get("http://localhost:6800/landing")
    setAllData(res.data)
  }

  useEffect(()=>{
    allUser()
  },[])

  return (
    <div className='bg-dark' style={{minHeight:"100vh"}}>
      <div className="container-fluid" >
     
        {
          reverse.map((d,i)=>{
            return(
              <div className="row justify-content-center"  key={i}>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5 " style={{maxWidth:"400px"}}>
          <div className="card text-center shadow-sm bg-secondary text-white border border-warning  border-2">
            <img
              src={d.profileImage}
              className="rounded-circle mx-auto mt-4 border border-warning border-2"
              alt="Profile"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{d.name}</h5>
              <p className="card-text">{d.email}</p>
            </div>
          </div>
          </div>
        </div>
            )
          })
        }
     
    </div>
    </div>
  )
}

export default Landingpage