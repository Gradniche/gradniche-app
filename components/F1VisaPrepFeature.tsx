
import React from 'react';
import { AvatarConfig, generateAvatarUrl } from '../data/forums';

interface F1VisaPrepFeatureProps {
    navigate: (path: string) => void;
}

const F1VisaPrepFeature: React.FC<F1VisaPrepFeatureProps> = ({ navigate }) => {
    const visaOfficerAvatarConfig: AvatarConfig = { 
        style: 'adventurer', 
        options: { 
            seed: 'gradniche-visa-officer', 
            hair: 'short03', 
            eyes: 'variant02', 
            skinColor: 'D88C7A', 
            hairColor: '2c1b18', 
            clothing: 'blazer', 
            clothingColor: '394867'
        } 
    };

    return (
        <section id="f1-prep-feature" className="py-24 relative bg-[#050810] overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="relative bg-white/[0.02] rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden border border-white/5 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                                <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">🚀 New AI Feature</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Ace Your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F6520C] to-orange-400">F-1 Visa</span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-400 mb-8 font-light leading-relaxed">
                                The final step to your US study dream is the visa interview. Practice with our AI-powered mock interview tool that simulates a real conversation with a consular officer. Get confident, prepare your answers, and walk into your interview ready to succeed.
                            </p>
                            <a 
                                href="#/tools/f1-visa-prep"
                                onClick={(e) => { e.preventDefault(); navigate('/tools/f1-visa-prep'); }} 
                                className="inline-flex items-center justify-center bg-[#F6520C] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#d44306] transition-all duration-300 shadow-[0_0_20px_rgba(246,82,12,0.3)] transform hover:scale-[1.02] active:scale-95"
                            >
                                Start Practicing Now
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                        
                        <div className="lg:w-1/2 flex justify-center">
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-md rounded-full border border-white/10 shadow-2xl flex items-center justify-center animate-[float_6s_ease-in-out_infinite]">
                                    <img 
                                        src={generateAvatarUrl(visaOfficerAvatarConfig)} 
                                        alt="AI Visa Officer Avatar" 
                                        className="w-[90%] h-[90%] rounded-full object-cover shadow-inner opacity-90" 
                                    />
                                    <div className="absolute -bottom-4 -right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-2xl border border-white/10 shadow-lg text-sm font-bold flex items-center animate-bounce">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                        AI Interviewer Ready
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </section>
    );
};

export default F1VisaPrepFeature;
