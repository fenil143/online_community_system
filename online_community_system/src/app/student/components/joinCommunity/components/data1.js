import axios from 'axios';

const getFilteredCommunities = async (studentEmail) => {
  try {
    const allCommunitiesResponse = await axios.get('https://online-community-system.onrender.com/allCommunities');
    const allCommunities = allCommunitiesResponse.data;

    const joinedCommunitiesResponse = await axios.get(`https://online-community-system.onrender.com/getJoinedCommunities/${studentEmail}`);
    const joinedCommunities = joinedCommunitiesResponse.data.joined_community_id || [];

    const pendingCommunitiesResponse = await axios.get(`https://online-community-system.onrender.com/getPendingCommunities/${studentEmail}`);
    const pendingCommunities = pendingCommunitiesResponse.data.pending_community_id || [];

    const createdComunitiesResponse = await axios.get(`https://online-community-system.onrender.com/getCreatedCommunities/${studentEmail}`);
    const createdCommunities = createdComunitiesResponse.data.created_community_id || [];

    const filteredCommunities = allCommunities.filter(community =>
      community.verified_status == true && !joinedCommunities.includes(community.community_name) && !pendingCommunities.includes(community.community_name) && !createdCommunities.includes(community.community_name)
    )

    return filteredCommunities;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};

  export default getFilteredCommunities;
  