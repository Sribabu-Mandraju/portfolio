import React, { useState, useEffect } from "react";
import { FaTerminal, FaArrowLeft, FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [typedText, setTypedText] = useState("");
  const [showMatrix, setShowMatrix] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showHex, setShowHex] = useState(false);

  const fullText = "ERROR 404: Page Not Found";
  const matrixText = "01001000 01000001 01000011 01001011 01000101 01000100";
  const hexText = "0x404 0x4E4F54 0x464F55 0x4E44";

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setShowMatrix(true);
        setTimeout(() => setShowGlitch(true), 1000);
        setTimeout(() => setShowHex(true), 2000);
      }
    };
    typeWriter();
  }, []);

  return (
    <div className="  bg-gray-900 text-green-400 font-mono flex items-center justify-center p-4 relative overflow-hidden">
      {/* Matrix Rain Effect Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-rain"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl w-full my-[50px] bg-gray-800/50 backdrop-blur-lg rounded-xl border border-green-700 p-6 sm:p-8 relative">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <span className="text-sm text-gray-400">root@system:~</span>
        </div>

        {/* Error Message */}
        <div className="space-y-6">
          {/* Typing Animation */}
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-red-500">$</span>{" "}
            <span className="animate-pulse">{typedText}</span>
            <span className="inline-block w-2 h-6 bg-green-400 ml-1 animate-blink"></span>
          </div>

          {/* Matrix Binary */}
          {showMatrix && (
            <div className="text-sm sm:text-base text-green-300/80 animate-fade-in">
              <div className="flex items-center gap-2">
                <FaTerminal className="text-green-500" />
                <span className="font-mono">{matrixText}</span>
              </div>
            </div>
          )}

          {/* Glitch Effect */}
          {showGlitch && (
            <div className="relative">
              <div className="glitch-text text-xl sm:text-2xl font-bold text-green-400">
                SYSTEM COMPROMISED
              </div>
              <div className="glitch-text text-xl sm:text-2xl font-bold text-red-400">
                SYSTEM COMPROMISED
              </div>
              <div className="glitch-text text-xl sm:text-2xl font-bold text-blue-400">
                SYSTEM COMPROMISED
              </div>
            </div>
          )}

          {/* Hex Code */}
          {showHex && (
            <div className="text-sm sm:text-base text-green-300/80 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-green-500">#</span>
                <span className="font-mono">{hexText}</span>
              </div>
            </div>
          )}

          {/* Error Details */}
          <div className="mt-8 space-y-4">
            <p className="text-green-300/80">
              The requested page has been encrypted or moved to a secure
              location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <FaHome />
                <span>Return Home</span>
              </Link>
              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-green-300 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <FaArrowLeft />
                <span>Go Back</span>
              </button>
            </div>
          </div>

          {/* Easter Egg - Hidden Command */}
          <div className="mt-8 text-xs text-gray-500">
            <p>Try typing 'help' in the console...</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .glitch-text {
          position: relative;
          animation: glitch 1s infinite;
        }
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(0, 255, 0, 0.1) 0%,
            rgba(0, 255, 0, 0) 100%
          );
          animation: matrixRain 20s linear infinite;
        }
        @keyframes matrixRain {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
