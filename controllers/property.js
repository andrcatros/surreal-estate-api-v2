const PropertyModel = require("../models/property");

exports.create = (req, res) => {
  PropertyModel.create(req.body).then((property) =>
    res.status(201).json(property)
  );
};

exports.list = (req, res) => {
  PropertyModel.find().then((properties) => res.status(200).json(properties));
};

exports.getPropertyById = (req, res) => {
  PropertyModel.findById(req.params.id)
    .then((property) => {
      if (property) {
        res.status(200).json(property);
      } else {
        res.status(404).json({ error: "Property not found." });
      }
    })
    .catch((err) => res.status(404).json({ error: "Property not found." }));
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
