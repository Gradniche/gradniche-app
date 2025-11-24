
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
        <section id="f1-prep-feature" className="py-20">
            <div className="container mx-auto px-6">
                <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden border border-white/10">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <div className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-orange-300 text-sm font-semibold mb-4">
                                🚀 New AI Feature
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Ace Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">F-1 Visa Interview</span>
                            </h2>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                The final step to your US study dream is the visa interview. Practice with our AI-powered mock interview tool that simulates a real conversation with a consular officer. Get confident, prepare your answers, and walk into your interview ready to succeed.
                            </p>
                            <a 
                                href="#/tools/f1-visa-prep"
                                onClick={(e) => { e.preventDefault(); navigate('/tools/f1-visa-prep'); }} 
                                className="inline-flex items-center justify-center bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
                            >
                                Start Practicing Now
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                        
                        <div className="lg:w-1/2 flex justify-center">
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-full border border-white/20 shadow-2xl flex items-center justify-center animate-[float_6s_ease-in-out_infinite]">
                                    <img 
                                        src={generateAvatarUrl(visaOfficerAvatarConfig)} 
                                        alt="AI Visa Officer Avatar" 
                                        className="w-[90%] h-[90%] rounded-full object-cover shadow-inner" 
                                    />
                                    {/* Floating Badge */}
                                    <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold flex items-center animate-bounce">
                                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
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
