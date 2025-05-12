import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "../constants/navigation";
import { FaChevronDown } from "react-icons/fa6";

const MenuItem = ({ item, isActive, isOpen, onToggle }) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const location = useLocation();
  const Icon = item.icon;

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-lg
          transition-colors duration-150 ease-in-out
          ${
            isActive
              ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }
        `}
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5" />
          <span className="ml-3 font-medium">{item.title}</span>
        </div>
        {hasSubItems && (
          <FaChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Submenu */}
      {hasSubItems && isOpen && (
        <div className="mt-1 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
          {item.subItems.map((subItem) => {
            const SubIcon = subItem.icon;
            return (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                  transition-colors duration-150 ease-in-out
                  ${
                    location.pathname === subItem.path
                      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                <SubIcon className="w-4 h-4" />
                {subItem.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState(() => {
    // Initialize with open state for the active menu
    const activeMenu = menuItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    return activeMenu ? { [activeMenu.title]: true } : {};
  });

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-30
          h-screen w-64 
          bg-white dark:bg-gray-800 
          border-r border-gray-200 dark:border-gray-700
          transition-transform duration-200
          lg:translate-x-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            <span className="text-green-500 dark:text-green-400">Hacker</span>
            Dash
          </span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <MenuItem
              key={item.title}
              item={item}
              isActive={location.pathname.startsWith(item.path)}
              isOpen={openMenus[item.title]}
              onToggle={() => toggleMenu(item.title)}
            />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <span>v1.0.0</span>
            <span>•</span>
            <a
              href="#"
              className="hover:text-green-500 dark:hover:text-green-400"
            >
              Docs
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
