const fs = require('fs');
const express = require('express');

const app = express();

app.get('/image', (req, res) => {
  const imagePath = './Images/tick.PNG/'; // Replace with the actual path to the image file on your EC2 instance

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading image file');
    }

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
