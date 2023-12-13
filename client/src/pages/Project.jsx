import React, { useState, useEffect } from "react";

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleLike = (projectId) => {
    
    const userId = 13; // Replace with your actual user ID

    fetch(`http://127.0.0.1:5001/projects/like?userId=${userId}&projectId=${projectId}`, {
      method: 'POST',
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Already liked');
      }
    })
    .then((data) => {
      // Update the projects state with the new likes count
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, likes: data.likesCount } : project
        )
      );
    })
    .catch((error) => {
      console.error('Error liking project:', error);
      alert('You already liked this project');
    });
  };
  

  return (
    <div>
      <h1>View Projects</h1>
      <div className="leaderboard">
        {/* Leaderboard stats (purple box) */}
        <div className="leaderboard-stats" style={{ backgroundColor: "purple" }}></div>
      </div>
      {projects.map((project) => (
        <div key={project.id} className="project">
          <h3>{project.title}</h3>
          <p>Likes: {project.likes.count}</p>
          <button onClick={() => handleLike(project.id)}>Like</button>
        </div>
      ))}

      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <ul>
          {projects
            .sort((a, b) => b.likes - a.likes) // Sort projects by likes in descending order
            .map((project) => (
              <li key={project.id}>
                <span className="project-title">{project.title + "    "}</span>
                <span className="like-count">{project.likes.count} Likes</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Project;
