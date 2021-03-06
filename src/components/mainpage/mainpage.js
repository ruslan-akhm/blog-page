import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../header/header";
import Info from "../info/info";
import Posts from "../posts/posts";
import AddPost from "../addPost/addPost";
import postService from "../../services/postService";
import { PostContext } from "../../context/postContext";
import "./mainpage.css";

function Mainpage() {
  const {
    post,
    setPost,
    header,
    setHeader,
    avatar,
    setAvatar,
    bio,
    setBio
  } = useContext(PostContext);
  const [isAuthor, setIsAuthor] = useState(false);
  const { user } = useParams();
  let history = useHistory();

  useEffect(() => {
    getData(user);
  }, []);

  //get all the data of the user
  const getData = user => {
    let posts = [];
    postService.getData(user).then(data => {
      if(data.error){
        history.push("/*")
        return
      }
      setIsAuthor(data.isAuthor);
      setHeader(data.header);
      setAvatar(data.avatar);
      setBio(data.bio);
      posts = data.posts.map(item => item);
      setPost(posts);
    });
  };

  return (
    <div>
      <div id="page-main">
        <div id="personal-page">
          <Header isAuthor={isAuthor} />
          <Info isAuthor={isAuthor} />
          <AddPost isAuthor={isAuthor} />
          <Posts isAuthor={isAuthor} />
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
