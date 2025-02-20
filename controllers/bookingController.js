const mongoose=require('mongoose');
const Booking = require("../models/bookingModel");
const Property = require("../models/propertyModel");

// exports.bookProperty = async (req, res) => {
//   try {
//     const { userId, propertyId, bookingDate } = req.body;
//     const property = await Property.findById(propertyId);

//     if (!property || property.availableUnits <= 0) return res.status(400).json({ message: "Property unavailable" });

//     property.availableUnits -= 1;
//     await property.save();

//     const booking = new Booking({ userId, propertyId, bookingDate });
//     await booking.save();
//     res.status(201).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.bookProperty = async (req, res) => {
  try {
    const { userId, propertyId, bookingDate } = req.body;

    // Convert propertyId to a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ message: "Invalid property ID format" });
    }

    const property = await Property.findById(propertyId);
    if (!property || property.availableUnits <= 0) {
      return res.status(400).json({ message: "Property unavailable" });
    }

    property.availableUnits -= 1;
    await property.save();

    const booking = new Booking({ userId, propertyId, bookingDate });
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status !== "pending") return res.status(400).json({ message: "Booking already processed" });

    booking.status = "confirmed";
    await booking.save();
    res.status(200).json({ message: "Booking confirmed", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
