import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../context/postContext";
import { Link, useHistory } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const { isLogged, setIsLogged, authorID, setAuthorID } = useContext(
    PostContext
  );
  const [myPage, setMyPage] = useState("");
  let history = useHistory();
  
  useEffect(()=>{
    setMyPage("/users/"+authorID);
  },[authorID])
  
  const toPage = () =>{
    console.log("PUSHING TO MY PAGE")
    history.push("/users/c0Jtld01M")
  }

  return (
   
    <div className="navbar">
      <Link className="nav-links" to="/">
        #PersonalBlog
      </Link>
       {!isLogged ? null : (
        <Link className="nav-links" onClick={toPage}>
          my page
        </Link>
      )} 
      {!isLogged ? (
        <Link className="nav-links" to="/login">
          Login
        </Link>
      ) : null}
      {!isLogged ? (
        <Link className="nav-links" to="/register">
          Register
        </Link>
      ) : null}
    </div>
     
  );
};

export default Navbar;
