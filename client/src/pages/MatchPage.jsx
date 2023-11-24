import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";


const  MatchPage = () => {


  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };

  return (
    <div> MatchPage</div>
  )
}

export default  MatchPage