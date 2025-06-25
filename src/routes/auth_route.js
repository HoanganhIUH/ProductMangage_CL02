const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

// Đăng ký người dùng
router.post('/register', authController.register);

module.exports = router;