const express = require("express");
const router = express.Router();



// Importing route files
const loginRoutes = require("./loginRoutes"); // User-related routes
const productRoutes = require("./AdminRoutes/productRoutes"); // Product routes



// Use the routes
router.use("/Login", loginRoutes);
router.use("/product", productRoutes);   


// Handle 404 errors for unknown routes
router.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

module.exports = router;