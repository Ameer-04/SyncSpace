const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const profileUpdateValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body("bio")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Bio must be 300 characters or less"),

  body("location")
    .optional()
    .trim(),

  body("role")
    .optional()
    .trim(),

  body("experienceLevel")
    .optional()
    .isIn(["Beginner", "Intermediate", "Advanced", "Professional"])
    .withMessage("Invalid experience level"),

  body("collaborationStatus")
    .optional()
    .isIn(["Open", "Busy", "Looking for Team"])
    .withMessage("Invalid collaboration status"),

  body("skills")
    .optional()
    .isArray()
    .withMessage("Skills must be an array"),

  body("socialLinks")
    .optional()
    .isObject()
    .withMessage("Social links must be an object"),
];

module.exports = {
  registerValidator,
  profileUpdateValidator,
};