'use client';
import { Inter } from 'next/font/google'
import Link from "next/link"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const communityName = localStorage.getItem("ownCommunity");
    return (
        <div className="container mx-auto p-8">
            <nav className="flex justify-between items-center mb-8 bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-md shadow-md">
                <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 1a9 9 0 017.993 12.79l5.727 5.727-1.414 1.414-5.727-5.727A9 9 0 1110 1zm0 2a7 7 0 100 14 7 7 0 000-14z" />
                    </svg>
                    <h1 className="text-2xl font-bold text-white">{communityName}</h1>
                </div>
                <div className="flex space-x-6">
                    <Link href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110" >
                        Events
                    </Link>
                    <Link href="#" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
                        Posts
                    </Link>
                    <Link href="requests" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110" >
                        Requests
                    </Link>
                    <Link href="students" className="text-gray-300 hover:text-white transition duration-300 transform hover:scale-110">
                        Students
                    </Link>
                </div>
            </nav>
            {children}
        </div>
    );
}
