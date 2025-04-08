const express = require('express');
const router = express.Router();
const Cart = require('../../models/AdminModels/Cart');

// POST /api/cart/add
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cartItem = new Cart({ userId, productId, quantity });
    await cartItem.save();

    res.status(200).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

module.exports = router;
