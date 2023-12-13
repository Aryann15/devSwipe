import React, { Children, useEffect, useState } from "react";

// const userId = 95

const ConnectionsPage = () => {
  const userId = 95;
  const [reqData, setReqData] = useState([]);
  const [connections, setConnections] = useState([]);

  const handleAccept = (userId) => {
    // Logic for accepting the connection request
    console.log(`Accepted connection request from user ID ${userId}`);
  };
  
  const handleReject = (userId) => {
    // Logic for rejecting the connection request
    console.log(`Rejected connection request from user ID ${userId}`);
  };
  useEffect(() => {
    fetch(`http://127.0.0.1:5001/connections/${userId}`)
      .then((response) => response.json())
      .then((connectionRequests) => {
        const userIds = connectionRequests.map((request) => request.userId);
        setConnections(userIds);
        console.log("User IDs:", userIds);

        fetch("http://127.0.0.1:5001/api/userDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds }),
        })
          .then((response) => response.json())
          .then((userDetails) => {
            console.log("User Details:", userDetails);
            setReqData(userDetails);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching connections:", error);
      });
  }, [userId]);

  return (
    <div>
      <h1>Connections</h1>
      <ul>
        {reqData.map((user) => (
          <li key={user.id}>
            <p>{`User ID: ${user.id}, Name: ${user.name}, Age: ${user.age}`}</p>
            <button onClick={() => handleAccept(user.id)}>Accept</button>
            <button onClick={() => handleReject(user.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectionsPage;
