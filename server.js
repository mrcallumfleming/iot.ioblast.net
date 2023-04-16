const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  // res.send('PLEASE MARRY ME!');
  return res.redirect("https://www.youtube.com/watch?v=8QxIIz1yEsA&pp=ygUIaGVsbCBuYXc%3D");
});

app.post('/update', (req, res) => {
  // console.log("req", req?.json);
  console.log("req", req.body);
  return res.send("OK");
})

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
