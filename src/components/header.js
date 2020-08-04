import React, { useState, useContext } from 'react'
import { PostContext } from '../context/postContext'

function Header(){
  
  const {header,setHeader} = useContext(PostContext);
  
  console.log(header);
  
  const updateHeader=(e)=>{
    e.preventDefault();
    async function upd() {
      let fd = new FormData();
      let headerImage = document.getElementById("upfile").files[0];
      fd.append("upfile", headerImage);
      try {
        let response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          body: fd
        });
        let resp = await response.json();
        document.getElementById("header").style.background = "url(" + resp.image + ")";
        document.getElementById("header").style.backgroundSize = "cover";
      } catch (err) {
        console.log(err);
      }
    }
    upd();
  }
  
  return(
    <div id="header">
      <img src={header} />
      <form enctype="multipart/form-data" id="send-pic">
        <input name="upfile" id="upfile" type="file" className="custom-input" accept="image/*" onChange={e=>updateHeader(e)}/>
      </form>
    </div>
  )
}

export default Header