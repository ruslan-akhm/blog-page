import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import authService from "../../services/authService";
import "./settings.css";

const Settings = () => {
  const { isLogged, setIsLogged, bio, setBio } = useContext(PostContext);
  const [updatedBio, setUpdatedBio] = useState(bio);
  let history = useHistory();
  
  
  //TURN THIS ON LATER
  // useEffect(()=>{
  //   if(!isLogged){
  //     history.replace("/");
  //   }
  // },[])
  

  const inputChange = (e) =>{
    console.log(updatedBio)
    if(e.target.name=="highlights1"){
      setUpdatedBio({...bio.highlights[0] = e.target.value})
    }
    else if(e.target.name=="highlights2"){
      setUpdatedBio({...bio.highlights[1] = e.target.value})
    }
    else if(e.target.name=="highlights3"){
      setUpdatedBio({...bio.highlights[2] = e.target.value})
    }
    else
      setUpdatedBio({...bio,[e.target.name] : e.target.value});
  }
  
  const update = () => {
    setBio(updatedBio);
    console.log(updatedBio)
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
          <input type="text" id="name" name="name" value={bio.name || ""} onChange={inputChange}/>
          <label>Highlight:</label>
          <input
            type="text"
            id="highlights1"
            name="highlights1"
            value={bio.highlights[0] || ""}
            onChange={inputChange}
          />
          <label>Highlight:</label>
          <input
            type="text"
            id="highlights2"
            name="highlights2"
            value={bio.highlights[1] || ""}
            onChange={inputChange}
          />
          <label>Highlight:</label>
          <input
            type="text"
            id="highlights3"
            name="highlights3"
            value={bio.highlights[2] || ""}
            onChange={inputChange}
          />
          <label>Information:</label>
          <textarea name="info" onChange={inputChange} value={bio.info || ""}></textarea>
        </form>
        <button className="update" onClick={update}>Update</button>
        <button className="logout" onClick={onClick}>Logout</button>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;