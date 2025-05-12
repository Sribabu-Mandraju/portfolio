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

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
      title: "DeFi Portfolio Tracker",
      description:
        "A comprehensive DeFi portfolio tracking application with real-time price updates and yield analytics.",
      category: "web3",
      tags: ["React", "Ethereum", "Web3.js"],
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop&q=60",
      github: "https://github.com/yourusername/defi-tracker",
      live: "https://defi-tracker.example.com",
      stats: {
        stars: 128,
        forks: 45,
        views: 1200,
      },
      impact: "Helped users track over $1M in DeFi assets",
      techStack: ["React", "Ethereum", "Web3.js", "Chart.js", "TailwindCSS"],
    },
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with real-time inventory management and payment processing.",
      category: "web",
      tags: ["Next.js", "Node.js", "MongoDB"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60",
      github: "https://github.com/yourusername/ecommerce",
      live: "https://ecommerce.example.com",
      stats: {
        stars: 256,
        forks: 89,
        views: 2500,
      },
      impact: "Processed over 10,000 transactions",
      techStack: ["Next.js", "Node.js", "MongoDB", "Redis", "Docker"],
    },
    {
      title: "NFT Marketplace",
      description:
        "A decentralized NFT marketplace with minting capabilities and auction system.",
      category: "web3",
      tags: ["Solidity", "React", "IPFS"],
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60",
      github: "https://github.com/yourusername/nft-marketplace",
      live: "https://nft-marketplace.example.com",
      stats: {
        stars: 342,
        forks: 156,
        views: 3800,
      },
    },
    {
      title: "Mobile Task Manager",
      description:
        "A cross-platform mobile application for task management with offline support.",
      category: "mobile",
      tags: ["React Native", "Redux", "Firebase"],
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60",
      github: "https://github.com/yourusername/task-manager",
      live: "https://task-manager.example.com",
      stats: {
        stars: 189,
        forks: 67,
        views: 1800,
      },
    },
    {
      title: "API Gateway Service",
      description:
        "A scalable API gateway service with rate limiting and authentication.",
      category: "backend",
      tags: ["Node.js", "Redis", "Docker"],
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
      github: "https://github.com/yourusername/api-gateway",
      live: "https://api-gateway.example.com",
      stats: {
        stars: 156,
        forks: 45,
        views: 1500,
      },
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
    <div className="p-4 mx-auto max-w-7xl font-mono">
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                transition-all duration-300 transform hover:scale-105
                ${
                  activeCategory === category.id
                    ? "bg-green-900/50 text-green-400 border border-green-500/30"
                    : "bg-gray-900 text-gray-400 border border-gray-700 hover:bg-gray-800 hover:text-green-400"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="mb-8">
        <div className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="> Search projects..."
            className="w-full px-6 py-3 rounded-md bg-gray-900 
              border border-green-500/30 text-green-400
              focus:outline-none focus:ring-2 focus:ring-green-500/50 
              pl-14 pr-6 shadow-lg group-hover:shadow-xl transition-all duration-300
              placeholder-green-500/50"
          />
          <FaMagnifyingGlass
            className="absolute left-5 top-1/2 transform -translate-y-1/2 
            text-green-500/50 w-5 h-5 
            group-hover:text-green-400 
            transition-colors duration-300"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse bg-gray-800 rounded-xl h-40 w-full" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="relative bg-gray-900 dark:bg-black rounded-xl shadow-lg border border-green-500/20 
                  overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]
                  h-full flex flex-col"
                >
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <FaLinux className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <h3 className="text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors truncate">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {(project.techStack || project.tags).map(
                          (tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs font-medium rounded-md bg-green-900/50 
                              text-green-400 border border-green-500/30
                              group-hover:bg-green-800/50 
                              group-hover:text-green-300
                              group-hover:border-green-400/50
                              transition-all duration-300"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {project.impact && (
                      <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/30 mb-4">
                        <div className="flex items-center gap-2">
                          <FaBug className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-green-400 line-clamp-2">
                            {project.impact}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-auto pt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-green-400 rounded-md border border-green-500/30 hover:bg-green-900/50 hover:text-green-300 hover:border-green-400/50 transform hover:scale-105 transition-all duration-300 text-sm"
                      >
                        <FaGithub className="w-4 h-4 flex-shrink-0" />
                        GitHub
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-900/50 text-green-400 rounded-md border border-green-500/30 hover:bg-green-800/50 hover:text-green-300 hover:border-green-400/50 transform hover:scale-105 transition-all duration-300 text-sm"
                      >
                        <FaTerminal className="w-4 h-4 flex-shrink-0" />
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Projects;
