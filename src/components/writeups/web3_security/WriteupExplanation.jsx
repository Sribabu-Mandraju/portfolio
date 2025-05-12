import React from "react";
import {
  FaEthereum,
  FaShieldHalved,
  FaBug,
  FaTriangleExclamation,
  FaCode,
  FaClock,
  FaCircleCheck,
  FaLink,
  FaGithub,
  FaTwitter,
} from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const WriteupExplanation = () => {
  // Static data
  const writeupData = {
    title: "Critical Vulnerability in DeFi Lending Protocol",
    protocol: "LendingDAO",
    date: "2024-03-15",
    severity: "Critical",
    findings: 3,
    status: "Fixed",
    chain: "Ethereum",
    auditor: {
      name: "John Doe",
      role: "Senior Smart Contract Auditor",
      avatar: "https://avatars.githubusercontent.com/u/1234567",
      socials: {
        github: "johndoe",
        twitter: "johndoe_eth",
      },
    },
    sections: [
      {
        type: "overview",
        content: {
          summary:
            "A critical vulnerability was discovered in the LendingDAO protocol that could lead to unauthorized withdrawal of user funds through flash loan manipulation.",
          impact: "High - Potential loss of all deposited funds",
          likelihood:
            "Medium - Requires sophisticated knowledge of flash loans",
        },
      },
      {
        type: "technical_details",
        content: {
          description:
            "The vulnerability exists in the lending pool contract where the validation of flash loan repayment can be bypassed through reentrancy.",
          affected_components: ["LendingPool.sol", "FlashLoanReceiver.sol"],
          vulnerability_type: "Reentrancy Attack",
        },
      },
      {
        type: "code",
        content: {
          language: "solidity",
          title: "Vulnerable Code",
          code: `function executeLoan(uint256 amount) external {
    require(IERC20(token).transferFrom(msg.sender, address(this), amount));
    
    // Vulnerable: State changes after external call
    balances[msg.sender] -= amount;
    
    // External call that can be exploited
    IFlashLoanReceiver(msg.sender).executeOperation(
        token,
        amount,
        0,
        msg.sender,
        bytes("")
    );
}`,
        },
      },
      {
        type: "fix",
        content: {
          description:
            "The vulnerability can be fixed by implementing the checks-effects-interactions pattern and using reentrancy guards.",
          code: {
            language: "solidity",
            title: "Fixed Code",
            code: `// Add ReentrancyGuard
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LendingPool is ReentrancyGuard {
    function executeLoan(uint256 amount) external nonReentrant {
        // Update state before external call
        balances[msg.sender] -= amount;
        
        require(IERC20(token).transferFrom(msg.sender, address(this), amount));
        
        IFlashLoanReceiver(msg.sender).executeOperation(
            token,
            amount,
            0,
            msg.sender,
            bytes("")
        );
    }
}`,
          },
        },
      },
      {
        type: "proof_of_concept",
        content: {
          description:
            "The attack can be demonstrated through the following test case that exploits the reentrancy vulnerability:",
          steps: [
            "Deploy malicious contract implementing IFlashLoanReceiver",
            "Request flash loan with large amount",
            "Execute reentrancy attack during callback",
            "Drain funds from lending pool",
          ],
        },
      },
    ],
  };

  const getSeverityBadgeStyles = (severity) => {
    const baseStyles = "px-3 py-1.5 rounded-lg text-sm font-semibold";
    switch (severity?.toLowerCase()) {
      case "critical":
        return `${baseStyles} bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400`;
      default:
        return `${baseStyles} bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400`;
    }
  };

  const CodeBlock = ({ language = "text", code = "" }) => (
    <div className="relative">
      <div className="absolute top-0 right-0 p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-700 rounded-tr-lg rounded-bl-lg text-xs font-medium text-gray-600 dark:text-gray-400">
        {language}
      </div>
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: "0.75rem",
          fontSize: "0.875rem",
          borderRadius: "0.5rem",
          background: "#1a1a1a",
        }}
        className="!bg-gray-50 dark:!bg-gray-900 rounded-lg overflow-x-auto text-sm sm:text-base"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );

  const MarkdownContent = ({ content = "" }) => {
    if (!content) {
      return (
        <p className="text-gray-500 dark:text-gray-400 italic">
          No content available
        </p>
      );
    }

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="text-gray-600 dark:text-gray-300">{children}</p>
          ),
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-600 dark:text-gray-300">{children}</li>
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <CodeBlock
                language={match[1]}
                code={String(children).replace(/\n$/, "")}
              />
            ) : (
              <code
                className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-green-500 dark:border-green-400 pl-4 italic text-gray-600 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          img: ({ src, alt }) => (
            <img
              src={src || ""}
              alt={alt || ""}
              className="rounded-lg shadow-lg max-w-full my-4"
            />
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-lg border border-red-200 dark:border-red-800/50">
            <FaTriangleExclamation className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {writeupData.title || "Untitled Writeup"}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-gray-600 dark:text-gray-400">
              {writeupData.chain && (
                <>
                  <span className="flex items-center gap-1">
                    <FaEthereum className="w-4 h-4" />
                    {writeupData.chain}
                  </span>
                  <span className="hidden sm:inline">•</span>
                </>
              )}
              {writeupData.date && (
                <>
                  <span className="flex items-center gap-1">
                    <FaClock className="w-4 h-4" />
                    {writeupData.date}
                  </span>
                  <span className="hidden sm:inline">•</span>
                </>
              )}
              {writeupData.severity && (
                <span className={getSeverityBadgeStyles(writeupData.severity)}>
                  {writeupData.severity}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Auditor Info */}
        {writeupData.auditor && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 gap-4">
            <div className="flex items-center gap-4">
              {writeupData.auditor.avatar && (
                <img
                  src={writeupData.auditor.avatar}
                  alt={writeupData.auditor.name || "Auditor"}
                  className="w-12 h-12 rounded-full border-2 border-green-500 dark:border-green-400"
                />
              )}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {writeupData.auditor.name || "Anonymous Auditor"}
                </h3>
                {writeupData.auditor.role && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {writeupData.auditor.role}
                  </p>
                )}
              </div>
            </div>
            {writeupData.auditor.socials && (
              <div className="flex items-center gap-3 ml-16 sm:ml-0">
                {writeupData.auditor.socials.github && (
                  <a
                    href={`https://github.com/${writeupData.auditor.socials.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {writeupData.auditor.socials.twitter && (
                  <a
                    href={`https://twitter.com/${writeupData.auditor.socials.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="space-y-6 sm:space-y-8">
        {/* Overview Section */}
        {writeupData.sections[0] && (
          <section className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
              Overview
            </h2>
            <div className="space-y-4">
              <MarkdownContent
                content={writeupData.sections[0].content.summary}
              />
              <div className="grid grid-cols-1 gap-4">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Impact
                  </h4>
                  <MarkdownContent
                    content={writeupData.sections[0].content.impact}
                  />
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Likelihood
                  </h4>
                  <MarkdownContent
                    content={writeupData.sections[0].content.likelihood}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Technical Details */}
        {writeupData.sections[1] && (
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Details
            </h2>
            <div className="space-y-4">
              <MarkdownContent
                content={writeupData.sections[1].content.description}
              />
              {writeupData.sections[1].content.affected_components?.length >
                0 && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Affected Components
                  </h4>
                  <div className="space-y-2">
                    {writeupData.sections[1].content.affected_components.map(
                      (component, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          <FaCode className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                            {component}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Vulnerable Code */}
        {writeupData.sections[2] && (
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Vulnerable Code
            </h2>
            <CodeBlock
              language={writeupData.sections[2].content.language}
              code={writeupData.sections[2].content.code}
            />
          </section>
        )}

        {/* Fix Implementation */}
        {writeupData.sections[3] && (
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Fix Implementation
            </h2>
            <MarkdownContent
              content={writeupData.sections[3].content.description}
            />
            {writeupData.sections[3].content.code && (
              <div className="mt-4">
                <CodeBlock
                  language={writeupData.sections[3].content.code.language}
                  code={writeupData.sections[3].content.code.code}
                />
              </div>
            )}
          </section>
        )}

        {/* Proof of Concept */}
        {writeupData.sections[4] && (
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Proof of Concept
            </h2>
            <MarkdownContent
              content={writeupData.sections[4].content.description}
            />
            {writeupData.sections[4].content.steps?.length > 0 && (
              <div className="space-y-2 mt-4">
                {writeupData.sections[4].content.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium">
                      {index + 1}
                    </span>
                    <MarkdownContent content={step} />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default WriteupExplanation;
