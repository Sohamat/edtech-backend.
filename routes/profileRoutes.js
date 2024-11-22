const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to validate JWT

const router = express.Router();

// @route    GET /api/profile
// @desc     Get current user profile
// @access   Private
router.get("/", authMiddleware, getProfile);

// @route    PUT /api/profile
// @desc     Update current user profile
// @access   Private
router.put("/", authMiddleware, updateProfile);

module.exports = router;