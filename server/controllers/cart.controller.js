const express = require("express");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const existingProductIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId
        );

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += quantity || 1
        } else {
            const product = await Product.findById(productId);
            if(!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            cart.products.push({ productId, quantity: quantity || 1 });
        };

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
