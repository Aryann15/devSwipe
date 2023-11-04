const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = 8000;
const jwt = require('jsonwebtoken');
const mongoose  = require ('mongoose')
app.use(cors());
dotenv.config();

app.use(express.json());   
const secretKey = "Hack_to_the_future"


mongoose.connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

USERS = []
// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});



app.post("/user/signup", async (req, res) => {
const { username, password } = req.body;
  const user = USERS.find(a => a.username === username);
  if (user) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    const newAdmin = { username, password };
    USERS.push(newUser);
    const token = jwt.sign({ username, role: 'admin' },secretKey, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
}})





// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
