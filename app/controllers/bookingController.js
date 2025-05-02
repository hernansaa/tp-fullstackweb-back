const models = require('../models/bookingModels.js');
const { TimeSlot } = require('../models/timeSlotModels');

async function getBookings(req, res) {

    models.Booking.find({})
        .then(Bookings => {
            if (Bookings.length) return res.status(200).send({ Bookings })
            return res.status(204).send({ message: 'No Content' });
        }).catch(err => res.status(500).send({ err }))
}


function toMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}


function areConsecutive(slots) {
    for (let i = 0; i < slots.length - 1; i++) {
        const currentEnd = toMinutes(slots[i].endTime);
        const nextStart = toMinutes(slots[i + 1].startTime);
        if (currentEnd !== nextStart) return false;
    }
    return true;
}


async function createBooking(req, res) {
    try {
        const { product, customerName, date, timeSlots, paymentMethod, isPaid } = req.body;

        const slots = await TimeSlot.find({ _id: { $in: timeSlots } });

        if (slots.length !== timeSlots.length) {
            return res.status(400).json({ error: 'Invalid time slot(s) provided' });
        }

        // Sort time slots by startTime
        const sortedSlots = slots.sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

        if (sortedSlots.length > 3 && !areConsecutive(sortedSlots)) {
            return res.status(400).json({ error: 'You can only book up to 3 consecutive time slots' });
        }

        // Check for conflicts
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

        // const booking = new models.Booking({
        //     product,
        //     customerName,
        //     date,
        //     timeSlots,
        //     paymentMethod,
        //     isPaid
        // });
        const booking = new models.Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getBookings,
    createBooking
}