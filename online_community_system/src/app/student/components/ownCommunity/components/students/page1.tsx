"use client";
import { useEffect, useState } from "react";
import Data from "./components/data";
import Child from "./components/child";
import Image from 'next/image'
import Not_Found from '@/app/admin/components/unverifiedCommunities/Not_Found';

interface Student {
    email : string;
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
                filteredStudents.length == 0 ? (
                    <div className="flex items-center justify-center h-screen">
                    <div className="h-auto max-w-full mx-auto mt-2">
                        <Not_Found/>
        
                    </div>
                  </div>
                ) :
                    (
                        filteredStudents.map((e) => {
                            return <div><Child data={e} removeStudentByEmail={removeStudentByEmail} /></div>
                        })
                    )
            }
            <div className="mb-24"></div>
        </div>
    );
}