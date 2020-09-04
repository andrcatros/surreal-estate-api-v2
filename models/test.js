const mongoose = require("mongoose");
mongoose.set("debug", true);

const TestSchema = new mongoose.Schema({
  title: { type: String, require: true },
});

const TestModel = mongoose.model("Test", TestSchema);

module.exports = TestModel;
