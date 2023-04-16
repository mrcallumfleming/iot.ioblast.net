const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Bubz I love you!');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
