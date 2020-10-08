import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/navbar";
//import Header from "../header/header";
//import Info from '../info/info'
//import Posts from '../posts/posts'
//import Default from '../default'
//import AddPost from '../addPost/addPost'
//import postService from '../../services/postService'
import Footer from "../footer/footer";
//import { PostContext } from '../../context/postContext'
import "./homepage.css";

//import Mainpage from './components/mainpage/mainpage'

//IMAGES ARE CALLED FROM APPNEW-TEST-SAMPLE  -  FIX!!!!!!!!!!!!!!!!!!!!!

function Homepage() {
  //const {post,setPost,header,setHeader,avatar,setAvatar} = useContext(PostContext);

  useEffect(() => {
    getData();
  }, []);

  //get list of users (avatar, name)
  const getData = () => {
    //     let posts = [];
    //     postService.getData().then(data=>{
    //       setHeader(data.header);
    //       setAvatar(data.avatar);
    //       posts = data.data.map(item=>item)
    //       setPost(posts);
    //     })
  };

  //<Default />

  return (
    <div>
      <Navbar />
      <div id="homepage">
        <h1>Welcome to blog post page</h1>
        <p>Please login to create posts, modify your page and upload images</p>
        <p>You can view other people pages and posts without logging in</p>
        <p>
          I encourage you to try to create posts yourself. To do that you need
          to register or (if you don't want to) just use guest account with
          email: guest@guest.com and password: guest
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
