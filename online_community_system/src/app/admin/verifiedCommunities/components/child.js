import React from "react";
import axios from "axios";

const Child = ({ data, removeCommunityByName }) => {

  const handleReject = async () => {
    try {
      await axios.delete(`http://localhost:8000/deleteCommunity/${data.community_name}`);
      removeCommunityByName(data.community_name);
    } catch (error) {
      console.error('Error rejecting community:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="border w-2/3 rounded-lg overflow-hidden shadow-md bg-white transform transition-transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out mb-6">
        <div className="flex items-center p-4">
          <img
            className="w-28 h-28 object-cover rounded-full mr-4"
            src="https://png.pngtree.com/png-vector/20190626/ourmid/pngtree-adoption-and-communitynetwork-and-social-icon-design-png-image_1513769.jpg"
            alt={data.community_name}
          />

          <div className="flex-grow">
            <h3 className="text-2xl font-semibold mb-1">
              {data.community_name}
            </h3>
            <p className="text-gray-600 text-base mb-2">
              <span className="font-bold">Description:</span> {data.description}
            </p>
            <p className="text-blue-500 text-base">
              Owner's Email: {data.owner_email}
            </p>
          </div>
        </div>

        <div className="flex justify-center p-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red transition-transform transform hover:scale-110 duration-300 ease-in-out ml-2"
            onClick={handleReject}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Child;
