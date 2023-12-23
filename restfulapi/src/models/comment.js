const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment_id : String,
  post_id: String,
  user_email : String,
  comment_message: String,
  likes: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
