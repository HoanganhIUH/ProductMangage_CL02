const pool = require('../pool');

exports.getAllProducts = async (req, res) => {
  const result = await pool.query("SELECT * FROM product ORDER BY created_at DESC");
  res.json(result.rows);
};