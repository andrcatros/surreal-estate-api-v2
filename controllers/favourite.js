const FavouriteModel = require("../models/favourite");

exports.create = (req, res) => {
  FavouriteModel.create(req.body)
    .then((favourite) => {
      res.status(201).json(favourite);
    })
    .catch((err) => res.status(404).json(err));
};

exports.query = (req, res) => {
  FavouriteModel.find({})
    .populate("propertyListing")
    .then((favourites) => {
      if (favourites) {
        res.status(200).json(favourites);
      } else {
        res.status(404).json({ error: "Favourites not found." });
      }
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  FavouriteModel.findByIdAndRemove(id)
    .then((removed) => res.status(200).json(removed))
    .catch((err) =>
      res.status(400).json({ error: "Favourite could not be deleted" })
    );
};
