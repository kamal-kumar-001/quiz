import React, { useState,useEffect } from 'react'
import {
    RiMenu2Fill, RiCloseFill,
    RiSearchLine
} from 'react-icons/ri'
import { FcManager } from 'react-icons/fc'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Sidebar from './sidebar'
// import jwt from 'jsonwebtoken';
// import AdminRoute from './adminRoute'
// import {RiMenu2Fill,RiCloseFill} from 'react-icons/ri'

const Layout = ({ children,user  }) => {
    const router = useRouter();
    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    };
    const [userMenu, setUserMenu] = useState(false);
    const handleUserMenu = () => {
        setUserMenu(!userMenu);
    };
    const handleSignOut = () => {
        // Remove the JWT token from the local storage
        localStorage.removeItem('token');
      
        // Redirect the user to the login page
        router.push('/');
      };
      
      
    return (
        // <AdminRoute>
        <div>
            <div>
                <nav className="bg-white dark:bg-black border-b border-gray-200 fixed z-30 w-full">
                    <div className="px-3 py-3 lg:px-5 lg:pl-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start">
                                <button onClick={handleClick} className="lg:hidden mr-2  focus:outline-none cursor-pointer p-2 ">
                                    {!click ? <RiMenu2Fill size={24} /> : <RiCloseFill size={24} />}
                                </button>
                                <Link href="/admin" className="text-xl font-bold flex items-center lg:ml-2.5">
                                    <span className="self-center whitespace-nowrap">Quiz</span>
                                </Link>
                                <form className="hidden lg:block lg:pl-32">
                                    <label htmlFor="topbar-search" className="sr-only">Search</label>
                                    <div className="mt-1 relative lg:w-64">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <RiSearchLine className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center ml-3">
                                    <div>
                                        <button onClick={handleUserMenu} className="flex  bg-gray-800 rounded-full ">
                                            <FcManager size={26} />
                                        </button>
                                    </div>
                                    <div className={`z-50 absolute top-12 ${!userMenu && 'hidden duration-300'} duration-300 right-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`} >
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                {user && user.name}
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" >Profile</Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" >Subscription</Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" >Settings</Link>
                                            </li>
                                            <li onClick={handleSignOut}>
                                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" >Sign out</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="flex overflow-hidden bg-white dark:bg-black pt-16">
                <Sidebar click={click}/>
                    <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"></div>
                    {children}
                </div>
            </div>
        </div>
        // </AdminRoute>
    )
}

export default Layout