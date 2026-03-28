import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Globe2, BookOpenText } from 'lucide-react';

const features = [
  {
    id: "01",
    title: "AI-Powered Precision",
    description: "Our proprietary AI analyzes your profile to suggest the perfect universities, refine your SOP, and prep you for visa interviews with uncanny accuracy.",
    icon: BrainCircuit,
    color: "from-blue-500/20 to-cyan-500/5"
  },
  {
    id: "02",
    title: "Global Database",
    description: "Access real-time, verified data on thousands of programs worldwide. Never rely on outdated forums again.",
    icon: Globe2,
    color: "from-orange-500/20 to-red-500/5"
  },
  {
    id: "03",
    title: "Expert Roadmaps",
    description: "Step-by-step guides from visa applications to crafting winning essays. Navigate the complex study abroad process with absolute confidence.",
    icon: BookOpenText,
    color: "from-purple-500/20 to-pink-500/5"
  }
];

const PlatformFeatures: React.FC = () => {
  return (
    <section className="py-32 relative bg-[#020408] text-white overflow-hidden border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-xs font-medium tracking-[0.2em] text-gray-500 uppercase mb-6">The GradNiche Advantage</div>
                <h2 className="text-6xl md:text-7xl lg:text-[80px] font-light leading-[0.9] tracking-tighter mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Intelligence <br/>
                  <span className="italic text-gray-500">Meets Global</span> <br/>
                  Ambition.
                </h2>
                <p className="text-lg text-gray-400 font-light leading-relaxed max-w-md mb-12">
                  We merge cutting-edge AI with comprehensive data to empower your path to global education. Everything you need, beautifully integrated.
                </p>
                
                <div className="hidden lg:block w-24 h-[1px] bg-white/20"></div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Scrolling Features */}
          <div className="lg:col-span-7 lg:pl-16 flex flex-col gap-24 mt-16 lg:mt-0">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Number Indicator */}
                <div className="text-[120px] font-black text-white/[0.02] absolute -top-16 -left-8 select-none pointer-events-none leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {feature.id}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500`}>
                      <feature.icon className="w-7 h-7 text-white/80" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white/90 group-hover:text-white transition-colors">{feature.title}</h3>
                  </div>
                  
                  <div className="pl-0 md:pl-22">
                    <p className="text-xl text-gray-400 font-light leading-relaxed">
                        {feature.description}
                    </p>
                  </div>
                  
                  <div className="mt-10">
                    <div className="w-full h-[1px] bg-white/5 group-hover:bg-white/10 transition-colors duration-500 relative overflow-hidden">
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2"
                            initial={{ x: "-100%" }}
                            whileInView={{ x: "200%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5 + (index * 0.2), ease: "easeInOut" }}
                        />
                    </div>
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
