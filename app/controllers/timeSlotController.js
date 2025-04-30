const TimeSlot = require('../models/timeSlotModels.js');


function getTimeSlots(req, res) {
    
    TimeSlot.find({})
        .then(TimeSlots => {
            if(TimeSlots.length) return res.status(200).send({TimeSlots})
            return res.status(204).send({message: 'No Content'});
        }).catch(err => res.status(500).send({err}))

}

async function createTimeSlot(req, res) {
    try {
      const newTimeSlot = new TimeSlot(req.body);
      const savedSlot = await newTimeSlot.save();
      res.status(201).json(savedSlot);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }



module.exports = {
    getTimeSlots,
    createTimeSlot
}