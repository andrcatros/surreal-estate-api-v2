const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PropertyModel = require("./models/property");
const PropertyController = require("./controllers/property");
const TestModel = require("./models/test");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mongoDB = process.env.URL;

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

// initialise database
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("You have connected to the database.");
  app.listen(PORT, () => {
    console.log(`Surreal Estate API is running on :${PORT}`);
  });

  app.post("/PropertyListing", PropertyController.create);
  app.get("/PropertyListing", PropertyController.list);
  app.get("/PropertyListing/:id", PropertyController.getPropertyById);
  app.patch("/PropertyListing/:id", PropertyController.updatedProperty);
});

module.exports = app;
