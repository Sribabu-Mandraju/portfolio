import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaPen,
  FaFlag,
  FaCode,
  FaEthereum,
  FaBug,
  FaShieldHalved,
  FaTerminal,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaDatabase,
  FaServer,
  FaNetworkWired,
  FaLock,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaLinux,
  FaPython,
  FaJs,
  FaHtml5,
  FaCss3,
  FaGitAlt,
  FaNpm,
  FaWallet,
  FaChartLine,
  FaHammer,
  FaMobile,
} from "react-icons/fa6";
import myProfile from "../../assets/my_profile.png";

// Typing effect component for terminal-style typing
const TypingEffect = ({ text, speed = 30 }) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const type = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
        setTimeout(type, speed);
      }
    };
    type();
    const cursorInterval = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(cursorInterval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      <span
        className={`inline-block w-2 ${showCursor ? "bg-green-400" : ""}`}
        style={{ height: "1em", verticalAlign: "bottom" }}
      >
        &nbsp;
      </span>
    </span>
  );
};

// Live Terminal Section
const terminalCommands = {
  help: {
    output: [
      "Available commands:",
      "whoami   - About the developer",
      "skills   - List of skills",
      "contact  - How to reach out",
      "clear    - Clear the terminal",
      "social   - Social links",
      "exp      - Work experience",
    ],
  },
  whoami: {
    output: [
      "I'm Sribabu Mandraju, a Full Stack Developer with expertise in Web3, Blockchain, and Cross-platform Development.",
      "Currently pursuing B.Tech in CSE at RGUKT Nuzvid with a CGPA of 8.4/10.",
      "Passionate about building innovative solutions using cutting-edge technologies.",
    ],
  },
  skills: {
    output: [
      "Programming Languages: C, Java, Python, JavaScript, TypeScript, SQL",
      "Frontend: React, Next.js, Angular, TailwindCSS, Bootstrap, Material-UI",
      "Mobile: React Native, Ionic, Flutter",
      "Backend: Node.js, Express.js, PHP, GraphQL, Flask",
      "Databases: MySQL, PostgreSQL, MongoDB",
      "Web3: Solidity, Foundry, Hardhat, DAO, DeFi, zkSync, NFT, ERC20",
      "Tools: Git, GitHub, Figma, AWS",
    ],
  },
  contact: {
    output: [
      "Email: sribabumandraju@gmail.com",
      "Phone: +91 63037 38847",
      "Portfolio: portfolio-35c3.vercel.app",
    ],
  },
  social: {
    output: [
      "GitHub: github.com/Sribabu-Mandraju",
      "LinkedIn: linkedin.com/in/sribabu-mandraju",
      "Twitter: twitter.com/5R1B4BU",
    ],
  },
  exp: {
    output: [
      "Mee Buddy (Dec 2024 - Present)",
      "Full Stack Developer & UI/UX Designer",
      "- MEAN Stack, Ionic, MongoDB, Express.js, Node.js, Angular",
      "",
      "Techbuggy (Dec 2023 - Nov 2024)",
      "Full Stack Developer [Go Backend & React Frontend]",
      "- Go, React.js, RESTful APIs, Authentication",
      "",
      "Teckzite (Mar 2021 - Present)",
      "Web Manager & Team Lead",
      "- MERN Stack, AWS, Team Leadership",
      "",
      "Ecrush (Jun 2021 - Sep 2023)",
      "Web Team Coordinator",
      "- Web Development, Team Leadership, Project Management",
    ],
  },
  clear: {
    output: [],
    clear: true,
  },
};

