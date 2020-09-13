const multer = require("multer");

// initialise image storage
const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => cb(null, "public/images"),
  },
  { filename: (req, file, cb) => cb(null, file.filename + "-" + Date.now()) }
);

const upload = multer({ storage: storage });

module.exports = upload;
