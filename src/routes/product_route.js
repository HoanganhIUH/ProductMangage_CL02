const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');

router.get('/product', productController.getAllProducts);
router.post('/product', productController.createProduct);
router.get('/product/:id', productController.getProductById);


module.exports = router;