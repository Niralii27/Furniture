const express = require("express");
const Contact = require("../../models/AdminModels/Contact");
const router = express.Router();
require("dotenv").config();


//Add Contact

router.post("/add-contact",async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

  
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newContact.save();
    console.log("Your Contact Send successfully:", newContact);
    
    res.status(201).json({ message: "Your Contact added successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
