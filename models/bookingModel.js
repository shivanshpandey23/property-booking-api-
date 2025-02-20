const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  bookingDate: { type: Date, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
