const express = require("express");
const multer = require("multer");
const path = require("path");
// const Product = require("../models/AdminModels/Product");
const Product = require("../../models/AdminModels/Product");

const router = express.Router();

// Multer Storage Configuration for Product Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Add a new product
router.post("/add-product", upload.single("productImage"), async (req, res) => {
  try {
    const { name, category, costPrice, salePrice, discount, stockQuantity, description } = req.body;

    if (!name || !category || !costPrice || !salePrice || !stockQuantity) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const productImage = req.file ? req.file.filename : null;

    const newProduct = new Product({
      name,
      category,
      costPrice,
      salePrice,
      discount: discount || 0,
      stockQuantity,
      productImage,
      description,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get("/Product", async (req, res) => {
  try {
    const Product = await Product.find();
    res.status(200).json(Product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put("/update-product/:id", upload.single("productImage"), async (req, res) => {
  try {
    const { name, category, costPrice, salePrice, discount, stockQuantity, description } = req.body;
    const productImage = req.file ? req.file.filename : undefined;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, costPrice, salePrice, discount, stockQuantity, productImage, description },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete("/delete-product/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
