import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  iconSize?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "text-2xl", iconSize = "w-9 h-9" }) => {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      {/* Icon Container - Modern Glass Squircle with Sweeping Edge */}
      <div className={`relative flex items-center justify-center ${iconSize} rounded-xl bg-black/40 shadow-[0_4px_15px_rgba(0,0,0,0.5)] p-1.5 overflow-hidden group-hover:shadow-[0_4px_20px_rgba(56,189,248,0.2)] transition-all duration-500`}>
        
        {/* Sweeping Edge Glow Animation */}
        <motion.div 
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_280deg,rgba(56,189,248,0.8)_360deg)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner Dark Mask to create the border effect */}
        <div className="absolute inset-[1.5px] bg-[#050505] rounded-[10px]" />
        
        {/* Custom Abstract Graduation Cap SVG */}
        <motion.div
          animate={{ y: [-1, 1, -1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">
            <defs>
              <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" /> {/* cyan-400 */}
                <stop offset="50%" stopColor="#818cf8" /> {/* indigo-400 */}
                <stop offset="100%" stopColor="#c084fc" /> {/* purple-400 */}
              </linearGradient>
            </defs>
            
            {/* Mortarboard (Top Diamond) */}
            <motion.path 
              d="M12 3L3 7.5L12 12L21 7.5Z" 
              fill="rgba(56,189,248,0.15)" 
              stroke="url(#capGrad)" 
              strokeWidth="1.5" 
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            
            {/* Skullcap (Bottom Curve) */}
            <motion.path 
              d="M6 10.5V15C6 17.5 8.5 19.5 12 19.5C15.5 19.5 18 17.5 18 15V10.5" 
              fill="none" 
              stroke="url(#capGrad)" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
            />
            
            {/* Tassel */}
            <motion.path 
              d="M12 7.5L19 11.5V16" 
              fill="none" 
              stroke="url(#capGrad)" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
            />
            
            {/* Tassel Button/End */}
            <motion.circle 
              cx="19" cy="17.5" r="1.5" 
              fill="#c084fc"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, type: "spring", delay: 1.2 }}
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Text Animation: "Grad" static, "Niche" slides from left to right */}
      <div className={`font-bold text-white tracking-tight flex items-center ${className}`}>
        <span className="relative z-10">Grad</span>
        <div className="overflow-hidden flex items-center">
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 relative inline-block ml-[1px] py-1"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Niche
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
