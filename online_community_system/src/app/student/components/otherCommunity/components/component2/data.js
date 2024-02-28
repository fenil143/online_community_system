import axios from 'axios';

const getCommunitiesPosts = async (communityName) => {
  try {
    const communityResponse = await axios.get(`https://online-community-system.onrender.com/getCommunityByName/${communityName}`);
    if (!communityResponse.data._id) {
      throw new Error("Community not found");
    }
    const posts = communityResponse.data.community_posts;
    console.log(posts);
    const postsDetails = await Promise.all(
      posts.map(async (post) => {
        const postResponse = await axios.get(`https://online-community-system.onrender.com/getPostById/${post}`);
        return postResponse.data;
      })
    );
    console.log(postsDetails);
    return postsDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getCommunitiesPosts;

// const dummyPosts = [
//     {
//       user_email: "user1@example.com",
//       name: "Post 1",
//       post_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       post_image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg&fm=jpg",
//     },
//     {
//       user_email: "user2@example.com",
//       name: "Post 2",
//       post_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       post_image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
//     },
//     {
//       user_email: "user3@example.com",
//       name: "Post 3",
//       post_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       post_image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
//     },
//     {
//       user_email: "user4@example.com",
//       name: "Post 4",
//       post_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       post_image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
//     },
//     {
//       user_email: "user4@example.com",
//       name: "Post 4",
//       post_description: "Lorem Ipsum is simply dummy ",
//       post_image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg",
//     },
//   ];
  
//   export default dummyPosts;
  