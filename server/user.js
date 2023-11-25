const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');  // Import cors module

const app = express();
const port = 5001;

const userDetailsPath = 'recommendation.json';
let userDetailsData = {};

try {
  const data = fs.readFileSync(userDetailsPath, 'utf8');
  userDetailsData = JSON.parse(data);
} catch (error) {
  console.error('Error reading user details:', error);
}

// console.log(userDetailsData)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
