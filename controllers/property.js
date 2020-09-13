const PropertyModel = require("../models/property");

exports.create = async (req, res) => {
  let img;

  if (req.file) {
    img = `/public/images/${req.file.filename}-${Date.now()}`;
  } else {
    img = "default";
  }

  const params = { ...req.body, img: img };
  PropertyModel.create(params)
    .then((property) => res.status(201).json(property))
    .catch((err) => res.status(400).json(err));
};

exports.getById = (req, res) => {
  PropertyModel.findById(req.params.id).then((property) => {
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ error: "Property not found." });
    }
  });
};

exports.query = (req, res) => {
  let query, sort;

  req.query.query ? (query = JSON.parse(req.query.query)) : (query = {});
  req.query.sort ? (sort = JSON.parse(req.query.sort)) : (sory = {});

  PropertyModel.find(query)
    .sort(sort)
    .then((properties) => res.status(200).json(properties))
    .catch((err) => res.status(404).json(err));
};

exports.updatedProperty = (req, res) => {
  const id = req.params.id;
  PropertyModel.findByIdAndUpdate(id, req.body, { new: true })
    .then((updated) => res.status(200).json(updated))
    .catch((err) =>
      res.status(400).json({ error: "Property could not be updated." })
    );
};

exports.deleteProperty = (req, res) => {
  const id = req.params.id;
  PropertyModel.findByIdAndRemove(id)
    .then((removed) => res.status(200).json(removed))
    .catch((err) =>
      res.status(400).json({ error: "Property could not be deleted" })
    );
};

exports.queryByLocation = (req, res) => {
  const query = req.params.location;
  PropertyModel.find({ city: query })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};
