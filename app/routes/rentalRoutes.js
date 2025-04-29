const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

router.post('/rent', rentalController.handleRental);   // Submit a rental

router.get('/products', rentalController.getProducts); // Fetch available products
router.post('/products', rentalController.createProduct); // Create a product

module.exports = router;