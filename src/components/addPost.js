import React, { useState, useContext } from 'react'
import { PostContext } from '../context/postContext'

function AddPost(){
  
  const {post,setPost} = useContext(PostContext);
  
  const addPost=(e)=>{
    let prevState = this.state.posts; //our initial posts array 
    let that = this;   //workaround for "this" keyword to access state inside fetch 
    e.preventDefault();
    async function add() {
      const fd = new FormData();
      const attachments = document.getElementById("attachments");
      if(attachments!==null){
        for (let file of attachments.files){
          fd.append('attachments',file)
        }
      }
      let title = document.getElementById("post-title").value;
      let text = document.getElementById("post-text").value;
      fd.append('attachments', title);
      fd.append('attachments', text);
      let response = await fetch("/api/post", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body:fd 
      });
      let resp = await response.json();
      console.log("RESPONSE of ADD is ");
      console.log(resp);
      //updating state for it to have added post info
      that.setState({posts:prevState.concat({listId:resp._id, title:resp.title, text:resp.text, textId:"textId-"+resp._id, closeId:"closeId-"+resp._id, filenames:resp.files})});
      //rendering list elements with new post
      let date = new Date(parseInt(resp.datePosted));
      date = date.toLocaleDateString();
      let images = '';
      resp.files.map(file=>{return images+='<img src='+file+'/>'})
      console.log(images)
      document.getElementById('list').innerHTML +='<li id='+resp._id+'><h4>'+resp.title+'</h4><button id=closeId-'+resp._id+'>&times;</button><p name=textId'+resp._id+'>'+resp.text+'</p><container>'+images+'</container><span>posted '+date+'</span></li>'
      //leave input fileds blank
      document.getElementById("post-title").value='';
      document.getElementById("post-text").value='';
      document.getElementById("modal-parent").style.display="none"
    }
    add();
  }
  
  const closeModal=(event)=>{
    const click = event.target;
    const modal = document.getElementById("modal-parent");
    const later = document.getElementById("later-button");
    if (click === modal||click===later) {
      modal.style.display = "none";
    }
  }
  
  return(
    <div id="modal-parent" onClick={closeModal}>
      <div id="modal-content">
        <form id="new-post" className="add-post-form" onSubmit={e=>addPost(e)}>
          <label>Title:</label>
          <input type="text" id="post-title" maxlength="35" required/>
          <label>Post:</label>
          <textarea rows="18" id="post-text"></textarea>
          <input type="submit" id="submit" value="Post" />
        </form>
        <button id="later-button">Maybe later</button>
      </div>
    </div>
  )
}

export default AddPost