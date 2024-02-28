// npm i'use client';
// import Product from './components/product';
// import Welcome from './components/welcome';
// import Data from './components/data';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from "next/navigation";
// import Image from 'next/image'
// import Not_Found from '../unverifiedCommunities/Not_Found';

// interface Student {
//     name: string;
//     status: boolean;
//     email: string;
// }

// function students() {
//     const [studentsData, setStudentsData] = useState<Student[]>([]);
//     const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
//     const router = useRouter();
//     if (localStorage.getItem('admin') === null) {
//         router.replace("/authentication/loginAdmin");
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await Data();
//                 setStudentsData(data);
//                 setFilteredStudents(data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleSearch = (searchTerm: string) => {
//         if(searchTerm == ""){
//             setFilteredStudents(studentsData);
//             return ;
//         }
//         const filtered = studentsData.filter(student => {
//             if (student.name !== undefined) {
//                 return student.name.toLowerCase().includes(searchTerm.toLowerCase());
//             }
//             else {
//                 return false;
//             }
//         }

//         );
//         setFilteredStudents(filtered);
//     };

   
//     const removeStudentByEmail = (email: string) => {
//         const updatedStudentsData = studentsData.filter(student => student.email !== email);
//         setStudentsData(updatedStudentsData);

//         const updatedFilteredStudents = filteredStudents.filter(student => student.email !== email);
//         setFilteredStudents(updatedFilteredStudents);
//     };
    
//     return (
//         <div className="App bg-blue-100">
//             <Welcome onSearch={handleSearch} />
//             {
//                 filteredStudents.length == 0 ? (
//                     <div className="flex items-center justify-center h-screen">
//                     <div className="h-auto max-w-full mx-auto mt-2">
//                         <Not_Found/>

//                     </div>
//                   </div>
//                 ) :
//                     (
//                         filteredStudents.map((e) => {
//                             return <Product data={e} removeStudentByEmail={removeStudentByEmail} />
//                         })
//                     )
//             }
//         </div>
//     );
// }

// export default students;
// Renamed to follow React naming convention
import Product from './components/product';
import Welcome from './components/welcome';
import Data from './components/data';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Not_Found from '../unverifiedCommunities/Not_Found';

interface Student {
    name: string;
    status: boolean;
    email: string;
}

function Students() {
    const [studentsData, setStudentsData] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Data();
                setStudentsData(data);
                setFilteredStudents(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (searchTerm: string) => {
        if (searchTerm === "") {
            setFilteredStudents(studentsData);
            return;
        }

        const filtered = studentsData.filter(student => (
            student.name !== undefined && student.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));

        setFilteredStudents(filtered);
    };

    const removeStudentByEmail = (email: string) => {
        const updatedStudentsData = studentsData.filter(student => student.email !== email);
        setStudentsData(updatedStudentsData);

        const updatedFilteredStudents = filteredStudents.filter(student => student.email !== email);
        setFilteredStudents(updatedFilteredStudents);
    };

    if (localStorage.getItem('admin') === null) {
        router.replace("/authentication/loginAdmin");
        return null; // If not logged in, redirect and don't render the rest of the component
    }

    return (
        <div className="App bg-blue-100">
            <Welcome onSearch={handleSearch} />
            {
                filteredStudents.length === 0 ? (
                    <div className="flex items-center justify-center h-screen">
                        <div className="h-auto max-w-full mx-auto mt-2">
                            <Not_Found />
                        </div>
                    </div>
                ) : (
                    filteredStudents.map((e, index) => (
                        <div key={index}><Product data={e} removeStudentByEmail={removeStudentByEmail} /></div>
                    ))
                )
            }
        </div>
    );
}

export default Students;
