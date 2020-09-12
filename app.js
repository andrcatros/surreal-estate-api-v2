const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const path = require("path");

const PropertyRouter = require("./routes/property");
const FavouriteRouter = require("./routes/favourite");

const PropertyController = require("./controllers/property");

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

  // initialise GFS
  /*const gfs = new mongoose.mongo.GridFSBucket(db.db); */

  const storage = new GridFsStorage({
    url: mongoURL,
    file: (req, file) => {
      return new Promise((resolve, reject) =>
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            reject(err);
          }

          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = { filename: filename };

          resolve(fileInfo);
        })
      );
    },
  });

  const upload = multer({ storage });
  const gfs = Grid(db.db, mongoose.mongo);

  app.use("/api/v2/PropertyListing", PropertyRouter);
  app.use("/api/v2/Favourite", FavouriteRouter);

  app.post("/upload", upload.single("img"), PropertyController.create);
  app.get("/upload", (req, res) => {
    db.collection("fs.files").findOne(
      { filename: req.body.filename },
      (err, file) => {
        if (!file || file.length === 0) {
          return status(404).json({ err: "No File Found" });
        } else {
          if (
            file.contentType === "image/jpeg" ||
            file.contentType === "image/png"
          ) {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
          } else {
            res.status(404).json({ err: "File is not an image" });
          }
        }
      }
    );
  });
});

module.exports = app;
