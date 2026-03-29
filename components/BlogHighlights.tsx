
import React from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogs';

interface BlogHighlightsProps {
    navigate: (path: string) => void;
}

const BlogHighlights: React.FC<BlogHighlightsProps> = ({ navigate }) => {
    const latestPosts = blogPosts.slice(0, 3);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section id="blog-highlights" className="py-32 relative bg-[#050a14] overflow-hidden">
            {/* Subtle background elements */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            ></motion.div>
            <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.03, 0.06, 0.03],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"
            ></motion.div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8">
                            <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">Latest Insights</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
                            GradNiche <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Insights.</span>
                        </h2>
                        <p className="text-gray-400 text-lg font-light max-w-xl">Expert tips and student stories for your 2026 journey.</p>
                    </motion.div>
                    <motion.button 
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/blogs')} 
                        className="group flex items-center gap-4 bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] text-white px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg"
                    >
                        <span className="font-semibold tracking-wide">View All Articles</span>
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                    </motion.button>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {latestPosts.map((post) => (
                        <motion.a 
                            key={post.id} 
                            href={`/blogs/${post.id}`} 
                            onClick={(e) => { e.preventDefault(); navigate(`/blogs/${post.id}`); }}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="group flex flex-col bg-white/[0.02] backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 shadow-2xl h-full"
                        >
                            <div className="relative h-64 overflow-hidden m-3 rounded-[2rem]">
                                <motion.img 
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                                <span className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/10 uppercase tracking-wider">
                                    {post.category}
                                </span>
                            </div>
                            
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow font-light leading-relaxed">{post.excerpt}</p>
                                <div className="mt-auto pt-6 flex justify-between items-center text-sm text-gray-500 border-t border-white/5">
                                    <span className="flex items-center font-medium">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                                        <span className="text-gray-300">{post.author}</span>
                                    </span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BlogHighlights;
