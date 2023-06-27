import React from "react";
import "./PostsForm.css";

const PostForm = ({ post: { title, body, imgUrl, author, link }, index }) => {
  
    const handleSeeMoreClick = (event) => {
      // Oprire acțiunea implicită de redirectare
      event.preventDefault();
  
      // Deschidere link într-un nou tab
      window.open(link, "_blank");
    };
  
    return (
      <div className="post-container">
        <h1 className="heading">{title}</h1>
        <img className="image" src={imgUrl} alt="post" />
        <p>{body}</p>
        <div className="info">
          <h4>Written by: {author}</h4>
          
            <a href={link} onClick={handleSeeMoreClick} target="_blank" rel="noopener noreferrer">
            See more here
            </a>
        </div>
      </div>
    );
  };
  
export default PostForm;