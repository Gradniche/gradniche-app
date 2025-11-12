
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
        <section id="f1-prep-feature" className="py-20 bg-gray-900/50">
            <div className="container mx-auto px-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-8 md:p-12 lg:flex lg:items-center lg:space-x-12 border border-[#F6520C]/20">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Ace Your F-1 Visa Interview</h2>
                        <p className="text-lg text-gray-400 mt-4 mb-6">
                            The final step to your US study dream is the visa interview. Practice with our AI-powered mock interview tool that simulates a real conversation with a consular officer. Get confident, prepare your answers, and walk into your interview ready to succeed.
                        </p>
                        <a 
                            href="#/tools/f1-visa-prep"
                            onClick={(e) => { e.preventDefault(); navigate('/tools/f1-visa-prep'); }} 
                            className="inline-block bg-[#F6520C] text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#E84A00]"
                        >
                            Start Practicing Now
                        </a>
                    </div>
                    <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center items-center">
                        <div className="relative w-56 h-56 sm:w-64 sm:h-64">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#F6520C]/30 to-transparent rounded-full animate-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center p-4 transform transition-transform duration-500 hover:scale-110">
                                <img 
                                    src={generateAvatarUrl(visaOfficerAvatarConfig)} 
                                    alt="AI Visa Officer Avatar" 
                                    className="w-full h-full rounded-full bg-gray-800/50 border-4 border-white/10 shadow-lg" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default F1VisaPrepFeature;
