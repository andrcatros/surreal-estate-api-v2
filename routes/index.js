const express = require("express");
const router = express.Router();

/* GET home page. */
router.route("/").get((req, res, next) => {
  res.status(200).json({ hello: "world" });
});

module.exports = router;
