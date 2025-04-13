const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
 //const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const UserSchema = require("../models/Login");
const Login = require("../models/Login");
const router = express.Router();
require("dotenv").config();

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

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your password or app password
  },
});
  
  router.post("/add-user", upload.single("userImage"), async (req, res) => {
    try { 
            const {
              fullname,
              lastName,
              email,
              phone,
              password,
              role,
              status,
             
            } = req.body;
        
            if (!fullname || !email || !password ) {
              return res
                .status(400)
                .json({ error: "All required fields must be provided." });
            }
            const userImage = req.file ? req.file.filename : null;

        
                // Check if user exists
   
                // const existingUser = await User.findOne({ email });
                // if (existingUser) {
                //   return res.status(400).json({ error: "Email already registered." });
                // }

       // Generate Verification Token
       const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });


            // Create new user
            const newUser = new UserSchema({
              fullname,
              lastName,
              email,
              phone,
              password,
              role: role || "user",
              status: status || "Inactive",
              userImage,
              verificationToken,

            });
        
            // Save user to database
            await newUser.save();


          // Send Verification Email
      const verificationLink = `http://localhost:5000/api/logins/verify-email/${verificationToken}`;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Welcome to Our Platform, ${fullname}!</h2>
      
      <p style="color: #555; font-size: 16px;">
        Thank you for signing up! Please verify your email to activate your account.
      </p>
  
      <div style="text-align: center; margin: 20px 0;">
        <a href="${verificationLink}" 
           style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: #fff; 
                  text-decoration: none; font-size: 16px; border-radius: 5px;">
        Verify Your Email
        </a>
      </div>
  
      <p style="color: #777; font-size: 14px;">
        If you did not sign up, you can safely ignore this email. This verification link will expire in 24 hours.
      </p>
  
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  
      <p style="text-align: center; color: #666; font-size: 14px;">
        Regards, <br> <strong>Urban Wood Team</strong>
      </p>
    </div>
  `,
      });
      res.status(201).json({ message: "User added successfully", user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
// console.log("🎉 User successfully inserted!", newUser);

// res.status(201).json({
//   message: "User added successfully. Check your email to verify your account.",
//   user: newUser,
// });
// } catch (error) {
// console.error("❌ Error inserting user:", error.message);
// res.status(500).json({ error: error.message });
// }
// });
  
  // Email Verification Route
  router.get("/verify-email/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Login.findOne({ email: decoded.email });
  
      if (!user) {
        return res.redirect(
          "http://localhost:5173/login?status=error&message=Invalid or expired token."
        );
      }
  
      user.status = "Active";
      user.verificationToken = null;
      await user.save();
  
      return res.redirect(
        "http://localhost:5173/login?status=success&message=Email verified successfully! You can now log in."
      );
    } catch (error) {
      return res.redirect(
        "http://localhost:5173/login?status=error&message=Verification failed or token expired."
      );
    }
  });

  //Update Profile
router.put("/update-user/:id", upload.single("userImage"), async (req, res) => {
  try {
    const { fullname, lastName, email, phone, password } = req.body;

    // Fetch existing user first
    const existingUser = await Login.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Build updated data
    const updatedData = {
      fullname,
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

    const updatedUser = await Login.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all users
router.get("/view-user", async (req, res) => {
  try {
    const users = await Login.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get user by ID
router.get("/view-user/:id", async (req, res) => {
  try {
    const user = await Login.findById(req.params.id);
    
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// update a Password
router.put("/change-password/:id", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await Login.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare old password
    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update to new password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Delete user
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const deletedUser = await Login.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  // Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "error", message: "Email is not registered!" });
    }

    // Verify password
    if (password !== user.password) {
      return res.status(400).json({ status: "error", message: "Incorrect password!" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Send token & user details
    return res.status(200).json({
      message: "Login successful",
      status: "success",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("🔥 Backend Error:", error); // Yeh error terminal me show karega

    return res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;