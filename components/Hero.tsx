
import React, { useState, useEffect } from 'react';

interface HeroProps {
    navigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative h-[110vh] min-h-[700px] text-white flex items-center justify-center text-center overflow-hidden -mt-20"
    >
      <div 
        className="absolute inset-0 bg-center bg-cover z-0"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop')`,
          transform: `translateY(${offsetY * 0.5}px) scale(1.1)`
        }}
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a101f] z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a101f_120%)] z-10"></div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 pt-20">
        <div className="animate-fade-in space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-orange-300 mb-4 hover:bg-white/20 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                The #1 Platform for Indian Students
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight mb-6 max-w-5xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400 drop-shadow-2xl">
              Empowering Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6520C] to-orange-400">Global Education</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light text-gray-300 leading-relaxed">
              The ultimate platform for Indian students, offering data-driven tools, comprehensive guides, and community insights to navigate your study abroad options.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#destinations" 
                  onClick={(e) => { e.preventDefault(); navigate('#destinations'); }}
                  className="group relative px-8 py-4 bg-[#F6520C] text-white rounded-full text-lg font-bold shadow-[0_0_20px_rgba(246,82,12,0.5)] hover:shadow-[0_0_30px_rgba(246,82,12,0.7)] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Destinations
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>
                </a>
                
                <a 
                  href="#/college-finder" 
                  onClick={(e) => { e.preventDefault(); navigate('/college-finder'); }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Find Universities
                </a>
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
