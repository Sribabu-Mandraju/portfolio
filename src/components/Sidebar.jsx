import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "../constants/navigation";
import {
  FaChevronDown,
  FaLinux,
  FaTerminal,
  FaCode,
  FaServer,
  FaMobile,
  FaEthereum,
  FaFolder,
  FaFolderOpen,
} from "react-icons/fa6";

const MenuItem = ({ item, isActive, isOpen, onToggle, onClose }) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const location = useLocation();
  const Icon = item.icon;

  const handleClick = () => {
    if (!hasSubItems) {
      onClose(); // Close sidebar when clicking a menu item
    }
  };

  const MenuContent = () => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        {hasSubItems ? (
          isOpen ? (
            <FaFolderOpen className="w-5 h-5 text-green-500" />
          ) : (
            <FaFolder className="w-5 h-5 text-green-500" />
          )
        ) : (
          <Icon className="w-5 h-5 text-green-500" />
        )}
        <span className="ml-3 font-mono text-sm">{item.title}</span>
      </div>
      {hasSubItems && (
        <FaChevronDown
          className={`w-4 h-4 text-green-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      )}
    </div>
  );

  return (
    <div className="mb-2">
      {hasSubItems ? (
        <button
          onClick={onToggle}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-lg
            transition-all duration-300 ease-in-out
            ${
              isActive
                ? "bg-green-900/20 text-green-400 border border-green-500/30"
                : "text-gray-400 hover:bg-gray-800 hover:text-green-400 border border-transparent hover:border-green-500/30"
            }
          `}
        >
          <MenuContent />
        </button>
      ) : (
        <Link
          to={item.path}
          onClick={handleClick}
          className={`
            w-full flex items-center justify-between px-4 py-3 rounded-lg
            transition-all duration-300 ease-in-out
            ${
              isActive
                ? "bg-green-900/20 text-green-400 border border-green-500/30"
                : "text-gray-400 hover:bg-gray-800 hover:text-green-400 border border-transparent hover:border-green-500/30"
            }
          `}
        >
          <MenuContent />
        </Link>
      )}

      {hasSubItems && isOpen && (
        <div className="mt-1 ml-4 pl-4 border-l border-green-500/20">
          {item.subItems.map((subItem) => {
            const SubIcon = subItem.icon;
            const isSubItemActive = location.pathname === subItem.path;
            return (
              <Link
                key={subItem.path}
                to={subItem.path}
                onClick={onClose}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                  transition-all duration-300 ease-in-out
                  ${
                    isSubItemActive
                      ? "text-green-400 bg-green-900/20 border border-green-500/30"
                      : "text-gray-400 hover:bg-gray-800 hover:text-green-400 border border-transparent hover:border-green-500/30"
                  }
                `}
              >
                <SubIcon className="w-4 h-4 text-green-500" />
                <span className="font-mono">{subItem.title}</span>
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
  const [openMenus, setOpenMenus] = useState({});
  const [currentPath, setCurrentPath] = useState("~/portfolio");

  useEffect(() => {
    // Update current path based on location
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      setCurrentPath(`~/portfolio/${pathSegments.join("/")}`);
    } else {
      setCurrentPath("~/portfolio");
    }

    // Find and open the active menu
    const activeMenu = menuItems.find((item) => {
      if (item.path === "/") {
        return location.pathname === "/";
      }
      return location.pathname.startsWith(item.path) && item.path !== "/";
    });

    if (activeMenu) {
      setOpenMenus((prev) => ({
        ...prev,
        [activeMenu.title]: true,
      }));
    }
  }, [location.pathname]);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-20 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-30
          h-screen w-72 
          bg-gray-900 dark:bg-black
          border-r border-green-500/20
          transition-all duration-300
          lg:translate-x-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          overflow-hidden
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-green-500/20 bg-gradient-to-r from-green-900/20 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-900/30 border border-green-500/30">
                <FaLinux className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-mono text-green-400">
                  sribabu@5R1B4BU
                </span>
                <span className="text-xs text-green-500/70 font-mono">
                  {currentPath}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-500/20 scrollbar-track-transparent">
            <div className="mb-6">
              <div className="px-4 py-2 bg-green-900/20 rounded-lg border border-green-500/30">
                <div className="flex items-center gap-2 text-green-400 text-sm font-mono">
                  <FaTerminal className="w-4 h-4" />
                  <span>Navigation</span>
                  <span className="ml-auto text-xs text-green-500/70">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {menuItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path) &&
                    item.path !== "/";

              return (
                <MenuItem
                  key={item.title}
                  item={item}
                  isActive={isActive}
                  isOpen={openMenus[item.title]}
                  onToggle={() => toggleMenu(item.title)}
                  onClose={onClose}
                />
              );
            })}
          </div>

          <div className="border-t border-green-500/20 p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-green-500/70 font-mono">
                <FaTerminal className="w-4 h-4" />
                <span>v1.0.0</span>
              </div>
              <a
                href="#"
                className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-300"
              >
                $ ./docs.sh
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
