const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // only the date part (e.g. 2025-04-30)
  startTime: { type: Date, required: true }, // full Date object (includes time)
  endTime: { type: Date, required: true },   // full Date object
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  isBooked: { type: Boolean, default: false },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }, // optional: linked booking
});

TimeSlotSchema.index({ product: 1, startTime: 1 }, { unique: true }); // prevent duplicates

const TimeSlot = mongoose.model('TimeSlot', TimeSlotSchema);

module.exports = TimeSlot;