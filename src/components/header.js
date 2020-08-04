import React, { useState, useContext } from 'react'
import { PostContext } from '../context/postContext'
import postService from '../services/postService'

function Header(){
  
  const {header,setHeader} = useContext(PostContext);
  
  console.log(header);
  
  const updateHeader=(e)=>{
    e.preventDefault();
    let fd = new FormData();
    let headerImage = document.getElementById("upfile").files[0];
    fd.append("upfile", headerImage);
    postService.updateHeader(fd).then(data=>{
      setHeader(data.header)
    })
  }
  
  return(
    <div id="header">
      <img src={header} />
        <input name="upfile" id="upfile" type="file" className="custom-input" accept="image/*" onChange={e=>updateHeader(e)} />
    </div>
  )
}

export default Header