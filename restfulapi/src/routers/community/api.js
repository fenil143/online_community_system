const express = require("express");
const router = express.Router();
const Community = require("../../models/community");

router.get("/allCommunities", async (req, res) => {
  try {
    const allCommunities = await Community.find();
    res.status(200).json(allCommunities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/checkCommunityName", async (req, res) => {
  try {
    const { community_name } = req.body;
    const existingCommunity = await Community.findOne({
      community_name: community_name,
    });

    if (existingCommunity) {
      res
        .status(200)
        .json({ error: "Community with this name already exists" });
    } else {
      res.status(200).json({ message: "Community name is available" });
    }
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.post("/storeCommunity", async (req, res) => {
  try {
    const { community_name } = req.body;
    const existingCommunity = await Community.findOne({
      community_name: community_name,
    });

    if (existingCommunity) {
      res
        .status(200)
        .json({ error: "Community with this name already exists" });
        return ;
    }
    const communityData = req.body;
    communityData.verified_status = false;
    communityData.community_likes = 0;
    const newCommunity = new Community(communityData);
    newCommunity.joined_students = [];
    newCommunity.pending_join_requests = [];
    newCommunity.community_events = [];
    newCommunity.community_posts = [];
    const savedCommunity = await newCommunity.save();

    res.status(201).json(savedCommunity);
  } catch (error) {
    console.error(error);
    res.status(201).json({ error: "Internal Server Error" });
  }
});

router.patch("/activateCommunity/:community_name", async (req, res) => {
  try {
    const { community_name } = req.params;
    const updatedCommunity = await Community.findOneAndUpdate(
      { community_name: community_name, verified_status: false },
      { $set: { verified_status: true } },
      { new: true }
    );

    if (!updatedCommunity) {
      return res
        .status(200)
        .json({ error: "Community not found or already active" });
    }
    res.status(200).json(updatedCommunity);
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.delete('/deleteCommunity/:communityName', async (req, res) => {
  const communityName = req.params.communityName;

  try {
    const community = await Community.findOneAndDelete({ community_name: communityName });

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }

    return res.status(200).json({ message: 'Community deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/unverifiedCommunities", async (req, res) => {
  try {
    const unverifiedCommunities = await Community.find({
      verified_status: false,
    });
    res.status(200).json(unverifiedCommunities);
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.get("/getCommunityByName/:community_name", async (req, res) => {
  try {
    const { community_name } = req.params;

    const community = await Community.findOne({ community_name });

    if (!community) {
      return res.status(200).json({ error: "Community not found" });
    }

    res.status(200).json(community);
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.post("/addJoinRequest/:community_name", async (req, res) => {
  try {
    const { community_name } = req.params;
    const { student_email } = req.body;
    const existingCommunity = await Community.findOne({ community_name });

    if (!existingCommunity) {
      return res.status(404).json({ error: "Community not found" });
    }

    console.log(existingCommunity.pending_join_requests);
    let arr = existingCommunity.pending_join_requests || [];
    if (arr.includes(student_email)) {
      return res
        .status(200)
        .json({ message: "Join request already pending for this student" });
    }
    const updatedCommunity = await Community.findOneAndUpdate(
      { community_name },
      { $push: { pending_join_requests: student_email } },
      { new: true }
    );

    res.status(200).json(updatedCommunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addJoinedStudent/:community_name", async (req, res) => {
  try {
    const { community_name } = req.params;
    const { student_email } = req.body;
    const existingCommunity = await Community.findOne({ community_name });

    if (!existingCommunity) {
      return res.status(404).json({ error: "Community not found" });
    }
    let arr = existingCommunity.joined_students || [];
    if (arr.includes(student_email)) {
      return res
        .status(400)
        .json({ message: "Student already joined this community" });
    }
    const updatedCommunity = await Community.findOneAndUpdate(
      { community_name },
      { $pull: { pending_join_requests: student_email }, $push: { joined_students: student_email } },
      { new: true }
    );
    res.status(200).json(updatedCommunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/rejectJoinRequest/:community_name", async (req, res) => {
  try {
    const { community_name } = req.params;
    const { student_email } = req.body;

    const existingCommunity = await Community.findOne({ community_name });

    if (!existingCommunity) {
      return res.status(404).json({ error: "Community not found" });
    }


    const updatedCommunity = await Community.findOneAndUpdate(
        { community_name },
        { $pull: { pending_join_requests: student_email }},
        { new: true }
    );

    res.status(200).json(updatedCommunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/removeJoinedStudent/:community_name", async (req, res) => {
  try {
    const { community_name } = req.params;
    const { student_email } = req.body;

    const existingCommunity = await Community.findOne({ community_name });

    if (!existingCommunity) {
      return res.status(404).json({ error: "Community not found" });
    }

    const updatedCommunity = await Community.findOneAndUpdate(
      { community_name },
      { $pull: { joined_students : student_email }},
      { new: true }
   );

    res.status(200).json(updatedCommunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addCommunityEvent/:community_name", async (req, res) => {
  try {
    const { community_name } = req.params;

    const { event_id } = req.body;

    const existingCommunity = await Community.findOne({
      community_name: community_name,
    });

    if (!existingCommunity) {
      return res.status(404).json({ error: "Community not found" });
    }
    const updatedCommunity = await Community.findOneAndUpdate(
      { community_name },
      { $push: { community_events: event_id } },
      { new: true }
    );

    res.status(200).json(updatedCommunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/removeCommunityEvent/:community_name", async (req, res) => {
  try {
    const { community_name } = req.params;
    const { event_id } = req.body;

    const existingCommunity = await Community.findOne({ community_name });

    if (!existingCommunity) {
      return res.status(404).json({ error: "Community not found" });
    }

    const updatedCommunity = await Community.findOneAndUpdate(
      { community_name },
      { $pull: { community_events: event_id }},
      { new: true }
    );
    res.status(200).json(updatedCommunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addCommunityPost/:community_name", async (req, res) => {
  try {
    const { community_name } = req.params;
    const { post_id } = req.body;

    const existingCommunity = await Community.findOne({ community_name });

    if (!existingCommunity) {
      return res.status(404).json({ error: "Community not found" });
    }

    const updatedCommunity = await Community.findOneAndUpdate(
      { community_name },
      { $push: { community_posts: post_id } },
      { new: true }
    );

    res.status(200).json(updatedCommunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/removeCommunityPost/:community_name", async (req, res) => {
  try {
    const { community_name } = req.params;
    const { post_id } = req.body;

    const existingCommunity = await Community.findOne({ community_name });

    if (!existingCommunity) {
      return res.status(404).json({ error: "Community not found" });
    }
    const updatedCommunity = await Community.findOneAndUpdate(
      { community_name },
      { $pull: { community_posts: post_id } },
      { new: true }
    );
    res.status(200).json(updatedCommunity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
