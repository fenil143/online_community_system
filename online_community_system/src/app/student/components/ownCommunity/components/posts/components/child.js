"use client";
// child.js
import React, { useState, useEffect } from "react";
import Data from "./data1";
import axios from "axios";

const Child = ({ post, index }) => {
  const [expandedPost, setExpandedPost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments,setComments] = useState([]);
  const [newComment,setNewComment] = useState("");


  useEffect(() => {
    console.log("New comment:", newComment);
  }, [newComment]);

  const handleReadMore = () => {
    setExpandedPost(true);
  };

  const handleReadLess = () => {
    setExpandedPost(false);
  };

  const handleViewComments = () => {
    const fetchData = async () => {
      try {
        let data = await Data(post.post_id);
        setComments(data);
        console.log(comments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setShowComments(true);
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  const handleClick = (event) => {
    const commentValue = event.target.value;
    setNewComment(commentValue);
  };

  const handleAddEvent = (event) =>{
    let obj = {};
    obj.post_id = post.post_id;
    obj.user_email = localStorage.getItem("student");
    obj.comment_message = newComment;
    console.log("final comment : ",newComment);
    axios.post("https://online-community-system.onrender.com/createComment",obj).then((response) => {
      const comment_id = response.data.comment_id;
      const url = "https://online-community-system.onrender.com/addCommentToPost/" + post.post_id;
      axios.patch(url,{"comment_id":comment_id}).then((response) =>{
        handleViewComments();
        setNewComment("");
      }).catch((err)=>{
        console.error(err);
      }).catch((err)=>{
        console.error(err);
      })
    })
  }

  return (
    <div
      key={index}
      className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105 h-fit duration-300"
    >
      <img
        src={post.post_image}
        alt={post.name}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />

      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">{post.name}</h2>
        <p className="text-gray-600 text-sm">Posted by {post.user_email}</p>
      </div>

      {expandedPost ? (
        <p className="text-gray-700 mb-4">{post.post_description}</p>
      ) : (
        <p className="text-gray-700 mb-4">
          {post.post_description.length > 150
            ? post.post_description.slice(0, 150) + "..."
            : post.post_description}
        </p>
      )}

      <div className="flex justify-between items-center">
        {expandedPost ? (
          <button
            onClick={handleReadLess}
            className="text-blue-500 hover:underline"
          >
            Read less
          </button>
        ) : (
          <button
            onClick={handleReadMore}
            className="text-blue-500 hover:underline"
          >
            Read more
          </button>
        )}

        <button
          onClick={handleViewComments}
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition"
        >
          View Comments
        </button>
      </div>

      {showComments && (
        <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md max-w-md min-h-[300px] relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Comments</h2>
              <button
                onClick={handleCloseComments}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <ul className="max-h-48 overflow-y-auto">
              {comments.length === 0 ? (
                <li className="mb-6 text-gray-500">No comments yet.</li>
              ) : (
                comments.map((comment, commentIndex) => (
                  <li key={commentIndex} className="mb-6 border-b pb-4">
                    <p className="text-gray-700 text-sm">
                      {comment.comment_message}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Comment by: {comment.user_email}
                    </p>
                  </li>
                ))
              )}
            </ul>
            <div className="mt-4">
              <textarea
                rows="4"
                className="w-full p-2 border border-neutral-400 rounded-md focus:outline-none focus:ring focus:border-blue-400 transition"
                placeholder="Add a comment..."
                onChange={handleClick} value={newComment}
              ></textarea>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition" onClick={handleAddEvent}>
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Child;
