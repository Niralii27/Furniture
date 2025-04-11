const express = require("express");
const router = express.Router();

const path = require("path");

// Importing route files
const loginRoutes = require("./loginRoutes"); // User-related routes
const productRoutes = require("./AdminRoutes/productRoutes"); // Product routes
const categoryRoutes = require("./AdminRoutes/categoryRoutes"); 
const orderRoutes = require("./AdminRoutes/orderRoutes"); 
const offerRoutes = require("./AdminRoutes/offerRoutes"); 
const userRoutes = require("./AdminRoutes/userRoutes"); 
const reviewRoutes = require("./AdminRoutes/reviewRoutes"); 
const contactRoutes = require("./AdminRoutes/contactRoutes"); 




router.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Use the routes
router.use("/Login", loginRoutes);
router.use("/product", productRoutes);   //product
router.use("/category", categoryRoutes);  //category
router.use("/Order", orderRoutes);  //order 
router.use("/Offer", offerRoutes);  //offer
router.use("/User", userRoutes); //user
router.use("/Review", reviewRoutes); //review
router.use("/Contact", contactRoutes); //contact





// Handle 404 errors for unknown routes
router.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

module.exports = router;