import React, { useContext, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { dataContext } from '../../context/UserContext'



const Signup = () => {
  
  let{userData,setUserData,getUserData}=useContext(dataContext)
  const navigate = useNavigate()

    const [ backendImage, setBackendImage]= useState()

const [input, setInput]= useState({
    name:"",
    userName:"",
    age:"",
    email:"",
    password:""

})
const handler = (e)=>{
    const {name, value}= e.target
  
  setInput((values)=>({...values,[name]:value}))
}

const handleSubmit = async(e)=>{
    e.preventDefault()
    try {

      let formData = new FormData()
      formData.append("name",input.name)
      formData.append("userName",input.userName)
      formData.append("age",input.age)
      formData.append("email",input.email)
      formData.append("password",input.password)
      if(backendImage){
        formData.append("profileImage",backendImage)
      }
      

        const {data} = await axios.post("http://localhost:6800/signup",formData,{
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
      })
      setUserData(data.user)
      await getUserData() 

     

      alert("Sign up successfull")
        navigate("/")
   
    //  await getUserData()

      // if(userData){

      //   navigate("/home")
      // }
     
          // console.log(data.user);
          

        
    } catch (error) {
      console.log(error);
      

      alert(error.response.data.message)

    } 
}

const handleImage = (e)=>{
    // console.log(e.target.files[0]);
    setBackendImage(e.target.files[0])
    
    
}



  return (
    <div>
     <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form className="d-grid gap-3" onSubmit={handleSubmit}>
          <input type="text" className="form-control" name='name' value={input.name} onChange={handler} placeholder="Name" required />
          <input type="text" className="form-control" name='userName' value={input.userName} onChange={handler} placeholder="Username" required />
          <input type="number" className="form-control" name='age' value={input.age} onChange={handler} placeholder="Age" required />
          <input type="email" className="form-control" name='email' value={input.email} onChange={handler} placeholder="Email" required />
          <input type="password" className="form-control mb-2" name='password' value={input.password}  onChange={handler} placeholder="Password" required/>
          <label htmlFor="imageUpload" className="form-label ps-2"><h6>Upload your image</h6></label>
          <input type="file" className="form-control" id="imageUpload" onChange={handleImage} required />
          <button type="submit" className="btn btn-primary ">Sign Up</button>
          <p className='mt-2 text-center' onClick={() => navigate("/login")}>Already have an account ? <Link className='text-primary'>Login</Link></p>

        </form>
      </div>
    </div>

    </div>
  )
}

export default Signup