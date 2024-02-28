// import React from "react";
// import axios from "axios";

// const Child = ({ data, removeCommunityByName }) => {
//   const handleAccept = async () => {
//     try {
//       await axios.patch(`https://online-community-system.onrender.com/activateCommunity/${data.community_name}`, { status: true });

//       await axios.patch(`https://online-community-system.onrender.com/addCommunity/${data.owner_email}`,{ newCommunityId : data.community_name})
//       removeCommunityByName(data.community_name);
//     } catch (error) {
//       console.error('Error accepting community:', error);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       await axios.delete(`https://online-community-system.onrender.com/deleteCommunity/${data.community_name}`);
//       removeCommunityByName(data.community_name);
//     } catch (error) {
//       console.error('Error rejecting community:', error);
//     }
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="border w-2/3 rounded-lg overflow-hidden shadow-md bg-white transform transition-transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out mb-6">
//         <div className="flex items-center p-4">
//           <img
//             className="w-28 h-28 object-cover rounded-full mr-4"
//             src="https://png.pngtree.com/png-vector/20190626/ourmid/pngtree-adoption-and-communitynetwork-and-social-icon-design-png-image_1513769.jpg"
//             alt={data.community_name}
//           />

//           <div className="flex-grow">
//             <h3 className="text-2xl font-semibold mb-1">
//               {data.community_name}
//             </h3>
//             <p className="text-gray-600 text-base mb-2">
//               <span className="font-bold">Description:</span> {data.description}
//             </p>
//             <p className="text-blue-500 text-base">
//               Owner's Email: {data.owner_email}
//             </p>
//           </div>
//         </div>

//         <div className="flex justify-end p-2">
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline-green transition-transform transform hover:scale-110 duration-300 ease-in-out"
//             onClick={handleAccept}
//           >
//             Accept
//           </button>
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red transition-transform transform hover:scale-110 duration-300 ease-in-out ml-2"
//             onClick={handleReject}
//           >
//             Reject
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Child;
import React from "react";
import axios from "axios";


const Child = ({ data, removeCommunityByName }) => {
  const handleAccept = async () => {
    try {
      await axios.patch(`https://online-community-system.onrender.com/activateCommunity/${data.community_name}`, { status: true ,email:data.owner_email});

      await axios.patch(`https://online-community-system.onrender.com/addCommunity/${data.owner_email}`,{ newCommunityId : data.community_name,description:data.description})
      removeCommunityByName(data.community_name);
    } catch (error) {
      console.error('Error accepting community:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.delete(`https://online-community-system.onrender.com/deleteCommunity/${data.community_name}`,{email:data.owner_email});
      removeCommunityByName(data.community_name);
    } catch (error) {
      console.error('Error rejecting community:', error);
    }
  };

  return (
    <>
    <div class="w-full font-poppins max-w-md mx-auto hover:scale-105 transition-transform duration-500 shadow-md bg-white rounded-xl  overflow-hidden md:max-w-3xl lg:max-w-4xl mt-4">
 <div class="md:flex">
    <div class="md:w-1/3 w-auto flex items-center justify-center">
  <img class="w-full h-full object-contain ml-4 mr-4" src={data.image} alt="Modern building architecture"/>
</div>
      <div class="p-8 md:w-2/3">
        <div class="uppercase tracking-wide  text-indigo-500 font-bold text-2xl">{data.community_name}</div>
        <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"><span className="font-bold">Owner's Email :</span>{data.owner_email}</a>
        <p class="mt-2 text-slate-500"><span className="font-bold">Description :</span>{data.description}</p>
      </div>
      <div className="flex flex-col justify-center md:w-30 mr-2 ml-2">
           <button
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:shadow-outline-green transition-transform transform hover:scale-110 duration-300 ease-in-out"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-3 text-center mb-2 mt-1"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
    </div>
  </div>
  </>
  );
};

export default Child;