const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// ====================
// Public Routes
// ====================

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// ====================
// Protected Routes
// ====================

// User Profile
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      message: "Protected Route Accessed",
      user: req.user,
    });
  }
);

module.exports = router;