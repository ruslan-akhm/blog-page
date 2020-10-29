import React, { useContext } from "react";
import { PostContext } from "../../context/postContext";
import "./navbar.css";

const Navbar = () => {
  const { isLogged, setIsLogged, authorID, setAuthorID } = useContext(
    PostContext
  );

  return (
    <div className="navbar">
      <a className="nav-links" href="/">
        #PersonalBlog
      </a>
      {!isLogged ? (
        <a className="nav-links" href="/login">
          Login
        </a>
      ) : (
        <a className="nav-links" href={`/users/${authorID}`}>
          My Page
        </a>
      )}
      {!isLogged ? (
        <a className="nav-links" href="/register">
          Register
        </a>
      ) : (
        <a className="nav-links" href="/settings">
          Settings
        </a>
      )}
    </div>
  );
};

export default Navbar;
