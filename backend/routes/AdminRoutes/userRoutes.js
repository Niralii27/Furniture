const express = require("express");
const multer = require("multer");
const path = require("path");
const User = require("../../models/AdminModels/User");

const router = express.Router();

// Multer Storage Configuration for User Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Add a new user
router.post("/add-user", upload.single("userImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const userImage = req.file ? req.file.filename : null;

    const newUser = new User({          
      firstName,
      lastName,
      email,
      phone,
      password,
      userImage,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/view-user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get user by ID
router.get("/view-user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update user
// Update user
router.put("/update-user/:id", upload.single("userImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Fetch existing user first
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Build updated data
    const updatedData = {
      firstName,
      lastName,
      email,
      phone,
    };

    // Update password only if it's not empty
    if (password && password.trim() !== "") {
      updatedData.password = password;
    }

    // Update image if a new one is uploaded
    if (req.file) {
      updatedData.userImage = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



// Delete user
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET all user
router.get('/get-all', async (req, res) => {
  try {
    const user = await User.find(); // Fetch all user
    res.status(200).json(user);       // Send directly as array
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching user' });
  }
});

module.exports = router;
