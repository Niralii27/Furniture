const express = require("express");
const router = express.Router();
const Category = require("../../models/AdminModels/Category"); // Adjust path as needed



// Add a new category
router.post("/add-category", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View all categories
router.get("/view-category", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View single category by ID
router.get("/view-category/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update category
router.put("/update-category/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedCategory) return res.status(404).json({ error: "Category not found" });

    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete category
router.delete("/delete-category/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ error: "Category not found" });

    res.status(200).json({ message: "Category deleted", category: deletedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all categories
router.get('/get-all', async (req, res) => {
  try {
      const categories = await Category.find();
      res.status(200).json({ categories });
  } catch (error) {
      res.status(500).json({ message: 'Server error while fetching categories' });
  }
});

module.exports = router;

module.exports = router;
