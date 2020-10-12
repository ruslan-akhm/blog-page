import React from "react";
import "./pageNotFound.css";

function PageNotFound() {
  return (
    <div id="not-found">
      <h1 style={{color:"white"}}>404 not found</h1>
      <p>Back to <a href="/">homepage</a></p>
    </div>
  );
}

export default PageNotFound;
