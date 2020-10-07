import React, { useState, useContext } from 'react'
import { PostContext } from '../../context/postContext'
import postService from '../../services/postService'
import './info.css'

function Info(){
  
  const {avatar,setAvatar, bio, setBio} = useContext(PostContext);
  
  const updateAvatar=(e)=>{
    e.preventDefault();
    let fd = new FormData();
    let avatarImage = document.getElementById("avatarfile").files[0];
    fd.append("avatarfile", avatarImage);
    postService.updateAvatar(fd).then(data=>{
      setAvatar(data.avatar)
    })
  }
  
  let highlights = bio.highlights.map(item=><li>{item}</li>) || null; 
  
  return(
    <div id="info">
      <div id="avatar">
        <img id="avatar-img" src={avatar} alt="avatar"/>
        <input name="avatarfile" id="avatarfile" type="file" className="custom-input" accept="image/*" onChange={e=>updateAvatar(e)}/>
      </div>
      <div id="bio">
        <ul id="bio-list" >
          <h1>{bio.name}</h1>
          {highlights}
          {/* <li>Cyber Engineer</li>
          <li>R2D2 fan</li>
          <li>Toronto, ON</li> */}
        </ul>
      </div>
      <p>{bio.info}</p>

    </div>
  )
}

export default Info