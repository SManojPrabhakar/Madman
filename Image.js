const fs = require('fs');
const express = require('express');

const app = express();

app.get('/file', (req, res) => {
  const filePath = '/Images/tick.PNG/';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading file');
    }

    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
