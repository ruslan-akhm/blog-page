import React, { useState, useContext } from 'react'
import { PostContext } from '../context/postContext'
import postService from '../services/postService'

function Default(){
  
  const {post,setPost,header,setHeader,avatar,setAvatar} = useContext(PostContext);
  
  
  const toDefault=(e)=>{
    //e.preventDefault();
    let posts = [];
    postService.default().then(data=>{
      setHeader(data.header);
      setAvatar(data.avatar);
      posts = data.data.map(item=>item)
    setPost(posts);
    })
  }
  
  return(
    <div>
      <button id="default" onClick={e=>toDefault(e)}>To Default</button>
    </div>
  )
}

export default Default