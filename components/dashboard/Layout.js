import React, { useState } from 'react'
import {
    RiPieChartFill,
    RiMenu2Fill, RiCloseFill,
    RiSearchLine,
    RiAddFill
} from 'react-icons/ri'
import { BsRobot } from 'react-icons/bs'
import { FcManager } from 'react-icons/fc'
import { HiDocumentText } from 'react-icons/hi'
import { MdHelp, MdOutlineDiamond } from 'react-icons/md'
import Link from 'next/link'
import ThemeChanger from '../DarkSwitch'
import { useRouter } from 'next/router'
// import {RiMenu2Fill,RiCloseFill} from 'react-icons/ri'

const Layout = ({ children, user }) => {
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
                    {/* <aside className={`${!click ? 'sm:w-0 w-0 lg:w-64 xl:w-64 ' : ' w-64'} fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col duration-500 `}> */}
                    <aside
                        className={`${!click
                                ? 'sm:w-0 w-0 lg:w-64 xl:w-64 '
                                : ' w-64 animate-slide-in '
                            }fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col duration-500`}
                    >
                        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white dark:bg-black pt-0">
                            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                                <div className="flex-1 mb-44 px-3 bg-white dark:bg-black divide-y space-y-1 ">
                                    <ul className="space-y-2 pb-2">
                                        <li>
                                            <form className="lg:hidden">
                                                <label htmlFor="mobile-search" className="sr-only">Search</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <RiSearchLine className="w-5 h-5 text-gray-500" />
                                                    </div>
                                                    <input type="text" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                                                </div>
                                            </form>
                                        </li>
                                        <li>
                                            <Link href="/admin" >
                                                <span className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
                                                    <RiPieChartFill className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />
                                                    <span className="ml-3">Dashboard</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/addQuiz" >
                                                <span className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
                                                    <RiAddFill className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />
                                                    <span className="ml-3">Add Quiz</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={"/admin/generateQuiz"}>
                                                <span className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
                                                    <BsRobot className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />
                                                    <span className="ml-3">Generate Quizs</span>
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={`w-64 px-3 bg-white dark:bg-black border-t-2  border-gray-700 dark:border-gray-200 bottom-0 space-y-2 pt-2 duration-500  ${!click ? '' : '' }`}>
                                    {/* <div className={`w-64 px-3 bg-white dark:bg-black border-t-2 border-r-2 border-gray-700 dark:border-gray-200 bottom-0 space-y-2 pt-2 duration-500 fixed ${!click && 'relative lg:fixed xl:fixed duration-500'}`}> */}
                                    <span href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group transition duration-75 flex items-center p-2">
                                        <MdOutlineDiamond className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />
                                        <span className="ml-4">Upgrade to Pro</span>
                                    </span>
                                    <span href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group transition duration-75 flex items-center p-2">
                                        <HiDocumentText className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />
                                        <span className="ml-4">Documentation</span>
                                    </span>
                                    <Link href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group transition duration-75 flex items-center p-2">
                                        <MdHelp className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />
                                        <span className="ml-4">Help</span>
                                    </Link>
                                    <div className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group transition duration-75 flex items-center p-2">
                                        <ThemeChanger >
                                            Theme
                                        </ThemeChanger>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"></div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout