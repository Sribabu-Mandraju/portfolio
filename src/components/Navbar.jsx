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

            {/* Logo - Now visible on mobile */}
            <div className="flex items-center md:hidden space-x-3">
              <div className="p-2 rounded-lg bg-green-900/30 border border-green-500/30">
                <FaLinux className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-mono text-green-400">
                  sribabu@5R1B4BU
                </span>
                <span className="text-xs text-green-500/70 font-mono hidden sm:block">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Search bar */}
           <div className="hidden md:block relative group">
  <input
    type="text"
    placeholder="Search..."
    className="w-80 px-5 py-2.5 pl-12 rounded-lg
      bg-gradient-to-br from-gray-800 to-black
      text-green-400 placeholder-green-500/50
      border border-green-500/30
      shadow-md shadow-green-500/10
      focus:outline-none focus:ring-2 focus:ring-green-500/60 focus:ring-offset-2 focus:ring-offset-gray-900
      transition-all duration-300 ease-in-out
      group-hover:shadow-lg group-hover:shadow-green-500/20
      placeholder:transition-all placeholder:duration-300 focus:placeholder:text-green-500/70"
  />
  <div className="absolute left-4 top-3.5 text-green-500/50 group-hover:text-green-400 transition-colors duration-300 ease-in-out">
    <FaMagnifyingGlass className="w-5 h-5 group-hover:scale-110 transform transition-transform duration-300" />
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
