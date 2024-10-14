const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

//Register a new user
router.post("/signup", userController.registerUser);

//login an existing user
router.post("/signin", userController.login);

//get the user profile (protucted route)
router.get("/profile", authMiddleware, userController.getUserProfile);

module.exports = router;