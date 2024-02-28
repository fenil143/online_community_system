'use client';

import { Inter } from 'next/font/google'
import Link from "next/link"
import "./admin.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UnverifiedCommunities from "./components/unverifiedCommunities/page1";
import UnverifiedStudents from "./components/unverifiedStudents/page1";
import VerifiedCommunities from "./components/verifiedCommunities/page1";
import VerifiedStudents from "./components/verifiedStudents/page1";

// const inter = Inter({ subsets: ['latin'] })

export default function RootLayout() {


    const [navbar, setNavbar] = useState("uStudents");
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

// uCommunitie uStudents 

    const renderComponent  = () => {
        switch (navbar) {
            case "uCommunities":
                return <UnverifiedCommunities />;
            case "uStudents":
                return <UnverifiedStudents />;
            case "vCommunities":
                return <VerifiedCommunities />;
            case "vStudents":
                return <VerifiedStudents />;
            default:
                return null;
        }
    };

    const dropdown = () => {
        const submenu = document.querySelector("#submenu");
        const arrow = document.querySelector("#arrow");

        if (submenu && arrow) {
            submenu.classList.toggle("hidden");
            arrow.classList.toggle("rotate-0");
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };

        handleResize(); // Call the resize handler once to set the initial state

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function handleLogout() {
        localStorage.removeItem('admin');
        window.location.href = "/landing";
    }


    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="/dist/tailwind.css" rel="stylesheet" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
                />
            </head>
            <body className="bg-blue-100 font-poppins">
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">{isOpen ? 'Close sidebar' : 'Open sidebar'}</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </button>


                {/* Sidebar */}
                {isOpen && typeof window !== 'undefined' && ( // Only render if isOpen is true and window is defined
                    <aside
                        id="sidebar-multi-level-sidebar"
                        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:w-80 lg:w-64 translate-x-0`}
                        aria-label="Sidebar"
                    >
                        {/* Close button for the sidebar on mobile */}
                        {window.innerWidth <= 768 && (
                            <button
                                type="button"
                                onClick={toggleSidebar}
                                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-600 focus:outline-none"
                            >
                                <span className="sr-only">Close sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}



                        <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800 bg-gray-900">
                            <ul className="space-y-2 font-medium">
                                {/* Sidebar items */}
                                {/* Replace this section with your sidebar content */}
                                <div className="text-gray-100 text-xl">
                                    <div className="p-2.5 mt-1 flex items-center">
                                        <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
                                        <h1 className="font-bold text-gray-200 text-[15px] ml-3">Online Community</h1>
                                        {/* <i
                                className="bi bi-x cursor-pointer ml-28 lg:hidden"
                                onClick={openSidebar}
                            ></i> */}
                                    </div>
                                    <div className="my-2 bg-gray-600 h-[1px]"></div>
                                </div>
                                <Link href="" onClick={() => setNavbar('uStudents')}><div
                                    className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${navbar === 'uStudents' ? 'bg-blue-600' : ''
                                        }`}
                                >
                                    <i className="bi bi-person-fill"></i>
                                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Students</span>
                                </div></Link>
                                <Link href="" onClick={() => setNavbar('uCommunities')}><div
                                    className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${navbar === 'uCommunities' ? 'bg-blue-600' : ''}`}
                                >
                                    <i className="bi bi-bookmark-fill"></i>

                                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Communities</span>
                                </div></Link>
                                <div className="my-4 bg-gray-600 h-[1px]"></div>
                                <div
                                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                                    onClick={dropdown}
                                >
                                    <i className="bi bi-chat-left-text-fill"></i>
                                    <div className="flex justify-between w-full items-center">
                                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Members</span>
                                        <span className="text-sm rotate-180" id="arrow">
                                            <i className="bi bi-chevron-down"></i>
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
                                    id="submenu"
                                >
                                    <Link href="" onClick={() => setNavbar('vStudents')}><h1 className={`cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1 ${navbar === 'vStudents' ? 'bg-blue-600' : ''}`}>
                                        Students
                                    </h1></Link>
                                    <Link href="" onClick={() => setNavbar('vCommunities')}><h1 className={`cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1 ${navbar === 'vCommunities' ? 'bg-blue-600' : ''}`}>
                                        Communities
                                    </h1></Link>
                                </div>
                                <div
                                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                                    onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
                                </div>
                            </ul>
                        </div>
                    </aside>
                )}
                <div className="p-4 sm:ml-64 bg-blue-100">
                    {renderComponent()}
                </div>
            </body>
        </html>
    )
}
