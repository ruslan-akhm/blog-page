import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import authService from "../../services/authService";
import "./auth.css";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  
  const [message, setMessage] = useState("");
  let history = useHistory();

  const resetForm = () => {
    setUser({ username: "", email: "", password: "", password2: "" });
  };

  const handleInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const register = e => {
    e.preventDefault();
    authService.register(user).then(data => {
      setMessage(data.message);
      if (!data.error) {
        setTimeout(() => {
          resetForm();
          history.replace("/login");
        }, 2000);
      }
    });
  };

  return (
    <div>
      <div className="auth-main">
        
        <form onSubmit={register}>
          <div className="form-box">
            <h3>Register a new account</h3>
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
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
