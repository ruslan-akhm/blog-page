import React, { useState, useContext, useEffect } from "react";
import { PostContext } from "../../context/postContext";
import postService from "../../services/postService";
import "./addPost.css";

function AddPost(props) {
  const { post, setPost } = useContext(PostContext);
  const [isTextfield, setIsTextfield] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [isAuthor, setIsAuthor] = useState();

  useEffect(() => {
    setIsAuthor(props.isAuthor);
  }, [props]);

  //open & close text field
  const handleTextfield = () => {
    if (!isTextfield) {
      document.getElementById("post-input-box").style.display = "flex";
      setIsTextfield(true);
    } else {
      document.getElementById("post-title").value = "";
      document.getElementById("post-text").value = "";
      document.getElementById("post-input-box").style.display = "none";
      document.getElementById("attachment-preview-box").style.display = "none";
      setImagePreview([]);
      setIsTextfield(false);
    }
  };

  //preview files to be upload
  const previewAttachment = e => {
    document.getElementById("attachment-preview-box").style.display = "flex";
    let arrayOfAttachments = [...imagePreview];
    for (let i = 0; i < e.target.files.length; i++) {
      arrayOfAttachments.push(e.target.files[i]);
    }
    setImagePreview(() => {
      return arrayOfAttachments;
    });
  };

  //delete files to be upload before actual upload (from preview section)
  const removeAttachment = e => {
    console.log(e);
    let attachments = [...imagePreview];
    let filteredAttachments = attachments.filter(item => {
      return item.name !== e;
    });
    setImagePreview(() => {
      return filteredAttachments;
    });
  };

  const addPost = e => {
    e.preventDefault();
    document.getElementById("loading-anim").style.display = "block"; //turn on loading animation
    const fd = new FormData();
    const attachments = imagePreview; //document.getElementById("attachments");
    if (attachments !== null) {
      for (let file of attachments) {
        //.files
        fd.append("attachments", file);
      }
    }
    let title = document.getElementById("post-title").value;
    let text = document.getElementById("post-text").value;
    fd.append("attachments", title);
    fd.append("attachments", text);
    postService.addPost(fd).then(data => {
      console.log("ReSPONSE");
      console.log(data);
      let prevState = post;
      prevState = [data, ...post];
      setPost(prevState);
      document.getElementById("loading-anim").style.display = "none";
    });
    handleTextfield();
  };

  let filePreview =
    imagePreview &&
    imagePreview.map(item => {
      return (
        <div className="preview">
          <img src={URL.createObjectURL(item)} />
          <button onClick={e => removeAttachment(item.name)}>&#10006;</button>
        </div>
      );
    });

  return (
    <div>
      {isAuthor ? (
        <>
          <button id="add-post" className="add" onClick={handleTextfield}>
            {isTextfield ? "Close" : "+ New Post"}
          </button>
          <div id="post-input-box">
            <input
              type="text"
              id="post-title"
              maxLength="35"
              required
              placeholder="Title goes here..."
            />
            <textarea
              rows="8"
              cols="20"
              id="post-text"
              placeholder="Once upon a time..."
              wrap="off"
            ></textarea>
            <div id="attachment-preview-box">{filePreview}</div>
            <div className="action-btn-box">
              <button onClick={addPost}>Post</button>
              <input
                className="custom-input attach"
                type="file"
                accept="image/*"
                onChange={e => previewAttachment(e)}
                multiple
              />
            </div>
          </div>
          <div id="loading-anim">
            <div className="spinner-1"></div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default AddPost;
