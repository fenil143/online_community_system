import axios from 'axios';

const fetchCommunitiesForStudent = async (email) => {
  try {
    const response = await axios.get(`https://online-community-system.onrender.com/getPendingCommunities/${email}`);

    if (response.data && response.data.pending_community_id) {
      const pendingCommunityIds = response.data.pending_community_id;

      const communitiesResponse = await axios.get('https://online-community-system.onrender.com/allCommunities');

      if (communitiesResponse.data) {
        const studentCommunities = communitiesResponse.data.filter(community =>
          pendingCommunityIds.includes(community.community_name)
        );

        return studentCommunities;
      }
    }

    return [];
  } catch (error) {
    console.error('Error fetching communities for student:', error);
    throw new Error('Failed to fetch communities for the student');
  }
};

export default fetchCommunitiesForStudent;
