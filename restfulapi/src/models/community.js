const mongoose=require("mongoose");

const communitySchema = new mongoose.Schema({
    verified_status: { type: Boolean, default: false },
    community_name: String,
    description: String,
    image: String,
    owner_email: String,
    community_likes: { type: Number, default: 0 },
    joined_students: mongoose.Schema.Types.Mixed,
    pending_join_requests:mongoose.Schema.Types.Mixed , 
    community_events: mongoose.Schema.Types.Mixed,
    community_posts: mongoose.Schema.Types.Mixed,
  });
  
  const Community = mongoose.model('Community', communitySchema);
  
  module.exports = Community;