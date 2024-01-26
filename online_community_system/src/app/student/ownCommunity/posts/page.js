import React from "react";
import dummyPosts from "./components/data";
import Child from "./components/child";

const Posts = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Community Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyPosts.map((post, index) => (
          <Child post={post} key={index} index={index} />
        ))}
      </div>
      <div className="add-event-button fixed bottom-4 right-4 bg-blue-500 text-white p-4 w-12 h-12 rounded-full cursor-pointer flex items-center justify-center hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-md">
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
    </div>
  );
};

export default Posts;
