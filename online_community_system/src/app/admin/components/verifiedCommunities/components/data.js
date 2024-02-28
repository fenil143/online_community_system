import axios from 'axios';

async function getAllCommunities() {
    try {
      const response = await axios.get('https://online-community-system.onrender.com/allCommunities');
  
      const allCommunities = response.data;
  
      const unverifiedCommunities = allCommunities.filter(community => community.verified_status);
  
      return unverifiedCommunities;
  
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  }
  
  
  export default getAllCommunities;