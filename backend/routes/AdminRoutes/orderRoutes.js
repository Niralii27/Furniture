const express = require("express");
const Order = require("../../models/AdminModels/Order");

const router = express.Router();

// Add a new order
router.post("/add-order", async (req, res) => {
  try {
    const {userId,orderDate,products,lastName,address,city,state,pinCode,phone,shippingCharge,status} = req.body;

    // Basic validation
    if (!userId || !orderDate ||!products ||!firstName ||!lastName ||!address ||!city ||!state ||!pinCode ||!phone || shippingCharge == null ) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const newOrder = new Order({userId,
      orderDate,
      products,
      firstName,
      lastName,
      address,
      city,
      state,
      pinCode,
      phone,
      shippingCharge,
      status: status || "Pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order added successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders
router.get("/view-order", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
router.get("/view-order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId").populate("products.productId");
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order
router.put("/update-order/:id", async (req, res) => {
  try {
    const {
      userId,
      orderDate,
      products,
      firstName,
      lastName,
      address,
      city,
      state,
      pinCode,
      phone,
      shippingCharge,
      status,
    } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        userId,
        orderDate,
        products,
        firstName,
        lastName,
        address,
        city,
        state,
        pinCode,
        phone,
        shippingCharge,
        status,
      },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ error: "Order not found" });

    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete order
router.delete("/delete-order/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ error: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
