import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material"; // Import Button from MUI

function Banner() {
  // Inline styles for the background image
  const bannerStyles = {
    backgroundImage: "url('/Banner.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    height: '400px',
    position: 'relative'
  };

  return (
    <header className="banner" style={bannerStyles}>
      <div className="banner_contents">
        <Typography variant="h1" component="h1" style={{ fontFamily: 'Inria Serif', fontStyle: 'italic', fontWeight: 700 }}>
          Practice Japanese reading effortlessly.
        </Typography>
        <Link to="/about"> 
          <button variant="outlined" className="banner_button" sx={{mg: '1rem'}}>
            Read More
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Banner;