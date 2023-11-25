import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

const MatchPage = () => {
  const [recArr, setRecArr] = useState([]);
  const userId = 1;
  const arr = [];

  useEffect(() => {
    // Fetch user recommendations
    fetch(`http://127.0.0.1:5000/api/recommendations?id=${userId}`)
      .then((response) => response.json())
      .then((userIds) => {
        // Fetch user details based on recommendations
        fetch('http://127.0.0.1:5001/api/userDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userIds }),
        })
          .then((response) => response.json())
          .then((userDetails) => {
            console.log(userDetails)
            setRecArr(userDetails);

          })
          .catch((error) => {
            console.error('Error fetching user details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
      });
  }, [userId]);
    return (
      <div>
      {recArr.map(rec => (
        <>
            <h3>{rec.name}</h3>
            <h3>{rec.age}</h3>
            <h3>{rec.profession}</h3>
            </>))}  
   </div>  
    )
  }

export default MatchPage;
