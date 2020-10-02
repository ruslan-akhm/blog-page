import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
import authService from '../../services/authService'
import './auth.css'

const Register = () => {
  
  const [user, setUser] = useState({username:"", password:""})
  const [message, setMessage] = useState("");
  
  const resetForm = () => {
    setUser({username:"", password:""})
  }
  
  const handleInput = e => {
    setUser({...user,[e.target.name] : e.target.value});
  }
  
  const register = e => {
    e.preventDefault();
    console.log(user)
    authService.register(user).then(data=>{
      console.log(data);
      setMessage(data.message)
      if(!data.msgError){
        setTimeout(()=>{
          resetForm();
        },2000)
      }
      
    })
  
  }
  //action="/api/auth/register" method="POST"
  return(
    <div>
      <Navbar />
      <div className="auth-main">
        <h1>Register</h1>
        <form onSubmit={register}>  
          <div className="form-box">
            <label for='username'>Username:</label>
            <input type="text" id="username" name="username" onChange={(e)=>handleInput(e)} required/>
            <label for='password'>Password:</label>
            <input type="text" id="password" name="password" onChange={(e)=>handleInput(e)}  required/>
            <input className="submit" type="submit" value="Register"/>
          </div>
        </form >
        <div className="message">{message}</div>
      </div>
      <Footer />
    </div>
  )
}

export default Register