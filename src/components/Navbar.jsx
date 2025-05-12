import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import {
  FaBars,
  FaMagnifyingGlass,
  FaBell,
  FaSun,
  FaMoon,
  FaUser,
  FaGear,
  FaCircleQuestion,
  FaRightFromBracket,
  FaTerminal,
  FaLinux,
  FaCode,
  FaServer,
} from "react-icons/fa6";

const Navbar = ({ onMenuClick }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-10 bg-gray-900 dark:bg-black border-b border-green-500/20">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg text-green-400 hover:bg-green-900/20 hover:text-green-300 border border-transparent hover:border-green-500/30 transition-all duration-300"
              aria-label="Menu"
            >
              <FaBars className="w-5 h-5" />
            </button>

            {/* Search bar */}
            <div className="hidden md:block relative group">
              <input
                type="text"
                placeholder="> Search..."
                className="w-72 px-4 py-2 pl-10 rounded-lg 
                  bg-gray-800 dark:bg-black
                  text-green-400 dark:text-green-400 
                  placeholder-green-500/50
                  border border-green-500/30
                  focus:outline-none focus:ring-2 focus:ring-green-500/50
                  transition-all duration-300"
              />
              <div className="absolute left-3 top-2.5 text-green-500/50 group-hover:text-green-400 transition-colors duration-300">
                <FaMagnifyingGlass className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* System Status */}
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-green-900/20 border border-green-500/30">
              <div className="flex items-center gap-2 text-green-400 text-sm font-mono">
                <FaLinux className="w-4 h-4" />
                <span>System</span>
              </div>
              <div className="h-4 w-px bg-green-500/30"></div>
              <div className="text-green-500/70 text-sm font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>

            {/* Theme Toggle */}
          
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
