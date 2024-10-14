const express = require("express");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "err.message" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        let product;

        if (Array.isArray(req.body)) {
            product = await Product.insertMany(req.body);
        } else {
            product = await Product.create(req.body);
        }
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

exports.getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params; 

        const categoryDoc = await Category.findOne({ $or: [{ name: category }, { _id: category }] });

        if (!categoryDoc) {
            return res.status(404).json({ message: "Category not found" });
        }

        
        const products = await Product.find({ category: categoryDoc._id }).populate('category'); // Populate the category field

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found for this category" });
        }

        res.json(products); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}    

