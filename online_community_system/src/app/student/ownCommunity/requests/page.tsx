"use client";
import { useEffect, useState } from "react";
import Data from "./components/data";
import Child from "./components/child";
import Image from 'next/image'

interface Student {
    email: string;
}

export default function requests() {
    const [searchTerm, setSearchTerm] = useState('');
    const [studentsData, setStudentsData] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const communityName = localStorage.getItem("ownCommunity");
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await Data(communityName);
                if (data) {
                    setStudentsData(data);
                    setFilteredStudents(data);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const removeStudentByEmail = (email: string) => {
        const updatedStudentsData = studentsData.filter(student => student.email !== email);
        setStudentsData(updatedStudentsData);

        const updatedFilteredStudents = filteredStudents.filter(student => student.email !== email);
        setFilteredStudents(updatedFilteredStudents);
    };

    return (
        <div>
            {
                filteredStudents.length === 0 ? (
                    <div className=" text-center ml-96"><Image
                        src="/assets/noData.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    /></div>
                ) : (
                    filteredStudents.map((e) => {
                        return <div><Child data={e} removeStudentByEmail={removeStudentByEmail} /></div>
                    })
                )
            }
        </div>
    );
}

// {
//     filteredCommunities.length === 0 ? (
//         <div className=" text-center ml-96"><Image
//             src="/assets/noData.png"
//             width={500}
//             height={500}
//             alt="Picture of the author"
//         /></div>
//     ) : (
//         filteredCommunities.map((e) => {
//             return <Child data={e} key={e._id} removeCommunityByName={removeCommunityByName}/>
//         })
//     )
// }