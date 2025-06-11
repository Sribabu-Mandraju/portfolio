import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Fal1out = () => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  // Terminal typing effect
  useEffect(() => {
    const text = "Analyzing Fal1out Contract Vulnerability...";
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
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
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(progress);
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener("scroll", handleScroll);
      return () => content.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const CodeBlock = ({ code, language }) => (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-black border border-green-500/20 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-green-900/20 border-b border-green-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-xs text-green-400 font-mono">{language}</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-green-400 font-mono whitespace-pre-wrap break-words">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );

  const InfoBox = ({ title, children }) => (
    <div className="bg-green-900/10 border border-green-500/20 rounded-lg p-4 mb-6">
      <h3 className="text-green-400 font-mono text-lg mb-2">{title}</h3>
      <div className="text-green-300/90">{children}</div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-black text-green-400 font-mono"
      ref={contentRef}
    >
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-green-500/20 z-50">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Terminal Header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-green-500/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-sm text-green-400/60">
              {typedText}
              {showCursor && <span className="animate-pulse">|</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-400 mb-6">
            Fal1out: The Constructor Typo Vulnerability
          </h1>

          <InfoBox title="Overview">
            The Fal1out level demonstrates a critical vulnerability in smart
            contract development: the importance of proper constructor naming.
            This level shows how a simple typo in constructor naming can lead to
            severe security implications.
          </InfoBox>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl text-green-400 mb-4">
                The Vulnerable Contract
              </h2>
              <CodeBlock
                language="solidity"
                code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "openzeppelin-contracts-06/math/SafeMath.sol";

contract Fallout {
    using SafeMath for uint256;

    mapping(address => uint256) allocations;
    address payable public owner;

    /* constructor */
    function Fal1out() public payable {
        owner = msg.sender;
        allocations[owner] = msg.value;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "caller is not the owner");
        _;
    }

    function allocate() public payable {
        allocations[msg.sender] = allocations[msg.sender].add(msg.value);
    }

    function sendAllocation(address payable allocator) public {
        require(allocations[allocator] > 0);
        allocator.transfer(allocations[allocator]);
    }

    function collectAllocations() public onlyOwner {
        msg.sender.transfer(address(this).balance);
    }

    function allocatorBalance(address allocator) public view returns (uint256) {
        return allocations[allocator];
    }
}`}
              />
            </section>

            <section>
              <h2 className="text-2xl text-green-400 mb-4">
                The Vulnerability
              </h2>
              <div className="space-y-4">
                <p className="text-green-300/90">
                  The critical vulnerability lies in the constructor function
                  name. In Solidity versions before 0.8.0, the constructor was
                  defined by a function with the same name as the contract.
                  However, in this contract:
                </p>
                <ul className="list-disc list-inside space-y-2 text-green-300/90">
                  <li>
                    The contract is named{" "}
                    <code className="text-green-400">Fallout</code>
                  </li>
                  <li>
                    But the constructor is named{" "}
                    <code className="text-green-400">Fal1out</code> (with a "1"
                    instead of "l")
                  </li>
                  <li>
                    This means the constructor is actually a regular public
                    function that anyone can call
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl text-green-400 mb-4">The Exploit</h2>
              <div className="space-y-4">
                <p className="text-green-300/90">
                  To exploit this vulnerability:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-green-300/90">
                  <li>
                    Simply call the{" "}
                    <code className="text-green-400">Fal1out()</code> function
                    with some ETH
                  </li>
                  <li>
                    The function will set you as the owner since it's not
                    actually a constructor
                  </li>
                  <li>
                    Once you're the owner, you can call{" "}
                    <code className="text-green-400">collectAllocations()</code>{" "}
                    to drain the contract
                  </li>
                </ol>
              </div>
            </section>

            <InfoBox title="Security Lesson">
              This vulnerability highlights the importance of:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Careful naming of constructor functions</li>
                <li>
                  Using the <code className="text-green-400">constructor</code>{" "}
                  keyword in newer Solidity versions
                </li>
                <li>Thorough code review and testing</li>
                <li>
                  Understanding the implications of contract initialization
                </li>
              </ul>
            </InfoBox>

            <section>
              <h2 className="text-2xl text-green-400 mb-4">Prevention</h2>
              <div className="space-y-4">
                <p className="text-green-300/90">
                  To prevent this type of vulnerability:
                </p>
                <ul className="list-disc list-inside space-y-2 text-green-300/90">
                  <li>
                    Use the <code className="text-green-400">constructor</code>{" "}
                    keyword in Solidity 0.8.0 and above
                  </li>
                  <li>Implement proper access control mechanisms</li>
                  <li>
                    Use automated testing tools to detect constructor issues
                  </li>
                  <li>Conduct thorough code reviews</li>
                </ul>
              </div>
            </section>

            <div className="mt-8 p-4 bg-green-900/10 border border-green-500/20 rounded-lg">
              <h3 className="text-xl text-green-400 mb-2">Key Takeaways</h3>
              <ul className="list-disc list-inside space-y-2 text-green-300/90">
                <li>
                  Constructor naming is critical in smart contract security
                </li>
                <li>Simple typos can lead to severe vulnerabilities</li>
                <li>
                  Always use the latest Solidity features and best practices
                </li>
                <li>Regular security audits are essential</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fal1out;
