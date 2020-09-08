const express = require("express");
const router = express.Router();
const PropertyController = require("../controllers/property");

router
  .post("/", PropertyController.create)
  .get("/:id", PropertyController.getById)
  .get("/", PropertyController.query)
  .patch("/:id", PropertyController.updatedProperty)
  .delete("/:id", PropertyController.deleteProperty);

module.exports = router;
