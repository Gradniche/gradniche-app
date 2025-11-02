import React from 'react';
import { Page } from '../App';
// FIX: Imported users and generateAvatarUrl to fetch author details by ID and display their avatar.
import { threads as allThreads, users, generateAvatarUrl } from '../data/forums';

interface CommunityHighlightsProps {
    navigateTo: (page: Page) => void;
}

const CommunityHighlights: React.FC<CommunityHighlightsProps> = ({ navigateTo }) => {
    // Select a few threads to highlight
    const highlightedThreads = allThreads.slice(0, 3);

    return (
        <section id="community-highlights" className="py-20 bg-[#0a101f]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">From Our Community Forums</h2>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        Connect with fellow students, ask burning questions, and get real advice from those who've been there.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlightedThreads.map((thread, index) => {
                        // FIX: Find the author using the authorId from the thread object.
                        const author = users.find(u => u.id === thread.authorId);
                        return (
                            <div key={thread.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-[#F6520C]/50 transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-xl hover:shadow-[#F6520C]/10" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-white mb-3 h-14">{thread.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-3">
                                        {thread.content}
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        {/* FIX: Added author avatar for UI consistency. */}
                                        {author && <img src={generateAvatarUrl(author.avatarConfig)} alt={author.name} className="w-10 h-10 rounded-full" />}
                                        <div>
                                            {/* FIX: Used author's name from the found user object. */}
                                            <p className="text-sm font-semibold text-white">{author?.name || 'GradNiche User'}</p>
                                            <p className="text-xs text-gray-500">{thread.timestamp}</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <span className="font-bold text-xl text-white">{thread.replies.length}</span>
                                        <p className="text-xs text-gray-500">Replies</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <button onClick={() => navigateTo('community-forums')} className="bg-[#F6520C] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105 glow-border focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-[#F6520C]/80">
                        Join the Conversation
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CommunityHighlights;