const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

// Đăng ký người dùng
router.post('/register', authController.register);
// Xác thực OTP
router.post('/verify-otp', authController.verifyOTP);
// Đăng nhập người dùng
router.post('/login', authController.login);


module.exports = router;