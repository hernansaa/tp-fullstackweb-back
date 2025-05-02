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
        const { customerName, date, rentals, paymentMethod, isPaid } = req.body;

        if (!Array.isArray(rentals) || rentals.length === 0) {
            return res.status(400).json({ error: 'Rentals array is required and cannot be empty.' });
        }

        const validatedRentals = [];

        for (const rental of rentals) {
            const { product, timeSlots } = rental;

            if (!product || !Array.isArray(timeSlots) || timeSlots.length === 0) {
                return res.status(400).json({
                    error: 'Each rental must include a valid product and at least one timeSlot.'
                });
            }

            const slots = await TimeSlot.find({ _id: { $in: timeSlots } });

            if (slots.length !== timeSlots.length) {
                return res.status(400).json({ error: 'Invalid time slot(s) provided for a product.' });
            }

            // Sort time slots by start time
            const sortedSlots = slots.sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

            if (sortedSlots.length > 3 && !areConsecutive(sortedSlots)) {
                return res.status(400).json({
                    error: `You can only book up to 3 consecutive time slots per product (product: ${product}).`
                });
            }

            // Check for booking conflicts
            const conflicts = await models.Booking.find({
                date: new Date(date),
                'rentals.product': product,
                'rentals.timeSlots': { $in: timeSlots }
            });

            if (conflicts.length > 0) {
                return res.status(400).json({
                    error: `One or more time slots are already booked for product ${product} on this date.`
                });
            }

            validatedRentals.push({ product, timeSlots });
        }

        const booking = new models.Booking({
            customerName,
            date,
            rentals: validatedRentals,
            paymentMethod,
            isPaid
        });

        await booking.save();
        res.status(201).json(booking);

    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
}




module.exports = {
    getBookings,
    createBooking
}