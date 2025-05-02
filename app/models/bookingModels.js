const mongoose = require('mongoose');

const ProductRentalSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  timeSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot' }],
});

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  date: { type: Date, required: true },
  rentals: [ProductRentalSchema], // <-- array of product rentals
  paymentMethod: { type: String, enum: ['cash', 'foreign_currency'], required: true },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  total: { type: Number },
});


// Pre-save hook to calculate the total
// Pre-save hook to calculate the total with a discount
BookingSchema.pre('save', async function (next) {
  try {
    let total = 0;

    for (const rental of this.rentals) {
      const product = await mongoose.model('Product').findById(rental.product);

      if (product && rental.timeSlots.length > 0) {
        total += rental.timeSlots.length * product.price;
      }
    }

    // Apply a 10% discount if there is more than one product rented
    if (this.rentals.length > 1) {
      total *= 0.9; // Apply 10% discount
    }

    this.total = total;

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