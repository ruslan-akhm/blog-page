import React from "react";
import "./Mainpage.css";

class Mainpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      headerImage: ""
    };
    this.newPost = this.newPost.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateHeader = this.updateHeader.bind(this);
    this.addPost = this.addPost.bind(this);
    this.updateAvatar=this.updateAvatar.bind(this);
    this.getData=this.getData.bind(this);
    this.modifyText=this.modifyText.bind(this);
    this.toDefault=this.toDefault.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
                        
  getData(){
    let that = this;   //workaround for "this" keyword to access state inside fetch
    async function dat(){
      try {
        let response = await fetch("/api");
        let resp = await response.json(); //our response; from here update avatar, header and posts
        document.getElementById("header").style.background = "url(" + resp.image + ")";
        document.getElementById("header").style.backgroundSize = "cover";
        document.getElementById("avatar-img").setAttribute("src",resp.src);
        resp.data.map(post=>{
          //Hide part of long text and add "Expand text" button
          const isShort = post.text.length>600 ? post.text.slice(0,510)+'<a id='+post.datePosted+'>...Expand text</a>':post.text;
          let prevState = that.state.posts;
          let date = new Date(parseInt(post.datePosted));
          date = date.toLocaleDateString();
          that.setState({posts:prevState.concat({listId:post._id, title:post.title, text:post.text, textId:post.datePosted, closeId:post.postId})});
          return document.getElementById('list').innerHTML+='<li id='+post._id+'><div className="list-item-parent"><h4>'+post.title+'</h4><button id='+post.postId+'>&times;</button><p name='+post.datePosted+'>'+isShort+'</p></div><span>posted '+date+'</span></li>'})
      } catch (err) {
        console.log(err);
      }
    }
    dat();
  }
  
  updateHeader(e) {
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
  
  updateAvatar(e){
    e.preventDefault();
    async function ava() {
      let fd = new FormData();
      let avatarImage = document.getElementById("avatarfile").files[0];
      fd.append("avatarfile", avatarImage);
      try {
        let response = await fetch("/api/avatar", {
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          body: fd
        });
        let resp = await response.json();
        document.getElementById("avatar-img").setAttribute("src",resp.src);
      } catch (err) {
        console.log(err);
      }
    }
    ava();
  }
  
  addPost=(e)=>{
    let prevState = this.state.posts; //our initial posts array 
    let that = this;   //workaround for "this" keyword to access state inside fetch 
    e.preventDefault();
    async function add() {
      const fd = new FormData();
      const attachments = document.getElementById("attachments");
      for (let file of attachments.files){
        fd.append('attachments',file)
      }
      console.log(fd)
      let title = document.getElementById("post-title").value;
      let text = document.getElementById("post-text").value;
      let response = await fetch("/api/post", {
        method: "POST",
        headers: {
          Accept: "application/json"
          //"Content-Type": "application/json"
        },
        //JSON.stringify({ title: title, text: text }),
        //JSON.stringify({ title: title, text: text, attachments:fd }),
        body: fd
      });
      let resp = await response.json();
      console.log("RESPONSE of ADD is ");
      console.log(resp)
      //updating state for it to have added post info
      that.setState({posts:prevState.concat({listId:resp.id, title:resp.title, text:resp.text, textId:resp.datePosted, closeId:resp.postId})});
      //rendering list elements with new post
      let date = new Date(parseInt(resp.datePosted));
      date = date.toLocaleDateString();
      document.getElementById('list').innerHTML +='<li id='+resp.id+'><div className="list-item-parent"><h4>'+resp.title+'</h4><button id='+resp.postId+'>&times;</button><p name='+resp.datePosted+'>'+resp.text+'</p></div><span>posted '+date+'</span></li>'
      //leave input fileds blank
      document.getElementById("post-title").value='';
      document.getElementById("post-text").value='';
      document.getElementById("modal-parent").style.display="none"
    }
    add();
  }

  newPost() {
    document.getElementById("modal-parent").style.display = "block";
  }
  
  modifyText=(e)=>{
    //We check if button was pressed inside #posts div; We are not using 'click' listener on buttons
    //because they might not be rendered yet at the time of check
    let prevState = this.state.posts;
    const that = this;
    that.state.posts.map((post)=>{
      if(e.target.id==post.textId){
        //expand Text
        document.getElementById(e.target.id).style.display="none";
        return document.getElementsByName(e.target.id)[0].innerText=post.text
      } 
      else if(e.target.id==post.closeId){
        //delete post
        async function deletePost(){
          let response = await fetch("/api/delete", {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({id:post.closeId})
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

  closeModal(event) {
    const click = event.target;
    const modal = document.getElementById("modal-parent");
    const later = document.getElementById("later-button");
    if (click === modal||click===later) {
      modal.style.display = "none";
    }
  }

  toDefault(e){
    e.preventDefault();
    document.getElementById('list').innerHTML='';
    this.setState({posts:[]})
    const that = this;
    async function def(){
      try {
        let response = await fetch("/api/default");
        let resp = await response.json(); //our response; from here update avatar, header and posts
        document.getElementById("header").style.background = "url(" + resp.image + ")";
        document.getElementById("header").style.backgroundSize = "cover";
        document.getElementById("avatar-img").setAttribute("src",resp.src);
        console.log(resp);
        resp.data.map(post=>{
          const isShort = post.text.length>600 ? post.text.slice(0,510)+'<a id='+post.datePosted+'>...Expand text</a>':post.text;
          let prevState=that.state.posts;
          that.setState({posts:prevState.concat({listId:post._id, title:post.title, text:post.text, textId:post.datePosted, closeId:post.postId})});
          let date = new Date(parseInt(post.datePosted));
          date = date.toLocaleDateString();
          return document.getElementById('list').innerHTML+='<li id='+post._id+'><div className="list-item-parent"><h4>'+post.title+'</h4><button id='+post.postId+'>&times;</button><p name='+post.datePosted+'>'+isShort+'</p></div><span>posted '+date+'</span></li>'})
      } catch (err) {
        console.log(err);
      }
    }
    def();
  }

  render() {
    const modal = (
      <div id="modal-parent" onClick={this.closeModal}>
        <div id="modal-content">
          <form id="new-post" className="add-post-form" onSubmit={e=>this.addPost(e)}>
            <label>Title:</label>
            <input type="text" id="post-title" maxlength="35" required/>
            <label>Post:</label>
            <textarea rows="18" id="post-text"></textarea>
            <input name="attachments" id="attachments" type="file" className="custom-input attach-btn" accept="image/*" multiple/>
            <input type="submit" id="submit" value="Post" />
          </form>
          <button id="later-button">Maybe later</button>
        </div>
      </div>
    );

    return (
      <div id="personal-page">
        <div id="header">
          <form enctype="multipart/form-data" id="send-pic">
            <input name="upfile" id="upfile" type="file" className="custom-input" accept="image/*" onChange={e=>this.updateHeader(e)}/>
          </form>
        </div>
        <div id="info">
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
        </div>
        <div className="posts" id="posts" onClick={e=>this.modifyText(e)}>
          <ul id="list"></ul>  {/*post*/}
          <button id="add-post" className="add" onClick={this.newPost}>
            + Add Post
          </button>
          <button id="default" onClick={e=>this.toDefault(e)}>To Default</button>
        </div>
        {modal}
      </div>
    );
  }
}

export default Mainpage;
