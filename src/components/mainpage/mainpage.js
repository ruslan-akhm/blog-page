import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Header from "../header/header";
import Info from "../info/info";
import Posts from "../posts/posts";
import Default from "../default";
import AddPost from "../addPost/addPost";
import postService from "../../services/postService";
import Footer from "../footer/footer";
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

  useEffect(() => {
    getData(user);
  }, []);

  //get all the data of the user
  const getData = user => {
    let posts = [];
    postService.getData(user).then(data => {
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
      <Navbar />
      <div id="page-main">
        <div id="personal-page">
          <Header isAuthor={isAuthor} />
          <Info isAuthor={isAuthor} />
          <AddPost isAuthor={isAuthor} />
          <Posts />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Mainpage;
