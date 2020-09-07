const express = require("express");
const router = express.Router();
const PropertyController = require("../controllers/property");

router
  .post("/", PropertyController.create)
  .get("/", PropertyController.list)
  .get("/:id", PropertyController.getPropertyById)
  .patch("/:id", PropertyController.updatedProperty)
  .delete("/:id", PropertyController.deleteProperty);

module.exports = router;
