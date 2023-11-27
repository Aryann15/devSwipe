const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 5002;

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
          profilePicture: user.profilePicture,
          aboutme: user.aboutme,
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
  const { userId, selectedGoals, selectedSkills } = req.body;
  
  userToUpdate.selectedGoals = selectedGoals;
  userToUpdate.selectedSkills = selectedSkills;

  fs.writeFileSync(
    "./recommendation.json",
    JSON.stringify(recommendations, null, 2)
  );

  res.json({
    message: "Onboarding data updated successfully",
    user: userToUpdate,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
