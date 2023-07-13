const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(Images, 'public/images', imageName); // Replace 'public/images' with the actual path to your images directory on the EC2 instance

  res.sendFile(imagePath);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

