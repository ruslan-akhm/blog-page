import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import postService from "../../services/postService";
import { PostContext } from '../../context/postContext'
import "./homepage.css";

function Homepage() {
  const {userID, setUserID, authorID, setAuthorID} = useContext(PostContext);
  const [filter, setFilter] = useState();
  const [users, setUsers] = useState();
  const [list, setList] = useState([]);

  useEffect(() => {
    getData();
    //console.log(userID);
    console.log(authorID);
  }, []);

  //get list of users (avatar, name, number of posts)
  const getData = () => {
    postService.getAllUsers().then(data => {
      if (data.success == false) {
        return;
      }
      setUsers(data.usersInfo);
      setList(data.usersInfo);
    });
  };

  //handle filtering list of users!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const inputChange = e => {
    setFilter(e.target.value);
  };

  let userList =
    list &&
    list.map(user => {
      return (
        <a href={"/users/"+user.id}>
          <div className="user-card">
            <div className="user-card-img">
              <img src={user.avatar} alt="user's avatar" />
            </div>
            <h4>{user.name}</h4>
            <p>posts: {user.posts} </p>
          </div>
        </a>
      );
    });

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
            <input type="text" onChange={inputChange} placeholder="DOESNT WORK YET/find user" />
          </div>
          <span>{list.length<1 ? "No users found..." : null}</span>
          <div className="users-list">
            <ul>{userList}</ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
