import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import authService from "../../services/authService";
import "./auth.css";

const Login = () => {
  const { isLogged, setIsLogged, userID, setUserID } = useContext(PostContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  let history = useHistory();

  const resetForm = () => {
    setUser({ email: "", password: "" });
  };

  const handleInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    authService.login(user).then(data => {
      setMessage(data.message);
      if (data.successLogin) {
        setIsLogged(true);
        setUserID(data.userID);
        history.replace("/users/" + data.userID);
      }
    });
  };

  return (
    <div>
      
      <div className="auth-main">
        <h1>Login</h1>
        <form onSubmit={login}>
          <div className="form-box">
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
            <input
              className="submit login-submit"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <div className="message">{message}</div>
        <p>
          Don't have an account yet? <Link to="/register">Register</Link>
        </p>
      </div>
     
    </div>
  );
};

export default Login;
