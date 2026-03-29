import React from 'react';
import { motion } from 'framer-motion';

const destinations = [
  {
    name: 'United States',
    code: 'US',
    flagCode: 'us',
    description: 'Home to top-ranked universities and diverse career opportunities.',
    href: '/destinations/usa',
  },
  {
    name: 'United Kingdom',
    code: 'UK',
    flagCode: 'gb',
    description: 'Rich in history with world-renowned institutions and vibrant cities.',
    href: '/destinations/uk',
  },
  {
    name: 'Canada',
    code: 'CA',
    flagCode: 'ca',
    description: 'Known for its high quality of life and welcoming immigration policies.',
    href: '/destinations/canada',
  },
  {
    name: 'Australia',
    code: 'AU',
    flagCode: 'au',
    description: 'Offers a fantastic lifestyle and excellent hands-on learning experiences.',
    href: '/destinations/australia',
  }
];

interface DestinationCardProps {
  name: string;
  code: string;
  flagCode: string;
  description: string;
  href: string;
  navigate: (path: string) => void;
  index: number;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ name, code, flagCode, description, href, navigate, index }) => (
    <motion.a
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        href={href}
        onClick={(e) => {e.preventDefault(); navigate(href)}}
        className="relative group h-[350px] md:h-[500px] rounded-[32px] overflow-hidden bg-[#1C1C1E] border border-white/10 flex flex-col justify-end p-6 md:p-8 shadow-2xl"
    >
        {/* Background Image/Flag */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={`https://flagcdn.com/w640/${flagCode}.png`} 
                alt={`${name} flag`} 
                className="w-full h-full object-cover opacity-30 md:opacity-20 group-hover:opacity-50 transition-all duration-1000 ease-out blur-[1px] md:blur-[2px] group-hover:blur-0"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 transform translate-y-0 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <span className="text-4xl md:text-5xl font-bold text-white/40 md:text-white/20 group-hover:text-white/40 transition-colors duration-500 tracking-tighter">{code}</span>
                <div className="h-[1px] flex-grow bg-white/20 md:bg-white/10 group-hover:bg-blue-500/50 transition-colors duration-500"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 tracking-tight group-hover:text-blue-400 transition-colors duration-300">{name}</h3>
            <p className="text-gray-300 md:text-gray-400 text-sm leading-relaxed font-normal opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:delay-100 line-clamp-2 md:line-clamp-none">{description}</p>
            
            <div className="mt-4 md:mt-6 flex items-center text-blue-400 font-semibold text-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:delay-200">
                Explore Destination
                <motion.svg 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
            </div>
        </div>
    </motion.a>
);

interface DestinationsProps {
    navigate: (path: string) => void;
}

const Destinations: React.FC<DestinationsProps> = ({ navigate }) => {
  return (
    <section id="destinations" className="py-20 md:py-32 relative bg-black overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transform -rotate-12"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 md:mb-8 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-xs md:text-sm font-semibold tracking-wide text-white/90 uppercase">Global Hubs</span>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.1]">
                    Where will your <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">journey begin?</span>
                </h2>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full md:w-auto"
            >
                <button 
                    onClick={() => navigate('/destinations')} 
                    className="w-full md:w-auto group flex items-center justify-center gap-4 bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/20 text-white px-6 py-3 md:px-8 md:py-4 rounded-[24px] transition-all duration-300 backdrop-blur-xl shadow-lg"
                >
                    <span className="font-semibold tracking-wide text-base">View All Destinations</span>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                </button>
            </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {destinations.map((dest, index) => (
            <DestinationCard key={dest.name} {...dest} navigate={navigate} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
