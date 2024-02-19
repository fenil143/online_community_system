'use client';
import React from "react";
import { useRouter } from "next/navigation";

const Child = ({ community, changeNavbar }) => {
  const { community_name, owner_email, image } = community;
  const owner = owner_email ;
  const name = community_name;
  const router = useRouter();
  function handleClick(e){
    localStorage.setItem("ownCommunity",community_name);
    // router.push("/student/components/ownCommunity/");
    changeNavbar("ownCommunity");
  }

  return (
    <div className="relative group overflow-hidden bg-gradient-to-br bg-purple-950 p-4 mb-4 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 w-4/5 mx-auto">
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
      <div class="flex justify-end mt-auto">
          <button
            class="bg-sky-500 hover:bg-sky-800  text-white px-4 py-2 rounded-full focus:outline-none focus:shadow-outline-green transition-transform transform hover:scale-110 duration-300 ease-in-out"
            onClick={handleClick}
          >
            Explore Community
          </button>
          </div>
    </div>
  );
};

export default Child;
