import axios from 'axios';

const fetchStudentsData = async () => {
  try {
    const response = await axios.get('https://online-community-system.onrender.com/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export default fetchStudentsData;

// const dummyStudentData1 = {
//   "_id": "65a45ffce09b186ff0a142a6",
//   "name": "John Doe",
//   "email": "john.doe@example.com",
//   "password": "pass@word",
//   "qualification": "M.Sc.",
//   "image": "http://res.cloudinary.com/da3airmpg/image/upload/v1705271290/ukitmt6ytmje4myhglmw.jpg",
//   "status": true,
//   "joined_community_id": ["community1"],
//   "created_community_id": ["community2"],
//   "__v": 0,
//     "cpi": "8.5",
//     "skill": ["python", "data analysis"],
//     "linkedin_link": "https://www.linkedin.com/in/johndoe/",
//     "college": "XYZ University",
//     "graduation_year": "2020",
//     "github_link": "https://github.com/johndoe",
//     "description": "Passionate about data science and machine learning.",
//     "starting_date": "1705271292101",
//     "field": "Data Science",
//     "working_location": "New York"
//   };
  
//   const dummyStudentData2 = {
//     "_id": "65a45ffce09b186ff0a142a7",
//     "name": "Alice Smith",
//     "email": "alice.smith@example.com",
//     "password": "securePwd123",
//     "qualification": "Ph.D.",
//     "image": "http://res.cloudinary.com/da3airmpg/image/upload/v1705271290/ukitmt6ytmje4myhglmw.jpg",
//     "status": false,
//     "joined_community_id": ["community2"],
//     "created_community_id": ["community3"],
//     "__v": 0,
//     "cpi": "9.2",
//     "skill": ["java", "software development"],
//     "linkedin_link": "https://www.linkedin.com/in/alicesmith/",
//     "college": "ABC University",
//     "graduation_year": "2018",
//     "github_link": "https://github.com/alicesmith",
//     "description": "Experienced software developer with a focus on Java applications.",
//     "starting_date": "1705271292102",
//     "field": "Software Engineering",
//     "working_location": "San Francisco"
//   };
  
//   const dummyStudentData3 = {
//     "_id": "65a45ffce09b186ff0a142a8",
//     "name": "Emily Johnson",
//     "email": "emily.johnson@example.com",
//     "password": "pass123",
//     "qualification": "B.E.",
//     "image": "http://res.cloudinary.com/da3airmpg/image/upload/v1705271290/ukitmt6ytmje4myhglmw.jpg",
//     "status": true,
//     "joined_community_id": ["community3"],
//     "created_community_id": ["community4"],
//     "__v": 0,
//     "cpi": "8.9",
//     "skill": ["react", "frontend development"],
//     "linkedin_link": "https://www.linkedin.com/in/emilyjohnson/",
//     "college": "PQR College",
//     "graduation_year": "2021",
//     "github_link": "https://github.com/emilyjohnson",
//     "description": "Passionate about creating responsive and user-friendly web applications.",
//     "starting_date": "1705271292103",
//     "field": "Computer Science",
//     "working_location": "Seattle"
//   };
  
//   // Creating an array with the additional dummy data
//   const Data = [dummyStudentData1, dummyStudentData2, dummyStudentData3];
  
//   // Exporting the objects and arrays

  
//   export default Data;