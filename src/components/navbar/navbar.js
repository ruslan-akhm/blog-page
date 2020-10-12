import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../context/postContext";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  
  const { isLogged, setIsLogged, authorID, setAuthorID } = useContext(PostContext);

  return (
    <div className="navbar">
      <Link className="nav-links" to="/">
        #PersonalBlog
      </Link>
     {/*} {!isLogged ? null : (
        <Link className="nav-links" to="/settings">
          Settings
        </Link>
      )} */}
      {!isLogged ? (
        <Link className="nav-links" to="/login">
          Login
        </Link>
      ) : <Link className="nav-links" to="/settings">
          Settings
        </Link>}
      {!isLogged ? (
        <Link className="nav-links" to="/register">
          Register
        </Link>
      ) : <Link className="nav-links" to={"/users/"+authorID}>
          My Page
        </Link>}
    </div>
  );
};

export default Navbar;
