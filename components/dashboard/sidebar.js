import React, {  useState } from 'react'
import {
    RiPieChartFill,
    RiArrowDownSLine, 
    RiArrowUpSLine, RiSearchLine,
    RiAddFill
} from 'react-icons/ri'
import { BsRobot } from 'react-icons/bs'
import { CgTemplate } from 'react-icons/cg'
import { HiDocumentText } from 'react-icons/hi'
import { MdHelp, MdOutlineDiamond } from 'react-icons/md'
import Link from 'next/link'
import ThemeChanger from '../DarkSwitch'
const Sidebar = ({click}) => {
    const upperSidebarItems = [
        {
            label: 'Dashboard',
            icon: <RiPieChartFill className='w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />,
            link: '/admin',
        },
        {
            label: 'Add Quiz',
            icon: <RiAddFill className='w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />,
            link: '/admin/addQuiz',
        },
        // {
        //     label: 'Add Quiz Template',
        //     icon: <RiAddFill className='w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />,
        //     link: '/admin/addQuizTemplate',
        // },
        {
            label: 'Generate Quizs',
            icon: <BsRobot className='w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />,
            link: '/admin/generateQuiz',
        },
        {
            label: 'Template',
            icon: <CgTemplate className='w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />,
            link: '/admin/template',
        },
        
    ];
    const [dropClick, setDropClick] = useState({});


    const handleDrop = (index) => {
        setDropClick((prevState) => {
            return { ...prevState, [index]: !prevState[index] };
        });
    };
  return (
    <aside className={`fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col  duration-500 ${!click ? 'w-0 lg:w-64 xl:w-64 duration-500 ' : 'w-64 duration-500'}`}>
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
                                                    <input type="text" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600  block w-full pl-10 p-2.5" placeholder="Search" />
                                                </div>
                                            </form>
                                        </li>
                                        {upperSidebarItems.map((item, index) => (
                                            <li key={index}>
                                                {item.subMenu ? (
                                                    <button onClick={() => handleDrop(index)} className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 focus:outline-none" >
                                                        {item.icon}
                                                        <span className="flex-1 ml-3 text-left whitespace-nowrap" >{item.label}</span>
                                                        {!dropClick[index] ? <RiArrowDownSLine className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' /> : <RiArrowUpSLine className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />}
                                                    </button>
                                                ) : (
                                                    <Link href={item.link}>
                                                        <span className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
                                                            {item.icon}
                                                            <span className="ml-3">{item.label}</span>
                                                        </span>
                                                    </Link>
                                                )}
                                                {item.subMenu && dropClick[index] && (
                                                    <ul className="ml-4">
                                                        {item.subMenu.map((subItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <Link href={subItem.link}>
                                                                    <span className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group">
                                                                        <span className="flex-1 ml-3 text-left whitespace-nowrap" >{subItem.label}</span>
                                                                    </span>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={` bg-white dark:bg-black border-t-2 border-r-2 border-gray-700 dark:border-gray-200 bottom-0 space-y-2 pt-2 duration-500  absolute  ${!click ? 'w-0 lg:w-64 xl:w-64 ' : 'w-64 duration-500 '}`}>
                                    <div className='relative overflow-y-auto'>
                                    
                                    <a href="#" className="text-base ml-3 text-gray-900 font-normal rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group transition duration-75 flex items-center p-2">
                                        <MdOutlineDiamond className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />
                                        <span className="ml-4">Upgrade to Pro</span>
                                    </a>
                                    <a href="#" className="text-base ml-3 text-gray-900 font-normal rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group transition duration-75 flex items-center p-2">
                                        <HiDocumentText className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />
                                        <span className="ml-4">Documentation</span>
                                    </a>
                                    <Link href="/admin/help" className="text-base ml-3 text-gray-900 font-normal rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group transition duration-75 flex items-center p-2">
                                        <MdHelp className='w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white transition duration-75' />
                                        <span className="ml-4">Help</span>
                                    </Link>
                                    <a className="text-base ml-3 text-gray-900 font-normal rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group transition duration-75 flex items-center p-2">
                                        <ThemeChanger >
                                            Theme
                                        </ThemeChanger>
                                    </a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
  )
}
export default Sidebar