import React from "react";
import "./Mainpage.css";

class Mainpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      headerImage: "",
      editable:false
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
    document.getElementById("posts").addEventListener("click",e=>this.expandText(e));
    //document.getElementById("list").addEventListener("click",e=>this.expandText(e));
  }
                        

  getData(e){
    let that = this;   //workaround for "this" keyword to access state inside fetch
    e.preventDefault();
    async function dat(){
      try {
        let response = await fetch("/api");
        let resp = await response.json(); //our response; from here update avatar, header and posts
        document.getElementById("header").style.background = "url(" + resp.image + ") no-repeat";
        document.getElementById("avatar-img").setAttribute("src",resp.src);
        console.log(resp);
        resp.data.map(post=>{
          const isShort = post.text.length>600 ? post.text.slice(0,510)+'<a id='+post.datePosted+'>...Expand text</a>':post.text;
          let prevState = that.state.posts;
          that.setState({posts:prevState.concat({listId:post._id, title:post.title, text:post.text, textId:post.datePosted, closeId:post.postId})});
          //console.log(that.state.posts)
          return document.getElementById('list').innerHTML+='<li id='+post.id+'><div className="list-item-parent"><h4>'+post.title+'</h4><button id='+post.postId+'>&times;</button><p name='+post.datePosted+'>'+isShort+'</p></div></li>'})
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
      console.log("RESPONSE of ADD is ");
      console.log(resp)
      //updating state for it to have added post info
      that.setState({posts:prevState.concat({listId:resp.id, title:resp.title, text:resp.text, textId:resp.datePosted, closeId:resp.postId})});
      //rendering list elements with new post
      document.getElementById('list').innerHTML +='<li id='+resp.id+'><div className="list-item-parent"><h4>'+resp.title+'</h4><button id='+resp.postId+'>&times;</button><p name='+resp.datePosted+'>'+resp.text+'</p></div></li>'
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
  
  expandText=(e)=>{
    //We check if button was pressed inside #posts div; We are not using 'click' listener on buttons
    //because they might not be rendered yet at the time of check
    let prevState = this.state.posts;
    const that = this;
    console.log(e.target.id)
    console.log("STATE is")
    console.log(prevState)
    that.state.posts.map((post)=>{
      if(e.target.id==post.id){
        document.getElementById(e.target.id).style.display="none";
        return document.getElementsByName(e.target.id)[0].innerText=post.text
      } 
      else if(e.target.id==post.closeId){
        console.log(post)
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
          const newState = prevState.filter(list=>{return list.listId!==post.listId})
          that.setState({posts:newState});
          let list = document.getElementById("list");
          let li_nested = document.getElementById(post.listId);
          console.log(list);
          console.log(li_nested)
          return list.removeChild(li_nested);
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
            <input type="text" id="post-title" maxlength="35" required/>
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
            <ul id="bio-list" >
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
