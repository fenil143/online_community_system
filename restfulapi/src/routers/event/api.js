const express = require('express');
const router = express.Router();
const Student = require("../../models/student");
const Event = require("../../models/event");
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');
const he = require('he');

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
// router.post("/getdetails",async(req,res)=>{
//   const email = req.body.email;
//   const eventid = req.body.event;
//   console.log(eventid);
  
//   const event = await Event.findOne({ event_id: eventid });
//   console.log(event.joined_students);
//   const list = event.joined_students;

//   // Use Promise.all to wait for all asynchronous operations to complete
//   const recipientEmails = await Promise.all(
//     list.map((student) => Student.findOne({ email: student }))
//   );

//   console.log(recipientEmails);
//   var transporter5 = nodemailer.createTransport({

//       service: 'gmail',
//       auth: {
  
//         user: 'bhavik5033@gmail.com',
//         pass: 'phblgjyjsosztbhn'
  
//       }
  
//     });
//     const mailOptions5= {
//       from: 'bhavik5033@gmail.com',
//       to: email,
//       subject: 'Online Community Management System - Joining Students List',
//       html: `
//         <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
//           <h1 style="color: #333; font-size: 24px;">Student List</h1>
//           <p style="color: #666; font-size: 16px;">
//             Event <name:-1>event.name</name:-1>  
//             Students:-
//             Name:-${recipientEmails.name} Email:-${list}
//           </p>
//           <p style="color: #666; font-size: 16px;">Thank you.</p>
//         </div>
//       `,
//     };
// })
router.post("/getdetails", async (req, res) => {
  try {
    const email = req.body.email;
    const eventid = req.body.event;
    console.log(eventid);

    const event = await Event.findOne({ event_id: eventid });
    console.log(event.joined_students);
    const list = event.joined_students;

    // Use Promise.all to wait for all asynchronous operations to complete
    const recipientEmails = await Promise.all(
      list.map((student) => Student.findOne({ email: student }))
    );

    console.log(recipientEmails);

    var transporter5 = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bhavik5033@gmail.com',
        pass: 'phblgjyjsosztbhn'
      }
    });

   
    const studentsListHTML = recipientEmails.map((student) => `
  <p style="color: #666; font-size: 16px;">
    Name: ${he.encode(student.name)}  <br>
    Email: ${he.encode(student.email)}
  </p>`
).join('');

    const mailOptions5 = {
      from: 'bhavik5033@gmail.com',
      to: email,
      subject: 'Online Community Management System - Joining Students List',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
          <h1 style="color: #333; font-size: 24px;">Student List</h1>
          <p style="color: #666; font-size: 16px;">
            Event: ${he.encode(event.name)}
          </p>
          ${studentsListHTML}
          <p style="color: #666; font-size: 16px;">Thank you.</p>
        </div>
      `,
    };
    
    await transporter5.sendMail(mailOptions5);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
