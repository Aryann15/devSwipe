import React, { useEffect, useState } from "react";

// const userId = 95

const ConnectionsPage = () => {
  const userId = 95
  const [reqData ,setReqData] = useState ([])
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5001/connections/${userId}`)
      .then((response) => response.json())
      .then((connectionsData) => {
        console.log(connectionsData)
        setConnections(connectionsData);

        const userIds = connectionRequests.map((request) => request.userId);

        // Fetch user details for the requesters
        fetch("http://127.0.0.1:5001/api/userDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds }),
        })
          .then((response) => response.json())
          .then((userDetails) => {
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
      {connections.map((connection) => (
          <li key={connection.userId}>
            {connection.status === "pending" && reqData.length > 0 && (
              <div>
                <p>{`Connection request from user ${connection.userId} (${reqData.find(user => user.id === connection.userId)?.name})`}</p>

              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectionsPage;
