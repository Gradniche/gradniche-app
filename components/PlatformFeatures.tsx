import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Globe2, BookOpenText } from 'lucide-react';

const features = [
  {
    id: "01",
    title: "AI-Powered Precision",
    description: "Our proprietary AI analyzes your profile to suggest the perfect universities, refine your SOP, and prep you for visa interviews with uncanny accuracy.",
    icon: BrainCircuit,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    id: "02",
    title: "Global Database",
    description: "Access real-time, verified data on thousands of programs worldwide. Never rely on outdated forums again.",
    icon: Globe2,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    id: "03",
    title: "Expert Guides",
    description: "Step-by-step guides from visa applications to crafting winning essays. Navigate the complex study abroad process with absolute confidence.",
    icon: BookOpenText,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  }
];

const PlatformFeatures: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative bg-black text-white overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Header */}
          <div className="lg:w-5/12 relative">
            <div className="lg:sticky lg:top-40">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-xs font-semibold tracking-wide text-gray-300 uppercase">The GradNiche Advantage</span>
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                  Intelligence <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Meets Global</span> <br className="hidden md:block" />
                  Ambition.
                </h2>
                
                <p className="text-lg md:text-xl text-gray-400 font-normal leading-relaxed max-w-md mb-10">
                  We merge cutting-edge AI with comprehensive data to empower your path to global education. Everything you need, beautifully integrated.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: iOS Style Cards */}
          <div className="lg:w-7/12 flex flex-col gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative bg-[#1C1C1E]/80 backdrop-blur-2xl p-8 md:p-10 rounded-[32px] border border-white/[0.08] hover:bg-[#2C2C2E]/80 transition-colors duration-500 overflow-hidden shadow-2xl shadow-black/50"
              >
                {/* Subtle gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  
                  {/* iOS Squircle Icon */}
                  <div className={`w-16 h-16 rounded-[20px] ${feature.iconBg} flex items-center justify-center shrink-0 shadow-inner border border-white/5`}>
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} strokeWidth={1.5} />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">{feature.title}</h3>
                    <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                        {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
