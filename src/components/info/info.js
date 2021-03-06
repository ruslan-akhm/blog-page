import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import postService from "../../services/postService";
import "./info.css";

function Info(props) {
  const { avatar, setAvatar, bio, setBio } = useContext(PostContext);
  const { user } = useParams();
  const [isAuthor, setIsAuthor] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {
    setUserID(user);
  }, []);

  useEffect(() => {
    setIsAuthor(props.isAuthor);
  }, [props]);

  const updateAvatar = e => {
    e.preventDefault();
    let fd = new FormData();
    let avatarImage = document.getElementById("avatarfile").files[0];
    fd.append("avatarfile", avatarImage);
    fd.append("avatarfile", userID);
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
          <label className="avatar-label"><input
            name="avatarfile"
            id="avatarfile"
            type="file"
            accept="image/*"
            onChange={e => updateAvatar(e)}
          /><span>Edit</span></label>
        ) : null}
      </div>
      <h1>{bio.name}</h1>
      <div id="bio">
        <ul id="bio-list">{highlights}</ul>
      </div>
      <p>{bio.info}</p>
    </div>
  );
}

export default Info;
