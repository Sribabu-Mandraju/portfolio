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
  FaFilter,
} from "react-icons/fa6";

const Web3Security = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("all");

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
    const baseStyles =
      "px-3 py-1.5 rounded-md text-xs font-mono font-bold tracking-wider";
    switch (severity.toLowerCase()) {
      case "critical":
        return `${baseStyles} bg-red-500/10 text-red-400 border border-red-500/20`;
      case "high":
        return `${baseStyles} bg-orange-500/10 text-orange-400 border border-orange-500/20`;
      case "medium":
        return `${baseStyles} bg-yellow-500/10 text-yellow-400 border border-yellow-500/20`;
      default:
        return `${baseStyles} bg-blue-500/10 text-blue-400 border border-blue-500/20`;
    }
  };

  const getStatusStyles = (status) => {
    const baseStyles = "flex items-center gap-1.5 text-xs font-mono font-bold";
    switch (status.toLowerCase()) {
      case "completed":
        return `${baseStyles} text-green-400`;
      case "in progress":
        return `${baseStyles} text-blue-400`;
      case "fixed":
        return `${baseStyles} text-purple-400`;
      default:
        return `${baseStyles} text-gray-400`;
    }
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
      {/* Header Section */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-lg blur-3xl"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
          Web3 Security Audits
        </h1>
        <p className="mt-3 text-gray-400 font-mono relative">
          Comprehensive smart contract security assessments and vulnerability
          reports
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <FaBug className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-mono font-bold text-green-400">
                24
              </h3>
              <p className="text-sm text-gray-400 font-mono">Total Audits</p>
            </div>
          </div>
        </div>
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <FaTriangleExclamation className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-mono font-bold text-green-400">
                156
              </h3>
              <p className="text-sm text-gray-400 font-mono">
                Vulnerabilities Found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audits..."
            className="w-full px-4 py-3 rounded-xl bg-black/50 backdrop-blur-sm border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 pl-12 text-gray-300 font-mono placeholder-gray-500"
          />
          <FaMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-3 rounded-xl bg-black/50 backdrop-blur-sm border border-green-500/20 text-gray-300 font-mono hover:border-green-500/40 transition-all duration-300 flex items-center gap-2">
            <FaFilter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Audit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {audits.map((audit, index) => (
          <div
            key={index}
            className="group bg-black/50 backdrop-blur-sm rounded-xl border border-green-500/20 overflow-hidden hover:border-green-500/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <audit.icon className="w-6 h-6 text-green-400" />
                </div>
                <span className={getSeverityStyles(audit.severity)}>
                  {audit.severity}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-mono font-bold text-green-400 mb-2">
                {audit.title}
              </h3>
              <p className="text-sm text-gray-400 font-mono mb-4">
                {audit.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {audit.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-green-500/20">
                <div className="flex items-center gap-2">
                  <FaClock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-400 font-mono">
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
            <div className="px-6 py-4 bg-black/30 border-t border-green-500/20">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-all duration-300 group font-mono">
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
