import axios from 'axios';

const fetchStudentsData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/verifiedStudents');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export default fetchStudentsData;