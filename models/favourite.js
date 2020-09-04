const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouriteSchema = new mongoose.Schema({
  fbUserId: { type: String, require: true },
  propertyListing: {
    type: Schema.Types.ObjectId,
    ref: "PropertyListing",
    require: true,
  },
});

const FavouriteModel = mongoose.model("Favourite", FavouriteSchema);

module.exports = FavouriteModel;
