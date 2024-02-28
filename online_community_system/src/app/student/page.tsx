// 'use client';
// import { Inter } from 'next/font/google'
// import "./student.css";
// import Link from "next/link"
// import { useState } from "react";
// import { useRouter } from 'next/navigation';
// import CreateCommunity from "./components/createCommunity/page1";
// import CreatedCommunities from "./components/createdCommunities/page1";
// import JoinCommunity from "./components/joinCommunity/page1";
// import JoinedCommunities from "./components/joinedCommunities/page1";
// import OwnCommunity from "./components/ownCommunity/page";
// import OtherCommunity from "./components/otherCommunity/page";

// const inter = Inter({ subsets: ['latin'] })

// export default function RootLayout() {

//     const [navbar, setNavbar] = useState("jCommunity");
//     const router = useRouter();
//     const changeNavbar = (str : string) => {
//         setNavbar(str);
//     }
//     const renderComponent = () => {
//         switch (navbar) {
//             case "jCommunity":
//                 return <JoinCommunity />;
//             case "cCommunity":
//                 return <CreateCommunity />;
//             case "jdCommunity":
//                 return <JoinedCommunities changeNavbar = {changeNavbar} />;
//             case "cdCommunity":
//                 return <CreatedCommunities changeNavbar = {changeNavbar} />;
//             case "ownCommunity":
//                 return <OwnCommunity />;
//             case "otherCommunity":
//                 return <OtherCommunity />;
//             default:
//                 return null;
//         }
//     };

//     if (localStorage.getItem('student') === null) {
//         router.push("/authentication/loginStudent");
//     }

//     function dropdown() {
//         const submenu = document.querySelector("#submenu");
//         const arrow = document.querySelector("#arrow");

//         if (submenu && arrow) {
//             submenu.classList.toggle("hidden");
//             arrow.classList.toggle("rotate-0");
//         }
//     }

//     dropdown();

//     function openSidebar() {
//         const sidebar = document.querySelector(".sidebar");

//         if (sidebar) {
//             sidebar.classList.toggle("hidden");
//         }
//     }

//     function handleLogout(){
//         localStorage.removeItem('student');
//         router.replace("/");
//     }

//     return (
//         <html>
//             <head>
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                 <link href="/dist/tailwind.css" rel="stylesheet" />
//                 <link
//                     rel="stylesheet"
//                     href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
//                 />
//             </head>
//             <body className="bg-blue-100">
//                 <div
//                     className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"
//                 >
//                     <div className="text-gray-100 text-xl">
//                         <div className="p-2.5 mt-1 flex items-center">
//                             <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
//                             <h1 className="font-bold text-gray-200 text-[15px] ml-3">Online Community</h1>
//                             <i
//                                 className="bi bi-x cursor-pointer ml-28 lg:hidden"
//                                 onClick={openSidebar}
//                             ></i>
//                         </div>
//                         <div className="my-2 bg-gray-600 h-[1px]"></div>
//                     </div>
//                     <Link href="" onClick={()=>setNavbar('jCommunity')}><div
//                         className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${navbar === 'jCommunity' ? 'bg-blue-600' : ''
//                     }`}
//                     >
//                         <i className="bi bi-shop"></i>
//                         <span className="text-[15px] ml-4 text-gray-200 font-bold">Join Community</span>
//                     </div></Link>
//                     <Link href="" onClick={()=>setNavbar('cCommunity')}><div
//                         className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${navbar === 'cCommunity' ? 'bg-blue-600' : ''
//                     }`}
//                     >
//                         <i className="bi bi-collection"></i>

//                         <span className="text-[15px] ml-4 text-gray-200 font-bold">Create Community</span>
//                     </div></Link>
//                     <div className="my-4 bg-gray-600 h-[1px]"></div>
//                     <Link href="" onClick={()=>setNavbar("jdCommunity")}><div
//                         className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${(navbar === 'jdCommunity' || navbar === "otherCommunity") ? 'bg-blue-600' : ''
//                     }`}
//                     >
//                         <i className="bi bi-chat-left-text"></i>
//                         <span className="text-[15px] ml-4 text-gray-200 font-bold">Joined Communities</span>
//                     </div></Link>
//                     <Link href="" onClick={()=>setNavbar("cdCommunity")}>
//                     <div
//                         className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${(navbar === 'cdCommunity' || navbar === 'ownCommunity') ? 'bg-blue-600' : ''
//                     }`}
//                     >
//                         <i className="bi bi-bookmark-fill"></i>

