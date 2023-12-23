const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_id: String,
  community_id: String,
  name: String,
  event_time: Date,
  event_description: String,
  event_image: mongoose.Schema.Types.Mixed,
  location: String, 
  joined_students: mongoose.Schema.Types.Mixed,
  organizer: { type: String, default: 'Unknown' },
  max_attendees: { type: Number, default: 100 },  
  current_attendees: { type: Number, default: 0},
  created_at: { type: Date, default: Date.now },
  attended: {type:Number, default: 0},
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
