
import React from 'react';
import { blogPosts } from '../data/blogs';

interface BlogHighlightsProps {
    navigate: (path: string) => void;
}

const BlogHighlights: React.FC<BlogHighlightsProps> = ({ navigate }) => {
    const latestPosts = blogPosts.slice(0, 3);

    return (
        <section id="blog-highlights" className="py-24 bg-[#0a101f]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">GradNiche Insights</h2>
                        <p className="text-gray-400 text-lg">Expert tips and student stories for your 2026 journey.</p>
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
                            className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-[#F6520C]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#F6520C]/10 flex flex-col h-full"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                                <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                                    {post.category}
                                </span>
                            </div>
                            
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#F6520C] transition-colors">
                                    {post.title}
                                </h3>
                                <div className="mt-auto pt-4 flex justify-between items-center text-sm text-gray-500 border-t border-gray-800">
                                    <span className="flex items-center">
                                        <span className="w-2 h-2 bg-[#F6520C] rounded-full mr-2"></span>
                                        {post.author}
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
