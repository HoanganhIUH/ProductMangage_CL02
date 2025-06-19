const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');

router.get('/product', productController.getAllProducts);
console.log('CreateProduct handler:', typeof productController.createProduct);
router.post('/product', productController.createProduct);

module.exports = router;