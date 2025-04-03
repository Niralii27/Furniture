const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
 //const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const UserSchema = require("../models/Login");
const router = express.Router();
require("dotenv").config();

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your password or app password
  },
});
  
  router.post("/add-user", async (req, res) => {
    try { 
            const {
              fullname,
              email,
              password,
              role,
              status,
            } = req.body;
        
            if (!fullname || !email || !password ) {
              return res
                .status(400)
                .json({ error: "All required fields must be provided." });
            }
        
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
              email,
              password,
              role: role || "user",
              status: status || "Inactive",
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

module.exports = router;