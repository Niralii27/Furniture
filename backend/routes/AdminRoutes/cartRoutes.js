const express = require('express');
const router = express.Router();
const Cart = require('../../models/AdminModels/Cart');

// POST /api/cart/add
router.post('/add', async (req, res) => {
  const { userId, productId, quantity, costPrice, productImage, } = req.body;

  try {
    const cartItem = new Cart({ userId, productId, quantity, costPrice, productImage, });
    await cartItem.save();

    res.status(200).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

// // GET /api/cart/user/:userId
// router.get("/api/Cart/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   const cartItems = await Cart.find({ userId });
//   res.json(cartItems);
// });

// GET /api/cart/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId }).populate('productId');
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error });
  }
});



// DELETE /api/cart/remove/:id
router.delete('/remove/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item", error });
  }
});

module.exports = router;
