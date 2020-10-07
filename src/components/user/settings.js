import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import authService from "../../services/authService";
import "./settings.css";

const Settings = () => {
  const { isLogged, setIsLogged, bio, setBio } = useContext(PostContext);
  let history = useHistory();
  
  
  //TURN THIS ON LATER
  // useEffect(()=>{
  //   if(!isLogged){
  //     history.replace("/");
  //   }
  // },[])
  

  const inputChange = (e) =>{
    if(e.target.name=="highlights1"){
      setBio({...bio.highlights[0]})
    }
    setBio({...bio,[e.target.name] : e.target.value});
    
  }
  
  const onClick = () =>{
    console.log(bio)
  }
  //   let history = useHistory();

  //   const resetForm = () => {
  //     setUser({ email: "", password: "" });
  //   };

  //   const handleInput = e => {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   };

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
    //});
  };

  let highlights = bio.highlights.map(item => {
    return item;
  });

  return (
    <div>
      <Navbar />
      <div className="settings-main">
        <h1>Settings</h1>
        <form>
          <label>Name:</label>
          <input type="text" id="name" name="name" value={bio.name || null} onChange={inputChange}/>
          <label>Highlight:</label>
          <input
            type="text"
            id="highlights1"
            name="highlights1"
            value={highlights[0] || null}
            onChange={inputChange}
          />
          <label>Highlight:</label>
          <input
            type="text"
            id="highlights2"
            name="highlights2"
            value={highlights[1] || null}
            onChange={inputChange}
          />
          <label>Highlight:</label>
          <input
            type="text"
            id="highlights3"
            name="highlights3"
            value={highlights[2] || null}
            onChange={inputChange}
          />
          <label>Information:</label>
          <textarea name="info" onChange={inputChange}></textarea>
        </form>
        <button onClick={onClick}>Logout</button>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
