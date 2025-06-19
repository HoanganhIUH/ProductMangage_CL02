const pool = require('../pool');

exports.getAllProducts = async (req, res) => {
  const result = await pool.query("SELECT * FROM product ORDER BY created_at DESC");
  res.json(result.rows);
};
exports.createProduct = async (req, res) => {
  const { name, slug, quantity } = req.body;

  try {
    // Kiểm tra slug đã tồn tại chưa
    const check = await pool.query("SELECT * FROM product WHERE slug = $1", [slug]);
    if (check.rows.length > 0) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    // Nếu chưa có, insert vào
    const result = await pool.query(
      "INSERT INTO product (name, slug, quantity) VALUES ($1, $2, $3) RETURNING *",
      [name, slug, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM product WHERE id = $1", [id]);

  if (result.rows.length === 0) return res.status(404).json({ message: "Product not found" });
  res.json(result.rows[0]);
};
exports.getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  const result = await pool.query("SELECT * FROM product WHERE slug = $1", [slug]);

  if (result.rows.length === 0) return res.status(404).json({ message: "Product not found" });
  res.json(result.rows[0]);
};


