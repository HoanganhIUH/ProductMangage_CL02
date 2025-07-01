const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));
    return res.status(400).json({ errors: formatted });
  }
  next();
};
