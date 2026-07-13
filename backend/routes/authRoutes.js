const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { registerValidator } = require("../validators/authValidator");
const validate = require("../middleware/validate");

router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginUser);

module.exports = router;