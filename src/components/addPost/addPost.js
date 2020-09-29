import React, { useState, useContext } from 'react'
import { PostContext } from '../../context/postContext'
import postService from '../../services/postService'
import './addPost.css'

function AddPost(){
  
  const {post,setPost} = useContext(PostContext);
  
  const openTextfield=()=>{
    document.getElementById("post-input-box").style.display = "flex";
  }
  
  const closeTextfield=()=>{
    document.getElementById("post-input-box").style.display = "none";
  }
  
  // const addPost=(e)=>{
  //   e.preventDefault();
  //   //for possibilty to attach images to post in future
  //   const fd = new FormData();
  //   const attachments = document.getElementById("attachments");
  //   if(attachments!==null){
  //     for (let file of attachments.files){
  //       fd.append('attachments',file)
  //     }
  //   }
  //   let title = document.getElementById("post-title").value;
  //   let text = document.getElementById("post-text").value;
  //   fd.append('attachments', title);
  //   fd.append('attachments', text);
  //   postService.addPost(fd).then(data=>{
  //     //console.log(data);
  //     let prevState = post;
  //     prevState = [data,...post];
  //     setPost(prevState)
  //   })
  //   //LEAVE INPUTS BLANK
  //   document.getElementById("post-title").value='';
  //   document.getElementById("post-text").value='';
  //   document.getElementById("modal-parent").style.display="none"
  // }
  
  // const closeModal=(event)=>{
  //   const click = event.target;
  //   const modal = document.getElementById("modal-parent");
  //   const later = document.getElementById("later-button");
  //   if (click === modal||click===later) {
  //     modal.style.display = "none";
  //   }
  // }
  
  return(
    <div>
      <button id="add-post" className="add" onClick={openTextfield}>
        + New Post
      </button>
      <div id="post-input-box">
        <textarea rows="8" id="post-text"></textarea>
        <div className="action-btn-box">
          <button>Post</button>
          <button>Attach</button>
          <button onClick={closeTextfield}>Close</button>
        </div>
      </div>
      {/* <div id="modal-parent" onClick={closeModal}>
        <div id="modal-content">
          <form id="new-post" className="add-post-form" onSubmit={e=>addPost(e)}>
            <label>Title:</label>
            <input type="text" id="post-title" maxlength="35" required/>
            <label>Post:</label>
            <textarea rows="18" id="post-text"></textarea>
            <input type="submit" id="submit" className="modal-btn" value="Post" />
          </form>
          <button id="later-button" className="modal-btn">Maybe later</button>
        </div>
      </div> */}
    </div>
  )
}

export default AddPost