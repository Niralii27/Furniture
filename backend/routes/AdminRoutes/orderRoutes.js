const express = require("express");
const router = express.Router();
const Order = require("../../models/AdminModels/Order");


// Add a new order
router.post("/add-order", async (req, res) => {
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

    // Basic validation
    if (
      !userId || !orderDate || !products || products.length === 0 ||
      !firstName || !lastName || !address || !city ||
      !state || !pinCode || !phone || shippingCharge === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newOrder = new Order({
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
      status: status || "Pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order added successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View all orders
router.get("/view-orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("products.productId");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View single order by ID
router.get("/view-order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("products.productId");

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

    res.status(200).json({ message: "Order deleted", order: deletedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Optional: Get all orders using a different route name
router.get("/get-all-orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching orders" });
  }
});


//for display recent record on dashboard4
// Get recent orders (latest 5)
router.get("/recent-orders", async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 }) // Sort by newest
      .limit(5) // Only latest 5
      .populate("userId")
      .populate("products.productId");

    res.status(200).json(recentOrders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent orders" });
  }
});


// Get total order count on dashboard
router.get("/total-orders-count", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total order count" });
  }
});



router.get("/monthly-orders", async (req, res) => {
  try {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const monthlyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$orderDate" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert aggregation result to object for easier lookup
    const ordersMap = {};
    monthlyOrders.forEach((item) => {
      ordersMap[item._id] = item.count;
    });

    // Build final array with all 12 months
    const result = monthNames.map((name, index) => ({
      month: name,
      orders: ordersMap[index + 1] || 0,
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching monthly orders", err);
    res.status(500).json({ error: "Failed to fetch monthly orders" });
  }
});


module.exports = router;
