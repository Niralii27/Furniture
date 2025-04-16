const express = require("express");
const router = express.Router();
const Review = require("../../models/AdminModels/Review"); // Adjust path as needed
const mongoose = require("mongoose");

// Add a new review
router.post("/add-review", async (req, res) => {
  try {
    const { user, product, review, rating } = req.body;

    if (!user || !product || !review || !rating) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReview = new Review({
      user,
      product,
      review,
      rating,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View all reviews
router.get("/view-reviews", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "fullname lastName email") // Adjust fields as needed
      .populate("product", "name");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Admin review fetch
// View all reviews for admin with necessary fields
router.get("/view-reviews-admin", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "fullname lastName email")  // Adjust the fields you need
      .populate("product", "name")
      .select("user product rating review createdAt"); // You can customize the fields you want

    // Send the reviews data in the response
    res.status(200).json(reviews); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View single review by ID
router.get("/view-review/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user", "fullname lastName email")
      .populate("product", "name");

    if (!review) return res.status(404).json({ error: "Review not found" });

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update review
router.put("/update-review/:id", async (req, res) => {
  try {
    const { review, rating } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { review, rating },
      { new: true }
    );

    if (!updatedReview) return res.status(404).json({ error: "Review not found" });

    res.status(200).json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete review
router.delete("/delete-review/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ error: "Review not found" });

    res.status(200).json({ message: "Review deleted", review: deletedReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews with populated references
router.get("/get-all", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "firstName lastName")
      .populate("product", "name");
      
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
});

module.exports = router;
