import React from "react";
import { Link } from "react-router-dom"; 



function Banner() {
  return (
    <header className="banner">
      <div className="banner_contents">
        <h2 className="banner_title">
          Practice Japanese reading effortlessly.
        </h2>
        <Link to="/about"> 
          <button variant="outlined" className="banner_button">
            Read More
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Banner;
