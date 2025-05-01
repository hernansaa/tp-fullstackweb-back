const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');


router.get('/', bookingController.getBookings);
router.post('/create', bookingController.createBooking);


module.exports = router;