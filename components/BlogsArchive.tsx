
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
    <section className="py-24 relative bg-[#050a14] min-h-screen overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16">
            <button onClick={onBack} className="bg-white/5 backdrop-blur-md text-white hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full py-2 px-5 border border-white/10 hover:border-blue-500/50 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Back to Home</span>
            </button>
            <div className="relative w-full md:w-auto">
               <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full md:w-64 pl-10 p-2.5 backdrop-blur-md transition-all duration-300 focus:bg-white/10"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
            </div>
        </div>

        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">Knowledge Base</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Insight</span> Hub
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Expert guides, data-driven analysis, and real student stories for the 2026 intake.
          </p>
        </div>

        <div className="flex overflow-x-auto pb-4 md:flex-wrap md:justify-center gap-3 mb-12 md:mb-16 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {categories.map(cat => (
                <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${selectedCategory === cat ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white hover:bg-white/10 backdrop-blur-md'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="space-y-12">
            {featuredPost && (
                <a 
                    href={`/blogs/${featuredPost.id}`}
                    onClick={(e) => { if(navigate) { e.preventDefault(); navigate(`/blogs/${featuredPost.id}`); } }}
                    className="block group relative rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 shadow-2xl hover:shadow-blue-500/10"
                >
                    <div className="grid lg:grid-cols-2 h-full">
                        <div className="relative h-72 lg:h-auto overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] to-transparent opacity-60 z-10 lg:hidden"></div>
                            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                        </div>
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative backdrop-blur-xl">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#050a14]/50 to-[#050a14] pointer-events-none lg:hidden"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="bg-blue-600/10 text-blue-400 border border-blue-500/20 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">{featuredPost.category}</span>
                                    <span className="text-gray-400 text-sm font-medium">{featuredPost.readTime}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight group-hover:text-blue-400 transition-colors duration-300">{featuredPost.title}</h2>
                                <p className="text-gray-400 text-lg mb-8 line-clamp-3 font-light leading-relaxed">{featuredPost.excerpt}</p>
                                <div className="flex items-center text-white font-semibold group/btn">
                                    <span className="group-hover/btn:text-blue-400 transition-colors">Read Article</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover/btn:translate-x-2 transition-transform text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
                        href={`/blogs/${post.id}`}
                        onClick={(e) => { if(navigate) { e.preventDefault(); navigate(`/blogs/${post.id}`); } }}
                        className="group flex flex-col bg-white/[0.02] backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/5"
                        style={{ animation: `fadeIn 0.5s ease-out forwards`, animationDelay: `${index * 0.1}s`, opacity: 0 }}
                    >
                        <div className="relative h-56 overflow-hidden m-2 rounded-2xl">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                            <span className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-wider">
                                {post.category}
                            </span>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 tracking-tight group-hover:text-blue-400 transition-colors duration-300">{post.title}</h3>
                            <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow font-light leading-relaxed">{post.excerpt}</p>
                            <div className="mt-auto pt-6 border-t border-white/5 text-sm text-gray-500 flex justify-between items-center">
                                <div className="flex items-center font-medium">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-3 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                                    <span className="text-gray-300">{post.author}</span>
                                </div>
                                <span>{post.date} &bull; {post.readTime}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            
            {filteredPosts.length === 0 && (
                <div className="text-center py-24 bg-white/[0.02] rounded-3xl border border-white/5 backdrop-blur-md">
                    <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl text-white font-bold mb-3 tracking-tight">No articles found</h3>
                    <p className="text-gray-400 font-light">Try adjusting your search or category filter.</p>
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
