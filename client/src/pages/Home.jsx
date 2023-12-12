import React, { useEffect, useState } from "react";

// const userId = 95

const ConnectionsPage = () => {
  const userId = 95
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5001/connections/${userId}`)
      .then((response) => response.json())
      .then((connectionsData) => {
        console.log(connectionsData)
        setConnections(connectionsData);
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
