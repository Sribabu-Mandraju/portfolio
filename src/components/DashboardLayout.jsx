import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [typedPath, setTypedPath] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [breadcrumbAnimation, setBreadcrumbAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Typing effect for current path
  useEffect(() => {
    const currentPath = location.pathname === "/" ? "/home" : location.pathname;
    setTypedPath("");
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < currentPath.length) {
        setTypedPath(currentPath.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [location.pathname]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Breadcrumb animation on route change
  useEffect(() => {
    setBreadcrumbAnimation(true);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setBreadcrumbAnimation(false);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const getBreadcrumbItems = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    if (paths.length === 0) {
      return [{ name: "home", path: "/", isActive: true }];
    }
    
    return [
      { name: "home", path: "/", isActive: false },
      ...paths.map((path, index) => ({
        name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        path: "/" + paths.slice(0, index + 1).join("/"),
        isActive: index === paths.length - 1
      }))
    ];
  };

  const handleBreadcrumbClick = useCallback((path) => {
    if (path !== location.pathname) {
      setIsLoading(true);
      // Here you would typically use navigate(path) from react-router-dom
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [location.pathname]);

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full relative">
        {/* Navbar */}
        <div className="sticky top-0 z-50">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black relative mt-[-40px]">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
            <div className="flex flex-col gap-2 sm:gap-3">
              {/* Enhanced Terminal Header */}
              <div className="sticky top-[64px] z-20 bg-black/98 backdrop-blur-md py-3 border border-green-500/20 rounded-lg shadow-lg">
                <div className="px-3 sm:px-4">
                  {/* Terminal Window Controls */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-green-500/10">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <div className="text-xs font-mono text-green-400/60 hidden sm:block">
                      terminal@dashboard
                    </div>
                  </div>

                  {/* Terminal Prompt */}
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm font-mono">
                    <div className="flex items-center text-green-400 whitespace-nowrap">
                      <span className="text-green-500 font-bold">root@5R1B4BU</span>
                      <span className="text-green-400">:</span>
                      <span className="text-blue-400">~</span>
                      <span className="text-green-400">$</span>
                    </div>
                    
                    {/* Command with typing effect */}
                    <div className="flex items-center gap-1 text-cyan-400">
                      <span>cd</span>
                      <span className="text-white/90">{typedPath}</span>
                      {showCursor && <span className="text-green-400 animate-pulse">|</span>}
                    </div>
                  </div>

                  {/* Enhanced Breadcrumb Navigation */}
                  <div className={`
                    mt-3 transition-all duration-300
                    ${breadcrumbAnimation ? 'transform translate-x-2 opacity-70' : 'transform translate-x-0 opacity-100'}
                  `}>
                    <div className="flex items-center gap-1 text-xs text-green-500/80 mb-2 font-mono">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                      </svg>
                      <span>Navigation Path:</span>
                    </div>
                    
                    <div className="flex items-center gap-1 flex-wrap">
                      {breadcrumbItems.map((item, index) => (
                        <React.Fragment key={item.path}>
                          <button
                            onClick={() => handleBreadcrumbClick(item.path)}
                            disabled={isLoading || item.isActive}
                            className={`
                              relative px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200
                              border backdrop-blur-sm group
                              ${item.isActive 
                                ? 'bg-green-500/20 text-green-300 border-green-500/40 shadow-lg cursor-default' 
                                : 'bg-gray-900/50 text-green-400/80 border-green-500/20 hover:bg-green-500/10 hover:text-green-300 hover:border-green-500/30 cursor-pointer'
                              }
                              ${isLoading ? 'animate-pulse' : ''}
                            `}
                            style={{animationDelay: `${index * 0.1}s`}}
                          >
                            {/* Icon */}
                            <span className="inline-flex items-center gap-1">
                              {index === 0 ? (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                </svg>
                              ) : (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                              )}
                              <span>{item.name}</span>
                            </span>

                            {/* Active indicator */}
                            {item.isActive && (
                              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                            )}

                            {/* Hover effect */}
                            {!item.isActive && (
                              <div className="absolute inset-0 bg-green-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                            )}
                          </button>

                          {/* Separator */}
                          {index < breadcrumbItems.length - 1 && (
                            <svg 
                              className="w-3 h-3 text-green-500/60 animate-pulse mx-1" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Command output simulation */}
                    <div className="mt-2 text-green-400/60 text-xs font-mono">
                      <span>→ Directory changed successfully</span>
                      <span className="ml-2 text-green-500">
                        [{new Date().toLocaleTimeString()}]
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-black rounded-lg shadow-lg border border-green-500/20 p-3 sm:p-6 relative overflow-hidden">
                {/* Loading Overlay */}
                {isLoading && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                    <div className="flex items-center space-x-2 text-green-400">
                      <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-mono text-sm">Loading...</span>
                    </div>
                  </div>
                )}

                {/* Enhanced Background Gradient Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                
                {/* Scanning line effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent animate-scan"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10">{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;