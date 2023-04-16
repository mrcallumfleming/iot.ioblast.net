const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Bubz I love you! So much! This is so cool!');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
