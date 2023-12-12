import React, { useEffect, useState } from "react";

// const userId = 95

const ConnectionsPage = () => {
  const userId = 95
  const [recData ,setRecData] = useState ([])
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5001/connections/${userId}`)
      .then((response) => response.json())
      .then((connectionsData) => {
        console.log(connectionsData)
        setConnections(connectionsData);
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
  
  
  return (
    <div>
      <h1>Connections</h1>
      <ul>
        {connections.map((connection) => (
          <li key={connection.userId}>
            {connection.status === "pending" && (
              <div>
                <p>{`Connection request from ${connection.userId}`}</p>
                {/* <button onClick={() => handleAccept(connection.id)}>Accept</button> */}
                {/* <button onClick={() => handleReject(connection.id)}>Reject</button> */}
              </div>
            )}
            {connection.status === "accepted" && (
              <p>{`${connection.name} is now your connection`}</p>
            )}
            {connection.status === "rejected" && (
              <p>{`Connection request from ${connection.name} has been rejected`}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectionsPage;
