const express = require("express");
const router = express.Router();
const Contact = require("../../models/AdminModels/Contact"); // Adjust path if needed

// Add a new contact
router.post("/add-contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();
    res.status(201).json({ message: "Contact message submitted", contact: newContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View all contacts
router.get("/view-contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View single contact by ID
router.get("/view-contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete contact
router.delete("/delete-contact/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ error: "Contact not found" });

    res.status(200).json({ message: "Contact deleted", contact: deletedContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Optional: Update contact (rarely needed for contact forms)
router.put("/update-contact/:id", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, subject, message },
      { new: true }
    );

    if (!updatedContact) return res.status(404).json({ error: "Contact not found" });

    res.status(200).json({ message: "Contact updated", contact: updatedContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
