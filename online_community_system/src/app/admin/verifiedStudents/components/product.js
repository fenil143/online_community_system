'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function Product(props) {
  let dummy = props.data;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/removeStudent/${dummy.email}`);
      dummy.status = true;
      props.removeStudentByEmail(dummy.email);
    } catch (error) {
      console.error('Error rejecting student:', error);
    }
  };

  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
        />
      </head>
      <div
        className="w-2/3 h-48 p-2 bg-white-200  
                        border-2 border-slate-200  
                        rounded-lg flex flex-row  
                        mx-auto mt-6 hover:scale-105 shadow-md bg-white transition-transform duration-500"
      >
        <div className="w-3/12 h-full flex flex-col items-center">
          <img
            className="pl-4 pt-2 w-72 h-32"
            src={"https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png"}
            alt={props.data.title}
          />
          <div className="mt-2 flex space-x-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition-transform"
            >
              <i className="bi bi-linkedin text-xl text-red-500 mr-1"></i>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition-transform"
            >
              <i className="bi bi-github text-xl text-blue-500 mr-2"></i>
            </a>
          </div>
        </div>
        <div className="w-6/12 h-full p-4 bg-white">
          <h3 className="text-2xl font-bold mb-2 text-indigo-600">
            {dummy.name}
          </h3>
          <div className="flex items-center mb-2">
            <span className="text-gray-700 font-medium">Qualification:</span>
            <span className="text-gray-600 ml-2">{dummy.qualification}</span>
          </div>
          <div className="text-gray-700 mb-2">
            <span className="font-medium">College:</span> {dummy.college} •
            <span className="font-medium ml-2">Graduation Year:</span>{" "}
            {dummy.graduation_year} •
            <span className="font-medium ml-2">Field:</span> {dummy.field}
          </div>
          <div className="flex text-gray-700">
            <span className="font-medium">Skills:</span>
            {dummy.skill.map((feature, index) => (
              <span key={index} className={`ml-2`}>
                {feature}
                {index !== dummy.skill.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>

        <div className="w-3/12 h-full border-l-4 p-2">
          <div className="flex items-center mb-2">
            <span className="text-gray-700 font-medium">Experience:</span>
            <span className="text-gray-600 ml-2">
              {dummy.experience || 0} years
            </span>
          </div>
          <h6 className="text-success">{dummy.working_location == undefined? "Free shipping" : dummy.working_location}</h6>
          <div className="flex flex-col mt-4">
            <button
              onClick={handleDelete}
              className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
