import React, { useState, useEffect } from "react";

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the backend
    fetch("http://127.0.0.1:5001/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleLike = (projectId) => {
    // Check if the user has already liked this project
    const likedProjects = JSON.parse(localStorage.getItem("likedProjects")) || [];
    if (likedProjects.includes(projectId)) {
      console.log("Already liked this project");
      return;
    }

    // Update local state
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, likes: project.likes + 1 } : project
    );
    setProjects(updatedProjects);

    // Update liked projects in local storage
    localStorage.setItem("likedProjects", JSON.stringify([...likedProjects, projectId]));

    // Send the like to the backend
    fetch("http://127.0.0.1:5001/projects/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.message))
      .catch((error) => console.error("Error updating project like:", error));
  };

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
        {projects
          .sort((a, b) => b.likes - a.likes) // Sort projects by likes in descending order
          .map((project) => (
            <li key={project.id}>
              <span className="project-title">{project.title +" =  "}</span>
              <span className="like-count">{project.likes} Likes</span>
            </li>
          ))}
      </ul>
    </div>
    </div>
  );
};

export default Project;
