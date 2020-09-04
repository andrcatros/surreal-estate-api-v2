const express = require("express");
const mongoose = require("mongoose");

const PropertyListingModel = require("./models/property");
const TestModel = require("./models/test");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mongoDB = process.env.URL;

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

// initialise database
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("You have connected to the database.");
  app.listen(PORT, () => {
    console.log(`Surreal Estate API is running on :${PORT}`);
  });

  app.post("/test", async (req, res) => {
    await TestModel.create(req.body).then((response) => {
      res.status(201).json(response);
    });
  });

  app.get("/test", async (req, res) => {
    const result = await TestModel.find();
    res.status(200).json(result);
  });
});

module.exports = app;
