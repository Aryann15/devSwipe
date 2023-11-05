const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = 8000;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const uuid = require("uuid");
const id = uuid.v4();

app.use(cors());
dotenv.config();

app.use(express.json());
const secretKey = "Hack_to_the_future";

mongoose.connect(process.env.mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

USERS = [];
POSTS = [];
DETAILS = [];

// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;
  const userId = USERS.length + 1;
  const user = USERS.find((a) => a.username === username);
  if (user) {
    res.status(403).json({ message: "Users already exists" });
  } else {
    const newUser = { username, password };
    USERS.push(newUser);
    const token = jwt.sign({ username, role: "user" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token, userId });
  }
});

app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(
    (a) => a.username === username && a.password === password
  );
  if (user) {
    const token = jwt.sign({ username, role: "user" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.post("/user-details",authenticateJwt, (req, res) => {
  const details = req.body;
  details.id = req.user.id;
  DETAILS.push(details);
  console.log(id)
  res.json({ message: "Profile created successfully",details: details});
});




app.post("/user/post", authenticateJwt, (req, res) => {
  const post = req.body;
  postId = uuid.v4();
  post.id= postId
  post.userId = req.user.id;
  POSTS.push(post);
  res.json({ message: "Post created successfully", post });
});

app.put("/user/post/:id", authenticateJwt, (req, res) => {
  const post = POSTS.find((c) => c.id === parseInt(req.params.postId));
  if (post) {
    Object.assign(post, req.body);
    res.json({ message: "Post updated successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.get("/user/posts/:id", (req, res) => {
  const userId = req.params.userId;
  const userPosts = POSTS.filter((post) => post.userId === userId);
  res.json({ posts: userPosts });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
