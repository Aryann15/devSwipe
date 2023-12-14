import React from "react";
import hero from "./hro.png";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <img src={hero} alt="" className="hero-image" />
      <div className="content">
        <h1 className="title">DevConnect</h1>
        <h3>
          Elevate your networking experience in the tech world - Swipe, Connect,
          and Chat with like-minded developers effortlessly🚀
        </h3>
        <br /><br />
        <button className="login">Login</button>
        <button className="signup">Signup</button>
      </div>
    </div>
  );
};

export default Hero;
