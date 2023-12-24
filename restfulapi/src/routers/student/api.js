const express = require('express');
const router = express.Router();
const Student = require("../../models/student");
const StudentInfo = require("../../models/studentInfo");

router.post("/storeStudent", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      qualification,
      resume,
      image,
      status,
      joined_community_id,
      created_community_id,
      experience,
      cpi,
      skill,
      objective,
      college,
      graduation_year,
      title,
      description,
      starting_date,
      field,
      ending_date,
      hobbies,
      working_location
    } = req.body;

    const existingStudent = await Student.findOne({email : email });

    if (existingStudent) {
      return res.status(400).json({ error: 'Student with this email already exists' });
    }

    const newStudent = new Student({
      name,
      email,
      password,
      qualification,
      resume,
      image,
      status,
      joined_community_id,
      created_community_id
    });

    const savedStudent = await newStudent.save();
    const newStudentInfo = new StudentInfo({
      email,
      experience,
      cpi,
      skill,
      objective,
      college,
      graduation_year,
      title,
      description,
      starting_date,
      field,
      ending_date,
      hobbies,
      working_location
    });

    const savedStudentInfo = await newStudentInfo.save();

    res.status(201).json({ message: 'Student and StudentInfo saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existingStudent = await Student.findOne({email : email });
  
      if (existingStudent && existingStudent.password === password) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/getJoinedCommunities/:email", async (req, res) => {
    try {
      const { email } = req.params;
  
      const existingStudent = await Student.findOne({email :  email });
  
      if (existingStudent) {
        res.status(200).json({ joined_community_id: existingStudent.joined_community_id });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/getStudentInfo/:email", async (req, res) => {
    try {
      const { email } = req.params;
  
      const existingStudent = await Student.findOne({ email : email });
  
      if (existingStudent) {
        const studentInfo = await StudentInfo.findOne({ email : email });
  
        if (studentInfo) {
          const combinedInfo = { ...existingStudent._doc, ...studentInfo._doc };
          res.status(200).json(combinedInfo);
        } else {
          res.status(200).json(existingStudent);
        }
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {

      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.patch("/updateStudentInfo/:email", async (req, res) => {
    try {
      const { email } = req.params;
  
      const existingStudent = await Student.findOne({ email });
  
      if (!existingStudent) {
        return res.status(404).json({ error: 'User not found' });
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
      
      for (const field in req.body.additionalInfo) {
        if (existingStudentInfo[field] !== undefined) {
          existingStudentInfo[field] = req.body.additionalInfo[field];
        }
      }
  
        // Save the updated student info
        await existingStudentInfo.save();
  
      // Respond with the updated student information
      res.status(200).json(updatedStudent);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
    
        const existingStudent = await Student.findOne({email : email });
    
        if (existingStudent && existingStudent.password === password) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });

module.exports = router;
