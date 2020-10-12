import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/authService";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([]);
  const [header, setHeader] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState({ name: "", highlights: [], info: "" }); //["","",""]
  const [isLogged, setIsLogged] = useState();
  const [userID, setUserID] = useState("");//userID is id of a user whose page is being visited
  const [authorID, setAuthorID] = useState("");//authorID is authenticated user id

  useEffect(() => {
    AuthService.isAuthenticated().then(data => {
      //setUser(data.user);
      setIsLogged(data.isAuth);
      //setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      <PostContext.Provider
        value={{
          post,
          setPost,
          header,
          setHeader,
          avatar,
          setAvatar,
          bio,
          setBio,
          isLogged,
          setIsLogged,
          userID,
          setUserID,
            authorID,
            setAuthorID
        }}
      >
        {children}
      </PostContext.Provider>
    </div>
  );
};
