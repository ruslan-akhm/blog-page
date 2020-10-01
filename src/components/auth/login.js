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
      </div>
      <form>
        
      </form>
      <Footer />
    </div>
  )
}

export default Login