const express = require('express');
const router = express.Router();
const Community = require("../../models/community");


router.post("/checkCommunityName", async (req, res) => {
  try {
    const { community_name } = req.body;
    const existingCommunity = await Community.findOne({ community_name : community_name });

    if (existingCommunity) {
      res.status(200).json({ error: 'Community with this name already exists' });
    } else {
      res.status(200).json({ message: 'Community name is available' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/storeCommunity", async (req, res) => {
    try {
      const communityData = req.body;
      communityData.verified_status = false;
      communityData.community_likes = 0;
      const newCommunity = new Community(communityData);
  
      const savedCommunity = await newCommunity.save();
  
      res.status(201).json(savedCommunity);
    } catch (error) {
      console.error(error);
      res.status(201).json({ error: 'Internal Server Error' });
    }
  });


  router.patch("/activateCommunity/:community_name", async (req, res) => {
    try {
      const { community_name } = req.params;
      const updatedCommunity = await Community.findOneAndUpdate(
        { community_name, community_status: false }, 
        { $set: { community_status: true } }, 
        { new: true } 
      );
  
      if (!updatedCommunity) {
        return res.status(200).json({ error: 'Community not found or already active' });
      }
      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get("/unverifiedCommunities", async (req, res) => {
    try {
      const unverifiedCommunities = await Community.find({ verified_status: false });
      res.status(200).json(unverifiedCommunities);
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: 'Internal Server Error' });
    }
  });

  router.get("/getCommunityByName/:community_name", async (req, res) => {
    try {
      const { community_name } = req.params;
  
      const community = await Community.findOne({ community_name });
  
      if (!community) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      res.status(200).json(community);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post("/addJoinRequest/:community_name", async (req, res) => {
    try {
      const { community_name } = req.params;
      const { student_email } = req.body;
      const existingCommunity = await Community.findOne({ community_name });
  
      if (!existingCommunity) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      if (existingCommunity.pending_join_requests.includes(student_email)) {
        return res.status(400).json({ message: 'Join request already pending for this student' });
      }
      existingCommunity.pending_join_requests.push(student_email);
  
      const updatedCommunity = await existingCommunity.save();

      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post("/addJoinedStudent/:community_name", async (req, res) => {
    try {
      const { community_name } = req.params;
      const { student_email } = req.body;
      const existingCommunity = await Community.findOne({ community_name });
  
      if (!existingCommunity) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      if (existingCommunity.joined_students.includes(student_email)) {
        return res.status(400).json({ message: 'Student already joined this community' });
      }
  
      existingCommunity.joined_students.push(student_email);
 
      const updatedCommunity = await existingCommunity.save();
  
      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete("/rejectJoinRequest/:community_name", async (req, res) => {
    try {
      const { community_name } = req.params;
      const { student_email } = req.body;

      const existingCommunity = await Community.findOne({ community_name });
  
      if (!existingCommunity) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      existingCommunity.pending_join_requests = existingCommunity.pending_join_requests.filter(
        email => email !== student_email
      );
  
      const updatedCommunity = await existingCommunity.save();
  
      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete("/removeJoinedStudent/:community_name", async (req, res) => {
    try {
      const { community_name } = req.params;
      const { student_email } = req.body;
  
      const existingCommunity = await Community.findOne({ community_name });
  
      if (!existingCommunity) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      existingCommunity.joined_students = existingCommunity.joined_students.filter(
        email => email !== student_email
      );
  
      const updatedCommunity = await existingCommunity.save();
      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post("/addCommunityEvent/:community_name", async (req, res) => {
    try {
      const { community_name } = req.params;
  
      const { event_id } = req.body; 
  
      const existingCommunity = await Community.findOne({ community_name : community_name });
  
      if (!existingCommunity) {
        return res.status(200).json({ error: 'Community not found' });
      }
  
      
      existingCommunity.community_events.push(event_id);
  
      const updatedCommunity = await existingCommunity.save();
  
      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: 'Internal Server Error' });
    }
  });

  router.delete("/removeCommunityEvent/:community_name", async (req, res) => {
    try {
      const { community_name } = req.params;
      const { event_id } = req.body;
  
      const existingCommunity = await Community.findOne({ community_name });
  
      if (!existingCommunity) {
        return res.status(200).json({ error: 'Community not found' });
      }
  
      existingCommunity.community_events = existingCommunity.community_events.filter(
        eventId => eventId !== event_id
      );
  
      const updatedCommunity = await existingCommunity.save();
      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: 'Internal Server Error' });
    }
  });

  router.post("/addCommunityPost/:community_name", async (req, res) => {
    try {
      const { community_name } = req.params;
      const { post_id } = req.body;
  
      const existingCommunity = await Community.findOne({ community_name });
  
      if (!existingCommunity) {
        return res.status(200).json({ error: 'Community not found' });
      }
  
      existingCommunity.community_posts.push(post_id);
  
      const updatedCommunity = await existingCommunity.save();
  
      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete("/removeCommunityPost/:community_name", async (req, res) => {
    try {
      const { community_name } = req.params;
      const { post_id } = req.body;
  
      const existingCommunity = await Community.findOne({ community_name });
  
      if (!existingCommunity) {
        return res.status(200).json({ error: 'Community not found' });
      }
  
      existingCommunity.community_posts = existingCommunity.community_posts.filter(
        post => post !== post_id
      );
  
      const updatedCommunity = await existingCommunity.save();
      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: 'Internal Server Error' });
    }
  });
  
 
  

module.exports = router;
