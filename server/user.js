const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5001;

const userDetailsPath = "recommendation.json";
let userDetailsData = {};
try {
  const data = fs.readFileSync(userDetailsPath, "utf8");
  userDetailsData = JSON.parse(data);
} catch (error) {
  console.error("Error reading user details:", error);
}
app.use(cors());
app.use(bodyParser.json());

app.post("/api/userDetails", (req, res) => {
  const { userIds } = req.body;
  console.log(userIds);
  if (!userIds || !Array.isArray(userIds)) {
    return res.status(400).json({ error: "Invalid user IDs" });
  }
  const userDetails = userIds.map((userId) => {
    const user = userDetailsData[userId];
    return user
      ? {
          id: user.id,
          name: user.name,
          age: user.age,
          profession: user.profession,
          techFields: user.techFields,
          experience: user.experience,
          profilePicture: user.profilePicture,
          aboutme: user.aboutme,
          languages: user.programmingLanguages,
          skills: user.skills,
          goals: user.goals,
        }
      : null;
  });
  res.json(userDetails);
});

let recommendations = JSON.parse(
  fs.readFileSync("./recommendation.json", "utf-8")
);

app.post("/signup", (req, res) => {
  const newUser = req.body;

  const existingUser = recommendations.find(
    (user) => user.username === newUser.username
  );
  if (existingUser) {
    return res.status(403).json({ message: "User already exists" });
  }
  newUser.id = recommendations.length + 1;

  recommendations.push(newUser);
  fs.writeFileSync(
    "./recommendation.json",
    JSON.stringify(recommendations, null, 2)
  );
  res.json({ message: "User created successfully", user: newUser });
});

app.post("/onboarding", (req, res) => {
  console.log("received post req onboarding");
  const {
    userId,
    name,
    age,
    city,
    picture,
    aboutme,
    github,
    linkedin,
    language,
    selectedGoals,
    selectedSkills,
    field,
    experience,
    profession,
  } = req.body;
  const userIdNumber = parseInt(userId);
  const ageNumber = parseInt(age);
  const userToUpdate = recommendations.find((user) => user.id === userIdNumber);

  if (!userToUpdate) {
    return res.status(404).json({ message: "User not found" });
  }

  userToUpdate.city = city;
  userToUpdate.goals = selectedGoals;
  userToUpdate.experience = experience;
  userToUpdate.programmingLanguages = language;
  userToUpdate.skills = selectedSkills;
  userToUpdate.techFields = field;
  userToUpdate.profession = profession;
  userToUpdate.name = name;
  userToUpdate.age = ageNumber;
  userToUpdate.profilePicture = picture;
  userToUpdate.aboutme = aboutme;
  userToUpdate.github = github;
  userToUpdate.linkedin = linkedin;

  // console.log('userToUpdate:', userToUpdate);

  fs.writeFileSync(
    "./recommendation.json",
    JSON.stringify(recommendations, null, 2)
  );

  res.json({
    message: "Onboarding data updated successfully",
    user: userToUpdate,
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connnection requests

let connectionsData = JSON.parse(
  fs.readFileSync("./connections.json", "utf-8")
);

app.post("/connections/request", (req, res) => {
  const { userId, targetUserId } = req.body;

  const user = recommendations.find((user) => user.id === userId);
  const targetUser = recommendations.find((user) => user.id === targetUserId);
  console.log(userId);
  console.log(targetUserId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!targetUser) {
    return res.status(404).json({ message: "target user not found" });
  }

  const existingRequest = connectionsData.find(
    (conn) => conn.userId === userId && conn.targetUserId === targetUserId
  );

  if (existingRequest) {
    return res.status(400).json({ message: "Connection request already sent" });
  }
  connectionsData.push({ userId, targetUserId, status: "pending" });

  fs.writeFileSync(
    "./connections.json",
    JSON.stringify(connectionsData, null, 2)
  );

  res.json({ message: "Connection request sent successfully" });
});

app.get("/connections/:targetUserId", (req, res) => {
  const targetUserId = parseInt(req.params.targetUserId);

  if (!connectionsData || !Array.isArray(connectionsData)) {
    console.log("error data");
    return res.status(500).json({ error: "Invalid connections data" });
  }

  const connectionRequests = connectionsData
    .filter(
      (connection) =>
        connection.targetUserId === targetUserId &&
        connection.status === "pending"
    )
    .map((connection) => ({
      userId: connection.userId,
      status: connection.status,
    }));
  console.log(connectionRequests);
  res.json(connectionRequests);
});

app.post("/connections/update", (req, res) => {
  const updatedConnections = req.body;
  console.log(updatedConnections);
  // Validate input
  if (!Array.isArray(updatedConnections)) {
    return res.status(400).send("Invalid input");
  }

  // Map over updated connections array
  updatedConnections.forEach((updatedConn) => {
    // Find match in existing connections
    const existing = connectionsData.find(
      (c) => c.userId === updatedConn.userId
    );

    // If match, update the status
    if (existing) {
      existing.status = updatedConn.status;
    }
  });

  // Write updated array back to file
  fs.writeFile(
    "./data/connections.json",
    JSON.stringify(updatedConnections),
    (err) => {
      if (err) {
        return res.status(500).send("Error updating data");
      }

      res.send("Data successfully updated");
    }
  );
});

//Projects

let projectsData = [];
const projectsPath = "project.json";
try {
  const data = fs.readFileSync(projectsPath, "utf8");
  projectsData = JSON.parse(data);
} catch (error) {
  console.error("Error reading projects data:", error);
}

app.use(bodyParser.json());

app.get("/projects", (req, res) => {
  res.json(projectsData.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    likes: {
      count: project.likes.count,
      userIds: project.likes.userIds
    }})))})

app.post("/projects/like", (req, res) => {
  const { userId, projectId } = req.query;
  console.log(userId) 
  console.log(projectId)
  
  if (!userId || !projectId) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }
  const project = projectsData.find(p => p.id === parseInt(projectId));
  
  if(!project) {
    return res.status(404).send('Project not found');
  }

  if (project.likes && project.likes.userIds.includes(parseInt(userId))) {
    return res.status(400).json({ error: "Already liked" });
  }

  if (!project.likes) {
    project.likes = { count: 0, userIds: [] };
  }


  project.likes.userIds.push(parseInt(userId));
  project.likes.count += 1;

  saveProjects(projectsData);

  res.json({
    message: 'Like added!',
    likesCount: project.likes.count,
  });
})

function saveProjects(projects) {

  fs.writeFileSync(projectsPath, JSON.stringify(projects))
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
