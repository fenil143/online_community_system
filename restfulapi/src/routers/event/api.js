const express = require('express');
const router = express.Router();
const Event = require("../../models/event");
const { v4: uuidv4 } = require('uuid');

// const eventSchema = new mongoose.Schema({
//     event_id: String,
//     community_id: String,
//     name: String,
//     event_time: Date,
//     event_description: String,
//     event_image: mongoose.Schema.Types.Mixed,
//     location: String, 
//     joined_students: mongoose.Schema.Types.Mixed,
//     organizer: { type: String, default: 'Unknown' },
//     max_attendees: { type: Number, default: 100 },  
//     current_attendees: { type: Number, default: 0},
//     created_at: { type: Date, default: Date.now },
//     attended: {type:Number, default: 0},
//   });

router.post("/addEvent", async (req, res) => {
  try {
    const {
      community_id,
      name,
      event_time,
      event_description,
      event_image,
      location,
      organizer,
      max_attendees,
    } = req.body;

    const newEvent = new Event({
      event_id : uuidv4(),
      community_id,
      name,
      event_time,
      event_description,
      event_image,
      location,
      organizer,
      max_attendees,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/getEventById/:event_id", async (req, res) => {
    try {
      const { event_id } = req.params;
  
      const event = await Event.findOne({ event_id });
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete("/deleteEvent/:event_id", async (req, res) => {
    try {
      const { event_id } = req.params;
  
      const deletedEvent = await Event.findOneAndDelete({ event_id });
  
      if (!deletedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.status(200).json(deletedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.patch("/addStudentToEvent/:event_id", async (req, res) => {
    try {
      const { event_id } = req.params;
      const { student_email } = req.body;
  
      const event = await Event.findOne({ event_id : event_id });
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      if (event.current_attendees >= event.max_attendees) {
        return res.status(404).json({ error: 'Event is already full' });
      }
  
      const updatedEvent = await Event.findOneAndUpdate(
        { event_id : event_id },
        {
          $addToSet: { joined_students: student_email },
          $inc: { current_attendees: 1 },
        },
        { new: true }
      );
  
      if (!updatedEvent) {
        return res.status(200).json({ error: 'Event not found' });
      }
  
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.patch("/removeStudentFromEvent/:event_id", async (req, res) => {
    try {
      const { event_id } = req.params;
      const { student_email } = req.body;
  
      const updatedEvent = await Event.findOneAndUpdate(
        { event_id : event_id },
        {
          $pull: { joined_students: student_email },
          $inc: { current_attendees: -1 },
        },
        { new: true }
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.post('/checkStudentInEvent/:event_id', async (req, res) => {
    try {
      const { event_id } = req.params;
      const { student_id } = req.body;
      if (!event_id || !student_id) {
        return res.status(400).json({ error: 'Event ID and Student ID are required.' });
      }
  
      const event = await Event.findOne({ event_id });
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found.' });
      }
  
      const isStudentJoined = event.joined_students && event.joined_students.includes(student_id);
  
      res.status(200).json({ isStudentJoined });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
