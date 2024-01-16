'use client'
import React, { useState } from 'react';
import Child from './components/child';
import communitiesData from './components/data';

const Parent = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const filteredCommunities = communitiesData.filter((community) =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8">
            <nav className="flex justify-between items-center mb-8 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-md shadow-md">
                <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 1a9 9 0 017.993 12.79l5.727 5.727-1.414 1.414-5.727-5.727A9 9 0 1110 1zm0 2a7 7 0 100 14 7 7 0 000-14z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-white">Communities</h1>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
                        Communities
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
                        Old Communities
                    </a>
                </div>
            </nav>

            <div className="flex items-center justify-end w-5/6 mx-auto">
                <div className="relative w-full max-w-xs flex">
                    <input
                        type="text"
                        placeholder="Search communities"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 bg-white text-gray-800 placeholder-gray-500 focus:shadow-md"
                    />
                    <button
                        type="submit"
                        className="ml-2 mt-0.5 mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    >
                        {/* Adjusted height and width of the search logo */}
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 1a9 9 0 017.993 12.79l5.727 5.727-1.414 1.414-5.727-5.727A9 9 0 1110 1zm0 2a7 7 0 100 14 7 7 0 000-14z" />
                        </svg>
                    </button>


                </div>
            </div>

            {filteredCommunities.map((community) => (
                <Child key={community.id} community={community} />
            ))}
        </div>
    );
};

export default Parent;
