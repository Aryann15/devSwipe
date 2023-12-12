import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./MatchPage.css";

const MatchPage = () => {
  const [recArr, setRecArr] = useState([]);
  const [targetUserId , setTargetUserId] = useState ()
  const userId = 1;


  const outOfFrame = (name) => {
    // console.log(name + " left the screen");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get("userId");
    fetch(`http://127.0.0.1:5000/api/recommendations?id=${userId}`)
      .then((response) => response.json())
      .then((userIds) => {
        console.log(userIds)
        fetch("http://127.0.0.1:5001/api/userDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds}),
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

  const swiped = (direction, name, id) => {
    console.log(`swiped ${direction} on` + id);
    if (direction === "up") {
      console.log("targetId and name: " + id, name);
      setTargetUserId(id);
    }
    const cardContainer = document.querySelector(".cardcd");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userId =  parseInt(queryParams.get("userId"), 10);
    if (targetUserId) {
      fetch("http://127.0.0.1:5001/connections/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, targetUserId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Error sending connection request:", error);
        });
    }
  }, [targetUserId]);

    return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {recArr &&
          recArr.map((rec, index) => (
            <TinderCard
              className="swipe"
              key={index}
              preventSwipe={['left', 'right']}
              onSwipe={(dir) => swiped(dir, rec.name , rec.id)}
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
                      <h1 className="name">{rec.name}</h1>
                      <h2 className="age">{rec.age}</h2>
                      <h3 className="profession">{rec.profession}</h3>
                      <h4 className="aboutme">{rec.aboutme}</h4>
                      <h4 className="techFields">{rec.techFields}</h4>
                      <h3 className="experience"> {rec.experience}</h3>
                      <h4 className="languages">{rec.languages}</h4>
                      <h4 className="skills">{rec.skills}</h4>
                      <h4 className="goals">{rec.goals}</h4>
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
