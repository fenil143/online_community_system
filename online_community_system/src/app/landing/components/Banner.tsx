'use client'
import React from 'react';
import imgBanner from "../assets/rocket.png";
import Img from "next/image"
import Link from "next/link"
import { useState } from "react";
// import Button from "./Button";
function Banner() {
    return (
        <div className="absolute w-[1162px] h-[590px] top-[92px] left-[164px]">
            <div className="container mx-auto flex items-center justify-between">
                <div className="w-1/2">
                    <h1 className="text-4xl mb-8 font-semibold text-[#184657]">Hello, welcome</h1>
                    <h2 className="text-5xl mb-8 font-extrabold text-black">Discover your ideal role</h2>
                    <div className="text-xl mb-10 font-normal text-black">Work in a place that makes your comfortable.<br /> Register now free.</div>
                    <div className="flex space-x-4">
                        <button className="bg-[#2545f4] text-white px-12 py-3 rounded-xl text-lg font-bold hover:bg-[#3b4ba5] hover:text-white">Register</button>
                        <div className="dropdown border border-solid border-[#2545f4] px-12 py-3 rounded-xl text-lg font-bold hover:bg-white relative">
                            <span>Login</span>
                            <div className="dropdown-content top-full left-0 mt-0.5 bg-white border border-solid border-[#2545f4] rounded-md p-2">
                                <Link href="#" className="text-sm">Admin</Link>
                                <Link href="#" className="text-sm">Student</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <Img src={imgBanner} alt="Img Banner" className="ml-10 w-[553px] h-[598px]" />
                </div>
            </div>

        </div>
    )
}

export default Banner;