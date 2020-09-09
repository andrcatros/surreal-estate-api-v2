const express = require("express");
const router = express.Router();
const FavouriteController = require("../controllers/favourite");

router
  .get("/", FavouriteController.query)
  .post("/", FavouriteController.create)
  .delete("/:id", FavouriteController.delete);

module.exports = router;
