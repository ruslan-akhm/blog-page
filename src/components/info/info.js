import React, { useState, useContext } from 'react'
import { PostContext } from '../../context/postContext'
import postService from '../../services/postService'
import './info.css'

function Info(){
  
  const {avatar,setAvatar} = useContext(PostContext);
  
  const updateAvatar=(e)=>{
    e.preventDefault();
    let fd = new FormData();
    let avatarImage = document.getElementById("avatarfile").files[0];
    fd.append("avatarfile", avatarImage);
    postService.updateAvatar(fd).then(data=>{
      setAvatar(data.avatar)
    })
  }
  
  return(
    <div id="info">
      <div id="avatar">
        <img id="avatar-img" src={avatar} alt="avatar"/>
        <input name="avatarfile" id="avatarfile" type="file" className="custom-input" accept="image/*" onChange={e=>updateAvatar(e)}/>
      </div>
      <div id="bio">
        <ul id="bio-list" >
          <h2>Ruslan Akhmetshin</h2>
          <li>Software Engineer</li>
          <li>Toronto, ON</li>
        </ul>
      </div>
      <p>THIS PAGE CURRENTLY UNDER EDITING, SOME FUNCTIONS MAY NOT WORK AND/OR EXIST. I like creating things. Every app I do is more complex than the previous one. I enjoy learning and applying technologies and seeing results of my work.</p>

    </div>
  )
}

export default Info