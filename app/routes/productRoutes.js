const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
// router.get('/', productController.getProductsWithTimeSlots);
router.post('/create', productController.createProduct);

router.get('/:productId', productController.getProduct);
router.put('/:productId/update', productController.updateProduct);
router.delete('/:productId/delete', productController.deleteProduct);


router.get('/:productId/timeslots', productController.getProductTimeSlots);

module.exports = router;