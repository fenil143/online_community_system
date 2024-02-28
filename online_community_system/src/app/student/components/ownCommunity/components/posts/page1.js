"use client";
import React, { useState, useEffect } from "react";
import Data from "./components/data";
import Child from "./components/child";
import axios from "axios";
import Image from 'next/image'

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const [temp, setImg] = useState(undefined);
  const [newPost, setNewPost] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("student") === null) {
      router.push("/authentication/loginStudent");
    }
    const fetchData = async () => {
      try {
        let data = await Data(localStorage.getItem("ownCommunity"));
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleAddPost = () => {
    if (!newPost.name || !newPost.post_description || !temp) {
      alert("All fields are required.");
      return;
    }
    console.log("New Post:", newPost);
    console.log(temp);

    const data = new FormData();
    if (temp) {
      data.append("file", temp);
    } else {
      console.error("Image is undefined");
    }
    data.append("upload_preset", "xtf3nszf");
    data.append("cloud_name", "da3airmpg");

    fetch("https://api.cloudinary.com/v1_1/da3airmpg/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        newPost.post_image = data.url;
        newPost.user_email = localStorage.getItem("student");
        newPost.community_id = localStorage.getItem("ownCommunity");
        console.log(newPost);

        axios
          .post("https://online-community-system.onrender.com/addPost", newPost)
          .then((response) => {
            const post_id = response.data.post_id;
            const url =
              "https://online-community-system.onrender.com/addCommunityPost/" +
              response.data.community_id;

            axios.post(url, { post_id: post_id }).then((response) => {
              console.log("post added successfully");
              setPosts((prevPosts) => [...prevPosts, newPost]);
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });

    setNewPost({});
    setShowModal(false);
  };

  return (
    <div className="container mx-auto mt-8">
      
        {posts.length == 0 ? (
          <div className=" text-center ml-96">
            <Image
              src="/assets/9264885.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        ) : (
          <>
          <h1 className="text-2xl font-bold mb-4">Community Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Child post={post} key={index} index={index} />
          ))}
          </div>
          </>
        )}
      

      <div
        className="add-event-button fixed bottom-4 right-4 bg-blue-500 text-white p-4 w-12 h-12 rounded-full cursor-pointer flex items-center justify-center hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-md"
        onClick={() => setShowModal(true)}
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
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Add a New Post</h2>
              <button
                onClick={() => setShowModal(false)}
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
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Post Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newPost.post_name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-400 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="post_image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Post Image URL
                </label>
                <input
                  type="file"
                  id="post_image"
                  name="post_image"
                  value={newPost.post_image}
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];

                    if (file.size > 5 * 1024 * 1024) {
                      alert("Image size should be less than 5MB.");
                    } else {
                      setImg(file);
                    }
                  }}
                  className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="post_description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Post Description
                </label>
                <textarea
                  id="post_description"
                  name="post_description"
                  value={newPost.post_description}
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 p-2 border border-gray-400 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 transition"
                  required
                ></textarea>
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleAddPost}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition"
                >
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
``;
