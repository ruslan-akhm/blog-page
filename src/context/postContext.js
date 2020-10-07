import React, { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([]);
  const [header, setHeader] = useState("");
  const [avatar, setAvatar] = useState("scsdcsdcsdcd");
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
          isLogged,
          setIsLogged
        }}
      >
        {children}
      </PostContext.Provider>
    </div>
  );
};
