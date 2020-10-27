import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import authService from "../../services/authService";
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
    setIsLogged
  } = useContext(PostContext);
  const [updatedBio, setUpdatedBio] = useState({
    name: "",
    highlights: [],
    info: ""
  });
  const [message, setMessage] = useState();
  let history = useHistory();

  //get user's settings/bio
  useEffect(() => {
    authService.getSettings().then(data => {
      if (data.success == false) {
        history.replace("/");
      }
      setUpdatedBio(data.settings);
    });
  }, []);

  //handle change of iinput fields and saving them into state
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

  //update users bio
  const update = e => {
    e.preventDefault();
    authService.postSettings(updatedBio).then(data => {
      console.log(data);
      if (data.success) {
        setBio(updatedBio);
        history.replace("/users/" + data.userID);
      }
    });
  };

  //handle Logout and clear all page data
  const logout = e => {
    e.preventDefault();
    authService.logout().then(data => {
      setMessage(data.message);
      setIsLogged(false);
      setPost([]);
      setHeader("");
      setAvatar("");
      setBio({ name: "", highlights: [], info: "" });
      setUpdatedBio({ name: "", highlights: [], info: "" });
      setTimeout(() => {
        history.replace("/");
      }, 500);
    });
  };

  return (
    <div>
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
          <button className="update" onClick={update}>
            Update
          </button>
        </form>
        <div style={{margin:"10px 0 10px 0"}}>{message}</div>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
