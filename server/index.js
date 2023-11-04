const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = 8000;
const mongoose  = require ('mongoose')
app.use(cors());
dotenv.config();


const secretKey = "Hack_to_the_future"


//mongoose schemas

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  });
  
  const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

mongoose.connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })



// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/user/signup", async (req, res) => {
const { username, password } = req.body;
  const admin = ADMINS.find(a => a.username === username);
  console.log("admin signup");
  if (admin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    const newAdmin = { username, password };
    ADMINS.push(newAdmin);
    const token = jwt.sign({ username, role: 'admin' },secretKey, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });

}})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
