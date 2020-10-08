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

//import Mainpage from './components/mainpage/mainpage'

//IMAGES ARE CALLED FROM APPNEW-TEST-SAMPLE  -  FIX!!!!!!!!!!!!!!!!!!!!!

function Mainpage() {
  const { post, setPost, header, setHeader, avatar, setAvatar } = useContext(
    PostContext
  );

  const { user } = useParams();
  
  useEffect(() => {
    getData(user);
  }, []);

  //fetch posts (data.posts), header, avatar, bio;
  //also id to set isAuthor (create it in context) if user visits their own page

  const getData = (user) => {
    let posts = [];
    postService.getData(user).then(data => {
      console.log(data);
      // setHeader(data.header);
      // setAvatar(data.avatar);
      // posts = data.posts.map(item=>item)
      // setPost(posts);
    });
  };

  //<Default />

  return (
    <div>
      <Navbar />
      <div id="page-main">
        <div id="personal-page">
          <Header />
          <Info />
          <AddPost />
          <Posts />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Mainpage;
