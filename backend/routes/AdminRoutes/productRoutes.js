const express = require("express");
const multer = require("multer");
const path = require("path");
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
    console.log("Product saved successfully:", newProduct);
    
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get("/view-product", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get("/view-product/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    
    if (!products) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(products);
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

// GET all products
router.get('/get-all', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products);       // Send directly as array
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});


// Route to fetch total products count
router.get("/total-products-count", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();  // Counting the products in the Product collection
    res.status(200).json({ totalProducts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total products count" });
  }
});


module.exports = router;
