const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");


// REGISTER
router.post("/register", registerUser);


// LOGIN
router.post("/login", loginUser);


// PROFILE (Protected)
router.get("/profile", protect, getUserProfile);


module.exports = router;