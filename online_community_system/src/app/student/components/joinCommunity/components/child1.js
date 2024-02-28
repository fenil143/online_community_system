// import React from "react";
// import axios from 'axios';

// const Child = ({ community, removeByName }) => {
//   const { community_name, owner_email, image } = community;
//   const owner = owner_email ;
//   const name = community_name;
//   let email = localStorage.getItem("student");

//   const sendJoinRequest = async () => {
//     try {
//       const studentEmail = email;

//       await axios.post(`https://online-community-system.onrender.com/addJoinRequest/${name}`, { student_email: studentEmail });

//       const newCommunityId = community.community_name;
//       await axios.patch(`https://online-community-system.onrender.com/requestCommunity/${studentEmail}`, { newCommunityId });

//       removeByName(newCommunityId);

//       alert('Join request sent successfully!');
//     } catch (error) {
//       console.error('Error sending join request:', error);
//       alert('Failed to send join request. Please try again.');
//     }
//   };

//   return (
//  <div className="relative group overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-4 mb-4 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 w-full mx-auto md:w-3/5 lg:max-w-2xl flex flex-col items-center">
//   <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4"> 
  
//    <div className="overflow-hidden rounded-full w-16 h-16 md:w-1/5 md:h-20 lg:w-24 lg:h-24 md:flex-shrink-0 group-hover:rotate-6  md:items-start">
//       <img
//         src={image}
//         alt={name}
//         className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300 rounded-full border-4 border-white ml-0"
//       />
//     </div>

//     <div>
//       <h3 className="text-lg font-semibold text-white">{name}</h3>
//       <p className="text-gray-300">Owner: {owner}</p>
//     </div>
//   </div>
//   <button className="mt-4 md:mt-0 md:absolute bottom-4 right-4 px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 transition duration-300 justify-center items-center" onClick={sendJoinRequest}>
//     Send Request
//   </button>
// </div>

//   );
// };

// export default Child;
import React from "react";
import axios from 'axios';

const Child = ({ community, removeByName }) => {
  const { community_name, owner_email, image,description } = community;
  const owner = owner_email ;
  const name = community_name;
  let email = localStorage.getItem("student");

  const sendJoinRequest = async () => {
    try {
      const studentEmail = email;

      await axios.post(`https://online-community-system.onrender.com/addJoinRequest/${name}`, { student_email: studentEmail });

      const newCommunityId = community.community_name;
      await axios.patch(`https://online-community-system.onrender.com/requestCommunity/${studentEmail}`, { newCommunityId });

      removeByName(newCommunityId);

      alert('Join request sent successfully!');
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
            class="bg-blue-700 hover:bg-blue-800  text-white px-4 py-2 rounded-full focus:outline-none focus:shadow-outline-green transition-transform transform hover:scale-110 duration-300 ease-in-out"
            onClick={sendJoinRequest}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Child;
