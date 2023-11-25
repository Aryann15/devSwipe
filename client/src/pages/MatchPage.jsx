import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

const MatchPage = () => {
  const [recArr, setRecArr] = useState([]);
  const userId = 1;
  const arr = [];

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/recommendations?id=${userId}`)
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  }, [userId]);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };

  return (
    <div className="match-page">
      <h1>Recommendations</h1>
      <p>{recArr}</p>
    </div>
  );
};

export default MatchPage;
