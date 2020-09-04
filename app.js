const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const router = express.Router();

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mongoDB = process.env.URL;

const app = express();
let db, testCollection;

const jsonParser = bodyParser.json();
app.use(jsonParser);

// initialise database
MongoClient.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("You have connected to the database");
    db = client.db("surreal-estate");
    testCollection = db.collection("test");

    // start app after database connection is initialized
    app.listen(PORT, () => {
      console.log(`Surreal Estate API is running on :${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// test GET request to "/"
app.get("/", (req, res) => res.status(200).json({ hello: "world" }));

// test POST and GET to "/test"
app.post("/test", (req, res) => {
  testCollection
    .insertOne(req.body)
    .then((result) => res.status(201).json(result.ops))
    .catch((error) => console.log(error));
});

app.get("/test", (req, res) => {
  db.collection("test")
    .find()
    .toArray()
    .then((results) => {
      res.status(200).json(results);
    });
});

module.exports = app;
