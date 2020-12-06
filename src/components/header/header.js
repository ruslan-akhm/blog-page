import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../context/postContext";
import postService from "../../services/postService";
import "./header.css";

function Header(props) {
  const { header, setHeader } = useContext(PostContext);
  const [isAuthor, setIsAuthor] = useState();
  const { user } = useParams();
  const [userID, setUserID] = useState(user);

  useEffect(() => {
    setIsAuthor(props.isAuthor);
  }, [props]);

  const updateHeader = e => {
    e.preventDefault();
    let fd = new FormData();
    let headerImage = document.getElementById("upfile").files[0];
    fd.append("upfile", headerImage);
    fd.append("upfile", userID);
    postService.updateHeader(fd).then(data => {
      setHeader(data.header);
    });
  };

  return (
    <div id="header">
      <img src={header} alt="user's header" />
      {isAuthor ? (
        <input
          name="upfile"
          id="upfile"
          type="file"
          className="header-upload"
          accept="image/*"
          onChange={e => updateHeader(e)}
        />
      ) : null}
    </div>
  );
}

export default Header;
