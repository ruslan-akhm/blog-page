import React, { useState, useEffect, useContext } from 'react'
import { PostContext } from '../context/postContext'

function Posts(){
  
  const {post,setPost} = useContext(PostContext);
  const [list, setList] = useState();
  
  useEffect(()=>{
    let posts = [];
    post.map(item=>{
      const textId = 'textId-'+item._id;
      const closeId = 'closeId-'+item._id;
      const short = item.text.length>600 ? item.text.slice(0,510) : item.text;
      const expand = item.text.length>600 ? <a id={textId}>...Expand text</a> : '';
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
        expand: expand,
        textId:textId,
        closeId:closeId
      }
      posts = posts.concat(newPost);
    })
    setList(posts);
  },[post])
  
  const newPost=()=>{
    console.log('NOT WORKING YET. TO BE FIXED')
     //document.getElementById("modal-parent").style.display = "block";
  }
  
  const modifyText=(e)=>{
    console.log(e.target.id)
    //We check if button was pressed inside #posts div; We are not using 'click' listener on buttons
    //because they might not be rendered yet at the time of check
    //let prevState = this.state.posts;
    //const that = this;
    list.map((post)=>{ //that.state.posts
      if(e.target.id==post.textId){//post.textId){
        console.log("HERERERERERE")
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
  
  let posts = list && list.map(item=>{
    return <li id={item._id}>
             <h4>{item.title}</h4>
             <button id={item.closeId}>&times;</button>
             <p name={item.textId}>{item.short}{item.expand}</p>
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