import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";


const  MatchPage = () => {

  const [recommendations, setRecommendations] = useState([]);
  const userId = 1;

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/recommendations?id=${userId}`)
      .then((response) => response.text()) 
      .then((data) => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching recommendations:', error); 
      });
  }, [userId]);

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