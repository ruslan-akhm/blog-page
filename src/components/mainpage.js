import React, { useState, useEffect, useContext } from 'react';
import Header from './header'
import Info from './info'
import Posts from './posts'
import Default from './default'
import AddPost from './addPost'
import postService from '../services/postService'
import { PostContext } from '../context/postContext'
import '../Mainpage.css';

//MAKE IT ADD POSTS FROM TOP TO BOTTOM
//OBJECTS IN REACT HOOKS

function Mainpage(){
  
  const [post,setPost,header,setHeader,avatar,setAvatar] = useContext(PostContext);
  //console.log(avatar)
  // const [header, setHeader] = useContext();
  // const [avatar, setAvatar] = useContext();
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     posts: [],
  //     headerImage: ""
  //   };
  //   //this.newPost = this.newPost.bind(this);
  //   //this.closeModal = this.closeModal.bind(this);
  //   //this.updateHeader = this.updateHeader.bind(this);
  //   //this.addPost = this.addPost.bind(this);
  //   //this.updateAvatar=this.updateAvatar.bind(this);
  //   this.getData=this.getData.bind(this);
  //   //this.modifyText=this.modifyText.bind(this);
  //   //this.toDefault=this.toDefault.bind(this);
  //   //this.showAttachment=this.showAttachment.bind(this);
  // }

  // componentDidMount() {
  //   this.getData();
  //   window.addEventListener('click',(e)=>{console.log(e.target.id)})
  // }
  useEffect(()=>{
    getData();
  },[])
                        
  const getData=()=>{
    //const that = this;   //workaround for "this" keyword to access state inside fetch
    postService.getData().then(data=>{
      console.log(data);
      setHeader(()=>{
        return data.header
      });
      //document.getElementById("header").style.background = "url(" + data.header + ")";
      //document.getElementById("header").style.backgroundSize = "cover";
      document.getElementById("avatar-img").setAttribute("src",data.avatar);
      data.data.map(item=>{
          //Hide part of long text and add "Expand text" button
          const isShort = item.text.length>600 ? item.text.slice(0,510)+'<a id=textId-'+item._id+'>...Expand text</a>':item.text;
        
          //let prevState = that.state.posts;
          //Display date Posted
          let date = new Date(parseInt(item.datePosted)).toLocaleDateString();
          //date = date.toLocaleDateString();
          //that.setState({posts:prevState.concat({listId:post._id, title:post.title, text:post.text, textId:"textId-"+post._id, closeId:"closeId-"+post._id, filenames:post.files})});
          let images = '';
          if(item.files!==undefined){
            item.files.map(file=>{return images+='<img id='+file+' src='+file+' onClick={that.showAttachment} />'})
          }
          const newPost = post.concat(item);
          setPost(()=>{
            //const newPost = post.concat(item);
            return newPost;
          })
          //console.log(images)
          return document.getElementById('list').innerHTML+='<li id='+item._id+'><h4>'+item.title+'</h4><button id=closeId-'+item._id+'>&times;</button><p name=textId-'+item._id+'>'+isShort+'</p><container>'+images+'</container><span>posted '+date+'</span></li>'
        })
    })
    // async function dat(){
    //   try {
    //     let response = await fetch("/api");
    //     let resp = await response.json(); //our response; from here update avatar, header and posts
    //     // document.getElementById("header").style.background = "url(" + resp.header + ")";
    //     // document.getElementById("header").style.backgroundSize = "cover";
    //     // document.getElementById("avatar-img").setAttribute("src",resp.avatar);
    //     console.log(resp);
    //     resp.data.map(post=>{
    //       //Hide part of long text and add "Expand text" button
    //       const isShort = post.text.length>600 ? post.text.slice(0,510)+'<a id=textId-'+post._id+'>...Expand text</a>':post.text;
    //       let prevState = that.state.posts;
    //       //Display date Posted
    //       let date = new Date(parseInt(post.datePosted));
    //       date = date.toLocaleDateString();
    //       that.setState({posts:prevState.concat({listId:post._id, title:post.title, text:post.text, textId:"textId-"+post._id, closeId:"closeId-"+post._id, filenames:post.files})});
    //       let images = '';
    //       if(post.files!==undefined){
    //         post.files.map(file=>{return images+='<img id='+file+' src='+file+' onClick={that.showAttachment} />'})
    //       }
    //       //console.log(images)
    //       return document.getElementById('list').innerHTML+='<li id='+post._id+'><h4>'+post.title+'</h4><button id=closeId-'+post._id+'>&times;</button><p name=textId-'+post._id+'>'+isShort+'</p><container>'+images+'</container><span>posted '+date+'</span></li>'
    //     })
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // dat();
    
  }
  
  // updateHeader(e) {
  //   e.preventDefault();
  //   async function upd() {
  //     let fd = new FormData();
  //     let headerImage = document.getElementById("upfile").files[0];
  //     fd.append("upfile", headerImage);
  //     try {
  //       let response = await fetch("/api/upload", {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json"
  //         },
  //         body: fd
  //       });
  //       let resp = await response.json();
  //       document.getElementById("header").style.background = "url(" + resp.image + ")";
  //       document.getElementById("header").style.backgroundSize = "cover";
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   upd();
  // }
  
//   updateAvatar(e){
//     e.preventDefault();
//     async function ava() {
//       let fd = new FormData();
//       let avatarImage = document.getElementById("avatarfile").files[0];
//       fd.append("avatarfile", avatarImage);
//       try {
//         let response = await fetch("/api/avatar", {
//           method: "POST",
//           headers: {
//             Accept: "application/json"
//           },
//           body: fd
//         });
//         let resp = await response.json();
//         document.getElementById("avatar-img").setAttribute("src",resp.src);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     ava();
//   }
  
  // addPost=(e)=>{
  //   let prevState = this.state.posts; //our initial posts array 
  //   let that = this;   //workaround for "this" keyword to access state inside fetch 
  //   e.preventDefault();
  //   async function add() {
  //     const fd = new FormData();
  //     const attachments = document.getElementById("attachments");
  //     if(attachments!==null){
  //       for (let file of attachments.files){
  //         fd.append('attachments',file)
  //       }
  //     }
  //     let title = document.getElementById("post-title").value;
  //     let text = document.getElementById("post-text").value;
  //     fd.append('attachments', title);
  //     fd.append('attachments', text);
  //     let response = await fetch("/api/post", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json"
  //       },
  //       body:fd 
  //     });
  //     let resp = await response.json();
  //     console.log("RESPONSE of ADD is ");
  //     console.log(resp);
  //     //updating state for it to have added post info
  //     that.setState({posts:prevState.concat({listId:resp._id, title:resp.title, text:resp.text, textId:"textId-"+resp._id, closeId:"closeId-"+resp._id, filenames:resp.files})});
  //     //rendering list elements with new post
  //     let date = new Date(parseInt(resp.datePosted));
  //     date = date.toLocaleDateString();
  //     let images = '';
  //     resp.files.map(file=>{return images+='<img src='+file+'/>'})
  //     console.log(images)
  //     document.getElementById('list').innerHTML +='<li id='+resp._id+'><h4>'+resp.title+'</h4><button id=closeId-'+resp._id+'>&times;</button><p name=textId'+resp._id+'>'+resp.text+'</p><container>'+images+'</container><span>posted '+date+'</span></li>'
  //     //leave input fileds blank
  //     document.getElementById("post-title").value='';
  //     document.getElementById("post-text").value='';
  //     document.getElementById("modal-parent").style.display="none"
  //   }
  //   add();
  // }

//   newPost() {
//     document.getElementById("modal-parent").style.display = "block";
//   }
  
//   modifyText=(e)=>{
//     //We check if button was pressed inside #posts div; We are not using 'click' listener on buttons
//     //because they might not be rendered yet at the time of check
//     let prevState = this.state.posts;
//     const that = this;
//     that.state.posts.map((post)=>{
//       if(e.target.id==post.textId){
//         //expand Text
//         document.getElementById(e.target.id).style.display="none";
//         return document.getElementsByName(e.target.id)[0].innerText=post.text
//       } 
//       else if(e.target.id==post.closeId){
//         //delete post
//         console.log(post)
//         async function deletePost(){
//           let response = await fetch("/api/delete", {
//             method: "DELETE",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({id:post.listId})
//           });
//           let resp = await response.json();
//           let list = document.getElementById("list");
//           let li_nested = document.getElementById(post.listId);
//           list.removeChild(li_nested);
//           const newState = prevState.filter(list=>{return list.listId!==post.listId})
//           that.setState({posts:newState});
//          }
//         deletePost();
//       }
//       else return
//     })
//   }

  // closeModal(event) {
  //   const click = event.target;
  //   const modal = document.getElementById("modal-parent");
  //   const later = document.getElementById("later-button");
  //   if (click === modal||click===later) {
  //     modal.style.display = "none";
  //   }
  // }

  // toDefault(e){
  //   e.preventDefault();
  //   document.getElementById('list').innerHTML='';
  //   this.setState({posts:[]})
  //   const that = this;
  //   async function def(){
  //     try {
  //       let response = await fetch("/api/default");
  //       let resp = await response.json(); //our response; from here update avatar, header and posts
  //       document.getElementById("header").style.background = "url(" + resp.image + ")";
  //       document.getElementById("header").style.backgroundSize = "cover";
  //       document.getElementById("avatar-img").setAttribute("src",resp.src);
  //       console.log(resp);
  //       resp.data.map(post=>{
  //         const isShort = post.text.length>600 ? post.text.slice(0,510)+'<a id='+post.datePosted+'>...Expand text</a>':post.text;
  //         let prevState=that.state.posts;
  //         that.setState({posts:prevState.concat({listId:post._id, title:post.title, text:post.text, textId:post.datePosted, closeId:post.postId})});
  //         let date = new Date(parseInt(post.datePosted));
  //         date = date.toLocaleDateString();
  //         return document.getElementById('list').innerHTML+='<li id='+post._id+'><div className="list-item-parent"><h4>'+post.title+'</h4><button id='+post.postId+'>&times;</button><p name='+post.datePosted+'>'+isShort+'</p></div><span>posted '+date+'</span></li>'})
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   def();
  // }

// showAttachment(){
//   console.log("click")
// }


    // const modal = (
    //   <div id="modal-parent" onClick={this.closeModal}>
    //     <div id="modal-content">
    //       <form id="new-post" className="add-post-form" onSubmit={e=>this.addPost(e)}>
    //         <label>Title:</label>
    //         <input type="text" id="post-title" maxlength="35" required/>
    //         <label>Post:</label>
    //         <textarea rows="18" id="post-text"></textarea>
    //      {/*   <input name="attachments" id="attachments" type="file" className="custom-input attach-btn" accept="image/*" multiple/> */}
    //         <input type="submit" id="submit" value="Post" />
    //       </form>
    //       <button id="later-button">Maybe later</button>
    //     </div>
    //   </div>
    // );

    return (
      <div id="personal-page">
        <Header />
        {/* <!--         <div id="header">
          <form enctype="multipart/form-data" id="send-pic">
            <input name="upfile" id="upfile" type="file" className="custom-input" accept="image/*" onChange={e=>this.updateHeader(e)}/>
          </form>
        </div> --> 
<!--         <div id="info">
          <div id="avatar">
            <img id="avatar-img" src='' alt="avatar"/>
            <input name="avatarfile" id="avatarfile" type="file" className="custom-input" accept="image/*" onChange={e=>this.updateAvatar(e)}/>
          </div>
          <div id="bio">
            <ul id="bio-list" >
              <li>Ruslan Akhmetshin</li>
              <li>Full-Stack Developer</li>
              <li>Toronto, ON</li>
            </ul>
            <p>I like creating things. Every app I do is more complex than the previous one. I enjoy learning and applying technologies and seeing results of my work.</p>
          </div>
        </div> --> */}
        <Info />
        {/* <!--         <div className="posts" id="posts" onClick={e=>this.modifyText(e)}>
          <button id="add-post" className="add" onClick={this.newPost}>
            + Add Post
          </button>
          <ul id="list"></ul>  
          <button id="default" onClick={e=>this.toDefault(e)}>To Default</button>
        </div> --> */}
        <Posts />
        <Default />
        <AddPost />
         {/*modal */} 
      </div>
    );
  
}

export default Mainpage;