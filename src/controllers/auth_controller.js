const pool = require("../pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOTP } = require("../utils/mailer");
require("dotenv").config();


exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //Kiểm tra email đã tồn tại chưa
    const existingUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Tài khoản với email này đã tồn tại" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 phút

    // Lưu thông tin tạm thời vào bảng pending_users
    await pool.query(
      `INSERT INTO pending_users (name, email, password, otp, otp_expires_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, email, password, otp, otpExpiresAt]
    );

    // Gửi OTP
    try {
      await sendOTP(email, otp);
      res.status(200).json({ message: "Mã OTP đã được gửi đến email của bạn. Vui lòng xác thực để hoàn tất đăng ký." });
    } catch (emailError) {
      console.error("Lỗi gửi email:", emailError);
      // Xóa thông tin tạm thời nếu gửi email thất bại
      await pool.query(`DELETE FROM pending_users WHERE email = $1`, [email]);
      return res.status(500).json({ error: "Không thể gửi email xác thực. Vui lòng thử lại sau." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Đăng ký thất bại" });
  }
};