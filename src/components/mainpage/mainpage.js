import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../navbar/navbar'
import Header from '../header/header'
import Info from '../info/info'
import Posts from '../posts/posts'
import Default from '../default'
import AddPost from '../addPost/addPost'
import postService from '../../services/postService'
import Footer from '../footer/footer'
import { PostContext } from '../../context/postContext'
import './mainpage.css';


//import Mainpage from './components/mainpage/mainpage'


//IMAGES ARE CALLED FROM APPNEW-TEST-SAMPLE  -  FIX!!!!!!!!!!!!!!!!!!!!!

function Mainpage(){
  
  const {post,setPost,header,setHeader,avatar,setAvatar} = useContext(PostContext);
  
  useEffect(()=>{
    getData();
  },[])
                        
  const getData=()=>{
    let posts = [];
    postService.getData().then(data=>{
      setHeader(data.header);
      setAvatar(data.avatar);
      posts = data.data.map(item=>item)
      setPost(posts);
      
    })
  }
  
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
