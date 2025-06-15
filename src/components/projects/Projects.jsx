import React, { useState, useEffect } from "react";
import {
  FaCode,
  FaEthereum,
  FaMobile,
  FaServer,
  FaMagnifyingGlass,
  FaGithub,
  FaTerminal,
  FaLinux,
  FaBug,
} from "react-icons/fa6";

import az from "../../assets/images/azlogistics.png"
import futurax from "../../assets/images/futurax.png"
import karunyasetu from "../../assets/images/karunyasetu.png"
import livebreak from "../../assets/images/liveBreak.png"
import meebuddy from "../../assets/images/meebuddy.png"
import rvsLabs from "../../assets/images/rvsLabs.png"
import tz from "../../assets/images/tz.png"
import tz_admin from "../../assets/images/tz_admin.png"

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle mouse movement for interactive background
  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const categories = [
    {
      id: "all",
      name: "All Projects",
      icon: FaTerminal,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "web3",
      name: "Web3",
      icon: FaEthereum,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "web",
      name: "Web Apps",
      icon: FaCode,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: FaMobile,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "backend",
      name: "Backend",
      icon: FaServer,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const projects = [
    {
      title: "Teckzite2k25 Official Website",
      description:
        "A dynamic platform for Teckzite, the annual National Techno-management fest at RGUKT Nuzvid. Built with the MERN stack, featuring Google Authentication, Razorpay payment gateway, and a custom admin panel for managing events and participants.",
      category: "web",
      tags: ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
      image:
        tz,
      github: {
        frontend: "https://github.com/siddhuthecoder/teckzite24",
        backend: "https://github.com/Sribabu-Mandraju/teckzite-backend",
      },
      live: "https://teckzite.vercel.app",
      impact:
        "Enabled 1,000+ participants to register and manage event activities.",
      techStack: [
        "MERN Stack",
        "Razorpay",
        "Google Auth",
        "TailwindCSS",
        "AWS",
      ],
    },
    {
      title: "Mee Buddy",
      description:
        "A commercial ad-slot booking portal for Mee24News, allowing users and reporters to buy regional ad spaces across AP and Telangana with real-time pricing and secure payments.",
      category: "web",
      tags: ["React", "Node.js", "MongoDB", "Express.js"],
      image:
        meebuddy,
      github: {
        frontend: "https://github.com/Sribabu-Mandraju/meenews-frontend",
        backend: "https://github.com/Sribabu-Mandraju/meenews-backend",
      },
      live: "https://meebuddy.com/",
      impact: "Streamlined regional ad-slot purchases for over 100 reporters.",
      techStack: ["MERN Stack", "Payment Gateway", "Role-based Dashboard"],
    },
    {
      title: "AZLogic Solutions",
      description:
        "Landing page for a digital solutions company, built with engaging UI/UX and Framer Motion for smooth animations.",
      category: "web",
      tags: ["React", "Framer Motion", "TailwindCSS"],
      image:
        az,
      github: "https://github.com/Sribabu-Mandraju/azlogic-solutions",
      live: "https://mee-code-x.vercel.app/ ",
      impact:
        "Improved conversion with a visually appealing and modern interface.",
      techStack: ["React", "TailwindCSS", "Framer Motion"],
    },
    {
      title: "Livebreak App and website",
      description:
        "A local news app for real time updates and have realtime feedbacks and instaneous news from reporters",
      category: "mobile",
      tags: ["Ionic", "Angular", "Node.js", "MongoDB", "React"],
      image:
        livebreak,
      live: "https://live-break-kappa.vercel.app/",
      impact: "Empowered rural users with digital news access.",
      techStack: ["Angular", "Ionic", "MongoDB", "TailwindCSS"],
    },
    {
      title: "MeeBuddy App and Website",
      description:
        "An eCommerce platform tailored for rural India, featuring cross-platform app functionality with Ionic and Angular. Worked on major UI improvements and backend features.",
      category: "mobile",
      tags: ["Ionic", "Angular", "Node.js", "MongoDB"],
      image:
        meebuddy,
      live: "https://meebuddy.in",
      impact: "Empowered rural users with digital commerce access.",
      techStack: ["Angular", "Ionic", "MongoDB", "TailwindCSS"],
    },
    {
      title: "Teckzite2k25 Admin Panel",
      description:
        "An admin panel to maintain and send real time updates by the coordinators of teckzite monitoring registrations for the event and analysing statistics and trafic from users",
      category: "web",
      tags: ["React", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
      image:
        tz_admin,
      github: {
        frontend: "https://github.com/Sribabu-Mandraju/teckzite-frontend",
        backend: "https://github.com/Sribabu-Mandraju/teckzite-backend",
      },
      live: "https://teckzite.vercel.app",
      impact:
        "Enabled 1,000+ participants to register and manage event activities.",
      techStack: [
        "MERN Stack",
        "Razorpay",
        "Google Auth",
        "TailwindCSS",
        "AWS",
      ],
    },
    {
      title: "Futurax",
      description:
        "A decentralized prediction platform where users stake crypto on real-world events. Utilizes smart contracts for fair and tamper-proof outcomes.",
      category: "web3",
      tags: ["Solidity", "React", "Blockchain", "Web3"],
      image:
        futurax,
      github: "https://github.com/Sribabu-Mandraju/futurax",
      live: "https://future-x-ulpg.vercel.app/",
      impact:
        "Enabled transparent prediction markets with secure crypto staking.",
      techStack: ["Solidity", "React", "Ethers.js", "Smart Contracts"],
    },
    {
      title: "Karunyasetu Dapp",
      description:
        "A blockchain-based disaster relief system offering instant, transparent aid distribution. Features multilingual AI chatbots and decentralized verification.",
      category: "web3",
      tags: ["Solidity", "Smart Contracts", "Web3", "AI Chatbot"],
      image:
        karunyasetu,
      github: "https://github.com/Sribabu-Mandraju/karunyasetu",
      live: "https://karunyasethu.vercel.app/",
      impact:
        "Restored trust in relief distribution during crises using blockchain.",
      techStack: ["Solidity", "React", "IPFS", "ChatGPT", "Smart Contracts"],
    },
    {
      title: "Decentralized TimeLock Deposit",
      description:
        "An ERC721-based staking system where users lock USDT to mint NFTs representing time-locked deposits with fixed ROI.",
      category: "web3",
      tags: ["Solidity", "React", "Blockchain", "Web3", "base-mainnet"],
      image:
        rvsLabs,
      github: "https://github.com/Sribabu-Mandraju/rvs_labs",
      live: "https://www.rvrlabs.xyz",
      impact:
        "Enabled transparent prediction markets with secure crypto staking.",
      techStack: [
        "Solidity",
        "React",
        "Node.js",
        "Ethers.js",
        "Smart Contracts",
      ],
    },
  ];

  const filteredProjects = projects
    .filter(
      (project) =>
        activeCategory === "all" || project.category === activeCategory
    )
    .filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

  return (
    <div
      className="min-h-screen bg-black relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 p-4 md:p-6 max-w-7xl mx-auto font-mono">
        {/* Categories Section */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 md:mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-300 transform hover:scale-105 mt-4 md:mt-0
              ${
                activeCategory === category.id
                  ? "bg-green-900/20 text-green-400 border border-green-400/30 shadow-md"
                  : "bg-black text-gray-400 border border-gray-800 hover:bg-green-900/10 hover:text-green-400 hover:border-green-500/30"
              }
            `}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="mb-6 md:mb-8">
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="> Search projects..."
              className="w-full px-6 py-3 rounded-lg bg-black 
            border border-green-500/30 text-green-400 placeholder-green-500/40
            focus:outline-none focus:ring-2 focus:ring-green-500/50 
            pl-14 pr-6 shadow-md group-hover:shadow-lg transition-all duration-300"
            />
            <FaMagnifyingGlass
              className="absolute left-5 top-1/2 transform -translate-y-1/2 
          text-green-500/50 w-5 h-5 group-hover:text-green-400 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="animate-pulse bg-black rounded-xl h-40 w-full border border-green-500/20" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const category = categories.find(
                (cat) => cat.id === project.category
              );
              const isHovered = hoveredProject === index;

              return (
                <div
                  key={index}
                  className="relative group font-mono h-full"
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div
                    className={`
                  absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10
                  transition-opacity duration-300 rounded-xl
                `}
                  />

                  <div
                    className="relative bg-black/80 backdrop-blur-sm rounded-xl shadow-lg border border-green-500/20 
                overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]
                h-full flex flex-col"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    </div>

                    <div className="p-5 md:p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <FaLinux className="w-5 h-5 text-green-500" />
                        <h3 className="text-lg md:text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors truncate">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-sm text-green-500/70 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {(project.techStack || project.tags).map(
                            (tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs font-medium rounded bg-black 
                          text-green-400 border border-green-500/30
                          group-hover:bg-green-900/20 
                          group-hover:text-green-300 group-hover:border-green-400/50
                          transition-all duration-300"
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {project.impact && (
                        <div className="p-3 bg-black rounded-lg border border-green-500/30 mb-4">
                          <div className="flex items-center gap-2">
                            <FaBug className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-400 line-clamp-2">
                              {project.impact}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
                        {project.github && (
                          <a
                            href={
                              typeof project.github === "string"
                                ? project.github
                                : project.github.frontend
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-green-400 rounded-lg border border-green-500/30 hover:bg-green-900/20 hover:text-green-300 hover:border-green-400/50 transform hover:scale-105 transition-all duration-300 text-sm"
                          >
                            <FaGithub className="w-4 h-4" />
                            GitHub
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-green-400 rounded-lg border border-green-500/30 hover:bg-green-900/20 hover:text-green-300 hover:border-green-400/50 transform hover:scale-105 transition-all duration-300 text-sm"
                          >
                            <FaTerminal className="w-4 h-4" />
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
