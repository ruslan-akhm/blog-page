import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import authService from "../../services/authService";
import "./auth.css";

const Settings = () => {
  const { isLogged, setIsLogged } = useContext(PostContext);
  const 

  let history = useHistory();

  const resetForm = () => {
    setUser({ email: "", password: "" });
  };

  const handleInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateSettings = e => {
    //let { from } = { from: { pathname: "/register" } };
    // e.preventDefault();
    // console.log(user);
    // authService.login(user).then(data => {
    //   console.log(data);
    //   setMessage(data.message);
    //   if (data.successLogin) {
    //     setIsLogged(true);
    //     //console.log(from)
    //     history.replace("/");
    //   }
      // if (!data.msgError) {
      //   setTimeout(() => {
      //     resetForm();
      //   }, 2000);
      // }
    });
  };
  
  return (
    <div>
      <Navbar />
      <div className="settings-main">
        <h1>Settings</h1>
        
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
