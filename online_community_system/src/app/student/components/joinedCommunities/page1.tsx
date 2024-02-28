'use client'
import React, { useState, useEffect } from 'react';
import Data from './components/data';
import Child from "./components/child"
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Not_Found from '@/app/admin/components/unverifiedCommunities/Not_Found';

interface Community {
    _id: string,
    community_name: string,
}

export default function community(obj : any) {
    const [searchTerm, setSearchTerm] = useState('');
    const [communitiesData, setCommunitiesData] = useState<Community[]>([]);
    const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
    const router = useRouter();
    const email = localStorage.getItem("student");

    useEffect(() => {
        if (localStorage.getItem('student') === null) {
            router.push("/authentication/loginStudent");
        }
        const fetchData = async () => {
            try {
                let data = await Data(email);
                setCommunitiesData(data);
                setFilteredCommunities(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () =>{
        if (searchTerm == "") {
            setFilteredCommunities(communitiesData);
            return;
        }
        const filtered = communitiesData.filter(community => {
            if (community.community_name !== undefined) {
                return community.community_name.toLowerCase().includes(searchTerm.toLowerCase());
            }
            else {
                return false;
            }
        }

        );
        if (filtered.length == 0) {
            setFilteredCommunities(communitiesData);
        }
        else {
            setFilteredCommunities(filtered);
        }
    }

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container mx-auto p-4 md:p-8 lg:p-1">
        <nav className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-md shadow-md">
          <div className="flex items-center space-x-4">
           <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10 1a9 9 0 017.993 12.79l5.727 5.727-1.414 1.414-5.727-5.727A9 9 0 1110 1zm0 2a7 7 0 100 14 7 7 0 000-14z" />
            </svg>
                    <h1 className="text-2xl font-bold text-white">Joined Communities</h1>
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
                        type="submit" onClick={handleSearch}
                        className={`ml-2 mt-0.5 mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-2  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`}
                    >
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 1a9 9 0 017.993 12.79l5.727 5.727-1.414 1.414-5.727-5.727A9 9 0 1110 1zm0 2a7 7 0 100 14 7 7 0 000-14z" />
                        </svg>
                    </button>


                </div>
            </div>
            {
                filteredCommunities.length === 0 ? (
                    <div className="flex items-center justify-center h-screen">
            <div className="h-auto max-w-full mx-auto mt-2">
                <Not_Found/>

            </div>
          </div>
                ) : (
                    filteredCommunities.map((community) => (
                        <Child key={community._id} community={community} changeNavbar = {obj.changeNavbar} />
                    ))
                )
            }
            <div className = "mb-24"></div>
            {/* {
                filteredCommunities.map((community) => (
                    <Child key={community._id} community={community} />
                ))
            } */}
        </div>
    )
}