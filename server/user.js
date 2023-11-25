const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');  // Import cors module

const app = express();
const port = 5001;

const userDetailsPath = 'recommendation.json';
let userDetailsData = {};


console.log(userDetailsData)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
