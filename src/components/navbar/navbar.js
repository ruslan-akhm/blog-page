import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../context/postContext";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  
  
  
  const { isLogged, setIsLogged } = useContext(PostContext);

  return (
    <div className="navbar">
      <Link className="nav-links" to="/">
        #PersonalBlog
      </Link>
      {!isLogged ? null : (
        <Link className="nav-links" to="/settings">
          Settings
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
