const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerName: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot',}],
  paymentMethod: { type: String, enum: ['cash', 'foreign_currency'], required: true },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  total: { type: Number }
});


// Pre-save hook to calculate the total
BookingSchema.pre('save', async function (next) {
  try {
    // Populate the product data to get the product price
    const product = await mongoose.model('Product').findById(this.product);

    if (product && this.timeSlots.length > 0) {
      console.log('Product price:', product.price);
      // Calculate the total by multiplying the price by the number of time slots
      this.total = this.timeSlots.length * product.price;
    }

    next();
  } catch (err) {
    next(err);
  }
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