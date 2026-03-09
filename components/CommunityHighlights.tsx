
import React from 'react';
import { threads as allThreads, users, generateAvatarUrl } from '../data/forums';

interface CommunityHighlightsProps {
    navigate: (path: string) => void;
}

const CommunityHighlights: React.FC<CommunityHighlightsProps> = ({ navigate }) => {
    // Select a few threads to highlight
    const highlightedThreads = allThreads.slice(0, 3);

    return (
        <section id="community-highlights" className="py-24 relative bg-[#050810] overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                        <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Student Network</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>From Our Community Forums</h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Connect with fellow students, ask burning questions, and get real advice from those who've been there.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlightedThreads.map((thread, index) => {
                        const author = users.find(u => u.id === thread.authorId);
                        return (
                            <div key={thread.id} className="bg-white/[0.02] backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F6520C]/5 group" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-4 h-14 tracking-tight group-hover:text-[#F6520C] transition-colors">{thread.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-3 font-light leading-relaxed">
                                        {thread.content}
                                    </p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                                    <div className="flex items-center space-x-4">
                                        {author && <img src={generateAvatarUrl(author.avatarConfig)} alt={author.name} className="w-12 h-12 rounded-full border border-white/10" />}
                                        <div>
                                            <p className="text-sm font-bold text-white">{author?.name || 'GradNiche User'}</p>
                                            <p className="text-xs text-gray-500 font-medium">{thread.timestamp}</p>
                                        </div>
                                    </div>
                                    <div className="text-center bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                                        <span className="font-bold text-xl text-white">{thread.replies.length}</span>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Replies</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <a href="/tools/community-forums" onClick={(e) => { e.preventDefault(); navigate('/tools/community-forums'); }} className="bg-[#F6520C] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105 glow-border focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-[#F6520C]/80">
                        Join the Conversation
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CommunityHighlights;
