import React from 'react';
import { motion } from 'framer-motion';

const services = [
  'University & Course Selection',
  'Application Assistance',
  'SOP/LOR Guidance',
  'Visa Interview Preparation',
  'Scholarship Support',
  'Pre-Departure Briefing',
  'Education Loan Assistance',
  'Post-Arrival Support',
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-xs md:text-sm font-semibold tracking-wide text-white/90 uppercase">Our Services</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
          >
            Your Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Pathway</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            We provide a comprehensive suite of services, ensuring a seamless transition from your home to your global future.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-[#1C1C1E]/80 backdrop-blur-2xl p-6 rounded-[24px] flex items-center space-x-4 border border-white/10 hover:bg-[#2C2C2E]/80 hover:border-white/20 transition-all duration-300 shadow-lg relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 bg-white/5 border border-white/10 text-blue-400 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="relative z-10 text-base font-medium text-gray-200 group-hover:text-white transition-colors duration-300">{service}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;