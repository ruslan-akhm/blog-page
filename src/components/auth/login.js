import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import authService from "../../services/authService";
import "./auth.css";

const Login = () => {
  const { isLogged, setIsLogged } = useContext(PostContext);
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
    //let { from } = { from: { pathname: "/register" } };
    e.preventDefault();
    //console.log(user);
    authService.login(user).then(data => {
      //console.log(data);
      setMessage(data.message);
      if (data.successLogin) {
        setIsLogged(true);
        //console.log(from)
        history.replace("/"+data.userID);
      }
      // if (!data.msgError) {
      //   setTimeout(() => {
      //     resetForm();
      //   }, 2000);
      // }
    });
  };
  //action="/login" method="POST"
  return (
    <div>
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default Login;
