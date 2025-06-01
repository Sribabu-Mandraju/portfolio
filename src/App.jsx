import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import HomePage from "./pages/home/HomePage";
import "./index.css";
import Web3_SecurityPage from "./pages/writeups/web3_security/Web3_SecurityPage";
import Explantion from "./pages/writeups/web3_security/Explantion";
import DashboardLayout from "./components/DashboardLayout";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Projects from "./components/projects/Projects";
import StakingRewardsBlog from "./pages/blogs/StakeReward";
const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/writeups/web3-security"
                element={<Web3_SecurityPage />}
              />
              <Route path="/navbar" element={<Navbar />} />
              <Route
                path="/writeups/web3-security/:id"
                element={<Explantion />}
              />
              <Route path="/projects" element={<Projects />} />
              <Route
                path="/blogs/stake-reward"
                element={<StakingRewardsBlog />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </DashboardLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
