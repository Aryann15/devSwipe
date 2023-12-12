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
  console.log(userIds)
  if (!userIds || !Array.isArray(userIds)) {
    return res.status(400).json({ error: "Invalid user IDs" });
  }
  const userDetails = userIds.map((userId) => {
    const user = userDetailsData[userId];
    return user
      ? {
          id: userId,
          name: user.name,
          age: user.age,
          profession: user.profession,
          techFields: user.techFields,
          experience:user.experience,
          profilePicture: user.profilePicture,
          aboutme: user.aboutme,
          languages : user.programmingLanguages,
          skills: user.skills,
          goals: user.goals
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

let connectionsData = JSON.parse(fs.readFileSync("./connections.json", "utf-8"));

app.post("/connections/request", (req, res) => {
  const { userId, targetUserId } = req.body;

  const user = recommendations.find((user) => user.id === userId);
  const targetUser = recommendations.find((user) => user.id === targetUserId);

  if (!user || !targetUser) {
    return res.status(404).json({ message: "User or target user not found" });
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
