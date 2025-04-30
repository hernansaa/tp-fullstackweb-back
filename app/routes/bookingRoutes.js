const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingsController');

router.get('/', bookingController.getBookings);

module.exports = router;