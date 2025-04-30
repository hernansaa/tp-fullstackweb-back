const models = require('../models/bookingModels.js');


function getBookings(req, res) {
    
    models.Booking.find({})
        .then(Bookings => {
            if(Bookings.length) return res.status(200).send({Bookings})
            return res.status(204).send({message: 'No Content'});
        }).catch(err => res.status(500).send({err}))
}


module.exports = {
    getBookings,
}