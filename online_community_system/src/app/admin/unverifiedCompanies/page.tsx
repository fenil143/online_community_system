'use client';
import Data from './components/data';
import React, { useState, useEffect } from 'react';

interface Company{

}
function company(){
    const [companiesData, setCompaniesData] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Data();
                if(data){
                    setCompaniesData(data);
                    setFilteredCompanies(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return(
        <h1>Hello world</h1>
    );
}

export default company;