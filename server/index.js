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

//mongoose schemas
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  tech_field: {
    type: String,
    required: true,
  },
  programming_languages: {
    type: [String],
    required: true,}, 

  availability: {
    type: String,
    required: true,
  },
  goals: {
    type: [String],
    required: true, 
  },
  experience: {
    type: Number,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
});


const generateJwt = (user) => {
    const payload = { username: user.username };
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
  };
  

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      maxlength: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);



const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);



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

// USERS = [];
// POSTS = [];
// DETAILS = [];

// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.post("/user/signup", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: "User already exists" });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: "user" }, secretKey, {
        expiresIn: "1h",
      });
      res.json({ message: "User created successfully", token, userId: newUser._id });
    }
  });

app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.post("/user-details", authenticateJwt, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const updates = Object.keys(req.body);
      updates.forEach(update => {
        user[update] = req.body[update];   
      });
      await user.save();
      res.status(200).json({
        success: true,
        message: "User updated successfully!"
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        error: err     
      });
    }
  })


  app.post("/user/post", authenticateJwt, async (req, res) => {
    const post = req.body;
    post.userId = req.user.id;
    try {
        const userPost = new Post(post);
        await userPost.save(); 
        res.json({ message: "Post created successfully", post: userPost });
      } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create the post" });
      }
    });

app.put("/user/post/:id", authenticateJwt, async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findOne({ _id: postId, userId: req.user.id });
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();
    res.json({ message: "Post updated successfully" });
  } else {
    res.status(404).json({ message: "Post not found or unauthorized" });
  }
});

app.get("/user/posts/:id", async (req, res) => {
    const userId = req.params.id;
    const userPosts = await Post.find({ userId });
    res.json({ posts: userPosts });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
