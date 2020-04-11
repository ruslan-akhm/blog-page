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
             }]
    }
    this.addPost=this.addPost.bind(this);
    this.closeModal=this.closeModal.bind(this);
    this.updateHeader=this.updateHeader.bind(this);
    this.onSelectFile=this.onSelectFile.bind(this);
  }
  
  componentDidMount(){
    //window.onunload = function() { debugger; }
    document.getElementById("new-post").addEventListener('click',this.addPost);
    document.getElementById('modal-parent').addEventListener('click',this.closeModal);
    document.getElementById('upfile').addEventListener('change',this.onSelectFile,false)
  }
  
  addPost(){
    document.getElementById('modal-parent').style.display="block";
  
  }
  
  onSelectFile(){
    this.updateHeader(document.getElementById('upfile').files[0]);
  }
  
  updateHeader(file){
    console.log("HERE !"+file)
    fetch('/api/upload',{
      method:'POST',
      headers:{
        //"Content-Type":"text/html"
      },
      body:file
    })//.then(response=>response.json)
      .then(response=>console.log(response))//document.getElementById('header').style.background=success)
  }
 
  
  closeModal(event){
    const click = event.target;
    const modal = document.getElementById('modal-parent')
    if(click==modal){
      modal.style.display="none";
    }
  }
  
  render(){
  const post = '';
    
  const modal = <div id="modal-parent">
                   <div id="modal-content">
                     <form className="add-post-form">
                       <label>Title</label><input type="text" />
                       <label>Post</label><textarea rows="12"></textarea>
                       <input type="submit" id="submit" value="Post"/>
                     </form>
                   </div>
                 </div>;
        
  return(
    <div id="personal-page">
      <div id="header">
        
       <form enctype="multipart/form-data" id="send-pic"> {/* action="/api/upload" method="POST" */}
          <input name="upfile" id="upfile" type="file" />
          <input type="submit" value="Submit"/>
       </form> 
        
      </div>
      <div id="info">
        <div id="avatar"><img src="https://res.cloudinary.com/techsnips/image/fetch/w_2000,f_auto,q_auto,c_fit/https://adamtheautomator.com/content/images/size/w2000/2019/10/user-1633249_1280.png"/></div>
        <div id="bio"></div>
      </div>
      <div className="posts">
        <ul id="list">
          {post}
        </ul>
        <button id="new-post" className="add">+ Add</button>
      </div>
      {modal}
    </div>
  )}
}

export default Mainpage