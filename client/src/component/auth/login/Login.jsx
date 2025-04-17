import React, { useContext, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { dataContext } from '../../context/UserContext';
// import { dataContext } from '../../../App';


const Login = () => {

    let{userData,setUserData,getUserData}=useContext(dataContext)
  
  const navigate = useNavigate()

  const [logData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const handler = (e) => {
    const { name, value } = e.target
    setLoginData((values) => ({ ...values, [name]: value }))

  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const {data} = await axios.post("http://localhost:6800/login", logData,{
        withCredentials: true
      })
     
      
      // console.log(data.message);
      if(data.message){

        alert(data.message)
      }else{
        alert("login successful")
      }
      
      setUserData(data.user)
      await getUserData()

      // alert("login successful")
     
        navigate("/")
      

    } catch (error) {

      console.log(error);
      // alert(error.response.data.message)
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Log In</h2>
          <form className="d-grid gap-3" onSubmit={handleSubmit}>

            <input type="email" className="form-control" name='email' value={logData.email} onChange={handler} placeholder="Email" required />
            <input type="password" className="form-control mb-2" name='password' value={logData.password} onChange={handler} placeholder="Password" required />

            <button type="submit" className="btn btn-primary ">Log In</button>
            <p className='mt-3 text-center' onClick={()=>navigate("/signup")}>Want to create new account ? <Link className='text-primary'>Sign Up</Link></p>

          </form>
        </div>
      </div>

    </div>
  )
}

export default Login