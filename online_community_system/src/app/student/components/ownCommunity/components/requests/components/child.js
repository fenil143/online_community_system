'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function Product(props) {
  let dummy = props.data;
  const communityName = localStorage.getItem("ownCommunity");
  const handleAccept = async () => {
    try {
      await axios.patch(`https://online-community-system.onrender.com/joinCommunity/${dummy.email}`, { newCommunityId : communityName });
      await axios.patch(`https://online-community-system.onrender.com/cancelRequest/${dummy.email}`, { communityIdToRemove : communityName });
      await axios.post(`https://online-community-system.onrender.com/addJoinedStudent/${communityName}`, { student_email : dummy.email });

      props.removeStudentByEmail(dummy.email);
    } catch (error) {
      console.error('Error accepting student:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(`https://online-community-system.onrender.com/cancelRequest/${dummy.email}`, { communityIdToRemove : communityName });
      await axios.post(`https://online-community-system.onrender.com/rejectJoinRequest/${communityName}`, { student_email : dummy.email });
      props.removeStudentByEmail(dummy.email);
    } catch (error) {
      console.error('Error rejecting student:', error);
    }
  };

  return (
    <div class="font-poppins ml-5 mr-10 mx-auto hover:scale-105 transition-transform duration-500 bg-white rounded-xl shadow-md overflow-hidden mt-4">
    
      <div class="md:flex ">
        <div class="md:shrink-0 flex flex-col items-center md:items-start justify-center">
            <img class="h-48 w-full object-cover md:h-auto md:w-48 ml-2 mr-2 rounded" src={dummy.image} alt="User Image" />
            <div class="flex justify-center mt-2 md:mt-0">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" class="flex p-px pl-2 pb-3 items-center hover:scale-125 transition-transform mr-2 ml-1">
                    <i class="bi bi-linkedin text-xl text-blue-500"></i>
                    <span class="hidden md:inline-block ml-1">LinkedIn</span>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="flex items-center pl-2 pb-3 hover:scale-125 transition-transform mr-1">
                    <i class="bi bi-github text-xl text-black-500"></i>
                    <span class="hidden md:inline-block ml-1">GitHub</span>
                </a>
            </div>
        </div>

        <div class="p-8 flex-grow"> {/* Add flex-grow class to make this div take remaining space */}
            <div class="uppercase tracking-wide text-2xl font-bold mb-2 text-indigo-600">{dummy.name}</div>
         <div className="flex items-center mb-2">
                <span className="text-gray-700 font-medium">Qualification :</span>
                <span className="text-gray-600 ml-2">{dummy.qualification}</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="text-gray-700 font-medium">College :</span>
                <span className="text-gray-600 ml-2">{dummy.college}</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="text-gray-700 font-medium">University :</span>
                <span className="text-gray-600 ml-2">{dummy.university}</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="text-gray-700 font-medium">Graduation Year :</span>
                <span className="text-gray-600 ml-2">{dummy.graduation_year}</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="text-gray-700 font-medium">Skills :</span>
                <span className="text-gray-600 ml-2">{dummy.skill.map((feature, index) => (
                    <span key={index} className={`ml-2`}>
                        {feature}
                        {index !== dummy.skill.length - 1 && ","}
                    </span>
                ))}</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="text-gray-700 font-medium">Field :</span>
                <span className="text-gray-600 ml-2">{dummy.field}</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="text-gray-700 font-medium">Experience :</span>
                <span className="text-gray-600 ml-2"> {dummy.experience || 0} years</span>
            </div>
            <div className="flex items-center mb-2">
                <span className="text-gray-700 font-medium">Working Location :</span>
                <h6 className="text-success ml-2">{dummy.working_location == undefined ? "Free shipping" : dummy.working_location}</h6>
            </div>
        </div>

        <div className="flex flex-col justify-end md:w-30 mr-2"> {/* Use justify-end here */}
             <button
                onClick={handleAccept}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-3 text-center mb-2"
                type="button"
            >
                Accept
            </button>
            <button
                onClick={handleReject}
                className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-3 text-center mb-2"
                type="button"
            >
                Reject
            </button>
        </div>
    </div>
                  </div>
  );
}
