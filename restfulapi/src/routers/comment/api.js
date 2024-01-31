const express = require('express');
const router = express.Router();
const Comment = require("../../models/comment");
const { v4: uuidv4 } = require('uuid');

router.post("/createComment", async (req, res) => {
  try {
    const {
      post_id,
      user_email,
      comment_message,
    } = req.body;

    const newComment = new Comment({
      comment_id: uuidv4(),
      post_id,
      user_email,
      comment_message,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(201).json({ error: 'Internal Server Error' });
  }
});


router.get("/getCommentById/:comment_id", async (req, res) => {
  try {
    const { comment_id } = req.params;

    const comment = await Comment.findOne({ comment_id });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete("/deleteComment/:comment_id", async (req, res) => {
    try {
      const { comment_id } = req.params;
  
      const deletedComment = await Comment.findOneAndDelete({ comment_id : comment_id });
  
      if (!deletedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      res.status(200).json(deletedComment);
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: 'Internal Server Error' });
    }
  });



module.exports = router;
