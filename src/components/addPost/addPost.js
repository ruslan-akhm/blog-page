import React, { useState, useContext } from 'react'
import { PostContext } from '../../context/postContext'
import postService from '../../services/postService'
import './addPost.css'

function AddPost(){
  
  const {post,setPost} = useContext(PostContext);
  const [isTextfield, setIsTextfield] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  
  const handleTextfield=()=>{
    if(!isTextfield){
      document.getElementById("post-input-box").style.display = "flex";
      setIsTextfield(true)
    }
    else{
      document.getElementById("post-title").value='';
      document.getElementById("post-text").value='';
      document.getElementById("post-input-box").style.display = "none";
      setIsTextfield(false)
    }
  }
  
  // const closeTextfield=()=>{
  //   document.getElementById("post-input-box").style.display = "none";
  //   setIsTextfield(false)
  // }
  
  const previewAttachment=(e)=>{
    document.getElementById("attachment-preview-box").style.display="flex"
    let arrayOfAttachments = [...imagePreview];
    for (let i=0; i<e.target.files.length; i++){
      arrayOfAttachments.push(e.target.files[i])
    }
    setImagePreview(()=>{
      return arrayOfAttachments
    })
  }
  
  const removeAttachment = (e) =>{
    console.log(e);
    let attachments = [...imagePreview];
    let filteredAttachments = attachments.filter(item=>{return item.name!==e})
    setImagePreview(()=>{
      return filteredAttachments
    })
  }
  
  //imagePREVIEW NEEDS tO BE CLEANED AFTER SUBMISSION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  
  const addPost=(e)=>{
    e.preventDefault();
    //for possibilty to attach images to post in future
    const fd = new FormData();
    const attachments = imagePreview;//document.getElementById("attachments");
    if(attachments!==null){
      for (let file of attachments){  //.files
        fd.append('attachments',file)
      }
    }
    let title = document.getElementById("post-title").value;
    let text = document.getElementById("post-text").value;
    fd.append('attachments', title);
    fd.append('attachments', text);
    postService.addPost(fd).then(data=>{
      console.log(data);
      let prevState = post;
      prevState = [data,...post];
      setPost(prevState)
    })
    //LEAVE INPUTS BLANK
    document.getElementById("post-title").value='';
    document.getElementById("post-text").value='';
    setImagePreview([])
    setIsTextfield(false)
    //document.getElementById("modal-parent").style.display="none"
  }
  
  // const closeModal=(event)=>{
  //   const click = event.target;
  //   const modal = document.getElementById("modal-parent");
  //   const later = document.getElementById("later-button");
  //   if (click === modal||click===later) {
  //     modal.style.display = "none";
  //   }
  // }
  
  //Change +New Post button when textatea popped down\
  
  let x = imagePreview && imagePreview.map(item=>{
    //console.log(item)
    return <div className="preview"><img src={URL.createObjectURL(item)} /><button onClick={e=>removeAttachment(item.name)}>&#10006;</button></div>})
  
  return(
    <div>
      <button id="add-post" className="add" onClick={handleTextfield}>
        {isTextfield? "Close" : "+ New Post" }
      </button>
      <div id="post-input-box">
        <input type="text" id="post-title" maxLength="35" required placeholder="Title goes here..."/>
        <textarea rows="8" id="post-text" placeholder="Once upon a time..."></textarea>
        <div id="attachment-preview-box">
          {/* <div className="preview"> */}
            {/* <img id="frame" src="" /> */}
            {x}
          {/*</div> */}
        </div>
        <div className="action-btn-box">
          <button onClick={addPost}>Post</button>
          <input type="file" onChange={(e)=>previewAttachment(e)} multiple/>
          
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