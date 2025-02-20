const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  availableUnits: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model("Property", propertySchema);
