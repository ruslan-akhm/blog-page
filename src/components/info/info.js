import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import postService from "../../services/postService";
import "./info.css";

function Info(props) {
  const { avatar, setAvatar, bio, setBio } = useContext(PostContext);
  const { user } = useParams();
  console.log(user);
  const [isAuthor, setIsAuthor] = useState();

  useEffect(() => {
    setIsAuthor(props.isAuthor);
  }, [props]);

  const updateAvatar = (e, user) => {
    e.preventDefault();
    let fd = new FormData();
    let avatarImage = document.getElementById("avatarfile").files[0];
    fd.append("avatarfile", avatarImage);
    console.log(fd);
    console.log(user);
    fd.append("avatarfile", user);
    
    postService.updateAvatar(fd).then(data => {
      console.log(data);
      setAvatar(data.avatar);
    });
  };

  let highlights = bio.highlights.map(item => <li>{item}</li>) || null;

  return (
    <div id="info">
      <div id="avatar">
        <img id="avatar-img" src={avatar} alt="avatar" />
        {isAuthor ? (
          <input
            name="avatarfile"
            id="avatarfile"
            type="file"
            className="custom-input"
            accept="image/*"
            onChange={e => updateAvatar(e)}
          />
        ) : null}
      </div>
      <div id="bio">
        <ul id="bio-list">
          <h1>{bio.name}</h1>
          {highlights}
          {/* <li>Cyber Engineer</li>
          <li>R2D2 fan</li>
          <li>Toronto, ON</li> */}
        </ul>
      </div>
      <p>{bio.info}</p>
    </div>
  );
}

export default Info;
