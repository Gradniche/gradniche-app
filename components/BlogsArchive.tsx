import React from 'react';
import { blogPosts } from '../data/blogs';

interface BlogsArchiveProps {
    onBack: () => void;
}

const BlogsArchive: React.FC<BlogsArchiveProps> = ({ onBack }) => {
  return (
    <section className="py-20 bg-[#0a101f] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-8">
            <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to Home</span>
            </button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">GradNiche Insights</h1>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            Your essential resource for study abroad tips, guides, and student stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-[#F6520C] transition-all duration-300 flex flex-col group">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-[#F6520C] font-semibold mb-2">{post.category}</p>
                <h2 className="text-xl font-semibold text-white mb-3 flex-grow group-hover:text-orange-300 transition-colors">{post.title}</h2>
                <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                <div className="mt-auto border-t border-gray-700 pt-4 text-xs text-gray-500 flex justify-between items-center">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsArchive;