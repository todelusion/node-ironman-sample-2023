// routes/order.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order.js");

// 新增訂單的 API
router.post("/order", async (req, res) => {
  const { userId, totalPrice } = req.body;

  try {
    const order = await Order.create({ userId, totalPrice });
    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
});

module.exports = router;
