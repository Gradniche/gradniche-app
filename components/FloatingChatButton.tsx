import React from 'react';

interface FloatingChatButtonProps {
    onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-gradient-to-r from-orange-500 to-[#F6520C] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#F6520C]/50 z-40"
            aria-label="Open AI Assistant"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        </button>
    );
};

export default FloatingChatButton;