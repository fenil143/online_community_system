// 'use client'
// import React from 'react';
// import imgBanner from "../assets/rocket.png";
// import Lottie from "../assets/lottie";
// import Img from "next/image"
// import Link from "next/link"
// import { useState } from "react";
// // import Button from "./Button";
// function Banner() {
//     return (
//         <div className="absolute w-[1162px] h-[590px] top-[92px] left-[164px]">
//             <div className="container mx-auto flex items-center justify-between">
//                 <div className="w-1/2">
//                     <h1 className="text-4xl mb-8 font-semibold text-[#184657]">Hello, welcome</h1>
//                     <h2 className="text-5xl mb-8 font-extrabold text-black">Discover your ideal role</h2>
//                     <div className="text-xl mb-10 font-normal text-black">Work in a place that makes your comfortable.<br /> Register now free.</div>
//                     <div className="flex space-x-4">
//                         <Link href="/authentication/register" className="bg-[#2545f4] text-white px-12 py-3 rounded-xl text-lg font-bold hover:bg-[#3b4ba5] hover:text-white">Register</Link>
//                         <div className="dropdown border border-solid border-[#2545f4] px-12 py-3 rounded-xl text-lg font-bold hover:bg-white relative">
//                             <span>Login</span>
//                             <div className="dropdown-content top-full left-0 mt-0.5 bg-white border border-solid border-[#2545f4] rounded-md p-2">
//                                 <Link href="/authentication/loginAdmin" className="text-sm">Admin</Link>
//                                 <Link href="/authentication/loginStudent" className="text-sm">Student</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-1/2">
//                  <Lottie ></Lottie>
//                    </div>
//             </div>


//         </div>
//     )
// }


// export default Banner;
'use client'
import React from 'react';
import imgBanner from "../assets/rocket.png";
import Lottie from "../assets/lottie";
import Img from "next/image"
import Link from "next/link"
import { useState } from "react";

function Banner() {
    return (
        <div className="relative w-full lg:w-[1162px] mx-auto mt-12 lg:mt-0">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 lg:px-0">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <h1 className="text-2xl lg:text-4xl mb-4 lg:mb-8 font-semibold text-[#184657]">Hello, welcome</h1>
                    <h2 className="text-3xl lg:text-5xl mb-4 lg:mb-8 font-extrabold text-black">Discover your ideal role</h2>
                    <div className="text-lg lg:text-xl mb-6 lg:mb-10 font-normal text-black">Work in a place that makes you comfortable.<br /> Register now for free.</div>
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                        <Link href="/authentication/register" className="bg-[#2545f4] text-white px-8 py-3 rounded-xl text-lg font-bold hover:bg-[#3b4ba5] hover:text-white">Register</Link>
                        <div className="dropdown border border-solid border-[#2545f4] px-8 py-3 rounded-xl text-lg font-bold hover:bg-white relative">
                            <span>Login</span>
                            <div className="dropdown-content top-full left-0 mt-0.5 bg-white border border-solid border-[#2545f4] rounded-md p-2">
                                <Link href="/authentication/loginAdmin" className="text-sm">Admin</Link>
                                <Link href="/authentication/loginStudent" className="text-sm">Student</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <Lottie />
                </div>
            </div>
        </div>
    );
}

export default Banner;
