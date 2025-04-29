const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/productsController');

router.get('/products', rentalController.getProducts);
router.get('/products/:id', rentalController.getProduct);
router.post('/products/create', rentalController.createProduct);
// router.put('/products/:id/update', rentalController.updateProduct);

module.exports = router;