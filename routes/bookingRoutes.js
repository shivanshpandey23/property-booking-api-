const express = require("express");
const { bookProperty, confirmBooking } = require("../controllers/bookingController");

const router = express.Router();

router.post("/bookProperty", bookProperty);
router.put("/confirmBooking/:bookingId", confirmBooking);

module.exports = router;
