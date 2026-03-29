
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
    navigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/college-finder');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-24 bg-black">
      {/* Animated Background Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            x: mousePos.x * -1.5,
            y: mousePos.y * -1.5,
          }}
          className="absolute top-1/4 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-600/20 rounded-full blur-[100px] md:blur-[140px]"
        />
        <motion.div 
          animate={{
            x: mousePos.x * 1.2,
            y: mousePos.y * 1.2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-600/20 rounded-full blur-[100px] md:blur-[140px]"
        />
      </div>

      {/* Floating Destination Cards (Desktop only) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden lg:block">
        {/* USA */}
        <motion.div 
          style={{ y: y1, x: mousePos.x * 0.5 }}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute top-[15%] left-[5%] xl:left-[10%] w-56 h-72 rounded-[32px] border border-white/10 p-2 bg-white/5 backdrop-blur-2xl shadow-2xl"
        >
          <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-[24px] opacity-80 grayscale-[10%]" alt="USA" />
          <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full text-white text-xs font-semibold border border-white/10 flex items-center gap-2 shadow-lg">
            <span>🇺🇸</span> New York, USA
          </div>
        </motion.div>
        
        {/* UK */}
        <motion.div 
          style={{ y: y2, x: mousePos.x * -0.3 }}
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 8 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="absolute top-[20%] right-[5%] xl:right-[10%] w-64 h-48 rounded-[32px] border border-white/10 p-2 bg-white/5 backdrop-blur-2xl shadow-2xl"
        >
          <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-[24px] opacity-80 grayscale-[10%]" alt="UK" />
          <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full text-white text-xs font-semibold border border-white/10 flex items-center gap-2 shadow-lg">
            <span>🇬🇧</span> London, UK
          </div>
        </motion.div>

        {/* Australia */}
        <motion.div 
          style={{ y: y2, x: mousePos.x * 0.4 }}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="absolute bottom-[15%] left-[8%] xl:left-[12%] w-64 h-48 rounded-[32px] border border-white/10 p-2 bg-white/5 backdrop-blur-2xl shadow-2xl"
        >
          <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-[24px] opacity-80 grayscale-[10%]" alt="Australia" />
          <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full text-white text-xs font-semibold border border-white/10 flex items-center gap-2 shadow-lg">
            <span>🇦🇺</span> Sydney, AUS
          </div>
        </motion.div>

        {/* Canada */}
        <motion.div 
          style={{ y: y1, x: mousePos.x * -0.6 }}
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 6 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="absolute bottom-[20%] right-[8%] xl:right-[12%] w-56 h-72 rounded-[32px] border border-white/10 p-2 bg-white/5 backdrop-blur-2xl shadow-2xl"
        >
          <img src="https://images.unsplash.com/photo-1507992781348-310259076fe0?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-[24px] opacity-80 grayscale-[10%]" alt="Canada" />
          <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full text-white text-xs font-semibold border border-white/10 flex items-center gap-2 shadow-lg">
            <span>🇨🇦</span> Toronto, CAN
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 container mx-auto px-6 flex flex-col items-center"
      >
        
        {/* Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14 mt-10 md:mt-0">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs md:text-sm font-semibold tracking-wide text-white/90 uppercase">Your Global Education Starts Here</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-white leading-[1.05]" 
          >
            Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Abroad</span><br />
            Made Simple.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed px-4"
          >
            Discover top universities, secure scholarships, and ace your visa interviews with GradNiche's AI-powered platform.
          </motion.p>
        </div>

        {/* Floating Search Widget */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-4xl mx-auto bg-white/[0.08] backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 md:p-3 shadow-2xl shadow-black/50"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
            
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="What do you want to study?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 md:py-5 bg-white/5 md:bg-transparent rounded-[24px] md:rounded-none border-none text-white placeholder-gray-400 focus:ring-0 text-base md:text-lg outline-none transition-colors focus:bg-white/10 md:focus:bg-transparent"
              />
            </div>

            <div className="hidden md:block w-px bg-white/10 my-3"></div>

            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <select 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full pl-12 pr-10 py-4 md:py-5 bg-white/5 md:bg-transparent rounded-[24px] md:rounded-none border-none text-white focus:ring-0 text-base md:text-lg outline-none appearance-none cursor-pointer transition-colors focus:bg-white/10 md:focus:bg-transparent"
              >
                <option value="" className="text-gray-900">Any Destination</option>
                <option value="usa" className="text-gray-900">United States</option>
                <option value="uk" className="text-gray-900">United Kingdom</option>
                <option value="canada" className="text-gray-900">Canada</option>
                <option value="australia" className="text-gray-900">Australia</option>
                <option value="germany" className="text-gray-900">Germany</option>
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full md:w-auto px-8 py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 mt-2 md:mt-0"
            >
              Search
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </motion.button>
          </form>
        </motion.div>

      </motion.div>
      
      {/* Bottom Gradient to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>

      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
