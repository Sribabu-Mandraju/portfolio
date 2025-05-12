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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col gap-3">
              {/* Page Header */}
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <span className="text-cyan-400">root@system</span>
                  <span className="text-gray-400">:</span>
                  <span className="text-green-400">~</span>
                  <span className="text-gray-400">$</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getBreadcrumbItems().map((item, index) => (
                    <React.Fragment key={item.path}>
                      <span className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                        {item.name}
                      </span>
                      {index < getBreadcrumbItems().length - 1 && (
                        <span className="text-gray-400">/</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
