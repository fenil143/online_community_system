import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
    const [data,setData]=useState([]);
  const fetchData = async () => {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=344744b1120d4ee585a814c7c858dd21`,
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        setData(response.data.articles);
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(data)
  }, []); // Empty dependency array to run the effect only once on component mount

  return (<>
    {data.map((article, index) => (
      <div key={index} className='bg-white shadow-lg mt-5 rounded-xl'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src={article.urlToImage} alt="Article" style={{ maxWidth: '100%', height: 'auto' }} />
</div>     <h2 className='font-bold ml-3 mt-3 mb-3'>{article.title}</h2>
      <p className='font-poppins ml-3'><i class="fa fa-file-text mr-4" aria-hidden="true"></i>{article.description}</p>
      <p className='font-poppins ml-3'> <i class="fa fa-calendar mr-4" aria-hidden="true"></i>Published on: {article.publishedAt}</p>
      {/* <p>Source: {article.source}</p> */}
      <a
  href={article.url}
  className='font-semibold text-cyan-500 underline ml-5 mb-5' // Add the 'underline' class here
  target="_blank"
  rel="noopener noreferrer"
>
  Read More
</a>
</div>
    ))}
  </>);
}
export default News;
