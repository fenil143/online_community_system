import axios from 'axios';

const getPendingJoinRequests = async (communityName) => {
    try {
      const response = await axios.get(`https://online-community-system.onrender.com/getCommunityByName/${communityName}`);
      
      if (response.data.error) {
        console.error(response.data.error);
        return;
      }

      const community = response.data;
      const requests = getStudentDetails(community.joined_students || []);
      return requests;;
    } catch (error) {
      console.error('Error fetching community details:', error);
    }
  };

  const getStudentDetails = async (requests) => {
    try {
      const requestsDetails = await Promise.all(
        requests.map(async (studentId) => {
          const response = await axios.get(`https://online-community-system.onrender.com/getStudentInfo/${studentId}`);
          return response.data;
        })
      );
      return requestsDetails;
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  export default getPendingJoinRequests;