import React from "react";
import "./Mainpage.css";



class Mainpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      headerImage: "",
      test:''
    };
    this.newPost = this.newPost.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateHeader = this.updateHeader.bind(this);
    this.addPost = this.addPost.bind(this);
    this.updateAvatar=this.updateAvatar.bind(this);
    this.getData=this.getData.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load',e=>{this.getData(e)});
    document.getElementById("upfile").addEventListener("change", e=>{this.updateHeader(e)});
    document.getElementById("avatarfile").addEventListener("change", e=>{this.updateAvatar(e)}); 
    document.getElementById("new-post").addEventListener("submit", (e)=>{this.addPost(e)});
    document.getElementById("add-post").addEventListener("click", this.newPost);
    document.getElementById("modal-parent").addEventListener("click", this.closeModal);
  }

  getData(e){
    let prevState = this.state.posts;
    let that = this; //workaround for "this" keyword to access state inside fetch
    e.preventDefault();
    async function dat(){
      try {
        let response = await fetch("/api");
        let resp = await response.json();
        //console.log(resp.data, typeof resp)
        let data = resp.data.map(post=>{document.getElementById('list').innerHTML+='<li><div className="list-item-parent"><div className="list-item-title">'+post.title+'</div><div className="list-item-text">'+post.text+'</div></div></li>'})

            //resp.data.map(post=>{that.setState({posts:prevState.concat({title:post.title, text:post.text})})})
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
      } catch (err) {
        console.log(err);
      }
    }
    upd();
  }
  
  updateAvatar(e){
    
  }
  
  addPost=(e)=>{
    //let prevState = this.state.posts; //our initial posts array   if use STATE
    e.preventDefault();
    //let that = this;   //workaround for "this" keyword to access state inside fetch
    async function add() {
      let title = document.getElementById("post-title").value;
      let text = document.getElementById("post-text").value;
      let response = await fetch("/api/post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title, text: text })
      });
      let resp = await response.json();
      let success = await prevState.concat(resp);
      console.log("resp is = "+resp, typeof resp);
      
      //WITHOUT STATE 
      document.getElementById('list').innerHTML+='<li>'+'<div className="list-item-parent">'+'<div className="list-item-title">'+resp.title+'</div>'+'<div className="list-item-text">'+resp.text+'</div>'+'</div>'+'</li>'
      
      //WITH STATE
      //that.setState({posts: success});
      
      document.getElementById("post-title").value='';
      document.getElementById("post-text").value='';
      document.getElementById("modal-parent").style.display="none"
    }
    add();
  }

  newPost() {
    document.getElementById("modal-parent").style.display = "block";
  }
  

  closeModal(event) {
    const click = event.target;
    const modal = document.getElementById("modal-parent");
    const later = document.getElementById("later-button");
    if (click === modal||click===later) {
      modal.style.display = "none";
    }
  }

  render() {
    /*const state = this.state.posts;
    const post = state.map(post => {
      return(
        <li>
          <div className="list-item-parent">
            <div className="list-item-title">{post.title}</div>
            <div className="list-item-text">{post.text}</div>
          </div>
        </li>)});*/

    const modal = (
      <div id="modal-parent">
        <div id="modal-content">
          <form id="new-post" className="add-post-form">
            <label>Title</label>
            <input type="text" id="post-title" />
            <label>Post</label>
            <textarea rows="18" id="post-text"></textarea>
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
            <input name="upfile" id="upfile" type="file" className="custom-input"/>
          </form>
        </div>
        <div id="info">
          <div id="avatar">
            <img src={this.state.avatar} />
            <input name="avatarfile" id="avatarfile" type="file" className="custom-input"/>
          </div>
          <div id="bio"></div>
        </div>
        <div className="posts">
          <ul id="list">{/*post*/}</ul>
          <button id="add-post" className="add">
            + Add
          </button>
        </div>
        {modal}
      </div>
    );
  }
}

export default Mainpage;
