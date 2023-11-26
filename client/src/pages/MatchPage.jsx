import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./MatchPage.css";

const MatchPage = () => {
  const [recArr, setRecArr] = useState([]);
  const userId = 1;

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };

  useEffect(() => {
    // Fetch user recommendations
    fetch(`http://127.0.0.1:5000/api/recommendations?id=${userId}`)
      .then((response) => response.json())
      .then((userIds) => {
        // Fetch user details based on recommendations
        fetch("http://127.0.0.1:5001/api/userDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds }),
        })
          .then((response) => response.json())
          .then((userDetails) => {
            console.log(userDetails);
            setRecArr(userDetails);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  }, [userId]);
  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {recArr &&
          recArr.map((rec, index) => (
            <TinderCard
              className="swipe"
              key={index}
              // preventSwipe={}
              onSwipe={(dir) => swiped(dir, rec.name)}
              onCardLeftScreen={() => outOfFrame(rec.name)}
            >
              <div className="card">
                <div
                  className="image-card"
                  style={{
                    backgroundImage: rec
                      ? `url(${rec.profilePicture})`
                      : "none",
                  }}
                ></div>
                <div className="info-container">
                  {rec && (
                    <div className="info">
                      <h1>{rec.name}</h1>
                      <h2>{rec.age}</h2>
                      <h3>{rec.profession}</h3>
                      <h4>{rec.aboutme}</h4>
                    </div>
                  )}
                </div>
              </div>
            </TinderCard>
          ))}
      </div>
    </div>
  );
};

export default MatchPage;
