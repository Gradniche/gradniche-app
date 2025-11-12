import React, { useState, useEffect, useRef } from 'react';
import { getAIChatResponseStream, ChatMessage } from '../services/geminiService';

interface AIStudyAbroadAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    context: string;
}

const AIStudyAbroadAssistant: React.FC<AIStudyAbroadAssistantProps> = ({ isOpen, onClose, context }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([
                { role: 'model', parts: [{ text: "Hi! I'm your GradNiche AI assistant. How can I help you plan your study abroad journey today?" }] }
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: userInput }] };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const stream = await getAIChatResponseStream(messages, userInput, context);
            let fullResponse = '';
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

            for await (const chunk of stream) {
                fullResponse += chunk;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', parts: [{ text: fullResponse }] };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: "I'm sorry, I'm having trouble connecting right now. Please try again later." }] }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    const userAvatarUrl = 'https://api.dicebear.com/7.x/adventurer/svg?seed=guest';
        
    const aiAvatarUrl = 'https://api.dicebear.com/7.x/adventurer/svg?seed=gradniche-ai-assistant&hair=short01&accessories=glasses&skinColor=F5C6A0&accessoriesProbability=100';

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div
                className="bg-gray-900/80 backdrop-blur-xl border border-[#F6520C]/30 w-full h-full rounded-none md:max-w-lg md:h-[90vh] md:max-h-[700px] md:rounded-2xl shadow-2xl flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-700/50">
                    <div className="flex items-center space-x-3">
                         <div className="p-2 bg-gray-800 rounded-full ring-2 ring-[#F6520C]/50">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846-.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-white">AI Study Abroad Assistant</h2>
                            <p className="text-xs text-green-400 flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>Online</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors rounded-full p-2 hover:bg-gray-700/50">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto modern-scrollbar space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                           {msg.role === 'model' && <img src={aiAvatarUrl} alt="AI Assistant" className="w-8 h-8 rounded-full bg-gray-700" />}
                            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-[#F6520C] text-white rounded-br-none' : 'bg-gray-700/50 backdrop-blur-sm text-gray-300 rounded-bl-none'}`}>
                                <p className="text-sm" dangerouslySetInnerHTML={{__html: msg.parts[0].text.replace(/\n/g, '<br />')}}></p>
                            </div>
                            {msg.role === 'user' && (
                                <img 
                                    src={userAvatarUrl} 
                                    alt={'Guest'} 
                                    className="w-8 h-8 rounded-full" 
                                />
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                            <img src={aiAvatarUrl} alt="AI Assistant" className="w-8 h-8 rounded-full bg-gray-700" />
                            <div className="bg-gray-700/50 backdrop-blur-sm p-3 rounded-2xl rounded-bl-none flex items-center space-x-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                {/* Input */}
                <div className="p-4 border-t border-gray-700/50">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask about universities, destinations..."
                            className="flex-1 px-4 py-3 bg-gray-800/60 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white text-sm"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-[#F6520C] text-white p-3 rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-110 disabled:bg-gray-600 disabled:scale-100" disabled={isLoading || !userInput.trim()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                    </form>
                </div>
            </div>
            {/* FIX: Removed non-standard "jsx" prop from style tag for compatibility with standard React. */}
            <style>{`
              @keyframes scale-in {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
              .animate-scale-in {
                animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>
        </div>
    );
};

export default AIStudyAbroadAssistant;