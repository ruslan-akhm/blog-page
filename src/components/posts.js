import React, { useState, useContext } from 'react'
import { PostContext } from '../context/postContext'

function Posts(){
  
  const {post,setPost} = useContext(PostContext);
  
   const newPost=()=>{
    document.getElementById("modal-parent").style.display = "block";
  }
  
  const modifyText=(e)=>{
    //We check if button was pressed inside #posts div; We are not using 'click' listener on buttons
    //because they might not be rendered yet at the time of check
    let prevState = this.state.posts;
    const that = this;
    that.state.posts.map((post)=>{
      if(e.target.id==post.textId){
        //expand Text
        document.getElementById(e.target.id).style.display="none";
        return document.getElementsByName(e.target.id)[0].innerText=post.text
      } 
      else if(e.target.id==post.closeId){
        //delete post
        console.log(post)
        async function deletePost(){
          let response = await fetch("/api/delete", {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({id:post.listId})
          });
          let resp = await response.json();
          let list = document.getElementById("list");
          let li_nested = document.getElementById(post.listId);
          list.removeChild(li_nested);
          const newState = prevState.filter(list=>{return list.listId!==post.listId})
          that.setState({posts:newState});
         }
        deletePost();
      }
      else return
    })
  }
  
  let posts = post.map(item=>{
    return <li id={item._id}>
             <h4>item.title</h4>
             <button id={'closeId-'+item._id}>&times;</button>
             <p name={'textId-'+item._id}>{item.isShort}</p>
             <container>{item.images}</container>
             <span>posted {item.date}</span>
           </li>
  })
  
  return(
    <div className="posts" id="posts" onClick={e=>modifyText(e)}>
      <button id="add-post" className="add" onClick={newPost}>
        + Add Post
      </button>
      <ul id="list">{posts}</ul>  
    </div>
  )
}

export default Posts