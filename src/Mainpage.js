import React from 'react';
import './Mainpage.css';


class Mainpage extends React.Component{
  constructor(props){
    super(props);
    
    this.addPost=this.addPost.bind(this)
  }
  
  componentDidMount(){
  document.getElementById("new-post").addEventListener('click',this.addPost)
  }
  
  addPost(){
    this.post += <li className="post"></li>;
    console.log(this.post)
  }
  
  render(){
  this.post = <li className="post"></li>
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
          {this.post}
        </ul>
        <button id="new-post" className="add">+ Add</button>
      </div>
    </div>
  )}
}

export default Mainpage