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

const Booking = mongoose.model('Booking', BookingSchema);


const AccessorySchema = new mongoose.Schema({
    type: { type: String, enum: ['helmet', 'lifejacket'], required: true },
    quantity: { type: Number, default: 1 },
    linkedBooking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  });
  
const Accessory = mongoose.model('Accessory', AccessorySchema);

module.exports = {
  Booking,
  Accessory,
}