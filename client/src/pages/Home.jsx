import React, { useEffect, useState } from "react";

// const userId = 95

const ConnectionsPage = () => {

  
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
