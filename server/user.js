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
app.use(cors());  
app.use(bodyParser.json());
app.post('/api/userDetails', (req, res) => {
  const { userIds } = req.body;
  if (!userIds || !Array.isArray(userIds)) {
    return res.status(400).json({ error: 'Invalid user IDs' });
  }

  const userDetails = userIds.map((userId) => {
    const user = userDetailsData[userId];
    return user ? { id: userId, name: user.name,
         age: user.age , 
         profession : user.profession,
         techField : user.techField,
         profilePicture : user.profilePicture,
         aboutme : user.aboutme,
} : null;
  });
  res.json(userDetails);
});

// console.log(userDetailsData)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
