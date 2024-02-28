import React, { useEffect, useState } from 'react';
import Loading from "./loading";

const News = () => {
    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=344744b1120d4ee585a814c7c858dd21`,
    };
    
    try {
      setLoading(true);
        const response = await axios.request(options);
        console.log(response.data);
        setData(response.data.articles);
    } catch (error) {
        console.error(error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(data)
  }, []); // Empty dependency array to run the effect only once on component mount

  return (<>
   {loading ? (
      <Loading/>// Show a loading indicator or message
    ) : (
    data.map((article, index) => (
      <div key={index} className='bg-white hover:scale-105 transition-transform duration-500 shadow-lg mt-5 h-auto rounded-xl w-2/3 mx-auto'>
      <div className='m-5' style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={article.urlToImage} alt="Article" className='object-contain rounded-lg m-5 ' style={{ width: '100%' }} />
      </div>
      <h2 className='font-bold ml-3 mt-3 mb-3'>{article.title}</h2>
      <p className='font-poppins ml-3'><i class="fa fa-file-text mr-4" aria-hidden="true"></i>{article.description}</p>
      <p className='font-poppins ml-3'> <i class="fa fa-calendar mr-4" aria-hidden="true"></i>Published on: {article.publishedAt}</p>
      {/* <p>Source: {article.source}</p> */}
      <div className='mb-5 ml-3 mt-3'>
  <a
    href={article.url}
    className='font-semibold text-cyan-500  border-b-2 border-cyan-500'
    target="_blank"
    rel="noopener noreferrer"
  >
    Read More
  </a>
</div>
<div className='h-3'></div>



    </div>
    
    )))}
  </>);
}
export default News;
