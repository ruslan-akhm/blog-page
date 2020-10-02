import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
import './auth.css'

const Login = () => {
  return(
    <div>
      <Navbar />
      <div className="auth-main">
        <h1>Login</h1>
        <form action="/login" method="POST">
          <div className="form-box">
            <label for='username'>Username:</label>
            <input type="text" id="username" name="username" required/>
            <label for='password'>Password:</label>
            <input type="text" id="password" name="password" required/>
            <input className="submit" type="submit" value="Login"/>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login