import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { number: "01", title: 'AI-Powered Counselling', description: 'We understand your profile and aspirations through an advanced assessment.' },
  { number: "02", title: 'Data-Driven Shortlisting', description: 'Our AI suggests the best-fit country, university, and course for you.' },
  { number: "03", title: 'Optimized Application', description: 'We guide you through a streamlined, error-free application process.' },
  { number: "04", title: 'Strategic Visa Prep', description: 'Expert assistance and mock interviews for a high success rate.' },
  { number: "05", title: 'Smart Departure', description: 'Pre-departure guidance to ensure a smooth transition to your new life.' },
];

const Process: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50"></div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs md:text-sm font-semibold tracking-wide text-white/90 uppercase">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Our Futurized <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">5-Step Process</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed">
            We've engineered a seamless, tech-driven pathway to your global education.
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2"></div>

          <div className="flex flex-col gap-12 md:gap-24">
            {steps.map((step, index) => (
              <motion.div 
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Side */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-[#1C1C1E]/80 backdrop-blur-2xl p-8 rounded-[32px] border border-white/10 shadow-2xl hover:bg-[#2C2C2E]/80 transition-colors duration-300">
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">{step.description}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 top-8 md:top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-black border-4 border-[#1C1C1E] flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)] z-10">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                </div>

                {/* Empty Side for Desktop Balance */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;