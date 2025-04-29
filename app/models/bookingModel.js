const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerName: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  paymentMethod: { type: String, enum: ['cash', 'foreign_currency'], required: true },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);


const AccessorySchema = new mongoose.Schema({
    type: { type: String, enum: ['helmet', 'lifejacket'], required: true },
    quantity: { type: Number, default: 1 },
    linkedBooking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  });
  
module.exports = mongoose.model('Accessory', AccessorySchema);


const TimeSlotSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // only the date part (e.g. 2025-04-30)
  startTime: { type: Date, required: true }, // full Date object (includes time)
  endTime: { type: Date, required: true },   // full Date object
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  isBooked: { type: Boolean, default: false },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }, // optional: linked booking
});

TimeSlotSchema.index({ product: 1, startTime: 1 }, { unique: true }); // prevent duplicates

module.exports = mongoose.model('TimeSlot', TimeSlotSchema);