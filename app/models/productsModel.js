const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },                     // e.g. JetSki, Cuatriciclo, etc.
  category: { type: String, required: true },                 // e.g. "vehicle", "equipment", "surfboard"
  requiresHelmet: { type: Boolean, default: false },
  requiresLifeJacket: { type: Boolean, default: false },
  capacity: { type: Number, default: 1 },                     // e.g. 1 or 2 persons
  durationPerSlot: { type: Number, default: 30 },             // Minutes
  maxDurationConsecutive: { type: Number, default: 90 },      // Minutes
  minReserveAnticipation: { type: Number, default: 2 },       // Hours
  maxReserveAnticipation: { type: Number, default: 48 },      // Hours
  isForKids: { type: Boolean, default: false },               // For surfboards
  inventaryQuantity: { type: Number, default: 5 }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;