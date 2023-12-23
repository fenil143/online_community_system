const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  post_id : String,
  community_id: String,
  user_email: String,
  name: String,
  post_description: String,
  likes: { type: Number, default: 0 }, 
  post_image: String,  
  created_at: { type: Date, default: Date.now },
  post_comments: mongoose.Schema.Types.Mixed,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
