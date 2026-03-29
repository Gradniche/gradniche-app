import React from 'react';
import { motion } from 'framer-motion';
import { AvatarConfig, generateAvatarUrl } from '../data/forums';

interface F1VisaPrepFeatureProps {
    navigate: (path: string) => void;
}

const F1VisaPrepFeature: React.FC<F1VisaPrepFeatureProps> = ({ navigate }) => {
    const visaOfficerAvatarConfig: AvatarConfig = { 
        style: 'adventurer', 
        options: { 
            seed: 'gradniche-visa-officer', 
            hair: 'short03', 
            eyes: 'variant02', 
            skinColor: 'D88C7A', 
            hairColor: '2c1b18', 
            clothing: 'blazer', 
            clothingColor: '394867'
        } 
    };

    return (
        <section id="f1-prep-feature" className="py-32 relative bg-[#050a14] overflow-hidden">
            {/* Dramatic Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none"
            ></motion.div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Interactive AI Experience</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter" 
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Master the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">F-1 Visa</span> Interview.
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 mb-16 font-light leading-relaxed max-w-2xl"
                    >
                        Face our AI Consular Officer. Get real-time feedback on your answers, tone, and confidence before the actual interview.
                    </motion.p>

                    {/* The Interactive Stage */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                        className="relative w-full max-w-2xl aspect-video bg-gradient-to-b from-white/[0.05] to-transparent rounded-[48px] border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden group"
                    >
                        {/* Scanning Line */}
                        <motion.div 
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-30 opacity-50"
                        ></motion.div>

                        {/* Avatar */}
                        <div className="relative z-20 w-48 h-48 rounded-full border-4 border-[#050a14] shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden bg-[#0a101f]">
                            <img 
                                src={generateAvatarUrl(visaOfficerAvatarConfig)} 
                                alt="AI Visa Officer" 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                            />
                        </div>

                        {/* Floating UI Elements */}
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 left-10 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 rounded-[24px] flex items-center gap-3 shadow-xl"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <div className="text-left">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Confidence</p>
                                <p className="text-white font-bold">92%</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-10 right-10 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 rounded-[24px] flex items-center gap-3 shadow-xl"
                        >
                            <div className="text-right">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Answer Clarity</p>
                                <p className="text-blue-400 font-bold">Excellent</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 flex flex-col sm:flex-row gap-6"
                    >
                        <button 
                            onClick={() => navigate('/tools/f1-visa-prep')}
                            className="bg-blue-600 text-white px-12 py-5 rounded-full text-lg font-bold transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:scale-105"
                        >
                            Start Mock Interview
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default F1VisaPrepFeature;
