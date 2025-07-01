const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const { registerDTO, loginDTO, verifyOTPDTO, resendOTPDTO, deleteAccountDTO } = require('../dtos/auth.dto');
const validate = require('../middlewares/validate.middleware');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: number
 *     responses:
 *       200:
 *         description: Mã OTP đã được gửi đến email của bạn. Vui lòng xác thực để hoàn tất đăng ký.
 *       500:
 *         description: Không thể gửi email xác thực. Vui lòng thử lại sau.
 */
router.post('/register', registerDTO, validate, authController.register);

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Xác thực OTP
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công!
 *       404:
 *        description: Email không tồn tại trong quá trình đăng ký
 *       400:
 *         description: OTP không hợp lệ hoặc đã hết hạn
 *       500:
 *         description: Xác thực thất bại
 */
router.post("/verify-otp", verifyOTPDTO, validate, authController.verifyOTP);
// Đăng nhập người dùng
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai email hoặc mật khẩu
 *       403:
 *        description: Tài khoản chưa xác thực OTP
 *       500:
 *        description: Lỗi đăng nhập
 *          
 */
router.post("/login", authController.login);
/**
 * @swagger
 * /api/auth/delete-account:
 *   delete:
 *     summary: Xóa tài khoản người dùng
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Xóa tài khoản thành công.
 *       404:
 *         description: Không tìm thấy tài khoản để xóa.
 *       500:
 *         description: Xóa tài khoản thất bại.
 */
router.delete("/delete-account", auth('admin'), deleteAccountDTO, validate, authController.deleteAccount);

/**
 * @swagger
 * /api/auth/resend-otp:
 *   post:
 *     summary: Gửi lại mã OTP cho email chưa xác thực
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP mới đã được gửi đến email của bạn.
 *       404:
 *         description: Email không tồn tại hoặc đã xác thực
 *       500:
 *         description: Không thể gửi lại OTP
 */
router.post('/resend-otp', resendOTPDTO, validate, authController.resendOTP);

module.exports = router;
