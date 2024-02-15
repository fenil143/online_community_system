'use client';
import React from "react";
import { useRouter } from "next/navigation";

const Child = ({ community }) => {
  const { community_name, owner_email, image } = community;
  const owner = owner_email ;
  const name = community_name;
  const router = useRouter();
  function handleClick(e){
    localStorage.setItem("ownCommunity",community_name);
    router.push("ownCommunity/");
  }

  return (
    <div className="relative group overflow-hidden bg-gradient-to-br from-pink-500 to-red-500 p-4 mb-4 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 w-4/5 mx-auto">
      <div className="flex items-center space-x-4">
        <div className="overflow-hidden rounded-full w-16 h-16 group-hover:rotate-6">
          <img
            src={
              "https://media.istockphoto.com/id/1339268212/vector/togetherness-diversity-symbol.jpg?s=612x612&w=0&k=20&c=cO4gaFriYBzD3KAWlaTWhGE5jDMD-G2ap-2vg71URqw="
            }
            alt={name}
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300 rounded-full border-4 border-white"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-gray-300">Owner: {owner}</p>
        </div>
      </div>
      <button className="absolute bottom-4 right-4 px-4 py-2 text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring focus:border-yellow-300 transition duration-300" onClick={handleClick}>
        Explore Community
      </button>
    </div>
  );
};

export default Child;
