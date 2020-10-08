import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import postService from '../../services/postService'
//import { PostContext } from '../../context/postContext'
import "./homepage.css";

//need to store userID or _id on cookie; also /users/:user, where :user is = that id; 
//then -> compare cookie.user.id and query param id, if the same - isAuthor(true);

//IMAGES ARE CALLED FROM APPNEW-TEST-SAMPLE  -  FIX!!!!!!!!!!!!!!!!!!!!!

function Homepage() {
  //const {post,setPost,header,setHeader,avatar,setAvatar} = useContext(PostContext);
  const [filter, setFilter] = useState();
  const [users, setUsers] = useState();
  const [list, setList] = useState(users);

  useEffect(() => {
    getData();
  }, []);

  //get list of users (avatar, name)
  const getData = () => {
         //let posts = [];
         postService.getData().then(data=>{
           setUsers(data.usersInfo);
           //setAvatar(data.avatar);
           //posts = data.data.map(item=>item)
           //setPost(posts);
         })
  };

  const inputChange = e => {
    //console.log(e.target.value)
    setFilter(e.target.value);
    //console.log(filter);
  };

  //<Default />

  return (
    <div>
      <Navbar />
      <div id="homepage">
        <h1>Welcome to Personal Blog page</h1>
        <div className="introduction">
          <p>
            Please login to create posts, modify your page and upload images
          </p>
          <p>You can view other people pages and posts without logging in</p>
          <p>
            I encourage you to try to create posts yourself. To do that you need
            to register or (if you don't want to) just use guest account with
            email: guest@guest.com and password: guest
          </p>
        </div>
        <p>Check out other users</p>
        <div className="users-box">
          <div className="users-filter">
            <input type="text" onChange={inputChange} placeholder="find user"/>
          </div>
          <p>No users found...</p>
          <div className="users-list"></div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
