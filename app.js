const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const PropertyRouter = require("./routes/property");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mongoDB = process.env.URL;

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

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

  app.use("/api/v2/PropertyListing", PropertyRouter);
});

module.exports = app;
