const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/image', (req, res) => {
  const imagePath = 'Images/tick.PNG';
  res.sendFile(path.resolve(imagePath));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
