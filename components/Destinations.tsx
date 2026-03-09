
import React from 'react';

const destinations = [
  {
    name: 'United States',
    code: 'US',
    flagCode: 'us',
    description: 'Home to top-ranked universities and diverse career opportunities.',
    href: '/destinations/usa',
  },
  {
    name: 'Canada',
    code: 'CA',
    flagCode: 'ca',
    description: 'Known for its high quality of life and welcoming immigration policies.',
    href: '/destinations/canada',
  },
  {
    name: 'United Kingdom',
    code: 'UK',
    flagCode: 'gb',
    description: 'Rich in history with world-renowned institutions and vibrant cities.',
    href: '/destinations/uk',
  },
  {
    name: 'Australia',
    code: 'AU',
    flagCode: 'au',
    description: 'Offers a fantastic lifestyle and excellent hands-on learning experiences.',
    href: '/destinations/australia',
  },
   {
    name: 'Germany',
    code: 'DE',
    flagCode: 'de',
    description: 'Engineering excellence and low-cost education in the heart of Europe.',
    href: '/destinations/germany',
  },
  {
    name: 'Ireland',
    code: 'IE',
    flagCode: 'ie',
    description: 'Europe\'s vibrant tech hub with a rich culture and friendly atmosphere.',
    href: '/destinations/ireland',
  },
   {
    name: 'UAE',
    code: 'AE',
    flagCode: 'ae',
    description: 'A futuristic global business hub with modern universities and tax-free perks.',
    href: '/destinations/uae',
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    flagCode: 'nz',
    description: 'Stunning landscapes, a high quality of life, and a world-class education system.',
    href: '/destinations/new-zealand',
  }
];


interface DestinationCardProps {
  name: string;
  code: string;
  flagCode: string;
  description: string;
  href: string;
  navigate: (path: string) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ name, code, flagCode, description, href, navigate }) => (
    <a
        href={href}
        onClick={(e) => {e.preventDefault(); navigate(href)}}
        className="relative group h-full min-h-[320px] rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(246,82,12,0.1),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex flex-col h-full p-8">
            <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32 flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={`https://flagcdn.com/w320/${flagCode}.png`} 
                            alt={`${name} flag`} 
                            className="w-full h-full object-cover blur-[3px] scale-125 opacity-70 group-hover:opacity-90 transition-all duration-500"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/20 group-hover:from-black/40 group-hover:to-transparent transition-colors duration-500"></div>
                    </div>
                    <span className="relative z-10 text-white font-bold text-4xl tracking-widest drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">{code}</span>
                </div>
            </div>
            
            <div className="text-center mt-auto">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#F6520C] transition-colors duration-300">{name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{description}</p>
            </div>

            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </div>
    </a>
);

interface DestinationsProps {
    navigate: (path: string) => void;
}

const Destinations: React.FC<DestinationsProps> = ({ navigate }) => {
  return (
    <section id="destinations" className="py-24 relative bg-[#050810] overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Top Locations</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Explore Global Hubs</h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Discover premier destinations that offer world-class education and unparalleled opportunities.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <DestinationCard key={dest.name} {...dest} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
