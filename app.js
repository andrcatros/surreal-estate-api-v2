const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const PropertyRouter = require("./routes/property");
const FavouriteRouter = require("./routes/favourite");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mongoURL = process.env.URL;

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());

// initialise database
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.options = {};
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("You have connected to the database.");
  app.listen(PORT, () => {
    console.log(`Surreal Estate API is running on :${PORT}`);
  });

  app.use("/api/v2/Static", express.static("public"));
  app.use("/api/v2/PropertyListing", PropertyRouter);
  app.use("/api/v2/Favourite", FavouriteRouter);
});

module.exports = app;
