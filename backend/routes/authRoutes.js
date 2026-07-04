const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { registerValidator } = require("../validators/authValidator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;