const FavouriteModel = require("../models/favourite");

exports.create = (req, res) => {
  const propertyId = req.body.propertyListing;

  FavouriteModel.find({ propertyListing: propertyId }).then((response) => {
    if (response.length === 0) {
      FavouriteModel.create(req.body)
        .then((favourite) => {
          res.status(201).json(favourite);
        })
        .catch((err) => res.status(404).json(err));
    } else {
      res.status(200).json({ message: "Favourite has already been added" });
    }
  });
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
