const express = require('express');
const router = express.Router();
const Post = require("../../models/posts");
const Community=require("../../models/community");
const { v4: uuidv4 } = require('uuid');

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

// router.delete("/deletePost/:post_id", async (req, res) => {
//     try {
//       const { post_id } = req.params;
  
//       const deletedPost = await Post.findOneAndDelete({ post_id : post_id });
  
//       if (!deletedPost) {
//         return res.status(404).json({ error: 'Post not found' });
//       }
  
//       res.status(200).json(deletedPost);
//     } catch (error) {
//       console.error(error);
//       res.status(400).json({ error: 'Internal Server Error' });
//     }
//   });

router.delete("/deletePost/:post_id", async (req, res) => {
  try {
    const { post_id } = req.params;

    // Delete the post
    const deletedPost = await Post.findOneAndDelete({ post_id: post_id });

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the community document to remove the post ID from the community_posts array
    const updatedCommunity = await Community.findOneAndUpdate(
      {},
      { $pull: { community_posts: post_id } },
      { new: true }
    );

    if (!updatedCommunity) {
      return res.status(404).json({ error: 'Community not found' });
    }

    res.status(200).json(deletedPost);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: 'Internal Server Error' });
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
