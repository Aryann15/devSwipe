const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = 8000;
const mongoose  = require ('mongoose')
app.use(cors());
dotenv.config();


mongoose.connect(process.env.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  
// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/user/signup", async (req, res) => {});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
