
import React from 'react';
import { blogPosts } from '../data/blogs';

interface BlogHighlightsProps {
    navigate: (path: string) => void;
}

const BlogHighlights: React.FC<BlogHighlightsProps> = ({ navigate }) => {
    const latestPosts = blogPosts.slice(0, 3);

    return (
        <section id="blog-highlights" className="py-24 relative bg-[#050810] overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
                            <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Latest Insights</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>GradNiche Insights</h2>
                        <p className="text-gray-400 text-lg font-light max-w-xl">Expert tips and student stories for your 2026 journey.</p>
                    </div>
                    <button 
                        onClick={() => navigate('/blogs')} 
                        className="text-[#F6520C] font-semibold hover:text-white transition-colors flex items-center group"
                    >
                        View All Articles 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestPosts.map((post, index) => (
                        <a 
                            key={post.id} 
                            href={`#/blogs/${post.id}`} 
                            onClick={(e) => { e.preventDefault(); navigate(`/blogs/${post.id}`); }}
                            className="group flex flex-col bg-white/[0.02] backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F6520C]/5 h-full"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative h-56 overflow-hidden m-2 rounded-2xl">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050810] to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                                <span className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-wider">
                                    {post.category}
                                </span>
                            </div>
                            
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 tracking-tight group-hover:text-[#F6520C] transition-colors duration-300">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow font-light leading-relaxed">{post.excerpt}</p>
                                <div className="mt-auto pt-6 flex justify-between items-center text-sm text-gray-500 border-t border-white/5">
                                    <span className="flex items-center font-medium">
                                        <span className="w-2 h-2 bg-[#F6520C] rounded-full mr-3 shadow-[0_0_8px_rgba(246,82,12,0.8)]"></span>
                                        <span className="text-gray-300">{post.author}</span>
                                    </span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogHighlights;
