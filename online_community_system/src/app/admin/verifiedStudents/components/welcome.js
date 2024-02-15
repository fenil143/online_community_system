import React, { useState } from "react";

import { useMediaQuery } from '@react-hook/media-query';
export default function Welcome({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div
    className="h-20 w-full border-2 rounded-xl overflow-hidden 
          flex flex-col md:flex-row items-center justify-between 
          bg-gradient-to-r from-indigo-600 to-indigo-500
          text-white 
          p-6 shadow-lg transform transition-transform duration-300 mb-8"
  >
    {isDesktop && ( // Render only if the screen is wider than 768 pixels (not mobile)
      <div className="flex flex-col items-start">
        <p className="text-2xl mb-2 font-bold tracking-wide ">
          Member of Community Application!
        </p>
      </div>
    )}

<div className="flex justify-center items-center">
<input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={handleChange}
  className="w-full md:w-40 p-2 mr-4 text-black placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
/>
<svg
  className="w-6 h-6 text-white cursor-pointer"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  onClick={handleSearch}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M21 21l-4.5-4.5"
  ></path>
  <circle cx="10.5" cy="10.5" r="7.5"></circle>
</svg>
</div>

  </div>
  );
}
