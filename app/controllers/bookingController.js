const models = require('../models/bookingModels.js');


async function getBookings(req, res) {
    
    models.Booking.find({})
        .then(Bookings => {
            if(Bookings.length) return res.status(200).send({Bookings})
            return res.status(204).send({message: 'No Content'});
        }).catch(err => res.status(500).send({err}))
}


async function createBooking(req, res) { 
    try {
      const { product, customerName, date, timeSlots, paymentMethod, isPaid } = req.body;
  
      if (timeSlots.length > 3) {
        return res.status(400).json({ error: 'Maximum of 3 time slots allowed' });
      }
  
      // Check for conflicting bookings on the same date
      const conflictingBookings = await models.Booking.find({
        product,
        date: new Date(date),
        timeSlots: { $in: timeSlots }
      });
  
      if (conflictingBookings.length > 0) {
        return res.status(400).json({
          error: 'One or more selected time slots are already booked for this product on the selected date.'
        });
      }
  
      const booking = new models.Booking({
        product,
        customerName,
        date,
        timeSlots,
        paymentMethod,
        isPaid
      });
  
      await booking.save();
      res.status(201).json(booking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


module.exports = {
    getBookings,
    createBooking
}