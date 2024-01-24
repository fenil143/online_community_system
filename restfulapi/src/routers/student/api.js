const express = require("express");
const router = express.Router();
const Student = require("../../models/student");
const StudentInfo = require("../../models/studentInfo");

router.post("/storeStudent", async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      qualification,
      image,
      experience,
      cpi,
      skill,
      linkedin_link,
      college,
      graduation_year,
      description,
      starting_date,
      field,
      working_location,
      github_link,
    } = req.body;
    console.log(skill);
    skill = skill.split(",");
    skill = skill.map((item) => item.trim());

    const existingStudent = await Student.findOne({ email: email });

    if (existingStudent) {
      return res
        .status(200)
        .json({ error: "Student with this email already exists" });
    }

    const newStudent = new Student({
      name,
      email,
      password,
      qualification,
      image,
    });
    newStudent.pending_community_id = [];
    newStudent.joined_community_id = [];
    newStudent.created_community_id = [];
    const savedStudent = await newStudent.save();
    const newStudentInfo = new StudentInfo({
      email,
      experience,
      cpi,
      skill,
      linkedin_link,
      college,
      graduation_year,
      description,
      starting_date,
      field,
      working_location,
      github_link,
    });

    const savedStudentInfo = await newStudentInfo.save();

    res
      .status(201)
      .json({ message: "Student and StudentInfo saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingStudent = await Student.findOne({ email: email });

    if(existingStudent && existingStudent.status === false){
      return res.status(200).json({ error: "You will be varified by admin soon" });
    }

    if (existingStudent && existingStudent.password === password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(200).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({ status: false });

    const studentsInfo = await StudentInfo.find({
      email: { $in: students.map((student) => student.email) },
    });

    const combinedStudents = students.map((student) => {
      const info = studentsInfo.find((info) => info.email === student.email);
      return {
        _id: student._id,
        name: student.name,
        email: student.email,
        qualification: student.qualification,
        resume: student.resume,
        image: student.image,
        joined_community_id: student.joined_community_id,
        created_community_id: student.created_community_id,
        status: student.status,
        cpi: info.cpi,
        skill: info.skill,
        college: info.college,
        graduation_year: info.graduation_year,
        description: info.description,
        starting_date: info.starting_date,
        field: info.field,
        hobbies: info.hobbies,
        working_location: info.working_location 
      };
    });

    res.json(combinedStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/verifiedStudents", async (req, res) => {
  try {
    const students = await Student.find({ status: true });
    console.log(students);
    const studentsInfo = await StudentInfo.find({
      email: { $in: students.map((student) => student.email) },
    });

    const combinedStudents = students.map((student) => {
      const info = studentsInfo.find((info) => info.email === student.email);
      console.log(info);
      return {
        _id: student._id,
        name: student.name,
        email: student.email,
        qualification: student.qualification,
        resume: student.resume,
        image: student.image,
        joined_community_id: student.joined_community_id,
        created_community_id: student.created_community_id,
        status: student.status,
        cpi: info.cpi == undefined ? 0 : info.cpi,
        skill: info.skill,
        college: info.college,
        graduation_year: info.graduation_year,
        description: info.description,
        starting_date: info.starting_date,
        field: info.field,
        hobbies: info.hobbies,
        working_location: info.working_location 
      };
    });

    res.json(combinedStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getJoinedCommunities/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const existingStudent = await Student.findOne({ email: email });

    if (existingStudent) {
      res
        .status(200)
        .json({ joined_community_id: existingStudent.joined_community_id });
    } else {
      res.status(200).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.get("/getCreatedCommunities/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const existingStudent = await Student.findOne({ email: email });

    if (existingStudent) {
      res
        .status(200)
        .json({ created_community_id: existingStudent.created_community_id });
    } else {
      res.status(200).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.get("/getPendingCommunities/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const existingStudent = await Student.findOne({ email: email });

    if (existingStudent) {
      res
        .status(200)
        .json({ pending_community_id: existingStudent.pending_community_id });
    } else {
      res.status(200).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: "Internal Server Error" });
  }
});

router.get("/getStudentInfo/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const existingStudent = await Student.findOne({ email: email });
    if (existingStudent) {
      const studentInfo = await StudentInfo.findOne({ email: email });
      if (studentInfo) {
        const combinedInfo = { ...existingStudent._doc, ...studentInfo._doc };
        res.status(200).json(combinedInfo);
      } else {
        res.status(200).json(existingStudent);
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/updateStudentInfo/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const existingStudent = await Student.findOne({ email });

    if (!existingStudent) {
      return res.status(404).json({ error: "User not found" });
    }

    for (const field in req.body) {
      if (existingStudent[field] !== undefined) {
        existingStudent[field] = req.body[field];
      }
    }

    const updatedStudent = await existingStudent.save();

    let existingStudentInfo = await StudentInfo.findOne({ email });
    if (!existingStudentInfo) {
      existingStudentInfo = new StudentInfo({ email });
    }

    for (const field in req.body) {
      if (existingStudentInfo[field] !== undefined) {
        existingStudentInfo[field] = req.body[field];
      }
    }
    await existingStudentInfo.save();

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete('/removeStudent/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const deletedStudent = await Student.findOneAndDelete({ email });

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await StudentInfo.findOneAndDelete({ email });

    res.status(200).json({ message: 'Student removed successfully', deletedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingStudent = await Student.findOne({ email: email });

    if (existingStudent && existingStudent.password === password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/requestCommunity/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { newCommunityId } = req.body;
    const existingStudent = await Student.findOne({ email: email });

    if (!existingStudent) {
      return res.status(404).json({ error: "User not found" });
    }
    if (existingStudent.pending_community_id == undefined) {
      existingStudent.pending_community_id = [];
    }
    if (!existingStudent.pending_community_id.includes(newCommunityId)) {
      const updatedStudent = await Student.findOneAndUpdate(
        { email },
        { $push: { pending_community_id: newCommunityId } },
        { new: true }
      );
      res.status(200).json(updatedStudent);
    } else {
      res
        .status(400)
        .json({
          message: "Community ID already exists in joined_community_id",
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/cancelRequest/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { communityIdToRemove } = req.body;

    const updatedStudent = await Student.findOneAndUpdate(
      { email },
      { $pull: { pending_community_id: communityIdToRemove } },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/joinCommunity/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { newCommunityId } = req.body;
    const existingStudent = await Student.findOne({ email: email });

    if (!existingStudent) {
      return res.status(404).json({ error: "User not found" });
    }
    if (existingStudent.joined_community_id == undefined) {
      existingStudent.joined_community_id = [];
    }
    if (!existingStudent.joined_community_id.includes(newCommunityId)) {
      const updatedStudent = await Student.findOneAndUpdate(
        { email },
        { $push: { joined_community_id: newCommunityId } },
        { new: true }
      );
      res.status(200).json(updatedStudent);
    } else {
      res
        .status(400)
        .json({
          message: "Community ID already exists in joined_community_id",
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/addCommunity/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { newCommunityId } = req.body;
    const existingStudent = await Student.findOne({ email: email });

    if (!existingStudent) {
      return res.status(404).json({ error: "User not found" });
    }
    if (existingStudent.created_community_id == undefined) {
      existingStudent.created_community_id = [];
    }
    if (!existingStudent.created_community_id.includes(newCommunityId)) {
      const updatedStudent = await Student.findOneAndUpdate(
        { email },
        { $push: { created_community_id: newCommunityId } },
        { new: true }
      );
      res.status(200).json(updatedStudent);
    } else {
      res
        .status(400)
        .json({
          message: "Community ID already exists in joined_community_id",
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/leaveCommunity/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { communityIdToRemove } = req.body;

    const updatedStudent = await Student.findOneAndUpdate(
      { email },
      { $pull: { joined_community_id: communityIdToRemove } },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
