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
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    // Kiểm tra trong bảng pending_users
    const result = await pool.query(`SELECT * FROM pending_users WHERE email = $1`, [email]);
    const pendingUser = result.rows[0];
    if (!pendingUser) return res.status(404).json({ error: "Email không tồn tại trong quá trình đăng ký" });

    if (pendingUser.otp !== otp || new Date() > new Date(pendingUser.otp_expires_at)) {
      return res.status(400).json({ error: "OTP không hợp lệ hoặc đã hết hạn" });
    }

    // Hash password trước khi lưu vào database chính
    const hashedPassword = await bcrypt.hash(pendingUser.password, 10);

    // Lưu user vào bảng users chính
    await pool.query(
      `INSERT INTO users (name, email, password, is_verified)
       VALUES ($1, $2, $3, true)`,
      [pendingUser.name, pendingUser.email, hashedPassword]
    );

    // Xóa thông tin tạm thời
    await pool.query(`DELETE FROM pending_users WHERE email = $1`, [email]);

    res.json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Xác thực thất bại" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "Sai email hoặc mật khẩu" });

    if (!user.is_verified) return res.status(401).json({ error: "Tài khoản chưa xác thực OTP" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Sai email hoặc mật khẩu" });

    const token = jwt.sign({ userId: user.id, userName: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.json({ message: "Đăng nhập thành công", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi đăng nhập" });
  }
};  