import axios from 'axios';

const getPostsComments = async (postId) => {
  try {
    const postResponse = await axios.get(`https://online-community-system.onrender.com/getPostById/${postId}`);
    if (!postResponse.data._id) {
      throw new Error("Community not found");
    }
    const comments = postResponse.data.post_comments;
    console.log(comments);
    const commentsDetails = await Promise.all(
      comments.map(async (comment) => {
        const commentResponse = await axios.get(`https://online-community-system.onrender.com/getCommentById/${comment}`);
        return commentResponse.data;
      })
    );
    console.log(commentsDetails);
    return commentsDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getPostsComments;

// const dummyComments = [
//     {
//       user_email: "user1@example.com",
//       comment_message: "Great post!",
//       likes: 5,
//     },
//     {
//       user_email: "user2@example.com",
//       comment_message: "Interesting information.",
//       likes: 3,
//     },
//     {
//       user_email: "user3@example.com",
//       comment_message: "Thanks for sharing!",
//       likes: 2,
//     },
//   ];
  
//   export default dummyComments;
  