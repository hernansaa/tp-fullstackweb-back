const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerName: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TimeSlot',
      // validate: {
      //   validator: function (value) {
      //     return value.length <= 3;
      //   },
      //   message: 'A booking can have at most 3 time slots.',
      // }
    }
  ],
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