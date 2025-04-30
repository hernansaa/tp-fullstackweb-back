const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema({
  // date: { type: Date, required: true }, // only the date part (e.g. 2025-04-30)
  startTime: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ }, // e.g. "10:30"
  endTime: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
  // product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  isBooked: { type: Boolean, default: false },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }, // optional: linked booking
});

TimeSlotSchema.index({ startTime: 1, endTime: 1 }, { unique: true }); // prevent duplicates

const TimeSlot = mongoose.model('TimeSlot', TimeSlotSchema);

module.exports = TimeSlot;