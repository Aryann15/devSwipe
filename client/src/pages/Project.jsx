import React, { useState, useEffect } from "react";

const Project = () => {
  const [projects, setProjects] = useState([]);

  
  return (
    <div>
      <h1>View Projects</h1>
      <div className="leaderboard">
        {/* Leaderboard stats (purple box) */}
        <div className="leaderboard-stats" style={{ backgroundColor: "purple" }}>
         
        </div>
      </div>
      {projects.map((project) => (
        <div key={project.id} className="project">
          <h3>{project.title}</h3>
          <p>Likes: {project.likes}</p>
          <button onClick={() => handleLike(project.id)}>Like</button>
        </div>
      ))}


      <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        
      </ul>
    </div>
    </div>
  );
};

export default Project;
