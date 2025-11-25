
import React, { useState, useMemo } from 'react';
import { blogPosts } from '../data/blogs';

interface BlogsArchiveProps {
    onBack: () => void;
    navigate?: (path: string) => void;
}

const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

const BlogsArchive: React.FC<BlogsArchiveProps> = ({ onBack, navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <section className="py-20 bg-[#0a101f] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
            <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to Home</span>
            </button>
            <div className="relative hidden md:block">
               <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/50 border border-gray-700 text-gray-300 text-sm rounded-full focus:ring-[#F6520C] focus:border-[#F6520C] block w-64 pl-10 p-2.5"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
            </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6520C] to-orange-500">Insight</span> Hub
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert guides, data-driven analysis, and real student stories for the 2026 intake.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
                <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${selectedCategory === cat ? 'bg-[#F6520C] border-[#F6520C] text-white shadow-[0_0_15px_rgba(246,82,12,0.4)]' : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="space-y-12">
            {featuredPost && (
                <a 
                    href={`#/blogs/${featuredPost.id}`}
                    onClick={(e) => { if(navigate) { e.preventDefault(); navigate(`/blogs/${featuredPost.id}`); } }}
                    className="block group relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl hover:shadow-[0_0_30px_rgba(246,82,12,0.15)] transition-all duration-500"
                >
                    <div className="grid md:grid-cols-2 h-full">
                        <div className="relative h-64 md:h-auto overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10 md:hidden"></div>
                            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900/50 to-gray-900 pointer-events-none md:hidden"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="bg-[#F6520C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{featuredPost.category}</span>
                                    <span className="text-gray-400 text-sm">{featuredPost.readTime}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-[#F6520C] transition-colors">{featuredPost.title}</h2>
                                <p className="text-gray-400 text-lg mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                                <div className="flex items-center text-gray-300 font-medium">
                                    <span>Read Article</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                    <a 
                        key={post.id} 
                        href={`#/blogs/${post.id}`}
                        onClick={(e) => { if(navigate) { e.preventDefault(); navigate(`/blogs/${post.id}`); } }}
                        className="group flex flex-col bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-[#F6520C]/50 transition-all duration-300 hover:-translate-y-1"
                        style={{ animation: `fadeIn 0.5s ease-out forwards`, animationDelay: `${index * 0.1}s`, opacity: 0 }}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                                {post.category}
                            </span>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#F6520C] transition-colors">{post.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                            <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500 flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mr-2"></div>
                                    <span>{post.author}</span>
                                </div>
                                <span>{post.date} &bull; {post.readTime}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            
            {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-2xl text-white font-bold mb-2">No articles found</h3>
                    <p className="text-gray-400">Try adjusting your search or category filter.</p>
                </div>
            )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default BlogsArchive;
