const express = require("express");
const router = express.Router();

// Importing route files
const loginRoutes = require("./loginRoutes"); // User-related routes
const productRoutes = require("./AdminRoutes/productRoutes"); // Product routes
const categoryRoutes = require("./AdminRoutes/categoryRoutes"); 
const orderRoutes = require("./AdminRoutes/orderRoutes"); 
const offerRoutes = require("./AdminRoutes/offerRoutes"); 
const userRoutes = require("./AdminRoutes/userRoutes"); 
const reviewRoutes = require("./AdminRoutes/reviewRoutes"); 
const contactRoutes = require("./AdminRoutes/contactRoutes"); 
const cartRoutes = require("./AdminRoutes/cartRoutes");


// Use the routes
router.use("/Login", loginRoutes);
router.use("/product", productRoutes);   
router.use("/category", categoryRoutes);   
router.use("/Order", orderRoutes);  //order 
router.use("/Offer", offerRoutes);  //offer
router.use("/User", userRoutes); //user
router.use("/Review", reviewRoutes); //review
router.use("/Contact", contactRoutes); //contact
router.use("/Cart", cartRoutes); //Cart


// Handle 404 errors for unknown routes
router.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

module.exports = router;