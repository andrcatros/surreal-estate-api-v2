const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: { type: String, require: true },
  type: { type: String, require: true },
  bedrooms: { type: String, require: true },
  bathrooms: { type: String, require: true },
  price: { type: Number, require: true },
  city: { type: String, require: true },
  email: { type: String, require: true },
  img: { type: String, require: true },
});

const PropertyModel = mongoose.model("PropertyListing", PropertySchema);

module.exports = PropertyModel;
