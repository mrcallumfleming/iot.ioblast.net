const express = require('express');
const MongoClient = require("mongodb");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// inject the database
app.use(async(req, res, next) => {
  const client = new MongoClient.MongoClient(
    "mongodb://root:KJLfFjklkj5r*%26%5EslkjdfKJH23847@164.90.232.181:27017/?authMechanism=DEFAULT&authSource=admin"
  );
  await client.connect();
  req.db = client.db("ioblast");
  next();
});

// device verification and authentication
app.use(async(req, res, next) => {
  const {auth, id, model} = req.headers;
  const device = await req.db.collection("devices").findOne({
    id, auth, model
  });
  if (!device) {
    return res.status(403).end();
  }
  req.device = device;
  next();
});

app.get('/', (req, res) => {
  return res.redirect("https://www.youtube.com/watch?v=8QxIIz1yEsA&t=41s");
});

app.post('/event', (req, res) => {
  console.log(req.device);
  console.log(req.body);
  console.log(req.headers);
  return res.send("OK");
})




app.listen(3000, () => console.log('Example app is listening on port 3000.'));
