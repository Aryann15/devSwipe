import React from "react";
import hero from "./hero.mp4";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="video-background">
      

      <div className="content">
        <h1>Welcome to My Website</h1>
        <p>Enjoy the video background effect!</p>
        <button style={{ backgroundColor: "white" }}>Click me</button>
      </div>
    </div>
  );
};

export default Hero;
