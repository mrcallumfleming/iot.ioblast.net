const express = require("express");
const MongoClient = require("mongodb");

const app = express();
let dbInstance = null;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// inject the database
app.use(async (req, res, next) => {
  if (!dbInstance) {
    dbInstance = await connect();
  }
  req.db = dbInstance;
  next();
});

// device verification and authentication
app.use(async (req, res, next) => {
  if (req.path === "/") {
    return next();
  }
  const { auth, id, model } = req.headers;
  const device = await req.db.collection("devices").findOne({
    id,
    auth,
    model,
  });
  if (!device) {
    return res.sendStatus(403);
  }
  req.device = device;
  next();
});

app.get("/", (req, res) => {
  return res.redirect("https://www.youtube.com/watch?v=8QxIIz1yEsA&t=41s");
});

app.post("/event", async (req, res) => {
  // check that that the event exists
  const event = await req.db.collection("eventTypes").findOne({
    name: req.body?.type || "",
  });

  if (!event) {
    return res.sendStatus(400);
  }

  const eventData = {};
  // make sure that all the properties that are expected are there
  for (let i = 0; i < event.properties.length; i++) {
    const eventProperty = event.properties[i];
    if (!req.body.hasOwnProperty(eventProperty)) {
      return res.sendStatus(400);
    }
    eventData[eventProperty] = req.body[eventProperty];
  }

  // if the event exists log it
  await req.db.collection("eventLogs").insertOne({
    receivedStamp: new Date(),
    deviceId: req.device.id,
    eventType: req.body.type,
    ...eventData,
  });

  return res.sendStatus(200);
});

app.listen(3000, async () => {
  dbInstance = await connect();
  console.log("Example app is listening on port 3000.");
});

async function connect() {
  const client = new MongoClient.MongoClient(
    "mongodb://root:KJLfFjklkj5r*%26%5EslkjdfKJH23847@164.90.232.181:27017/?authMechanism=DEFAULT&authSource=admin"
  );
  await client.connect();
  return client.db("ioblast");
}
