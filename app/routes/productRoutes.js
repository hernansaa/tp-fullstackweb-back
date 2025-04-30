const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/:productId', productController.getProduct);
router.get('/:productId/timeslots', productController.getProductTimeSlots);


router.post('/create', productController.createProduct);
// router.put('/products/:id/update', rentalController.updateProduct);




module.exports = router;