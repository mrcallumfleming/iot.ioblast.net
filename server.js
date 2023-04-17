const express = require('express');
const MongoClient = require("mongodb");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  // res.send('PLEASE MARRY ME!');
  return res.redirect("https://www.youtube.com/watch?v=8QxIIz1yEsA&t=41s");
});

app.post('/', (req, res) => {
  // console.log("req", req?.json);
  console.log("req", req.body);
  console.log(req.db);
  return res.send("OK");
})


app.use(async(req, res, next) => {
  const client = new MongoClient.MongoClient(
    "mongodb://root:KJLfFjklkj5r*%26%5EslkjdfKJH23847@164.90.232.181:27017/?authMechanism=DEFAULT&authSource=admin"
  );
  await client.connect();
  req.db = client.db("ioblast");
  next();
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
