const express = require('express');
const router = express.Router();
const Post = require("../../models/post");
const { v4: uuidv4 } = require('uuid');

// const postSchema = new mongoose.Schema({
//     post_id : String,
//     community_id: String,
//     user_email: String,
//     name: String,
//     post_description: String,
//     likes: { type: Number, default: 0 }, 
//     post_image: String,  
//     created_at: { type: Date, default: Date.now },
//     post_comments: mongoose.Schema.Types.Mixed,
//   });

router.post("/addPost", async (req, res) => {
    try {
      const {
        community_id,
        user_email,
        name,
        post_description,
        post_image,
      } = req.body;
  
      const newPost = new Post({
        post_id: uuidv4(),
        community_id,
        user_email,
        name,
        post_description,
        post_image,
      });
  
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.get("/getPostById/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;

    const post = await Post.findOne({post_id : post_id });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal Server Error' });
  }
});

router.delete("/deletePost/:post_id", async (req, res) => {
    try {
      const { post_id } = req.params;
  
      const deletedPost = await Post.findOneAndDelete({ post_id : post_id });
  
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(deletedPost);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Internal Server Error' });
    }
  });

  router.patch("/addCommentToPost/:post_id", async (req, res) => {
    try {
      const { post_id } = req.params;
      const { comment_id } = req.body;
  
      const updatedPost = await Post.findOneAndUpdate(
        { post_id },
        {
          $addToSet: { post_comments: comment_id },
        },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.patch("/removeCommentFromPost/:post_id", async (req, res) => {
    try {
      const { post_id } = req.params;
      const { comment_id } = req.body;
  
      const updatedPost = await Post.findOneAndUpdate(
        { post_id },
        {
          $pull: { post_comments: comment_id },
        },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
