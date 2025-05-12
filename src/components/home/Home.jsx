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
    <div className="p-2 sm:p-4 mx-auto max-w-7xl">
      {/* User Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-3xl"></div>

        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 relative">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-700 dark:from-green-400 dark:to-green-600 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
            <img
              src="https://avatars.dicebear.com/api/initials/HD.svg"
              alt="Profile"
              className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl transform transition duration-500 hover:scale-105"
            />
            <div className="absolute bottom-0 right-0 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
              <span className="text-white text-xs sm:text-sm">✓</span>
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  d4r3_w0lf
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
                  Senior Security Researcher & Blockchain Developer
                </p>
              </div>
              <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-4 md:mt-0 justify-center">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 justify-center md:justify-start">
              {[
                "Web3 Security",
                "Smart Contracts",
                "Pentesting",
                "Bug Bounty",
              ].map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm font-medium rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/50 hover:shadow-md transition duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section (Terminal Style) */}
      <div className="mt-6 sm:mt-8 mb-6 sm:mb-8 bg-gray-100 dark:bg-gray-900 border border-green-200 dark:border-green-700 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 md:p-8 font-mono text-green-700 dark:text-green-400 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-400 animate-pulse"></div>
        <div className="flex items-center mb-3 sm:mb-4">
          <span className="bg-green-600 w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 animate-pulse"></span>
          <span className="text-base sm:text-lg font-bold tracking-widest text-green-800 dark:text-green-300">
            about_me@root:~$
          </span>
        </div>
        <div className="text-sm sm:text-base md:text-lg leading-relaxed break-words text-green-700 dark:text-green-300">
          <TypingEffect
            text={
              "Hi, I'm Hacker Dev — a passionate security researcher, blockchain developer, and CTF enthusiast. I love breaking things, building secure systems, and sharing knowledge with the community."
            }
            speed={18}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="flex items-center gap-3 sm:gap-4 relative">
              <div className="p-2 sm:p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800/50 transform group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-xs font-medium text-green-600 dark:text-green-400 mt-0.5 sm:mt-1 flex items-center">
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Progress Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-3xl"></div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 relative">
          Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2 sm:space-y-3 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800/50 transform group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-green-600 dark:text-green-400">
                  {skill.progress}%
                </span>
              </div>
              <div className="relative h-2 sm:h-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(34,197,94,0.1)_50%,transparent_100%)] animate-[shimmer_2s_infinite]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(34,197,94,0.05)_100%)]"></div>

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${skill.progress}%` }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[shimmer_1.5s_infinite]"></div>

                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-white dark:bg-gray-800 rounded-full border-2 border-green-500 dark:border-green-400 shadow-lg flex items-center justify-center transform transition-all duration-500 group-hover:scale-110">
                    <skill.icon className="w-2 h-2 sm:w-3 sm:h-3 text-green-600 dark:text-green-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline / Journey Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
          My Journey
        </h2>
        <div className="relative border-l-4 border-green-200 dark:border-green-700 pl-6 sm:pl-8">
          {[
            { year: "2024", event: "Senior Security Researcher @ CyberSecX" },
            { year: "2022", event: "Blockchain Developer @ Web3Labs" },
            { year: "2021", event: "Top 10 CTF Player" },
            { year: "2019", event: "Started Bug Bounty Hunting" },
            { year: "2017", event: "Graduated in Computer Science" },
          ].map((item, idx) => (
            <div key={idx} className="mb-6 sm:mb-8 last:mb-0 relative">
              <div className="absolute -left-4 sm:-left-5 top-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-green-300 rounded-full shadow-lg animate-pulse"></div>
              <div className="text-green-600 dark:text-green-300 font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">
                {item.year}
              </div>
              <div className="text-gray-900 dark:text-green-100 text-sm sm:text-base font-mono">
                {item.event}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack / Tools Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
          Tech Stack & Tools
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
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
              className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 border border-green-200 dark:border-green-700 rounded-lg p-3 sm:p-4 shadow-md hover:shadow-green-500/30 transition-all duration-300 group relative overflow-hidden"
            >
              <tool.icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400 group-hover:scale-110 group-hover:text-green-500 dark:group-hover:text-green-300 transition-transform duration-300" />
              <span className="mt-1.5 sm:mt-2 text-green-700 dark:text-green-200 font-mono text-xs sm:text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                {tool.name}
              </span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Achievements Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
          Achievements
        </h2>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {[
            { name: "OSCP", desc: "Offensive Security Certified Professional" },
            { name: "CEH", desc: "Certified Ethical Hacker" },
            { name: "Top 10 CTF", desc: "International CTF Player" },
            { name: "Smart Contract Auditor", desc: "Web3 Security" },
          ].map((cert, idx) => (
            <div
              key={idx}
              className="bg-gray-100 dark:bg-gray-900 border border-green-200 dark:border-green-700 rounded-lg px-4 sm:px-6 py-3 sm:py-4 shadow-md flex flex-col items-start hover:shadow-green-500/30 transition-all duration-300 relative overflow-hidden"
            >
              <span className="text-green-600 dark:text-green-400 font-bold text-base sm:text-lg mb-0.5 sm:mb-1 animate-pulse">
                {cert.name}
              </span>
              <span className="text-green-700 dark:text-green-200 text-xs sm:text-sm font-mono">
                {cert.desc}
              </span>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 dark:bg-green-400 rounded-full animate-ping"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Facts / Hobbies Section */}
  
      {/* Live Terminal Section */}
    </div>
  );
};

export default Home;
