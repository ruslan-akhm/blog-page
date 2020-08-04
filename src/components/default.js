import React, { useState, useContext } from 'react'
import { PostContext } from '../context/postContext'
import postService from '../services/postService'

function Default(){
  
  const {post,setPost,header,setHeader,avatar,setAvatar} = useContext(PostContext);
  
  
  const toDefault=(e)=>{
    e.preventDefault();
    //setPost(null);
    let posts = [];
    //document.getElementById('list').innerHTML='';
    //this.setState({posts:[]})
    //const that = this;
    postService.default().then(data=>{
      console.log(data);
      setHeader(data.header);
      setAvatar(data.avatar);
      data.data.map(item=>{
        posts = posts.concat(item);
      })
      
    })
    console.log(posts);
    setPost(posts);
    // async function def(){
    //   try {
    //     let response = await fetch("/api/default");
    //     let resp = await response.json(); //our response; from here update avatar, header and posts
    //     document.getElementById("header").style.background = "url(" + resp.image + ")";
    //     document.getElementById("header").style.backgroundSize = "cover";
    //     document.getElementById("avatar-img").setAttribute("src",resp.src);
    //     console.log(resp);
    //     resp.data.map(post=>{
    //       //const isShort = post.text.length>600 ? post.text.slice(0,510)+'<a id='+post.datePosted+'>...Expand text</a>':post.text;
    //       //let prevState=that.state.posts;
    //       //that.setState({posts:prevState.concat({listId:post._id, title:post.title, text:post.text, textId:post.datePosted, closeId:post.postId})});
    //       //let date = new Date(parseInt(post.datePosted));
    //       //date = date.toLocaleDateString();
    //       //return document.getElementById('list').innerHTML+='<li id='+post._id+'><div className="list-item-parent"><h4>'+post.title+'</h4><button id='+post.postId+'>&times;</button><p name='+post.datePosted+'>'+isShort+'</p></div><span>posted '+date+'</span></li>'
    //     })
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // def();
    
  }
  
  return(
    <div>
      <button id="default" onClick={e=>toDefault(e)}>To Default</button>
    </div>
  )
}

export default Default