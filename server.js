const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

//  Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

//  Export app for testing
module.exports = app;
