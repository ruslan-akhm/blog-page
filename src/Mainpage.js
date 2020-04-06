import React from 'react';
import './Mainpage.css';


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
    this.addPost=this.addPost.bind(this)
  }
  
  componentDidMount(){
  document.getElementById("new-post").addEventListener('click',this.addPost)
  }
  
  addPost(){
    let output = '';
    this.state.posts.forEach(post=>{
      output+=`<li>${post.title}</li>`
    })  
    document.getElementsByClassName('posts')
  }
  
  render(){
  const post = '';
  return(
    <div id="personal-page">
      <div id="header">
      </div>
      <div id="info">
        <div id="avatar"><img src="https://res.cloudinary.com/techsnips/image/fetch/w_2000,f_auto,q_auto,c_fit/https://adamtheautomator.com/content/images/size/w2000/2019/10/user-1633249_1280.png"/></div>
        <div id="bio"></div>
      </div>
      <div className="posts">
        <ul>
          {post}
        </ul>
        <button id="new-post" className="add">+ Add</button>
      </div>
    </div>
  )}
}

export default Mainpage