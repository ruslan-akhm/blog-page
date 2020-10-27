import React, { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import postService from "../../services/postService";
import { PostContext } from "../../context/postContext";
import "./homepage.css";

function Homepage() {
  const { userID, setUserID, authorID, setAuthorID } = useContext(PostContext);
  const [filter, setFilter] = useState();
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  //filtering by tags and name "rob otics"
  useEffect(() => {
    const tagRegex = new RegExp("^" + filter, "gi");
    let filteredList = [];
    const toFilter = [...users];
    //filter by username
    let filteredByName = toFilter.filter(user => {
      return user.name.match(tagRegex);
    });
    //filter by tags which are username split by space
    let filteredByTag = toFilter.filter(user => {
      return user.tags.map(tag => {
        if (tag.match(tagRegex) !== null && !filteredList.includes(user)) {
          return filteredList.push(user);
        }
      });
      return;
    });
    setList(() => {
      if (!filteredList || filteredList.length == 0) return filteredByName;
      else return filteredList;
    });
  }, [filter]);

  //get list of users (avatar, name, number of posts)
  const getData = () => {
    postService.getAllUsers().then(data => {
      if (data.success == false) {
        return;
      }
      //split name of a user and save into new Key(tags) for filtering
      data.usersInfo.map(user => {
        user.tags = user.name.split(" ");
      });
      setUsers(data.usersInfo);
      setList(data.usersInfo);
    });
  };

  //handle filter input field
  const inputChange = e => {
    setFilter(e.target.value);
  };

  let userList =
    list &&
    list.map(user => {
      return (
        <a href={"/users/" + user.id}>
          <div className="user-card">
            <div className="user-card-img">
              <img src={user.avatar} alt="user's avatar" />
            </div>
            <div className="user-card-info">
              <h4>{user.name}</h4>
              <p>posts: {user.posts} </p>
            </div>
          </div>
        </a>
      );
    });

  return (
    <div>
      <div id="homepage">
        <div className="introduction">
          <div className="intro-1">
            <h1>#PersonalBlog</h1>
          </div>
          <div className="intro-2">
            <p>
              Please login to create posts, modify your page and upload images.
              You can view other people pages and posts without logging in.
              <br />I encourage you to try to create posts yourself. To do that
              you need to register or (if you don't want to) just use guest
              account with email: guest@guest.com and password: guest
            </p>
          </div>
        </div>

        <div className="users-box">
          <div className="users-filter">
            <input
              type="text"
              onChange={inputChange}
              placeholder="find users"
            />
          </div>
          <span>{list.length < 1 ? "No users found..." : null}</span>
          <div className="users-list">
            <ul>{userList}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
