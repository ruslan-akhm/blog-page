import React, { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([]);
  const [header, setHeader] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState({ name:"", highlights: ["","",""], info: "" });
  const [isLogged, setIsLogged] = useState(false);

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
          setIsLogged
        }}
      >
        {children}
      </PostContext.Provider>
    </div>
  );
};
