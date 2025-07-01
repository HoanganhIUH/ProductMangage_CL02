const { body } = require('express-validator');

exports.registerDTO = [
  body('name')
    .notEmpty().withMessage('Tên là bắt buộc')
    .isLength({ min: 2 }).withMessage('Tên phải có ít nhất 2 ký tự'),

  body('email')
    .isEmail().withMessage('Email không hợp lệ'),

  body('password')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),

  body('role')
    .optional()
    .isIn(['admin', 'user']).withMessage('Role chỉ được là admin hoặc user')
];

exports.loginDTO = [
  body('email')
    .isEmail().withMessage('Email không hợp lệ'),

  body('password')
    .notEmpty().withMessage('Mật khẩu là bắt buộc')
];

exports.verifyOTPDTO = [
  body('email')
    .isEmail().withMessage('Email không hợp lệ'),

  body('otp')
    .notEmpty().withMessage('OTP là bắt buộc')
    .isLength({ min: 6, max: 6 }).withMessage('OTP phải có 6 ký tự')
];

exports.resendOTPDTO = [
  body('email')
    .isEmail().withMessage('Email không hợp lệ')
];

exports.deleteAccountDTO = [
  body('email')
    .isEmail().withMessage('Email không hợp lệ')
];
