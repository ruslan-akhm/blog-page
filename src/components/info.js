import React, { useState, useContext } from 'react'
import { PostContext } from '../context/postContext'
import postService from '../services/postService'

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
    // async function ava() {
    //   let fd = new FormData();
    //   let avatarImage = document.getElementById("avatarfile").files[0];
    //   fd.append("avatarfile", avatarImage);
    //   try {
    //     let response = await fetch("/api/avatar", {
    //       method: "POST",
    //       headers: {
    //         Accept: "application/json"
    //       },
    //       body: fd
    //     });
    //     let resp = await response.json();
    //     document.getElementById("avatar-img").setAttribute("src",resp.avatar);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // ava();
    
  }
  
  return(
    <div id="info">
      <div id="avatar">
        <img id="avatar-img" src={avatar} alt="avatar"/>
        <input name="avatarfile" id="avatarfile" type="file" className="custom-input" accept="image/*" onChange={e=>updateAvatar(e)}/>
      </div>
      <div id="bio">
        <ul id="bio-list" >
          <li>Ruslan Akhmetshin</li>
          <li>Full-Stack Developer</li>
          <li>Toronto, ON</li>
        </ul>
        <p>I like creating things. Every app I do is more complex than the previous one. I enjoy learning and applying technologies and seeing results of my work.</p>
      </div>
    </div>
  )
}

export default Info