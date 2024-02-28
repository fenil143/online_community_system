import React from "react";
import axios from 'axios';

const Child = ({ community, removeByName }) => {
    const { community_name, owner_email, image,description } = community;
    const owner = owner_email ;
    const name = community_name;
    let email = localStorage.getItem("student");
    console.log(email);
    const cancelJoinRequest = async () => {
      try {
        const studentEmail = email;
  
        await axios.post(`https://online-community-system.onrender.com/rejectJoinRequest/${name}`, { student_email: studentEmail });
  
        const CommunityIdToRemove = community.community_name;
        await axios.patch(`https://online-community-system.onrender.com/cancelRequest/${studentEmail}`, { communityIdToRemove : CommunityIdToRemove });
  
        removeByName(CommunityIdToRemove);
      } catch (error) {
        console.error('Error sending join request:', error);
        alert('Failed to send join request. Please try again.');
      }
    };

  return (
    <div class="w-full font-poppins max-w-md mx-auto hover:scale-105 transition-transform duration-500 shadow-md bg-white rounded-xl  overflow-hidden md:max-w-3xl lg:max-w-4xl mt-4">
    <div class="md:flex md:flex-wrap">
    <div class="md:w-1/3 w-auto flex items-center justify-center">
    <img class="w-full h-full object-contain ml-4 mr-4" src={image} alt="Modern building architecture"/>
  </div>
      <div class="md:w-2/3 p-8 flex flex-col">
        <div class="uppercase tracking-wide text-indigo-500 font-bold text-2xl">{name}</div>
          <span class="font-bold">Owner's Email :{owner_email}</span>
        
        <p class="mt-2 text-slate-500">
          <span class="font-bold">Description :</span>{description}
        </p>
        <div class="flex justify-end mt-auto">
          <button
            class="bg-red-700 hover:bg-red-800  text-white px-4 py-2 rounded-full focus:outline-none focus:shadow-outline-green transition-transform transform hover:scale-110 duration-300 ease-in-out"
            onClick={cancelJoinRequest}
          >
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Child;
