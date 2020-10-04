import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import authService from "../../services/authService";
import "./auth.css";

const Register = () => {
  const [user, setUser] = useState({ username: "", email:"", password: "", password2:"" });
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setUser({ username: "", email:"", password: "", password2:"" });
  };

  const handleInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const register = e => {
    e.preventDefault();
    console.log(user);
    authService.register(user).then(data => {
      console.log(data);
      setMessage(data.message);
      if (!data.msgError) {
        setTimeout(() => {
          resetForm();
        }, 2000);
      }
    });
  };
  
  //action="/api/auth/register" method="POST"
  return (
    <div>
      <Navbar />
      <div className="auth-main">
        <h1>Register</h1>
        <form onSubmit={register}>
          <div className="form-box">
            <label for="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={e => handleInput(e)}
              required
            />
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={e => handleInput(e)}
              required
            />
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={e => handleInput(e)}
              required
            />
            <label for="password2">Confirm Password:</label>
            <input
              type="password"
              id="password2"
              name="password2"
              onChange={e => handleInput(e)}
              required
            />
            <input className="submit" type="submit" value="Register" />
          </div>
        </form>
        <div className="message">{message}</div>
        <p>Have an account? <Link to="/login">Login</Link></p>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
