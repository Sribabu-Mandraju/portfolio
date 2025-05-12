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
} from "react-icons/fa6";

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
      "whoami   - About the hacker",
      "skills   - List of skills",
      "contact  - How to reach out",
      "clear    - Clear the terminal",
      "social   - Social links",
    ],
  },
  whoami: {
    output: [
      "I'm Hacker Dev, a security researcher, blockchain developer, and CTF enthusiast. I break, build, and secure systems!",
    ],
  },
  skills: {
    output: [
      "Solidity, Bug Bounty, Pentesting, Bash Scripting, Web3, React, ...",
    ],
  },
  contact: {
    output: [
      "Email: hacker@cybermail.com",
      "Twitter: @hackerdev",
      "LinkedIn: /in/hackerdev",
    ],
  },
  social: {
    output: [
      "GitHub: github.com/hackerdev",
      "Twitter: twitter.com/hackerdev",
      "LinkedIn: linkedin.com/in/hackerdev",
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

  // Sample data - replace with actual data
  const stats = [
    { icon: FaPen, label: "Writeups", value: "156", change: "+12 this week" },
    {
      icon: FaFlag,
      label: "CTFs Played",
      value: "73",
      change: "+3 this month",
    },
    { icon: FaCode, label: "Projects", value: "28", change: "+2 this week" },
  ];

  const skills = [
    { name: "Solidity", progress: 70, icon: FaEthereum },
    { name: "Bug Bounty", progress: 85, icon: FaBug },
    { name: "Pentesting", progress: 90, icon: FaShieldHalved },
    { name: "Bash Scripting", progress: 75, icon: FaTerminal },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
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
        {/* Navigation Tabs */}
        {/* <div className="flex flex-wrap gap-2 mb-8">
          {["about", "skills", "journey", "tools", "achievements"].map(
            (section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                  activeSection === section
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "text-green-500/70 hover:text-green-400 hover:bg-green-500/10"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            )
          )}
        </div> */}

        {/* User Profile Section with 3D Effect */}
        <div
          className="bg-black rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-8 backdrop-blur-lg border border-green-500/20 relative overflow-hidden transform transition-all duration-500 hover:scale-[1.02]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered
              ? `perspective(1000px) rotateX(${
                  (mousePosition.y - window.innerHeight / 2) * 0.01
                }deg) rotateY(${
                  (mousePosition.x - window.innerWidth / 2) * 0.01
                }deg)`
              : "none",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-700 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
              <img
                src="https://avatars.dicebear.com/api/initials/HD.svg"
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
                    d4r3_w0lf
                  </h1>
                  <p className="text-green-500/70 mt-2 text-sm sm:text-base md:text-lg font-mono">
                    Senior Security Researcher & Blockchain Developer
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
                  "Pentesting",
                  "Bug Bounty",
                ].map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-green-900/30 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all duration-300 transform hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid with Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-black rounded-xl shadow-lg p-6 border border-green-500/20 relative overflow-hidden group hover:border-green-500/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center gap-4 relative">
                <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/30 transform group-hover:scale-110 transition-transform duration-300">
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
        </div>

        {/* Skills Section with Animated Progress Bars */}
        <div className="bg-black rounded-xl shadow-lg p-6 md:p-8 border border-green-500/20 relative overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-50"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono mb-6">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-900/30 rounded-lg border border-green-500/30 transform group-hover:scale-110 transition-transform duration-300">
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

        {/* Journey Timeline with Interactive Elements */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono mb-6">
            My Journey
          </h2>
          <div className="relative border-l-2 border-green-500/20 pl-6">
            {[
              { year: "2024", event: "Senior Security Researcher @ CyberSecX" },
              { year: "2022", event: "Blockchain Developer @ Web3Labs" },
              { year: "2021", event: "Top 10 CTF Player" },
              { year: "2019", event: "Started Bug Bounty Hunting" },
              { year: "2017", event: "Graduated in Computer Science" },
            ].map((item, idx) => (
              <div key={idx} className="mb-8 last:mb-0 relative group">
                <div className="absolute -left-3 top-1 w-2 h-2 bg-green-500 rounded-full shadow-lg group-hover:scale-150 transition-transform duration-300"></div>
                <div className="text-green-400 font-mono text-sm mb-1 group-hover:text-green-300 transition-colors duration-300">
                  {item.year}
                </div>
                <div className="text-green-400 font-mono group-hover:text-green-300 transition-colors duration-300">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack with Hover Effects */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono mb-6">
            Tech Stack & Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "Solidity", icon: FaEthereum },
              { name: "Burp Suite", icon: FaBug },
              { name: "Nmap", icon: FaShieldHalved },
              { name: "Bash", icon: FaTerminal },
              { name: "React", icon: FaCode },
              { name: "GitHub", icon: FaGithub },
              { name: "Twitter", icon: FaTwitter },
              { name: "LinkedIn", icon: FaLinkedin },
            ].map((tool, idx) => (
              <div
                key={idx}
                className="group relative bg-black border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col items-center">
                  <tool.icon className="w-8 h-8 text-green-400 group-hover:scale-110 group-hover:text-green-300 transition-all duration-300" />
                  <span className="mt-2 text-green-400 font-mono text-sm group-hover:text-green-300 transition-colors duration-300">
                    {tool.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements with Animated Cards */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-green-400 font-mono mb-6">
            Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "OSCP",
                desc: "Offensive Security Certified Professional",
              },
              { name: "CEH", desc: "Certified Ethical Hacker" },
              { name: "Top 10 CTF", desc: "International CTF Player" },
              { name: "Smart Contract Auditor", desc: "Web3 Security" },
            ].map((cert, idx) => (
              <div
                key={idx}
                className="group relative bg-black border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <span className="text-green-400 font-mono text-lg font-bold mb-2 block group-hover:text-green-300 transition-colors duration-300">
                    {cert.name}
                  </span>
                  <span className="text-green-500/70 font-mono text-sm block group-hover:text-green-400 transition-colors duration-300">
                    {cert.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
