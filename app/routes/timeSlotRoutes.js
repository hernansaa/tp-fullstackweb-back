const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/timeSlotController');

router.get('/', timeSlotController.getTimeSlots);
router.post('/create', timeSlotController.createTimeSlot);


module.exports = router;