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
      const verificationLink = `http://localhost:5000/api/Login/verify-email/${verificationToken}`;
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
        phone: user.phone,  // Include phone
        lastName: user.lastName,  // Include lastName
        userImage: user.userImage,  // Include userImage
        password: user.password, 
      },
      
      admin: user.role === "admin" ? {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        phone: user.phone,
        lastName: user.lastName,
        userImage: user.userImage,
        password: user.password
      } : null
      
    });
    
  } catch (error) {
    console.error("🔥 Backend Error:", error); // Yeh error terminal me show karega

    return res.status(500).json({ error: "Something went wrong." });
  }
});

//  to fetch the total number of users onm dashboard
router.get("/total-users-count", async (req, res) => {
  try {
    const totalUsers = await Login.countDocuments(); 
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total customer count" });
  }
});

// Check if email exists
// Add to your LoginRoute.js file
// Check if email exists
router.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Login.findOne({ email });
    
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Email check error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Forgot password route
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Generate reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    // Save reset token to user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    // Create reset link
    const resetLink = `http://localhost:5173/ResetPassword/${resetToken}`;
    
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
        
        <p style="color: #555; font-size: 16px;">
          You requested a password reset for your account. Please click the button below to set a new password.
        </p>
    
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" 
             style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: #fff; 
                    text-decoration: none; font-size: 16px; border-radius: 5px;">
            Reset Password
          </a>
        </div>
    
        <p style="color: #777; font-size: 14px;">
          If you did not request this password reset, you can safely ignore this email. This link will expire in 1 hour.
        </p>
    
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    
        <p style="text-align: center; color: #666; font-size: 14px;">
          Regards, <br> <strong>Urban Wood Team</strong>
        </p>
      </div>`,
    });
    
    return res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Reset password route (when user clicks on the link in email)
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await Login.findOne({ 
      _id: decoded.userId,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    
    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add this route to verify if a reset token is valid
router.get("/verify-reset-token/:token", async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Received token for verification:", token);
    
    // First, try to decode the token without verification to see if it's valid JWT format
    try {
      const decodedWithoutVerify = jwt.decode(token);
      console.log("Token decoded without verification:", decodedWithoutVerify);
    } catch (decodeErr) {
      console.error("Token is not a valid JWT format:", decodeErr);
    }
    
    // Now try to verify with your secret
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token verified successfully, decoded:", decoded);
      userId = decoded.userId;
    } catch (jwtErr) {
      console.error("JWT verification failed:", jwtErr);
      return res.status(400).json({ valid: false, error: "Invalid token: " + jwtErr.message });
    }
    
    // Check if user exists
    try {
      const user = await Login.findById(userId);
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ valid: false, error: "User not found" });
      }
      
      // Now check if the token matches and is not expired
      if (user.resetPasswordToken !== token) {
        console.log("Token does not match stored token");
        return res.status(400).json({ valid: false, error: "Token does not match" });
      }
      
      if (!user.resetPasswordExpires || user.resetPasswordExpires < Date.now()) {
        console.log("Token has expired");
        return res.status(400).json({ valid: false, error: "Token has expired" });
      }
      
      console.log("Token is valid");
      return res.status(200).json({ valid: true });
    } catch (dbErr) {
      console.error("Database error:", dbErr);
      return res.status(500).json({ valid: false, error: "Database error" });
    }
  } catch (error) {
    console.error("General error in token verification:", error);
    return res.status(400).json({ valid: false, error: error.message });
  }
});

module.exports = router;