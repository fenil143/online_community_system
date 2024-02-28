import axios from 'axios';

const getJoinedCommunities = async (email) => {
  try {
    const apiUrl = `https://online-community-system.onrender.com/getCreatedCommunities/${email}`;
    
    const response = await axios.get(apiUrl);

    if (response.data.created_community_id) {
      const createdCommunityIds = response.data.created_community_id;
      const createdCommunities = await fetchCreatedCommunitiesDetails(createdCommunityIds);
      return createdCommunities;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchCreatedCommunitiesDetails = async (communityIds) => {
  try {
    const apiUrl = `https://online-community-system.onrender.com/allCommunities`;

    const response = await axios.get(apiUrl);
    // console.log(communityIds);
    // console.log(response);
    if (response.data) {
      const createdCommunities = response.data.filter(community => communityIds.includes(community.community_name));
      return createdCommunities;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getJoinedCommunities;