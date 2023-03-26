import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {BiSun} from 'react-icons/bi'
import {BsMoonFill} from 'react-icons/bs'

const ThemeChanger = ({children}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center">
      {theme === "dark" ? (
        <button
          onClick={() => setTheme("light")}
          className="text-gray-300 flex items-center gap-4 rounded-full outline-none focus:outline-none">
          <span className="sr-only">Light Mode</span>
          <span><BiSun className='w-5 h-5' size={24}/></span>
          <span>
          {children? "Light " : ""}
          </span>
        </button>
      ) : (
        <button
          onClick={() => setTheme("dark")}
          className="text-gray-500 flex items-center gap-4 rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20">
          <span className="sr-only">Dark Mode</span>
          <span><BsMoonFill className='w-5 h-5'size={24}/></span>
          <span >
          {children? "Dark " : ""}
          </span>
        </button>
      )}
    </div>
  );
};

export default ThemeChanger;
