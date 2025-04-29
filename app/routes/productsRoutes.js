const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/productsController');

router.get('/products', rentalController.getProducts);
router.post('/products/create', rentalController.createProduct);

module.exports = router;