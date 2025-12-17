const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/", registerUser);
router.post("/login", loginUser);
// Protected route
router.get("/current", protect, getCurrentUser);

module.exports = router;
