import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1014.12 11.88a3 3 0 00-4.242 4.242zM19.932 19.932a3 3 0 01-4.242 0 3 3 0 010-4.242m4.242 4.242L15.5 15.5" />
      </svg>
    ),
    title: 'AI-Powered Matching',
    description: 'Our advanced algorithm matches your profile with the best-fit universities and courses worldwide.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '99.7% Visa Success',
    description: 'Leverage our meticulous documentation and mock interview prep for a near-guaranteed visa approval.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
        <path d="M7 13.5a5.5 5.5 0 1111 0v-1a5.5 5.5 0 00-11 0v1z" />
      </svg>
    ),
    title: 'Elite Scholarship Access',
    description: 'We provide exclusive access to scholarship portals and assist in crafting winning applications.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 12a12 12 0 11-24 0 12 12 0 0124 0z" clipRule="evenodd" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v1.5M12 20.25v1.5M4.929 4.929l1.061 1.06M18.01 18.01l1.06 1.06M2.25 12h1.5M20.25 12h1.5M4.929 19.071l1.06-1.06M18.01 5.99l1.06-1.06" />
      </svg>
    ),
    title: '24/7 Global Support',
    description: 'From pre-departure to post-arrival, our global support network is always available for you.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs md:text-sm font-semibold tracking-wide text-white/90 uppercase">Why Choose Us</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
          >
            The GradNiche <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Advantage</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            We merge cutting-edge technology with human expertise to redefine your path to global education.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-[#1C1C1E]/80 backdrop-blur-2xl p-8 rounded-[32px] text-center hover:bg-[#2C2C2E]/80 transition-colors duration-500 border border-white/10 shadow-2xl shadow-black/50 overflow-hidden relative"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex justify-center items-center mb-6 w-16 h-16 rounded-[20px] bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white tracking-tight">{feature.title}</h3>
                <p className="text-base text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;