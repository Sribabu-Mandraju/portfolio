import React, { useState } from "react";
import {
  FaEthereum,
  FaShieldHalved,
  FaBug,
  FaTriangleExclamation,
  FaMagnifyingGlass,
  FaCode,
  FaArrowRight,
  FaClock,
  FaCircleCheck,
  FaLink,
} from "react-icons/fa6";

const Web3Security = () => {
  // Sample audit data
  const audits = [
    {
      title: "DeFi Lending Protocol Audit",
      protocol: "LendingDAO",
      date: "2024-03-15",
      severity: "Critical",
      findings: 3,
      status: "Completed",
      description:
        "Smart contract security audit of a decentralized lending protocol with flash loan capabilities.",
      tags: ["DeFi", "Lending", "Flash Loans"],
      chain: "Ethereum",
      icon: FaEthereum,
    },
    {
      title: "NFT Marketplace Vulnerability Assessment",
      protocol: "PixelVerse",
      date: "2024-03-10",
      severity: "High",
      findings: 2,
      status: "Fixed",
      description:
        "Security assessment of NFT trading smart contracts and marketplace implementation.",
      tags: ["NFT", "Marketplace", "ERC721"],
      chain: "Polygon",
      icon: FaCode,
    },
    {
      title: "Yield Farming Protocol Review",
      protocol: "YieldMaster",
      date: "2024-03-05",
      severity: "Medium",
      findings: 4,
      status: "In Progress",
      description:
        "Comprehensive review of yield optimization strategies and reward distribution mechanisms.",
      tags: ["Yield", "Farming", "Staking"],
      chain: "BSC",
      icon: FaShieldHalved,
    },
  ];

  const getSeverityStyles = (severity) => {
    const baseStyles = "px-2 py-1 rounded-md text-xs font-semibold";
    switch (severity.toLowerCase()) {
      case "critical":
        return `${baseStyles} bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400`;
      case "high":
        return `${baseStyles} bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400`;
      case "medium":
        return `${baseStyles} bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400`;
      default:
        return `${baseStyles} bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400`;
    }
  };

  const getStatusStyles = (status) => {
    const baseStyles = "flex items-center gap-1.5 text-xs font-medium";
    switch (status.toLowerCase()) {
      case "completed":
        return `${baseStyles} text-green-600 dark:text-green-400`;
      case "in progress":
        return `${baseStyles} text-blue-600 dark:text-blue-400`;
      case "fixed":
        return `${baseStyles} text-purple-600 dark:text-purple-400`;
      default:
        return `${baseStyles} text-gray-600 dark:text-gray-400`;
    }
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
          Web3 Security Audits
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Comprehensive smart contract security assessments and vulnerability
          reports
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg">
              <FaBug className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                24
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Audits
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg">
              <FaTriangleExclamation className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                156
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vulnerabilities Found
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg">
              <FaCircleCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                $12M
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Funds Secured
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search audits..."
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 pl-12"
          />
          <FaMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
        </div>
      </div>

      {/* Audit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {audits.map((audit, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg border border-green-200 dark:border-green-800/50">
                  <audit.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <span className={getSeverityStyles(audit.severity)}>
                  {audit.severity}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {audit.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {audit.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {audit.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <FaClock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {audit.date}
                  </span>
                </div>
                <span className={getStatusStyles(audit.status)}>
                  <FaCircleCheck className="w-4 h-4" />
                  {audit.status}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 border-t border-gray-100 dark:border-gray-700">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 text-white rounded-lg hover:from-green-600 hover:to-green-700 dark:hover:from-green-500 dark:hover:to-green-600 transition-all duration-300 group">
                View Full Report
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Web3Security;
