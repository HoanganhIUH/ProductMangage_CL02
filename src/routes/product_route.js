const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');

router.get('/product', productController.getAllProducts);

module.exports = router;