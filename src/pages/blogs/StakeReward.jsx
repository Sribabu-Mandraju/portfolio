import React, { useState, useEffect, useRef } from 'react';

const StakingRewardsBlog = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(100);
  const [timeHours, setTimeHours] = useState(24);
  const [totalStaked, setTotalStaked] = useState(1000);
  const [rewardRate, setRewardRate] = useState(5);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const sectionsRef = useRef([]);

  // Terminal typing effect
  useEffect(() => {
    const text = "root@5R1B4BU:~$ ./explain_staking_rewards.sh";
    let index = 0;
    setTypedText('');
    
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
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Update active section
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculator functions
  const calculateRewards = () => {
    const timeSeconds = timeHours * 3600;
    const rewardPerToken = (timeSeconds * rewardRate * Math.pow(10, 18)) / totalStaked;
    const earned = (stakeAmount * rewardPerToken) / Math.pow(10, 18);
    return Math.round(earned * 100) / 100;
  };

  const CodeBlock = ({ children, language = 'solidity' }) => (
    <div className="bg-black/70 border border-green-500/30 rounded-lg overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-green-500/10 border-b border-green-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-xs text-green-400 font-mono">{language}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-green-300 font-mono">{children}</code>
      </pre>
    </div>
  );

  const InfoBox = ({ type = 'info', title, children }) => {
    const colors = {
      info: 'border-blue-500/30 bg-blue-500/10',
      warning: 'border-yellow-500/30 bg-yellow-500/10',
      success: 'border-green-500/30 bg-green-500/10',
      example: 'border-cyan-500/30 bg-cyan-500/10'
    };

    const icons = {
      info: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      warning: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      success: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      example: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )
    };

    return (
      <div className={`border rounded-lg p-4 my-4 backdrop-blur-sm ${colors[type]}`}>
        <div className="flex items-center mb-2">
          <span className="text-green-400 mr-2">{icons[type]}</span>
          <span className="text-green-300 font-bold font-mono">{title}</span>
        </div>
        <div className="text-green-100">{children}</div>
      </div>
    );
  };

  const Calculator = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-green-500/30 rounded-lg p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-green-300 font-bold font-mono">Rewards Calculator</h3>
          <button 
            onClick={() => setIsCalculatorOpen(false)}
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-green-400 text-sm font-mono mb-1">Your Stake Amount</label>
            <input 
              type="number" 
              value={stakeAmount}
              onChange={(e) => setStakeAmount(Number(e.target.value))}
              className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono focus:border-green-500/50 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-green-400 text-sm font-mono mb-1">Time (hours)</label>
            <input 
              type="number" 
              value={timeHours}
              onChange={(e) => setTimeHours(Number(e.target.value))}
              className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono focus:border-green-500/50 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-green-400 text-sm font-mono mb-1">Total Staked</label>
            <input 
              type="number" 
              value={totalStaked}
              onChange={(e) => setTotalStaked(Number(e.target.value))}
              className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono focus:border-green-500/50 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-green-400 text-sm font-mono mb-1">Reward Rate (per second)</label>
            <input 
              type="number" 
              value={rewardRate}
              onChange={(e) => setRewardRate(Number(e.target.value))}
              className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono focus:border-green-500/50 focus:outline-none"
            />
          </div>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-green-300 font-bold font-mono text-center">
              Estimated Rewards: {calculateRewards()} tokens
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
              animationDuration: `${Math.random() * 2 + 2}s`
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

      {/* Navigation */}
      <nav className="fixed top-4 right-4 z-40 bg-black/90 backdrop-blur-md border border-green-500/30 rounded-lg p-2">
        <button 
          onClick={() => setIsCalculatorOpen(true)}
          className="px-3 py-2 bg-green-500/20 hover:bg-green-500/30 rounded text-xs transition-colors"
        >
          Calculator
        </button>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Header */}
        <header className="mb-8">
          <div className="bg-black/95 backdrop-blur-md border border-green-500/30 rounded-lg p-6 shadow-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <span className="text-xs text-green-400/60 ml-2">terminal@defi-classroom</span>
            </div>
            
            <div className="border-b border-green-500/20 mb-4 pb-2">
              <div className="flex items-center">
                <span className="text-green-500 font-bold">{typedText}</span>
                {showCursor && <span className="text-green-400 animate-pulse ml-1">█</span>}
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-bold text-green-300 mb-2">
                Understanding StakingRewards Contract
              </h1>
              <p className="text-green-400/80">A Hacker's Guide to DeFi Mathematics</p>
            </div>
          </div>
        </header>

        {/* Section 1: Introduction */}
        <section ref={el => sectionsRef.current[0] = el} className="mb-12">
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-green-300 mb-4 flex items-center">
              <span className="text-green-500 mr-2">[01]</span>
              The Digital Piggy Bank: StakingRewards Explained
            </h2>
            
            <p className="mb-4 leading-relaxed">
              Imagine a digital piggy bank where you can deposit your crypto tokens and earn rewards over time. 
              That's essentially what the <span className="text-cyan-400 bg-black/50 px-1 rounded">StakingRewards</span> contract does. 
              Let's break down this smart contract into simple mathematical concepts that even a school student could understand.
            </p>

            <InfoBox type="info" title="KEY CONCEPT">
              <p><strong>Staking</strong> = Depositing tokens to earn rewards</p>
              <p><strong>Rewards</strong> = Extra tokens you earn for staking</p>
            </InfoBox>
          </div>
        </section>

        {/* Section 2: Core Variables */}
        <section ref={el => sectionsRef.current[1] = el} className="mb-12">
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-green-300 mb-4 flex items-center">
              <span className="text-green-500 mr-2">[02]</span>
              The Core Variables: What's in Our Piggy Bank?
            </h2>

            <CodeBlock>
{`// The tokens involved
IERC20 public rewardsToken;    // What you earn (like candy)
IERC20 public stakingToken;    // What you deposit (like coins)

// Timing and rate variables
uint256 public periodFinish = 0;        // When rewards end
uint256 public rewardRate = 0;          // Rewards per second
uint256 public rewardsDuration = 7 days; // How long rewards last
uint256 public lastUpdateTime;          // Last calculation time
uint256 public rewardPerTokenStored;    // Accumulated rewards per token

// User-specific data
mapping(address => uint256) public userRewardPerTokenPaid;
mapping(address => uint256) public rewards;

// Staking balances
uint256 private _totalSupply;           // Total tokens staked
mapping(address => uint256) private _balances; // User balances`}
            </CodeBlock>

            <InfoBox type="example" title="EXAMPLE">
              <p>If <span className="text-cyan-400">rewardRate = 10</span> tokens per second and <span className="text-cyan-400">rewardsDuration = 7 days</span>:</p>
              <p className="font-mono bg-black/50 p-2 rounded mt-2">
                Total rewards = 10 × (7 × 24 × 60 × 60) = 6,048,000 tokens
              </p>
            </InfoBox>
          </div>
        </section>

        {/* Section 3: Math Behind Rewards */}
        <section ref={el => sectionsRef.current[2] = el} className="mb-12">
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-green-300 mb-4 flex items-center">
              <span className="text-green-500 mr-2">[03]</span>
              The Math Behind Rewards: How Do We Calculate Your Earnings?
            </h2>

            <p className="mb-4">The most important formula in this contract is how rewards are calculated:</p>

            <CodeBlock>
{`function rewardPerToken() public view returns (uint256) {
    if (_totalSupply == 0) {
        return rewardPerTokenStored;
    }
    return
        rewardPerTokenStored.add(
            lastTimeRewardApplicable().sub(lastUpdateTime).mul(rewardRate).mul(1e18).div(_totalSupply)
        );
}`}
            </CodeBlock>

            <div className="bg-black/50 border border-green-500/20 rounded-lg p-4 my-4 backdrop-blur-sm overflow-x-auto">
              <div className="text-green-300 font-bold mb-2">BREAKING DOWN THE FORMULA:</div>
              <div className="text-sm">
                <div className="text-cyan-400 mb-2">rewardPerToken = </div>
                <div className="ml-4">
                  rewardPerTokenStored + <br />
                  <span className="text-green-400">(timeElapsed × rewardRate × 10<sup>18</sup>) ÷ totalSupply</span>
                </div>
              </div>
            </div>

            <p className="mb-4">Then, to calculate how much a specific user has earned:</p>

            <CodeBlock>
{`function earned(address account) public view returns (uint256) {
    return _balances[account].mul(rewardPerToken().sub(userRewardPerTokenPaid[account])).div(1e18).add(rewards[account]);
}`}
            </CodeBlock>

            <div className="bg-black/50 border border-green-500/20 rounded-lg p-4 my-4 backdrop-blur-sm overflow-x-auto">
              <div className="text-green-300 font-bold mb-2">USER REWARDS FORMULA:</div>
              <div className="text-sm">
                <div className="text-cyan-400 mb-2">earned = </div>
                <div className="ml-4">
                  (userBalance × (rewardPerToken - userRewardPerTokenPaid)) ÷ 10<sup>18</sup> + rewards[user]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive Functions */}
        <section ref={el => sectionsRef.current[3] = el} className="mb-12">
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-green-300 mb-4 flex items-center">
              <span className="text-green-500 mr-2">[04]</span>
              Interactive Functions: What Can Users Do?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="bg-black/70 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm hover:border-green-500/50 transition-colors">
                <div className="text-green-300 font-bold mb-2">stake(amount)</div>
                <p className="text-sm mb-2">Deposit your tokens to start earning rewards</p>
                <div className="text-xs text-green-400/60">
                  → Increases your balance and the total supply
                </div>
              </div>
              
              <div className="bg-black/70 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm hover:border-green-500/50 transition-colors">
                <div className="text-green-300 font-bold mb-2">withdraw(amount)</div>
                <p className="text-sm mb-2">Take back some of your staked tokens</p>
                <div className="text-xs text-green-400/60">
                  → Decreases your balance and the total supply
                </div>
              </div>
              
              <div className="bg-black/70 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm hover:border-green-500/50 transition-colors">
                <div className="text-green-300 font-bold mb-2">getReward()</div>
                <p className="text-sm mb-2">Claim your earned rewards</p>
                <div className="text-xs text-green-400/60">
                  → Transfers earned rewards to your wallet
                </div>
              </div>
              
              <div className="bg-black/70 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm hover:border-green-500/50 transition-colors">
                <div className="text-green-300 font-bold mb-2">exit()</div>
                <p className="text-sm mb-2">Withdraw all tokens and claim rewards</p>
                <div className="text-xs text-green-400/60">
                  → Combination of withdraw() and getReward()
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Practical Example */}
        <section ref={el => sectionsRef.current[4] = el} className="mb-12">
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-green-300 mb-4 flex items-center">
              <span className="text-green-500 mr-2">[05]</span>
              Practical Example: Let's Do The Math
            </h2>

            <div className="bg-black/70 border border-green-500/20 rounded-lg p-4 my-6 backdrop-blur-sm">
              <div className="text-green-300 font-bold mb-4">SCENARIO SIMULATION:</div>
              
              <div className="mb-3">
                <div className="text-cyan-400 mb-2">Initial Conditions:</div>
                <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                  <li>Total staked tokens: 1,000 tokens</li>
                  <li>Your stake: 100 tokens (10% of total)</li>
                  <li>Reward rate: 5 tokens per second</li>
                  <li>Time elapsed: 24 hours (86,400 seconds)</li>
                </ul>
              </div>
              
              <div className="mb-3">
                <div className="text-cyan-400 mb-2">Step 1: Calculate rewardPerToken</div>
                <div className="bg-black/50 p-2 rounded my-2 overflow-x-auto text-sm font-mono">
                  rewardPerToken = 0 + (86,400 × 5 × 10<sup>18</sup>) ÷ 1,000 = 432,000 × 10<sup>15</sup>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-cyan-400 mb-2">Step 2: Calculate your earnings</div>
                <div className="bg-black/50 p-2 rounded my-2 overflow-x-auto text-sm font-mono">
                  earned = (100 × 432,000 × 10<sup>15</sup>) ÷ 10<sup>18</sup> = 43,200 tokens
                </div>
              </div>
              
              <div className="text-green-400 font-bold mt-4 text-center p-3 bg-green-500/10 rounded">
                🎉 You earned 43,200 reward tokens in 24 hours!
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Security Features */}
        <section ref={el => sectionsRef.current[5] = el} className="mb-12">
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-green-300 mb-4 flex items-center">
              <span className="text-green-500 mr-2">[06]</span>
              Security Features: Keeping Your Tokens Safe
            </h2>

            <p className="mb-4">The contract includes several security mechanisms:</p>

            <CodeBlock>
{`// Prevents reentrancy attacks
function stake(uint256 amount) external nonReentrant notPaused updateReward(msg.sender) {
    // Implementation...
}

// Only owner can recover tokens (except staking tokens)
function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyOwner {
    require(tokenAddress != address(stakingToken), "Cannot withdraw the staking token");
    // Implementation...
}`}
            </CodeBlock>

            <InfoBox type="warning" title="SECURITY FEATURES">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><span className="text-cyan-400">nonReentrant</span>: Prevents attackers from calling functions recursively</li>
                <li><span className="text-cyan-400">notPaused</span>: Allows emergency shutdown</li>
                <li><span className="text-cyan-400">updateReward</span>: Updates rewards before any state changes</li>
                <li><span className="text-cyan-400">SafeMath</span>: Prevents integer overflow/underflow</li>
              </ul>
            </InfoBox>
          </div>
        </section>

        {/* Section 7: Conclusion */}
        <section ref={el => sectionsRef.current[6] = el} className="mb-12">
          <div className="bg-black/70 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-green-300 mb-4 flex items-center">
              <span className="text-green-500 mr-2">[07]</span>
              Conclusion: The Power of DeFi Mathematics
            </h2>

            <InfoBox type="success" title="KEY TAKEAWAYS">
              <p className="mb-3">
                The StakingRewards contract demonstrates how mathematics powers decentralized finance. 
                By using formulas to calculate rewards proportionally to stake and time, it creates a 
                fair system where users are incentivized to provide liquidity.
              </p>
              
              <p>
                Understanding these mathematical principles helps you become a more informed DeFi 
                participant and potentially a smart contract developer yourself!
              </p>
            </InfoBox>

            <div className="border-t border-green-500/20 mt-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 ml-2 text-sm">SESSION TERMINATED</span>
                </div>
                <button 
                  onClick={() => setIsCalculatorOpen(true)}
                  className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded text-sm transition-colors border border-green-500/30"
                >
                  Try Calculator
                </button>
              </div>
              <div className="text-xs text-green-400/60 mt-1">
                root@5R1B4BU:~$ <span className="animate-pulse">█</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Calculator Modal */}
      {isCalculatorOpen && <Calculator />}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        
        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          pre {
            font-size: 0.75rem;
          }
          
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default StakingRewardsBlog;