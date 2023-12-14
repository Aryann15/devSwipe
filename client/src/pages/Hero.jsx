import React from "react";
import hero from "./hero.mp4";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="video-background">
      <video autoPlay muted loop className="video">
        <source src={hero} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <h1>Welcome to My Website</h1>
        <p>Enjoy the video background effect!</p>
        <button style={{ backgroundColor: "white" }}>Click me</button>
      </div>
    </div>
  );
};

export default Hero;
