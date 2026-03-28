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
        className="relative group h-[500px] rounded-[2.5rem] overflow-hidden bg-[#0a101f] border border-white/5 flex flex-col justify-end p-8 shadow-2xl"
    >
        {/* Background Image/Flag */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={`https://flagcdn.com/w640/${flagCode}.png`} 
                alt={`${name} flag`} 
                className="w-full h-full object-cover opacity-20 group-hover:opacity-50 transition-all duration-1000 ease-out blur-[2px] group-hover:blur-0"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-bold text-white/20 group-hover:text-white/40 transition-colors duration-500 tracking-tighter">{code}</span>
                <div className="h-[1px] flex-grow bg-white/10 group-hover:bg-[#F6520C]/50 transition-colors duration-500"></div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-[#F6520C] transition-colors duration-300">{name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{description}</p>
            
            <div className="mt-6 flex items-center text-[#F6520C] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
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
    <section id="destinations" className="py-32 relative bg-[#050810] overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transform -rotate-12"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8">
                    <span className="text-xs font-semibold tracking-widest text-gray-300 uppercase">Global Hubs</span>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Where will your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6520C] to-orange-400 italic">journey begin?</span>
                </h2>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <button 
                    onClick={() => navigate('/destinations')} 
                    className="group flex items-center gap-4 bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] text-white px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg"
                >
                    <span className="font-semibold tracking-wide">View All Destinations</span>
                    <div className="w-8 h-8 rounded-full bg-[#F6520C] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                </button>
            </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <DestinationCard key={dest.name} {...dest} navigate={navigate} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
