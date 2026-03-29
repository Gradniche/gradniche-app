import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, ArrowRight, Sparkles } from 'lucide-react';

interface CoreToolsProps {
    navigate: (path: string) => void;
}

const CoreTools: React.FC<CoreToolsProps> = ({ navigate }) => {
  return (
    <section id="core-tools" className="py-16 md:py-32 relative bg-[#020408] overflow-hidden">
      {/* Cinematic Background Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[80%] h-[80%] md:w-[50%] md:h-[50%] bg-blue-900/10 blur-[100px] md:blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[80%] h-[80%] md:w-[50%] md:h-[50%] bg-blue-900/10 blur-[100px] md:blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 space-y-24 md:space-y-40 max-w-7xl">
        
        {/* Tool 1: College Finder */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-1/2 order-2 lg:order-1"
            >
                <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md mb-6 md:mb-8 shadow-[0_0_30px_rgba(255,255,255,0.02)_inset]">
                    <Search className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-gray-300 uppercase">Smart Discovery</span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tighter leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Find the perfect <br className="hidden md:block" />
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200 pr-4">university match.</span>
                </h2>
                <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-10 font-light leading-relaxed max-w-lg">
                    Stop endlessly scrolling through outdated forums. Our AI-driven College Finder uses real-time global data to match your unique profile with thousands of programs instantly.
                </p>
                
                <motion.button 
                    onClick={() => navigate('/college-finder')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 font-medium text-white bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                >
                    <span className="relative z-10 flex items-center gap-3 tracking-wide text-sm md:text-base">
                        Launch Finder
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-1/2 order-1 lg:order-2 relative perspective-1000 w-full"
            >
                {/* Cinematic Glow Behind Mockup */}
                <div className="absolute inset-0 bg-blue-500/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
                
                <motion.div 
                    whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative bg-[#0a0d14]/80 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-2xl transform-gpu overflow-hidden"
                >
                    {/* Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none"></div>
                    
                    {/* Abstract UI Mockup */}
                    <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 border-b border-white/5 pb-4 md:pb-6">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/20"></div>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/20"></div>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/20"></div>
                    </div>
                    <div className="space-y-4 md:space-y-6 relative z-10">
                        <div className="h-12 md:h-14 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl w-full flex items-center px-4 md:px-6 shadow-inner">
                            <Search className="w-4 h-4 md:w-5 md:h-5 text-white/40 mr-3 md:mr-4" />
                            <div className="h-1.5 md:h-2 bg-white/20 rounded-full w-1/3"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            <motion.div 
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="h-32 md:h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-xl md:rounded-2xl border border-white/10 p-4 md:p-6 shadow-lg backdrop-blur-md"
                            >
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/20 mb-3 md:mb-4 flex items-center justify-center">
                                    <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-full"></div>
                                </div>
                                <div className="h-2 md:h-3 bg-white/20 rounded-full w-2/3 mb-2 md:mb-3"></div>
                                <div className="h-1.5 md:h-2 bg-white/10 rounded-full w-full mb-1.5 md:mb-2"></div>
                                <div className="h-1.5 md:h-2 bg-white/10 rounded-full w-4/5"></div>
                            </motion.div>
                            <motion.div 
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="h-32 md:h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-xl md:rounded-2xl border border-white/10 p-4 md:p-6 shadow-lg backdrop-blur-md"
                            >
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-500/20 mb-3 md:mb-4 flex items-center justify-center">
                                    <div className="w-3 h-3 md:w-4 md:h-4 bg-indigo-400 rounded-full"></div>
                                </div>
                                <div className="h-2 md:h-3 bg-white/20 rounded-full w-3/4 mb-2 md:mb-3"></div>
                                <div className="h-1.5 md:h-2 bg-white/10 rounded-full w-full mb-1.5 md:mb-2"></div>
                                <div className="h-1.5 md:h-2 bg-white/10 rounded-full w-5/6"></div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>

        {/* Tool 2: SOP Generator */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-1/2 relative perspective-1000 w-full"
            >
                {/* Cinematic Glow Behind Mockup */}
                <div className="absolute inset-0 bg-blue-500/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
                
                <motion.div 
                    whileHover={{ rotateY: 5, rotateX: 5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative bg-[#0a0d14]/80 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-[2rem] p-6 md:p-8 shadow-2xl transform-gpu overflow-hidden"
                >
                    {/* Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/5 to-transparent opacity-50 pointer-events-none"></div>
                    
                    {/* Abstract UI Mockup */}
                    <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-white/5 pb-4 md:pb-6">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <PenTool className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                            </div>
                            <div className="h-2 md:h-3 bg-white/20 rounded-full w-20 md:w-24"></div>
                        </div>
                        <div className="w-16 md:w-20 h-5 md:h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            <div className="w-8 md:w-12 h-1 md:h-1.5 bg-white/20 rounded-full"></div>
                        </div>
                    </div>
                    
                    <div className="space-y-3 md:space-y-4 relative z-10">
                        <motion.div 
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-3 md:h-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 md:mb-8 border border-white/5"
                        ></motion.div>
                        
                        <div className="space-y-2 md:space-y-3">
                            <div className="h-2 md:h-3 bg-white/10 rounded-full w-full"></div>
                            <div className="h-2 md:h-3 bg-white/10 rounded-full w-11/12"></div>
                            <div className="h-2 md:h-3 bg-white/10 rounded-full w-full"></div>
                            <div className="h-2 md:h-3 bg-white/10 rounded-full w-4/5"></div>
                            <div className="h-2 md:h-3 bg-white/10 rounded-full w-full"></div>
                            <div className="h-2 md:h-3 bg-white/10 rounded-full w-3/4"></div>
                        </div>
                        
                        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/5 flex justify-end">
                            <div className="w-20 md:w-24 h-6 md:h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                <div className="w-10 md:w-12 h-1.5 md:h-2 bg-blue-400/50 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-1/2"
            >
                <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md mb-6 md:mb-8 shadow-[0_0_30px_rgba(255,255,255,0.02)_inset]">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-gray-300 uppercase">AI Writing Assistant</span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tighter leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Craft a winning <br className="hidden md:block" />
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300 pr-4">Statement of Purpose.</span>
                </h2>
                <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-10 font-light leading-relaxed max-w-lg">
                    Your story deserves to be heard. Our Premium SOP Generator helps you articulate your ambitions, experiences, and goals into a compelling narrative that admissions committees love.
                </p>
                
                <motion.button 
                    onClick={() => navigate('/tools/sop-generator')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 font-medium text-white bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                >
                    <span className="relative z-10 flex items-center gap-3 tracking-wide text-sm md:text-base">
                        Start Writing
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
            </motion.div>
        </div>

      </div>
    </section>
  );
};

export default CoreTools;
