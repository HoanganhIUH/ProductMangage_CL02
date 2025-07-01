const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (requiredRole = null) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Bạn không có quyền truy cập" });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
  };
};

module.exports = auth;
