import React, { useState, useEffect, useContext } from 'react';
import Header from './header/header'
import Info from './info/info'
import Posts from './posts'
import Default from './default'
import AddPost from './addPost/addPost'
import postService from '../services/postService'
import { PostContext } from '../context/postContext'
import '../Mainpage.css';

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

  return (
    <div id="personal-page">
      <Header />
      <Info />
      <AddPost />
      <Posts />
      <Default />
    </div>
  );
}

export default Mainpage;
