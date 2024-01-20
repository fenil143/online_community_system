'use client';
import Product from './components/product';
import Welcome from './components/welcome';
import Data from './components/data';
import React, { useState, useEffect } from 'react';

interface Student {
    name: string;
    status: boolean;
    email: string;
}

function students() {
    const [studentsData, setStudentsData] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

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
        if(searchTerm == ""){
            setFilteredStudents(studentsData);
            return ;
        }
        const filtered = studentsData.filter(student => {
            if (student.name !== undefined) {
                return student.name.toLowerCase().includes(searchTerm.toLowerCase());
            }
            else {
                return false;
            }
        }

        );
        setFilteredStudents(filtered);
    };

   
    const removeStudentByEmail = (email: string) => {
        const updatedStudentsData = studentsData.filter(student => student.email !== email);
        setStudentsData(updatedStudentsData);

        const updatedFilteredStudents = filteredStudents.filter(student => student.email !== email);
        setFilteredStudents(updatedFilteredStudents);
    };
    
    return (
        <div className="App bg-blue-100">
            <Welcome onSearch={handleSearch} />
            {filteredStudents.map((e) => {
                return <Product data={e} removeStudentByEmail={removeStudentByEmail} />
            })}
        </div>
    );
}

export default students;