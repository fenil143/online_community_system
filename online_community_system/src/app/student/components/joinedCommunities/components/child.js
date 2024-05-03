import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';


import "../../../../admin/components/verifiedCommunities/components/style.css";
import { Modal } from '../../../../admin/components/verifiedCommunities/components/child';
const Child = ({ community , changeNavbar }) => {
  
  const { community_name, owner_email, image } = community;
  const owner = owner_email ;
  const name = community_name;
  const [isOpen, setIsOpen] = useState(false)
  const showModal = () => setIsOpen(true)
  const router = useRouter();
  function handleClick(e){
    localStorage.setItem("otherCommunity",community_name);
    console.log(community_name);
    Cookies.set("otherCommunity",community_name);
    // router.push("otherCommunity/");
    changeNavbar("otherCommunity");
  }

  return (
    <>
     {isOpen && (
        <Modal
          src={image}
          alt="snow"
          caption={community_name}
          onClose={() => setIsOpen(false)}
        />
      )}
    <div className="relative group font-poppins overflow-hidden bg-gradient-to-br bg-blue-950 fon to-indigo-500 p-4 mb-4 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 w-4/5 mx-auto">
      <div className="flex items-center space-x-4">
        <div className="overflow-hidden rounded-full w-16 h-16 group-hover:rotate-6">
          <img
          onClick={showModal}
            src={image}
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
            class="bg-green-500 hover:bg-green-800  text-white px-4 py-2 rounded-full focus:outline-none focus:shadow-outline-green transition-transform transform hover:scale-110 duration-300 ease-in-out"
            onClick={handleClick}
          >
            Explore Community
          </button>
          </div>
    </div>
    </>
  );
};

export default Child;
