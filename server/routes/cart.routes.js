const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/cart", authMiddleware, cartController.addToCart);

module.exports = router;