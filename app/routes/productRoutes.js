const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/create', productController.createProduct);
// router.put('/products/:id/update', rentalController.updateProduct);

module.exports = router;