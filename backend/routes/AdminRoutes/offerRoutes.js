const express = require("express");
const router = express.Router();
const Offer = require("../../models/AdminModels/Offer"); // Adjust path as needed

// Add a new offer
router.post("/add-offer", async (req, res) => {
  try {
    const {
      offerDescription,
      offerCode,
      discount,
      maxDiscountAmount,
      minDiscountAmount,
      startDate,
      endDate,
    } = req.body;

    // Basic validation
    if (
      !offerDescription ||
      !offerCode ||
      !discount ||
      !maxDiscountAmount ||
      !minDiscountAmount ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await Offer.findOne({ offerCode });
    if (existing) {
      return res.status(400).json({ error: "Offer code already exists" });
    }

    const newOffer = new Offer({
      offerDescription,
      offerCode,
      discount,
      maxDiscountAmount,
      minDiscountAmount,
      startDate,
      endDate,
    });

    await newOffer.save();
    res.status(201).json({ message: "Offer added successfully", offer: newOffer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View all offers
router.get("/view-offers", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View single offer by ID
router.get("/view-offer/:id", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: "Offer not found" });

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update offer
router.put("/update-offer/:id", async (req, res) => {
  try {
    const {
      offerDescription,
      offerCode,
      discount,
      maxDiscountAmount,
      minDiscountAmount,
      startDate,
      endDate,
    } = req.body;

    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        offerDescription,
        offerCode,
        discount,
        maxDiscountAmount,
        minDiscountAmount,
        startDate,
        endDate,
      },
      { new: true }
    );

    if (!updatedOffer) return res.status(404).json({ error: "Offer not found" });

    res.status(200).json({ message: "Offer updated successfully", offer: updatedOffer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete offer
router.delete("/delete-offer/:id", async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer) return res.status(404).json({ error: "Offer not found" });

    res.status(200).json({ message: "Offer deleted", offer: deletedOffer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all offers (same as view-all, but with 'get-all' naming)
router.get("/get-all", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json({ offers });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching offers" });
  }
});

module.exports = router;
