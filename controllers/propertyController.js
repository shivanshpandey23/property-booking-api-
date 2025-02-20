const Property = require("../models/propertyModel");

exports.createProperty = async (req, res) => {
  try {
    const { name, location, price, availableUnits } = req.body;
    if (price < 0 || availableUnits < 0) return res.status(400).json({ message: "Invalid input" });

    const property = new Property({ name, location, price, availableUnits });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailableProperties = async (req, res) => {
  try {
    const properties = await Property.find({ availableUnits: { $gt: 0 } });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
