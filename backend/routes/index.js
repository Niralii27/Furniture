const express = require("express");
const router = express.Router();

// Importing route files
const loginRoutes = require("./loginRoutes"); // User-related routes
// const contactRoutes = require("./contactRoutes"); // Contact inquiries

// Use the routes
router.use("/Login", loginRoutes);
// router.use("/contacts", contactRoutes);

// Handle 404 errors for unknown routes
router.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

module.exports = router;