import axios from 'axios';

const getCommunitiesEvents = async (communityName) => {
  try {
    const communityResponse = await axios.get(`https://online-community-system.onrender.com/getCommunityByName/${communityName}`);
    if (!communityResponse.data._id) {
      throw new Error("Community not found");
    }
    const events = communityResponse.data.community_events;
    const eventsDetails = await Promise.all(
      events.map(async (event) => {
        const eventResponse = await axios.get(`https://online-community-system.onrender.com/getEventById/${event}`);
        return eventResponse.data;
      })
    );
    console.log(eventsDetails);
    return eventsDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getCommunitiesEvents;