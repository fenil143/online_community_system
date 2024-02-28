import axios from 'axios';

const getJoinedCommunities = async (email) => {
  try {
    const apiUrl = `https://online-community-system.onrender.com/getJoinedCommunities/${email}`;
    
    const response = await axios.get(apiUrl);

    if (response.data.joined_community_id) {
      const joinedCommunityIds = response.data.joined_community_id;

      const joinedCommunities = await fetchJoinedCommunitiesDetails(joinedCommunityIds);
      return joinedCommunities;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchJoinedCommunitiesDetails = async (communityIds) => {
  try {
    const apiUrl = `https://online-community-system.onrender.com/allCommunities`;

    const response = await axios.get(apiUrl);
    
    if (response.data) {
      const joinedCommunities = response.data.filter(community => communityIds.includes(community.community_name));
      return joinedCommunities;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getJoinedCommunities;