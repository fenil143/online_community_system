const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');
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
  const { email } = req.params;
  var transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {

      user: 'bhavik5033@gmail.com',
      pass: 'phblgjyjsosztbhn'

    }

  });
  var mailOptions = {
    from: 'bhavik5033@gmail.com',
    to: email,
    subject: 'Online Community Management System',
    html: `
        <h1 style="color: #333; font-family: Arial, sans-serif;">Verification Status</h1>
        <p style="color: #666; font-family: Arial, sans-serif;">
            Congratulations! You are verified by the admin. Now you can log in to the system.
        </p>
        <p style="color: #666; font-family: Arial, sans-serif;">
            Thank you.
        </p>
    `
};

  try {
   
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
    let result=await existingStudentInfo.save();
    console.log(result);
    if (result) {
      transporter.sendMail(mailOptions, function (error, info) {

        if (error) {

          console.log(error);

        } else {

          console.log('Email sent: ' + info.response);

        }

      });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete('/removeStudent/:email', async (req, res) => {
  console.log("remove Student")
  const { email } = req.params;
  console.log(email);
  var transporter1 = nodemailer.createTransport({

    service: 'gmail',
    auth: {

      user: 'bhavik5033@gmail.com',
      pass: 'phblgjyjsosztbhn'

    }

  });
  var mailOptions2 = {
    from: 'bhavik5033@gmail.com',
    to: email,
    subject: 'Online Community Management System',
    html: `
        <h1 style="color: #333; font-family: Arial, sans-serif;">Verification Status</h1>
        <p style="color: #666; font-family: Arial, sans-serif;">
            Sorry, you are not verified by the admin. Please register with valid data in the system.
        </p>
        <p style="color: #666; font-family: Arial, sans-serif;">
            Thank you.
        </p>
    `
};
  try {
   

    const deletedStudent = await Student.findOneAndDelete({ email });

    // if (!deletedStudent) {
    //   return res.status(404).json({ error: email });
    // }

    let result=await StudentInfo.findOneAndDelete({ email });
    if(result)
    {
      transporter1.sendMail(mailOptions2, function (error, info) {

        if (error) {

          console.log(error);

        } else {

          console.log('Email sent: ' + info.response);

        }

      });

    }
    res.status(200).json({ message: 'Student removed successfully', deletedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// router.delete('/removeStudent/:email', async (req, res) => {
//   try {
//     const { email } = req.params;

//     // Find and delete the student record from the database
//     const deletedStudent = await Student.findOneAndDelete({ email });

//     // If the student record doesn't exist, return a 404 error
//     if (!deletedStudent) {
//       return res.status(404).json({ error: 'Student found' });
//     }

//     // Also delete any additional information related to the student, if applicable
//     await StudentInfo.findOneAndDelete({ email });

//     // Send an email notification to the student
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'bhavik5033@gmail.com',
//         pass: 'phblgjyjsosztbhn'
//       }
//     });

//     const mailOptions = {
//       from: 'bhavik5033@gmail.com',
//       to: email,
//       subject: 'Online Community Management System - Account Deletion',
//       html: `
//         <h1 style="color: #333; font-family: Arial, sans-serif;">Account Deletion Notification</h1>
//         <p style="color: #666; font-family: Arial, sans-serif;">
//           Your account has been successfully deleted from our system.
//         </p>
//         <p style="color: #666; font-family: Arial, sans-serif;">
//           If you believe this is an error or have any questions, please contact us.
//         </p>
//         <p style="color: #666; font-family: Arial, sans-serif;">
//           Thank you.
//         </p>
//       `
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });

//     // Return a success message
//     res.status(200).json({ message: 'Student removed successfully', deletedStudent });
//   } catch (error) {
//     console.error('Error removing student:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const existingStudent = await Student.findOne({ email: email });

//     if (existingStudent && existingStudent.password === password) {
//       res.status(200).json({ message: "Login successful" });
//     } else {
//       res.status(401).json({ error: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

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
