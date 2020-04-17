import React from "react";
import "./Mainpage.css";

class Mainpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      headerImage: "",
    };
    this.newPost = this.newPost.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateHeader = this.updateHeader.bind(this);
    this.addPost = this.addPost.bind(this);
    this.updateAvatar=this.updateAvatar.bind(this);
    this.getData=this.getData.bind(this);
    this.expandText=this.expandText.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', e=>{this.getData(e)});
    document.getElementById("upfile").addEventListener("change", e=>{this.updateHeader(e)});
    document.getElementById("avatarfile").addEventListener("change", e=>{this.updateAvatar(e)}); 
    document.getElementById("new-post").addEventListener("submit", (e)=>{this.addPost(e)});
    document.getElementById("add-post").addEventListener("click", this.newPost);
    document.getElementById("modal-parent").addEventListener("click", this.closeModal);
    document.getElementById("posts").addEventListener("click",e=>this.expandText(e))
  }
                        

  getData(e){
    let that = this;   //workaround for "this" keyword to access state inside fetch
    e.preventDefault();
    async function dat(){
      try {
        let response = await fetch("/api");
        let resp = await response.json(); //our response; from here update avatar, header and posts
        document.getElementById("header").style.background = "url(" + resp.image + ")";
        document.getElementById("avatar-img").setAttribute("src",resp.src);
        resp.data.map(post=>{
          const isShort = post.text.length>600 ? post.text.slice(0,500)+'<button id='+'"'+post.datePosted+'"'+'>expand</button>':post.text;
          let prevState = that.state.posts;
          that.setState({posts:prevState.concat({title:post.title, text:post.text, id:post.datePosted})});
          //console.log(that.state.posts)
          return document.getElementById('list').innerHTML+='<li><div className="list-item-parent"><h4>'+post.title+'</h4><p name='+'"'+post.datePosted+'"'+'>'+isShort+'</p></div></li>'})
      } catch (err) {
        console.log(err);
      }
    }
    console.log("state "+this.state.posts)
    dat();
    console.log("state "+this.state.posts)
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
      console.log("resp is = "+resp, typeof resp);
      const isShort = resp.text.length>600 ? resp.text.slice(0,500)+'<button id='+'"'+resp.datePosted+'"'+'>expand</button>':resp.text;
      //rendering list elements with new post
      document.getElementById('list').innerHTML +='<li><div className="list-item-parent"><h4>'+resp.title+'</h4><p name='+'"'+resp.datePosted+'"'+'>'+isShort+'</p></div></li>'
      //updating state for it to have added post info
      that.setState({posts:prevState.concat({title:resp.title, text:resp.text, id:resp.datePosted})})
      //leave input fileds blank
      document.getElementById("post-title").value='';
      document.getElementById("post-text").value='';
      document.getElementById("modal-parent").style.display="none"
    }
    add();
  }

  newPost() {
    document.getElementById("modal-parent").style.display = "block";
    console.log(this.state.posts);
  }
  
  expandText=(e)=>{
    //We check if button was pressed inside #posts div; We are not using 'click' listener on buttons
    //because they are not rendered yet at the time of check
    this.state.posts.map((post)=>{
      if(e.target.id==post.id){
        document.getElementById(e.target.id).style.display="none";
        return document.getElementsByName(e.target.id)[0].innerText=post.text
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
            <input type="text" id="post-title" maxlength="35"/>
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
            <input name="upfile" id="upfile" type="file" className="custom-input" accept="image/*"/>
          </form>
        </div>
        
        
        <div id="info">
          <div id="avatar">
            <img id="avatar-img" src='' />
            <input name="avatarfile" id="avatarfile" type="file" className="custom-input" accept="image/*"/>
          </div>
          <div id="bio">
            <ul id="bio-list">
              <li>Ruslan Akhmetshin</li>
              <li>Full-Stack Developer</li>
              <li>Toronto, ON</li>
            </ul>
            <p>I like creating things. Every app I do is more complex than previous one. I enjoy learning and applying technologies and seeing result of my work.</p>
          </div>
        </div>
        <div className="posts" id="posts">
          <ul id="list"></ul>  {/*post*/}
          <button id="add-post" className="add">
            + Add Post
          </button>
        </div>
        {modal}
      </div>
    );
  }
}

export default Mainpage;
