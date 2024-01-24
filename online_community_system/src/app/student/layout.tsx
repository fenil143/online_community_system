'use client';
import { Inter } from 'next/font/google'
import "./student.css";
import Link from "next/link"
import { useState } from "react";
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [navbar, setNavbar] = useState("jCommunity");
    const router = useRouter();

    if (localStorage.getItem('student') === null) {
        router.push("/authentication/loginStudent");
    }

    function dropdown() {
        const submenu = document.querySelector("#submenu");
        const arrow = document.querySelector("#arrow");

        if (submenu && arrow) {
            submenu.classList.toggle("hidden");
            arrow.classList.toggle("rotate-0");
        }
    }

    dropdown();

    function openSidebar() {
        const sidebar = document.querySelector(".sidebar");

        if (sidebar) {
            sidebar.classList.toggle("hidden");
        }
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
            <body className="bg-blue-100">
                <div
                    className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"
                >
                    <div className="text-gray-100 text-xl">
                        <div className="p-2.5 mt-1 flex items-center">
                            <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
                            <h1 className="font-bold text-gray-200 text-[15px] ml-3">Online Community</h1>
                            <i
                                className="bi bi-x cursor-pointer ml-28 lg:hidden"
                                onClick={openSidebar}
                            ></i>
                        </div>
                        <div className="my-2 bg-gray-600 h-[1px]"></div>
                    </div>
                    <Link href="/student/joinCommunity" onClick={()=>setNavbar('jCommunity')}><div
                        className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${navbar === 'jCommunity' ? 'bg-blue-600' : ''
                    }`}
                    >
                        <i className="bi bi-shop"></i>
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Join Community</span>
                    </div></Link>
                    <Link href="/student/createCommunity" onClick={()=>setNavbar('cCommunity')}><div
                        className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${navbar === 'cCommunity' ? 'bg-blue-600' : ''
                    }`}
                    >
                        <i className="bi bi-collection"></i>

                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Create Community</span>
                    </div></Link>
                    <div className="my-4 bg-gray-600 h-[1px]"></div>
                    <Link href="/student/joinedCommunities" onClick={()=>setNavbar("jdCommunity")}><div
                        className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${navbar === 'jdCommunity' ? 'bg-blue-600' : ''
                    }`}
                    >
                        <i className="bi bi-chat-left-text"></i>
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Joined Communities</span>
                    </div></Link>
                    <Link href="/student/createdCommunities" onClick={()=>setNavbar("cdCommunity")}>
                    <div
                        className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${navbar === 'cdCommunity' ? 'bg-blue-600' : ''
                    }`}
                    >
                        <i className="bi bi-bookmark-fill"></i>

                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Created Communities</span>
                    </div>
                    </Link>
                    <div
                        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    >
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
                    </div>
                </div>
                <div style={{ marginLeft: "300px" }} className="bg-blue-100">
                    {children}
                </div>
            </body>
        </html>
    )
}
