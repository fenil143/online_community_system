import React from 'react';
import image from "../assets/noData.png";
export default function About_us() {
  const imageUrl = require("../assets/noData.png");
  return (<>

    <div className="flex justify-center font-poppins m-5  rounded-lg p-6 bg-white ">

      <div className="flex flex-col justify-center">
        <h1 className="text-3xl text-blue-800 font-bold mb-2 text-center">Online Community Management System</h1>
        <div className="text-center mt-8">
          <h2 className="text-xl text-gray-600 font-semibold mb-2">About Us</h2>
          <p className="text-gray-600">Meet our awesome team!</p>
        </div>
        <div className='flex flex-wrap justify-center items-center'>
          <div className='shadow-lg m-5 '>
            <img className="h-auto max-w-xs m-5" src="http://res.cloudinary.com/da3airmpg/image/upload/v1709031785/eswt04odnummixyifj66.jpg" alt="image description" />

            <div class="flex justify-center mt-2 md:mt-0">
              <a href="https://www.linkedin.com/in/bhavik-patel-3243b2241/" target="_blank" rel="noopener noreferrer" class="flex p-px pl-2 pb-3 items-center hover:scale-125 transition-transform mr-2 ml-1">
                <i class="fa fa-linkedin text-xl shadow-lg text-blue-500"></i>
                <span class="hidden md:inline-block ml-1">LinkedIn</span>
              </a>
              <a href="https://github.com/Bhavik5025" target="_blank" rel="noopener noreferrer" class="flex items-center pl-2 pb-3 hover:scale-125 transition-transform mr-1">
                <i class="fa fa-github text-xl text-black-500"></i>
                <span class="hidden md:inline-block ml-1">GitHub</span>
              </a>
            </div>
            <p className="text-gray-600  ml-5"><i className="fa fa-user mr-3" aria-hidden="true"></i>Bhavik Patel</p>
            <p className="text-gray-600  ml-5 mb-2"><i className="fa fa-envelope mr-3" aria-hidden="true"></i>Bhavik5025@gmail.com</p>

          </div>
          <div className='shadow-lg m-5'>
            <img className="h-auto max-w-xs m-5" src="http://res.cloudinary.com/da3airmpg/image/upload/v1708540761/wvalcrysiyuf1lc5sta6.jpg" alt="image description" />
            <div class="flex justify-center mt-2 md:mt-0">
              <a href="https://www.linkedin.com/in/bhavik-patel-3243b2241/" target="_blank" rel="noopener noreferrer" class="flex p-px pl-2 pb-3 items-center hover:scale-125 transition-transform mr-2 ml-1">
                <i class="fa fa-linkedin text-xl shadow-lg text-blue-500"></i>
                <span class="hidden md:inline-block ml-1">LinkedIn</span>
              </a>
              <a href="https://github.com/Bhavik5025" target="_blank" rel="noopener noreferrer" class="flex items-center pl-2 pb-3 hover:scale-125 transition-transform mr-1">
                <i class="fa fa-github text-xl text-black-500"></i>
                <span class="hidden md:inline-block ml-1">GitHub</span>
              </a>
            </div>
            <p className="text-gray-600  ml-5 "><i className="fa fa-user mr-3" aria-hidden="true"></i>Fenil Modi</p>
            <p className="text-gray-600  ml-5 mb-2"><i className="fa fa-envelope mr-3" aria-hidden="true"></i>mahendrafenil08@gmail.com</p>

          </div>
        </div>
        <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                    "We are students of Dharmsinh Desai University, from the Department of Computer Engineering. Our collaborative effort has resulted in the creation of an innovative Online Community System. The primary goal of our project is to facilitate seamless communication and knowledge sharing among all students of the university. By providing a dedicated platform, we aim to foster a vibrant community where students can engage in meaningful discussions, share thoughts related to their particular field, and collectively enhance their knowledge. Our focus on the Computer Engineering department ensures that students in this domain have a specialized space for collaboration, fostering a supportive environment for academic and professional growth."     </p>
                    {/* <a href="javascript:void(0);" class="font-normal text-pink-500">
                      Show more
                    </a> */}
                  </div>
                </div>
              </div>


      </div>


    </div>

  </>);
}