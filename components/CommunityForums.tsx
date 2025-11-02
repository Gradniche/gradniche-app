import React, { useState, useEffect, useMemo, useRef } from 'react';
// FIX: Import User interface and threads data model which now includes authorId and likes.
import { categories, Thread, User, Category, Reply, threads as initialThreads, generateAvatarUrl } from '../data/forums';

interface CommunityForumsProps {
    onBack: () => void;
    currentUser: User | null;
    users: User[];
    onAddNotification: (recipientId: string, message: string, threadId: string) => void;
    activeThreadId: string | null;
    onClearActiveThreadId: () => void;
}

const CommunityForums: React.FC<CommunityForumsProps> = ({ onBack, currentUser, users, onAddNotification, activeThreadId, onClearActiveThreadId }) => {
    const [view, setView] = useState<'list' | 'thread'>('list');
    const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [threads, setThreads] = useState<Thread[]>(initialThreads);
    const [newPost, setNewPost] = useState({ title: '', categoryId: '', content: '' });
    const [replyContent, setReplyContent] = useState('');
    const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());
    const replyTextareaRef = useRef<HTMLTextAreaElement>(null);

    const getUser = (id: string): User | undefined => users.find(u => u.id === id);
    const getCategory = (id: string): Category | undefined => categories.find(c => c.id === id);

    useEffect(() => {
        const scriptId = 'qa-structured-data';
        document.getElementById(scriptId)?.remove();

        if (view === 'thread' && selectedThread) {
            // FIX: Use authorId to find the author object.
            const author = getUser(selectedThread.authorId);
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "QAPage",
                "mainEntity": {
                    "@type": "Question",
                    "name": selectedThread.title,
                    "text": selectedThread.content,
                    "answerCount": selectedThread.replies.length,
                    // FIX: Use the 'likes' property from replies.
                    "upvoteCount": selectedThread.replies.reduce((sum, r) => sum + r.likes, 0),
                    "dateCreated": new Date().toISOString(),
                    "author": { "@type": "Person", "name": author?.name },
                    "acceptedAnswer": selectedThread.replies.length > 0 ? {
                        "@type": "Answer",
                        "text": selectedThread.replies[0].content,
                        // FIX: Use the 'likes' property from replies.
                        "upvoteCount": selectedThread.replies[0].likes,
                        "dateCreated": new Date().toISOString(),
                        // FIX: Use authorId to find the author object.
                        "author": { "@type": "Person", "name": getUser(selectedThread.replies[0].authorId)?.name }
                    } : undefined,
                    "suggestedAnswer": selectedThread.replies.slice(1).map(reply => {
                        // FIX: Use authorId to find the author object.
                        const replyAuthor = getUser(reply.authorId);
                        return {
                            "@type": "Answer",
                            "text": reply.content,
                            // FIX: Use the 'likes' property from replies.
                            "upvoteCount": reply.likes,
                            "dateCreated": new Date().toISOString(),
                            "author": { "@type": "Person", "name": replyAuthor?.name }
                        }
                    })
                }
            };
            
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            script.innerHTML = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }

        return () => { document.getElementById(scriptId)?.remove(); };
    }, [view, selectedThread]);
    
    useEffect(() => {
      if (activeThreadId) {
        const threadToOpen = threads.find(t => t.id === activeThreadId);
        if (threadToOpen) {
          handleSelectThread(threadToOpen);
        }
        onClearActiveThreadId();
      }
    }, [activeThreadId]);


    const handleSelectThread = (thread: Thread) => {
        setSelectedThread(thread);
        setView('thread');
        window.scrollTo(0,0);
    };

    const handleBackToList = () => {
        setSelectedThread(null);
        setView('list');
    };
    
    const handleCreatePost = () => {
        if (!currentUser) {
            alert("You must be logged in to create a post.");
            return;
        }
        if (!newPost.title || !newPost.categoryId || !newPost.content) {
            alert("Please fill out all fields.");
            return;
        }
        const newThread: Thread = {
            id: `t${Date.now()}`,
            title: newPost.title,
            categoryId: newPost.categoryId,
            content: newPost.content,
            // FIX: Use authorId instead of author details.
            authorId: currentUser.id,
            timestamp: 'Just now',
            replies: [],
        };
        setThreads([newThread, ...threads]);
        setIsModalOpen(false);
        setNewPost({ title: '', categoryId: '', content: '' });
    };

    const handlePostReply = () => {
        if (!currentUser || !selectedThread || !replyContent.trim()) {
            return;
        }
        const newReply: Reply = {
            id: `r${Date.now()}`,
            // FIX: Use authorId and add likes property.
            authorId: currentUser.id,
            content: replyContent,
            timestamp: 'Just now',
            likes: 0,
        };

        const updatedThreads = threads.map(t => {
            if (t.id === selectedThread.id) {
                return { ...t, replies: [...t.replies, newReply] };
            }
            return t;
        });
        setThreads(updatedThreads);

        const updatedSelectedThread = {
            ...selectedThread,
            replies: [...selectedThread.replies, newReply]
        };
        setSelectedThread(updatedSelectedThread);
        
        setReplyContent('');

        // Add notification for thread author
        // FIX: Use authorId to find author.
        const threadAuthor = getUser(selectedThread.authorId);
        if (threadAuthor && threadAuthor.id !== currentUser.id) {
            onAddNotification(
                threadAuthor.id,
                `${currentUser.name} replied to your thread: "${selectedThread.title}"`,
                selectedThread.id
            );
        }
    };

     const handleLikeReply = (threadId: string, replyId: string) => {
        if (!currentUser) {
            alert("Please log in to like replies.");
            return;
        }

        const alreadyLiked = likedReplies.has(replyId);
        const newLikedReplies = new Set(likedReplies);
        let likedReplyAuthorId: string | null = null;
        let likedThread: Thread | null = null;

        const updatedThreads = threads.map(thread => {
            if (thread.id === threadId) {
                likedThread = thread;
                const updatedReplies = thread.replies.map(reply => {
                    if (reply.id === replyId) {
                        // FIX: Use authorId.
                        likedReplyAuthorId = reply.authorId;
                        if (alreadyLiked) {
                            newLikedReplies.delete(replyId);
                            // FIX: Use likes property.
                            return { ...reply, likes: reply.likes - 1 };
                        } else {
                            newLikedReplies.add(replyId);
                            // FIX: Use likes property.
                            return { ...reply, likes: reply.likes + 1 };
                        }
                    }
                    return reply;
                });
                return { ...thread, replies: updatedReplies };
            }
            return thread;
        });
        setThreads(updatedThreads);
        setLikedReplies(newLikedReplies);

        if (selectedThread && selectedThread.id === threadId) {
            const updatedReplies = selectedThread.replies.map(reply => {
                 if (reply.id === replyId) {
                    if (alreadyLiked) {
                        // FIX: Use likes property.
                        return { ...reply, likes: reply.likes - 1 };
                    } else {
                        // FIX: Use likes property.
                        return { ...reply, likes: reply.likes + 1 };
                    }
                }
                return reply;
            });
            setSelectedThread({ ...selectedThread, replies: updatedReplies });
        }
        
        // Add notification for reply author
        if (!alreadyLiked && likedReplyAuthorId && likedThread && likedReplyAuthorId !== currentUser.id) {
            onAddNotification(
                likedReplyAuthorId,
                `${currentUser.name} liked your reply in: "${likedThread.title}"`,
                threadId
            );
        }
    };

    const applyFormat = (formatType: 'bold' | 'italic' | 'code') => {
        const textarea = replyTextareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        let prefix = '';
        let suffix = '';
        let newCursorPos = 0;

        switch (formatType) {
            case 'bold':
                prefix = '**';
                suffix = '**';
                newCursorPos = start + 2;
                break;
            case 'italic':
                prefix = '*';
                suffix = '*';
                newCursorPos = start + 1;
                break;
            case 'code':
                prefix = '```\n';
                suffix = '\n```';
                newCursorPos = start + 4;
                break;
        }

        const newText = 
            textarea.value.substring(0, start) + 
            prefix + 
            selectedText + 
            suffix + 
            textarea.value.substring(end);
        
        setReplyContent(newText);

        textarea.focus();
        setTimeout(() => {
             if (selectedText) {
                 textarea.setSelectionRange(start + prefix.length, end + prefix.length);
             } else {
                 textarea.setSelectionRange(newCursorPos, newCursorPos);
             }
        }, 0);
    };

    const formatContent = (text: string): { __html: string } => {
        let escapedText = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        const codeBlocks: string[] = [];
        escapedText = escapedText.replace(/```([\s\S]*?)```/g, (match, code) => {
            const codeHtml = `<pre class="bg-gray-900 p-3 rounded-md text-sm text-cyan-300 overflow-x-auto modern-scrollbar"><code>${code.trim()}</code></pre>`;
            codeBlocks.push(codeHtml);
            return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
        });
        
        escapedText = escapedText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        escapedText = escapedText.replace(/\n/g, '<br />');

        escapedText = escapedText.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => {
            return codeBlocks[parseInt(index, 10)];
        });

        return { __html: escapedText };
    };

    const filteredThreads = useMemo(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return threads
            .filter(thread => activeCategory === 'all' || thread.categoryId === activeCategory)
            .filter(thread => 
                !lowercasedQuery ||
                thread.title.toLowerCase().includes(lowercasedQuery) ||
                thread.content.toLowerCase().includes(lowercasedQuery)
            );
    }, [threads, activeCategory, searchQuery]);


    const renderThreadList = () => (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-white">Discussions</h2>
                {currentUser && (
                    <button onClick={() => setIsModalOpen(true)} className="bg-[#F6520C] text-white px-5 py-2 rounded-md font-semibold hover:bg-opacity-90 transition transform hover:scale-105 w-full md:w-auto">
                        Start New Discussion
                    </button>
                )}
            </div>
            
            <div className="mb-6 relative">
                 <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search discussions by title or content..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700 pb-4">
                <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 text-sm font-medium rounded-full transition ${activeCategory === 'all' ? 'bg-[#F6520C] text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'}`}>All</button>
                {categories.map(cat => (
                     <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 text-sm font-medium rounded-full transition ${activeCategory === cat.id ? 'bg-[#F6520C] text-white' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'}`}>{cat.name}</button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredThreads.map(thread => {
                    // FIX: Use authorId to find the author object.
                    const author = getUser(thread.authorId);
                    const category = getCategory(thread.categoryId);
                    if (!author) return null;
                    return (
                        <button key={thread.id} onClick={() => handleSelectThread(thread)} className="w-full text-left bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-[#F6520C]/50 transition flex items-start space-x-4">
                            <img src={generateAvatarUrl(author.avatarConfig)} alt={author?.name} className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                 <div className="flex items-center space-x-2">
                                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-700 text-gray-300">{category?.name}</span>
                                    {author?.role === 'admin' && (
                                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300">Admin Post</span>
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold text-white mt-1">{thread.title}</h3>
                                <p className="text-sm text-gray-400">By {author?.name} &middot; {thread.timestamp}</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <span className="text-2xl font-bold text-white">{thread.replies.length}</span>
                                <span className="text-xs text-gray-400">Replies</span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </>
    );

    const renderThreadView = () => {
        if (!selectedThread) return null;
        // FIX: Use authorId to find the author object.
        const author = getUser(selectedThread.authorId);
        if (!author) return null;
        return (
             <div className="animate-fade-in">
                <button onClick={handleBackToList} className="text-[#F6520C] hover:text-orange-400 flex items-center space-x-2 mb-6">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                     <span>Back to Discussions</span>
                 </button>
                 
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{selectedThread.title}</h1>
                
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-[#F6520C]/50 mb-8 shadow-lg">
                    <div className="flex items-start space-x-4">
                        <img src={generateAvatarUrl(author.avatarConfig)} alt={author.name} className="w-12 h-12 rounded-full" />
                        <div>
                            <p className="font-semibold text-white flex items-center">
                                {author?.name} 
                                <span className="ml-2 text-xs text-orange-200 bg-orange-500/20 px-2 py-0.5 rounded-full font-semibold">Original Poster</span>
                                {author?.role === 'admin' && (
                                     <span className="ml-2 text-xs bg-yellow-500 text-black font-bold px-2 py-0.5 rounded-full">Admin</span>
                                )}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{selectedThread.timestamp}</p>
                        </div>
                    </div>
                    <div className="text-gray-300 mt-4" dangerouslySetInnerHTML={formatContent(selectedThread.content)}></div>
                </div>


                {/* Replies */}
                <div className="space-y-4">
                    {selectedThread.replies.length > 0 && 
                        <h3 className="text-xl font-semibold text-white mb-2">{selectedThread.replies.length} Replies</h3>
                    }
                    {selectedThread.replies.map(reply => {
                        // FIX: Use authorId to find author object.
                        const replyAuthor = getUser(reply.authorId);
                        if (!replyAuthor) return null;
                        // FIX: Check authorId against thread's authorId.
                        const isOPReply = reply.authorId === selectedThread.authorId;
                        return (
                             <div key={reply.id} className={`p-4 rounded-lg border transition-colors ${replyAuthor?.role === 'admin' ? 'bg-green-900/20 border-green-500/30' : (isOPReply ? 'bg-orange-900/20 border-[#F6520C]/30' : 'bg-gray-800/50 border-gray-700')}`}>
                                 <div className="flex items-start space-x-4">
                                     <img src={generateAvatarUrl(replyAuthor.avatarConfig)} alt={replyAuthor.name} className="w-10 h-10 rounded-full" />
                                    <div className="flex-1">
                                        {replyAuthor?.role === 'admin' ? (
                                            <p className="font-semibold text-white flex items-center">
                                                <span className="text-green-300">Reply from GradNiche Mentor</span>
                                                <span className="ml-2 text-xs bg-yellow-500 text-black font-bold px-2 py-0.5 rounded-full">Admin</span>
                                                <span className="text-xs text-gray-500 font-normal ml-2">&middot; {reply.timestamp}</span>
                                            </p>
                                        ) : (
                                            <p className="font-semibold text-white flex items-center">
                                                {replyAuthor?.name}
                                                {isOPReply && <span className="ml-2 text-xs text-orange-300 bg-orange-500/20 px-2 py-0.5 rounded-full font-medium">OP</span>}
                                                <span className="text-xs text-gray-500 font-normal ml-2">&middot; {reply.timestamp}</span>
                                            </p>
                                        )}
                                        <div className="text-gray-300 mt-2" dangerouslySetInnerHTML={formatContent(reply.content)}></div>
                                    </div>
                                 </div>
                                 <div className="flex items-center space-x-4 mt-3 pl-14 text-gray-400">
                                    <button
                                        onClick={() => handleLikeReply(selectedThread.id, reply.id)}
                                        disabled={!currentUser}
                                        className={`flex items-center space-x-1.5 text-sm hover:text-[#F6520C] disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${likedReplies.has(reply.id) ? 'text-[#F6520C] font-semibold' : ''}`}
                                        aria-label={`Like reply by ${replyAuthor?.name}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.562 8H12V4a2 2 0 00-2-2v1.293a1 1 0 01-1.707 0L6.5 2.5a1 1 0 00-1 0V10.333z" />
                                        </svg>
                                        {/* FIX: Use likes property. */}
                                        <span>{reply.likes > 0 ? reply.likes : 'Like'}</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Reply Box */}
                {currentUser && (
                     <div className="mt-8 border-t border-gray-700 pt-6">
                         <h3 className="text-xl font-semibold text-white mb-3">Leave a Reply</h3>
                         <div className="bg-gray-900/50 border border-gray-600 rounded-md">
                            <div className="flex items-center space-x-1 p-2 border-b border-gray-600">
                                <button onClick={() => applyFormat('bold')} title="Bold (Ctrl+B)" className="px-3 py-1 text-sm font-bold text-gray-300 hover:bg-gray-700 rounded">B</button>
                                <button onClick={() => applyFormat('italic')} title="Italic (Ctrl+I)" className="px-3 py-1 text-sm italic text-gray-300 hover:bg-gray-700 rounded">I</button>
                                <button onClick={() => applyFormat('code')} title="Code Block" className="px-3 py-1 text-sm font-mono text-gray-300 hover:bg-gray-700 rounded">&lt;/&gt;</button>
                            </div>
                            <textarea
                                ref={replyTextareaRef}
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Write your reply here..."
                                rows={5}
                                className="w-full bg-transparent p-3 focus:outline-none text-gray-300 resize-y"
                            />
                         </div>
                         <button onClick={handlePostReply} className="mt-4 bg-[#F6520C] text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-90">Post Reply</button>
                     </div>
                )}
             </div>
        )
    };

    return (
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <div className="container mx-auto px-6">
                 <div className="mb-8">
                     <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                         <span>Back</span>
                     </button>
                 </div>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Community Forums</h1>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        Connect with fellow students, ask questions, and share your study abroad journey.
                    </p>
                </div>

                {view === 'list' ? renderThreadList() : renderThreadView()}

                 {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-gray-900/80 backdrop-blur-lg border border-[#F6520C]/50 rounded-lg shadow-xl p-8 max-w-2xl w-full">
                            <h2 className="text-2xl font-bold text-white mb-6">Start a New Discussion</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="post-title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                                    <input id="post-title" type="text" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} placeholder="Enter a descriptive title" className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                                </div>
                                <div>
                                     <label htmlFor="post-category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                     <select id="post-category" value={newPost.categoryId} onChange={e => setNewPost({...newPost, categoryId: e.target.value})} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white">
                                         <option value="" disabled>Select a category</option>
                                         {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                     </select>
                                </div>
                                <div>
                                    <label htmlFor="post-content" className="block text-sm font-medium text-gray-300 mb-1">Your Message</label>
                                    <textarea id="post-content" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} rows={8} placeholder="Write your question or thoughts here..." className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white"></textarea>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-md text-gray-400 hover:bg-gray-700 transition">Cancel</button>
                                <button onClick={handleCreatePost} className="px-6 py-2 rounded-md bg-[#F6520C] text-white hover:bg-opacity-90 transition">Create Post</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CommunityForums;