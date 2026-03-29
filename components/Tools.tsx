import React from 'react';
import { motion } from 'framer-motion';

interface ToolsProps {
    navigate: (path: string) => void;
}

const toolsList = [
    { id: 'sop-analyzer', name: 'SOP Generator', icon: '📝', path: '/tools/sop-analyzer', color: 'from-blue-500 to-purple-500' },
    { id: 'f1-visa-prep', name: 'F1 Visa Prep', icon: '🎓', path: '/tools/f1-visa-prep', color: 'from-blue-500 to-cyan-500' },
    { id: 'college-finder', name: 'College Finder', icon: '🏛️', path: '/college-finder', color: 'from-purple-500 to-pink-500' },
    { id: 'scholarship-finder', name: 'Scholarships', icon: '💰', path: '/tools/scholarship-finder', color: 'from-green-500 to-emerald-500' },
    { id: 'cost-calculator', name: 'Cost Calculator', icon: '🧮', path: '/tools/cost-calculator', color: 'from-blue-500 to-purple-500' },
    { id: 'visa-guides', name: 'Visa Guides', icon: '🛂', path: '/tools/visa-guides', color: 'from-indigo-500 to-blue-500' },
    { id: 'document-checklist', name: 'Checklists', icon: '✅', path: '/tools/document-checklist', color: 'from-teal-500 to-cyan-500' },
];

const Tools: React.FC<ToolsProps> = ({ navigate }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section id="all-tools" className="py-16 md:py-32 relative bg-[#050a14] overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.02, 0.05, 0.02] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"
            ></motion.div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-12 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-6 md:mb-8">
                        <span className="text-[10px] md:text-xs font-semibold tracking-widest text-gray-300 uppercase">Complete Arsenal</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Explore the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Toolkit.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light text-sm md:text-lg px-4 md:px-0">
                        Every tool you need to research, prepare, and succeed in your study abroad journey.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto"
                >
                    {toolsList.map((tool) => (
                        <motion.button
                            key={tool.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(tool.path)}
                            className="group relative flex flex-col items-center justify-center p-5 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 overflow-hidden shadow-lg"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                            
                            <div className="text-3xl md:text-4xl mb-3 md:mb-4 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                                {tool.icon}
                            </div>
                            <span className="text-white font-medium text-xs md:text-sm tracking-wide text-center">{tool.name}</span>
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Tools;
