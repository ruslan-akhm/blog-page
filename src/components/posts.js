import React, { useState, useEffect, useContext } from 'react'
import { PostContext } from '../context/postContext'
import postService from '../services/postService'

function Posts(){
  
  const {post,setPost} = useContext(PostContext);
  const [list, setList] = useState();
  
  useEffect(()=>{
    document.getElementById("list").innerHTML='';
    let posts = [];
    post.map(item=>{
      const textId = 'textId-'+item._id;
      const closeId = 'closeId-'+item._id;
      const short = item.text.length>600 ? item.text.slice(0,510)+'<a id='+textId+'>...Expand text</a>' : item.text;
      const date = new Date(parseInt(item.datePosted)).toLocaleDateString();
      let images = '';
        if(item.files!==undefined){
          item.files.map(file=>{return images+='<img id='+file+' src='+file+' onClick={that.showAttachment} />'})
        }
      const newPost = {
        _id: item._id,
        text: item.text,
        short: short,
        title: item.title,
        date: date,
        images: images,
        textId: textId,
        closeId: closeId
      }
      posts = posts.concat(newPost);
      document.getElementById('list').innerHTML+='<li id='+item._id+'><h4>'+item.title+'</h4><button id='+closeId+'>&times;</button><p name='+textId+'>'+short+'</p><container>'+images+'</container><span>posted '+date+'</span></li>'
    })
    setList(posts);
  },[post])
  
  const newPost=()=>{
    console.log('NOT WORKING YET. TO BE FIXED')
     //document.getElementById("modal-parent").style.display = "block";
  }
  
  const modifyText=(e)=>{
    let newList;
    list.map((post)=>{ 
      if(e.target.id==post.textId){
        //expand Text
        document.getElementById(e.target.id).style.display="none";
        return document.getElementsByName(e.target.id)[0].innerText=post.text
      } 
      else if(e.target.id==post.closeId){
        //delete post
        postService.removePost(post._id).then(data=>{
          newList = list.filter(item=>{return item._id!==post._id});
        })
        let li_nested = document.getElementById(e.target.id).parentNode;
        let posts = document.getElementById("list");
        posts.removeChild(li_nested);
      }
      newList && setList(newList);
    })
  
  }
  
  return(
    <div className="posts" id="posts" onClick={e=>modifyText(e)}>
      <button id="add-post" className="add" onClick={newPost}>
        + Add Post
      </button>
      <ul id="list"></ul>  
    </div>
  )
}

export default Posts