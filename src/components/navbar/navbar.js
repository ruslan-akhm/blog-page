import React, { useState, useEffect, useContext, useRef } from "react";
import { PostContext } from "../../context/postContext";
import { Link } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const { isLogged, setIsLogged, authorID, setAuthorID } = useContext(
    PostContext
  );
 
  const suka = useRef();
  
  useEffect(()=>{
    console.log(suka.current)
  },[suka.current])

  return (
   
    <div className="navbar">
      <Link className="nav-links" to="/">
        #PersonalBlog
      </Link>
       {!isLogged ? null : (
        <Link className="nav-links" to={`/users/${authorID}`} ref={suka}>
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
