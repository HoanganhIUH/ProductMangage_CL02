const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");
const auth = require("../middlewares/auth.middleware");
const { productDTO } = require('../dtos/product.dto');
const validate = require('../middlewares/validate.middleware');

/**
 * @swagger
 * /api/product:
 *  get:
 *    summary: Lấy danh sách sản phẩm
 *    tags:
 *      - Product
 *    responses:
 *       200:
 *        description: Danh sách sản phẩm
 *       500:
 *        description: Lỗi máy chủ nội bộ
 */
router.get("/product", productController.getAllProducts);

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Trả về thông tin sản phẩm mới được tạo
 *       400:
 *         description: Slug already exists
 *       500:
 *         description: Internal server error
 */
router.post("/product", auth('admin'), productDTO, validate, productController.createProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Lấy thông tin sản phẩm theo ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm
 *     responses:
 *       201:
 *         description: Trả về thông tin sản phẩm
 *       404:
 *         description: Slug already exists
 *       500:
 *         description: Internal server error
 */
router.get("/product/:id", productController.getProductById);

/**
 * @swagger
 * /api/product/slug/{slug}:
 *   get:
 *     summary: Lấy thông tin sản phẩm theo slug
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug của sản phẩm
 *     responses:
 *       200:
 *         description: Trả về thông tin sản phẩm
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/product/slug/:slug", productController.getProductBySlug);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Cập nhật thông tin sản phẩm
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Trả về thông tin sản phẩm đã cập nhật
 *       404:
 *         description: Product not found
 */
router.put("/product/:id", auth('admin'), productDTO, validate, productController.updateProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Xóa sản phẩm theo ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm cần xóa
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete("/product/:id",auth('admin'), productController.deleteProduct);

module.exports = router;
