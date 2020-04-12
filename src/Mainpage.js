import React from 'react';
import './Mainpage.css';
//import Modal from './Modal'


class Mainpage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      posts:[{title:'Post 1',
              description:'Whatever happened in post 1'
             },
             {title:'Post2',
              description:'Whatever happened in post 2'
             },
             {title:'Post 3',
              description:'Whatever happened in post 3'
             }],
      headerImage:''
    }
    this.newPost=this.newPost.bind(this);
    this.closeModal=this.closeModal.bind(this);
    this.updateHeader=this.updateHeader.bind(this);
    this.addPost=this.addPost.bind(this);
  }
  
  componentDidMount(){
    document.getElementById("add-post").addEventListener('click',this.newPost);
    document.getElementById('modal-parent').addEventListener('click',this.closeModal);
    document.getElementById('upfile').addEventListener('change',(e)=>{this.updateHeader(e)})
    document.getElementById('new-post').addEventListener('submit',(e)=>{this.addPost(e)});
  }
  
  newPost(){
    document.getElementById('modal-parent').style.display="block";
  }
  addPost(e){
    e.preventDefault();
    async function add(){
      let title = document.getElementById("post-title").value;
      let text = document.getElementById("post-text").value;
      console.log(title, text)
      let response = await fetch('/api/post',{
        method:'POST',
        headers:{
          "Accept": "application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify({title:title,text:text})
      })
      let resp = await response.json();
      console.log(resp, typeof resp)
      //let prevState = this.state.posts;
      //this.setState({posts:prevState+resp})
    }
    
    add();
  }
  
  updateHeader(e){
    e.preventDefault();
    async function upd (){
      let fd = new FormData();
      let headerImage = document.getElementById('upfile').files[0];
      fd.append("upfile",headerImage)
      try {let response = await fetch('/api/upload',{
        method:'POST',
        headers:{
          "Accept": "application/json"
        },
        body:fd
      })
      let resp = await response.json();
      document.getElementById('header').style.background="url("+resp.image+")";
      } catch(err) {
       console.log(err)
      }
    }
    upd();
  }
 
  
  closeModal(event){
    const click = event.target;
    const modal = document.getElementById('modal-parent')
    if(click==modal){
      modal.style.display="none";
    }
  }
  
  render(){
  const post = this.state.posts.map(post=>{return <li>{post.title}+{post.description}</li>});
    
  const modal = <div id="modal-parent">
                   <div id="modal-content">
                     <form id="new-post" className="add-post-form">
                       <label>Title</label><input type="text" id="post-title"/>
                       <label>Post</label><textarea rows="12" id="post-text"></textarea>
                       <input type="submit" id="submit" value="Post"/>
                     </form>
                   </div>
                 </div>;
        
  return(
    <div id="personal-page">
      <div id="header">
        <form enctype="multipart/form-data" id="send-pic"> 
          <input name="upfile" id="upfile" type="file" />
        </form> 
      </div>
      <div id="info">
        <div id="avatar">
          <img src="https://res.cloudinary.com/techsnips/image/fetch/w_2000,f_auto,q_auto,c_fit/https://adamtheautomator.com/content/images/size/w2000/2019/10/user-1633249_1280.png"/>
        </div>
        <div id="bio"></div>
      </div>
      <div className="posts">
        <ul id="list">
          {post}
        </ul>
        <button id="add-post" className="add">+ Add</button>
      </div>
      {modal}
    </div>
  )}
}

export default Mainpage