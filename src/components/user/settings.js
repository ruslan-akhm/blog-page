import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import authService from "../../services/authService";
import postService from "../../services/postService";
import "./settings.css";

const Settings = () => {
  const {
    post,
    setPost,
    header,
    setHeader,
    avatar,
    setAvatar,
    bio,
    setBio,
    isLogged,
    setIsLogged,
    userID,
    setUserID
  } = useContext(PostContext);
  const [updatedBio, setUpdatedBio] = useState({ name: "", highlights: [], info: "" }); //show whatever is in our bio already
  const [message, setMessage] = useState();
  let history = useHistory();
  
  

  const inputChange = e => {
    if (e.target.name == "name" || e.target.name == "info") {
      setUpdatedBio({ ...updatedBio, [e.target.name]: e.target.value });
      return;
    }

    let arrayOfHighlights = updatedBio.highlights;

    if (e.target.name == "highlights1") {
      arrayOfHighlights[0] = e.target.value;
    } else if (e.target.name == "highlights2") {
      arrayOfHighlights[1] = e.target.value;
    } else if (e.target.name == "highlights3") {
      arrayOfHighlights[2] = e.target.value;
    }
    setUpdatedBio({ ...updatedBio, highlights: arrayOfHighlights });
  };

  const update = e => {
    console.log(updatedBio);
    e.preventDefault();
    postService.updateBio(updatedBio).then(data => {
      console.log(data);
      if (data.success) {
        setBio(updatedBio);
      }
    });

    setBio(updatedBio);
    //console.log(updatedBio);
  };

  //hadle Logout and clear all page data
  const logout = e => {
    e.preventDefault();
    console.log("LOGOUT HERE");
    authService.logout().then(data => {
      console.log(data);
      setMessage(data.message);
      setIsLogged(false);
      setPost([]);
      setHeader("");
      setAvatar("");
      setBio({ name: "", highlights: [], info: "" });
      setUserID("");
      setTimeout(() => {
        history.replace("/");
      }, 500);
    });
  };
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
          <input
            type="text"
            id="name"
            name="name"
            value={updatedBio.name || ""}
            onChange={inputChange}
          />
          <label>Highlight:</label>
          <input
            type="text"
            id="highlights1"
            name="highlights1"
            value={updatedBio.highlights[0] || ""}
            onChange={inputChange}
          />
          <label>Highlight:</label>
          <input
            type="text"
            id="highlights2"
            name="highlights2"
            value={updatedBio.highlights[1] || ""}
            onChange={inputChange}
          />
          <label>Highlight:</label>
          <input
            type="text"
            id="highlights3"
            name="highlights3"
            value={updatedBio.highlights[2] || ""}
            onChange={inputChange}
          />
          <label>Information:</label>
          <textarea
            name="info"
            onChange={inputChange}
            value={updatedBio.info || ""}
          ></textarea>
        </form>
        <button className="update" onClick={update}>
          Update
        </button>
        <div>{message}</div>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
