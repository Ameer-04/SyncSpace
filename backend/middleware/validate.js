const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const normalizedErrors = errors.array();
    return res.status(400).json({
      message: normalizedErrors[0]?.msg || "Validation failed",
      errors: normalizedErrors,
    });
  }

  next();
};

module.exports = validate;