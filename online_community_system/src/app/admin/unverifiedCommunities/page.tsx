'use client';
import Data from './components/data';
import React, { useState, useEffect } from 'react';
import Child from "./components/child";
import Welcome from './components/welcome';
import { useRouter } from "next/navigation";
import Image from 'next/image'
import NotFound from './Not_Found';
interface Community {
    community_name: string
    _id: string
}
function Community() {
    const [communitiesData, setCommunitiesData] = useState<Community[]>([]);
    const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
    const router = useRouter();
    if (localStorage.getItem('admin') === null) {
        router.replace("/authentication/loginAdmin");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Data();
                if (data) {
                    setCommunitiesData(data);
                    setFilteredCommunities(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (searchTerm: string) => {
        if (searchTerm == "") {
            setFilteredCommunities(communitiesData);
            return;
        }
        const filtered = communitiesData.filter(Community => {
            if (Community.community_name !== undefined) {
                return Community.community_name.toLowerCase().includes(searchTerm.toLowerCase());
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
    };

    const removeCommunityByName = (name: string) => {
        let updatedData = communitiesData.filter(community => community.community_name !== name);
        setCommunitiesData(updatedData);

        updatedData = filteredCommunities.filter(community => community.community_name !== name);
        setFilteredCommunities(updatedData);
    };


    return (
        <div className="App bg-blue-100">
            <Welcome onSearch={handleSearch} />
            {
                filteredCommunities.length === 0 ? (
                    <div className="flex items-center justify-center h-screen">
                    <div className="h-auto max-w-full mx-auto mt-2">
                        <NotFound/>

                    </div>
                  </div>
                  
                ) : (
                    filteredCommunities.map((e) => {
                        return <Child data={e} key={e._id} removeCommunityByName={removeCommunityByName}/>
                    })
                )
            }
        </div>
    );
}



export default Community;