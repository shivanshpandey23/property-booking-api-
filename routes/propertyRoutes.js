const express = require("express");
const { createProperty, getAvailableProperties } = require("../controllers/propertyController");

const router = express.Router();

router.post("/", createProperty);
router.get("/", getAvailableProperties);

module.exports = router;
