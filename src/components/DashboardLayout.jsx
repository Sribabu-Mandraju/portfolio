import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    return paths.map((path, index) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1),
      path: "/" + paths.slice(0, index + 1).join("/"),
    }));
  };

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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black relative">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
            <div className="flex flex-col gap-2 sm:gap-3">
              {/* Page Header - Fixed Position */}
              <div className="sticky top-[64px] z-40 bg-black/95 backdrop-blur-sm py-2">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <div className="flex items-center font-mono font-bold text-green-400 whitespace-nowrap">
                    <span className="text-green-500">root@5R1B4BU</span>
                    <span className="text-green-400">:</span>
                    <span className="text-green-400">~</span>
                    <span className="text-green-400">$</span>
                  </div>
                  <div className="flex items-center font-mono font-bold gap-1 sm:gap-2 flex-wrap">
                    {getBreadcrumbItems().map((item, index) => (
                      <React.Fragment key={item.path}>
                        <span className="text-green-400 hover:text-green-300 transition-colors duration-200">
                          {item.name}
                        </span>
                        {index < getBreadcrumbItems().length - 1 && (
                          <span className="text-green-500">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-black rounded-lg shadow-lg border border-green-500/20 p-3 sm:p-6 relative overflow-hidden">
                {/* Background Gradient Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-3xl"></div>

                {/* Content Container */}
                <div className="relative z-10">{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