const LiveTerminal = () => {
  const [history, setHistory] = useState([
    { command: "help", output: terminalCommands["help"].output },
  ]);
  const [input, setInput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = React.useRef(null);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    if (terminalCommands[command]) {
      if (terminalCommands[command].clear) {
        setHistory([]);
      } else {
        setHistory((h) => [
          ...h,
          { command, output: terminalCommands[command].output },
        ]);
      }
    } else {
      setHistory((h) => [
        ...h,
        { command, output: [`Command not found: ${command}`] },
      ]);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      handleCommand(input);
      setInput("");
    }
  };

  const handleSuggestion = (cmd) => {
    setInput(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="mb-12 bg-gray-100 dark:bg-gray-900 border border-green-200 dark:border-green-700 rounded-xl shadow-lg p-6 sm:p-8 font-mono text-green-700 dark:text-green-400 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-400 animate-pulse"></div>
      <div className="mb-4 flex flex-wrap gap-2">
        {["help", "whoami", "skills", "contact", "social", "clear"].map(
          (cmd) => (
            <button
              key={cmd}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-800 border border-green-200 dark:border-green-700 rounded text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-700 hover:text-green-900 dark:hover:text-white transition-colors duration-200 text-xs sm:text-sm"
              onClick={() => handleSuggestion(cmd)}
            >
              {cmd}
            </button>
          )
        )}
      </div>
      <div className="h-64 overflow-y-auto mb-2 pr-2 custom-scrollbar">
        {history.map((entry, idx) => (
          <div key={idx} className="mb-2">
            <div className="flex items-center">
              <span className="text-green-600 dark:text-green-500">
                guest@portfolio
              </span>
              <span className="text-green-500 dark:text-green-300">:</span>
              <span className="text-green-600 dark:text-green-400">~</span>
              <span className="text-green-500 dark:text-green-300">$</span>
              <span className="ml-2 text-green-800 dark:text-green-200">
                {entry.command}
              </span>
            </div>
            {entry.output.map((line, i) => (
              <div
                key={i}
                className="pl-8 text-green-700 dark:text-green-300 animate-fadein"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleInput} className="flex items-center">
        <span className="text-green-600 dark:text-green-500">
          guest@portfolio
        </span>
        <span className="text-green-500 dark:text-green-300">:</span>
        <span className="text-green-600 dark:text-green-400">~</span>
        <span className="text-green-500 dark:text-green-300">$</span>
        <input
          ref={inputRef}
          className="ml-2 flex-1 bg-transparent outline-none border-none text-green-800 dark:text-green-200 placeholder-green-400 dark:placeholder-green-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="Type a command..."
        />
        <span
          className={`ml-1 w-2 ${
            showCursor ? "bg-green-600 dark:bg-green-400" : ""
          }`}
          style={{ height: "1em", verticalAlign: "bottom" }}
        >
          &nbsp;
        </span>
      </form>
    </div>
  );
};

const Home = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for interactive background
  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Updated stats for full-stack developer
  const stats = [
    { icon: FaCode, label: "Projects", value: "42", change: "+5 this month" },
    {
      icon: FaBug,
      label: "Github Contributions",
      value: "28",
      change: "+3 this week",
    },
    {
      icon: FaEthereum,
      label: "Smart Contracts",
      value: "15",
      change: "+2 this month",
    },
    {
      icon: FaServer,
      label: "APIs Deployed",
      value: "23",
      change: "+4 this month",
    },
  ];

  // Updated skills for full-stack development
  const skills = [
    { name: "React", progress: 95, icon: FaReact },
    { name: "Node.js", progress: 92, icon: FaNodeJs },
    { name: "TypeScript", progress: 88, icon: FaJs },
    { name: "Solidity", progress: 85, icon: FaEthereum },
    { name: "Python", progress: 82, icon: FaPython },
    { name: "MongoDB", progress: 90, icon: FaDatabase },
    { name: "Express.js", progress: 93, icon: FaServer },
    { name: "Web3.js", progress: 87, icon: FaWallet },
    { name: "TailwindCSS", progress: 94, icon: FaCss3 },
    { name: "Git", progress: 91, icon: FaGitAlt },
    { name: "Angular", progress: 84, icon: FaCode },
    { name: "Flutter", progress: 80, icon: FaMobile },
    { name: "GraphQL", progress: 83, icon: FaNetworkWired },
    { name: "AWS", progress: 81, icon: FaAws },
  ];

  // Tech stack categories
  const techStack = {
    frontend: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: FaCode },
      { name: "Angular", icon: FaCode },
      { name: "TailwindCSS", icon: FaCss3 },
    ],
    backend: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: FaServer },
      { name: "Python", icon: FaPython },
      { name: "GraphQL", icon: FaNetworkWired },
    ],
    blockchain: [
      { name: "Solidity", icon: FaEthereum },
      { name: "Hardhat", icon: FaHammer },
      { name: "Web3.js", icon: FaWallet },
      { name: "DeFi", icon: FaChartLine },
    ],
    mobile: [
      { name: "React Native", icon: FaMobile },
      { name: "Ionic", icon: FaMobile },
      { name: "Flutter", icon: FaMobile },
    ],
    database: [
      { name: "MongoDB", icon: FaDatabase },
      { name: "MySQL", icon: FaDatabase },
    ],
    tools: [
      { name: "Git", icon: FaGitAlt },
      { name: "Figma", icon: FaPen },
      { name: "Linux", icon: FaLinux },
    ],
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/Sribabu-Mandraju",
      label: "GitHub",
    },
    { icon: FaTwitter, href: "https://x.com/5R1B4BU", label: "Twitter" },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/sribabu-mandraju-590524233/",
      label: "LinkedIn",
    },
  ];

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
      <div className="relative z-10 p-4 sm:p-6 md:p-8 mx-auto max-w-7xl">
        {/* Profile Section */}
        <div className="mb-8 bg-black/80 backdrop-blur-sm rounded-xl border border-green-500/20 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-700 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
              <img
                src={myProfile}
                alt="Profile"
                className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-black shadow-xl transform transition duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 right-0 bg-gradient-to-r from-green-500 to-green-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-4 border-black shadow-lg">
                <span className="text-white text-sm">✓</span>
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-400 font-mono tracking-tight">
                    SRI BABU <span className="text-zinc-400">aka</span>{" "}
                    <span>5RIB4BU</span>
                  </h1>
                  <p className="text-green-500/70 mt-2 text-sm sm:text-base md:text-lg font-mono">
                    Full Stack Developer
                  </p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0 justify-center">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="p-2 text-green-400 hover:text-green-300 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                {[
                  "Web3 Security",
                  "Smart Contracts",
                  "DeFi Development",
                  "DApp Architecture",
                ].map((tag, index) => (
                  <span
                    key={index}
                    className="w-[145px] px-3 py-1.5 text-sm font-medium rounded-lg bg-green-900/30 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all duration-300 transform hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/30">
                  <stat.icon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-400 font-mono">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-green-500/70 font-mono">
                    {stat.label}
                  </p>
                  <p className="text-xs text-green-400 mt-1 font-mono">
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Tech Stack Categories */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono mb-6">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(techStack).map(([category, tools]) => (
              <div
                key={category}
                className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20"
              >
                <h3 className="text-lg font-bold text-green-400 font-mono mb-4 capitalize">
                  {category}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {tools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-green-900/30 rounded-lg border border-green-500/30 hover:border-green-500/40 transition-all duration-300"
                    >
                      <tool.icon className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-mono text-sm">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-8 bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
          <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono mb-6">
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-900/30 rounded-lg border border-green-500/30">
                      <skill.icon className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-green-400 font-mono">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-green-400 font-mono">
                    {skill.progress}%
                  </span>
                </div>
                <div className="relative h-2 bg-green-900/30 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[shimmer_1.5s_infinite]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono mb-6">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Karanyasetu",
                tech: ["Solidity", "React", "Hardhat", "DeFi", "DAO"],
                description:
                  "Decentralized disaster relief platform ensuring instant aid delivery, privacy-preserving victim verification, and transparent fund management with multilingual AI chatbots.",
                link: "https://github.com/Sribabu-Mandraju/karunyasetu",
              },
              {
                title: "Futurax",
                tech: ["React", "Web3.js", "Solidity", "wagmi", "OpenAI"],
                description:
                  "Blockchain-powered prediction market for real-world events with automated smart contracts for staking, fund locking, and payouts.",
                link: "https://github.com/Sribabu-Mandraju/futurax_defi",
              },
              {
                title: "Livebreak App and website",
                tech: ["MERN Stack", "Express.js", "MongoDB", "React"],
                description:
                  "Transport services platform connecting transporters, companies, and staff with competitive bidding system.",
                link: "https://github.com/Sribabu-Mandraju/liveBreak_new",
              },
              {
                title: "Teckzite2k24",
                tech: ["MERN Stack", "Figma", "Razorpay", "Google Auth"],
                description:
                  "National Level Techno-management fest website with secure authentication and payment integration.",
                link: "https://teckzite.org",
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-green-400 font-mono">
                    {project.title}
                  </h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-green-500/70 font-mono text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-3 py-1 text-xs font-mono rounded-full bg-green-900/30 text-green-400 border border-green-500/30 group-hover:border-green-500/50 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
          <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono mb-6">
            Connect
          </h2>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="flex items-center gap-2 px-4 py-2 bg-green-900/30 rounded-lg border border-green-500/30 text-green-400 hover:border-green-500/40 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
                <span className="font-mono text-sm">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
