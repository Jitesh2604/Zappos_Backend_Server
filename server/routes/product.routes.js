const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getProducts);

router.get("/category/:category", productController.getProductByCategory);

router.post("/addProduct", productController.createProduct);

module.exports = router;