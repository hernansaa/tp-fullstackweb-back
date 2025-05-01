const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema({
  startTime: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ }, // e.g. "10:30"
  endTime: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
});

TimeSlotSchema.index({ startTime: 1, endTime: 1 }, { unique: true }); // prevent duplicates

const TimeSlot = mongoose.model('TimeSlot', TimeSlotSchema);

module.exports = {
  TimeSlot
};