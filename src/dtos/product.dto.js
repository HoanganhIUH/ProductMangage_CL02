const { body } = require('express-validator');

exports.productDTO = [
  body('name').notEmpty().withMessage('Tên sản phẩm là bắt buộc'),
  body('slug').notEmpty().withMessage('Slug là bắt buộc'),
  body('quantity')
    .notEmpty().withMessage('Số lượng là bắt buộc')
    .bail()
    .isNumeric().withMessage('Số lượng phải là số')
    .bail()
    .isInt({ min: 0 }).withMessage('Số lượng phải là số nguyên không âm')
];