//                         <span className="text-[15px] ml-4 text-gray-200 font-bold">Created Communities</span>
//                     </div>
//                     </Link>
//                     <div
//                         className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" onClick={handleLogout}
//                     >
//                         <i className="bi bi-box-arrow-in-right"></i>
//                         <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
//                     </div>
//                 </div>
//                 <div style={{ marginLeft: "300px" }} className="bg-blue-100">
//                     {renderComponent()}
//                 </div>
//             </body>
//         </html>
//     )
// }
'use client';
import { Inter } from 'next/font/google'
import "./student.css";
import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import CreateCommunity from "./components/createCommunity/page1";
import CreatedCommunities from "./components/createdCommunities/page1";
import JoinCommunity from "./components/joinCommunity/page1";
import JoinedCommunities from "./components/joinedCommunities/page1";
import OwnCommunity from "./components/ownCommunity/page";
import OtherCommunity from "./components/otherCommunity/page";
import Profile from "./components/profile/profile";
import News from "./components/News/news";
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout() {

    const [navbar, setNavbar] = useState("jCommunity");
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
      setIsOpen(!isOpen);
  };

    const router = useRouter();
    const changeNavbar = (str : string) => {
        setNavbar(str);
    }
    const renderComponent = () => {
        switch (navbar) {
            case "jCommunity":
                return <JoinCommunity />;
            case "cCommunity":
                return <CreateCommunity />;
            case "jdCommunity":
                return <JoinedCommunities changeNavbar = {changeNavbar} />;
            case "cdCommunity":
                return <CreatedCommunities changeNavbar = {changeNavbar} />;
            case "ownCommunity":
                return <OwnCommunity />;
            case "otherCommunity":
                return <OtherCommunity />;
            case "profile":
                return <Profile/>
            case "news":
                return <News/>
            default:
                return null;
        }
    };

    if (localStorage.getItem('student') === null) {
        router.push("/authentication/loginStudent");
    }
  
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

    function handleLogout(){
        localStorage.removeItem('student');
        router.replace("/");
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
                        className={`fixed top-0 font-poppins left-0 z-40 w-68  h-screen transition-transform sm:w-80 lg:w-64 translate-x-0`}
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
                    <Link href="" onClick={()=>setNavbar('jCommunity')}><div
                        className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${navbar === 'jCommunity' ? 'bg-blue-600' : ''
                    }`}
                    >
                        <i className="fa fa-group"></i>
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Join Community</span>
                    </div></Link>
                    <Link href="" onClick={()=>setNavbar('cCommunity')}><div
                        className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${navbar === 'cCommunity' ? 'bg-blue-600' : ''
                    }`}
                    >
                        <i className="bi bi-collection"></i>
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Create Communities</span>
                    </div></Link>
                    <Link href="" onClick={()=>setNavbar("jdCommunity")}><div
                        className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${(navbar === 'jdCommunity' || navbar === "otherCommunity") ? 'bg-blue-600' : ''
                    }`}
                    >
                        <i className="bi bi-chat-left-text"></i>
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Joined Communities</span>
                    </div></Link>

                    <Link href="" onClick={()=>setNavbar("cdCommunity")}>                     <div
                        className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${(navbar === 'cdCommunity' || navbar === 'ownCommunity') ? 'bg-blue-600' : ''
                    }`}
                    >
                        <i className="bi bi-bookmark-fill"></i>

             <span className="text-[15px] ml-4 text-gray-200 font-bold">Created Communities</span>
                    </div></Link>
                    <Link href="" onClick={()=>setNavbar("news")}>                     <div
                        className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${(navbar === 'news') ? 'bg-blue-600' : ''
                    }`}
                    ><i className="fa fa-newspaper-o"></i>
             <span className="text-[15px] ml-4 text-gray-200 font-bold">News</span>
                    </div></Link>
                    <Link href="" onClick={()=>setNavbar("profile")}>                     <div
                        className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ${(navbar === 'profile') ? 'bg-blue-600' : ''
                    }`}
                    ><i className="fa fa-user"></i>
             <span className="text-[15px] ml-4 text-gray-200 font-bold">Profile</span>
                    </div></Link>
                    <div className="my-4 bg-gray-600 h-[1px]"></div>
                  
                  
                    <div
                        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={handleLogout}>
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
                     </div>
                    </ul>
                </div>
            </aside>
             )}                <div  className="p-4 sm:ml-64 bg-blue-100">

                    {renderComponent()}
                </div>
            </body>
        </html>
    )
}
