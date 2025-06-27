const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

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
router.post("/register", authController.register);

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
router.post("/verify-otp", authController.verifyOTP);
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
 *         description: Đăng nhập thành công!
 *       401:
 *         description: Sai email hoặc mật khẩu
 *       403:
 *        description: Tài khoản chưa xác thực OTP
 *       500:
 *        description: Lỗi đăng nhập
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
router.delete("/delete-account", authController.deleteAccount);


module.exports = router;
