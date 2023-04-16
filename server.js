const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('PLEASE MARRY ME!');
});

app.post('/update', (req, res) => {
  console.log("req", res.json);
  return res.send("OK");
})

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
