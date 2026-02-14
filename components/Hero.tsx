
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
      className="relative h-[100vh] min-h-[600px] flex items-end justify-center text-center overflow-hidden -mt-20 pb-24 md:pb-32"
    >
      {/* Cinematic Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-no-repeat z-0"
        style={{ 
          // Placeholder for the provided composite image (Indian students with flags & landmarks).
          backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop')`,
          backgroundPosition: 'center 20%', // Keeps focus on faces/landmarks near top
          backgroundSize: 'cover',
          transform: `translateY(${offsetY * 0.4}px) scale(1.1)`, // Parallax effect
          filter: 'brightness(0.8)', // Slightly brighter to see faces clearly
          transition: 'transform 0.1s ease-out'
        }}
        aria-hidden="true"
      />
      
      {/* Complex Gradient Overlays for Readability & Cinematic Feel */}
      {/* 1. Strong bottom fade for headline legibility - darkened for text at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-[#0a101f]/80 to-transparent z-10"></div>
      
      {/* 2. Top fade for navbar visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a101f]/90 via-[#0a101f]/20 to-transparent z-10 h-40"></div>

      {/* 3. Radial vignette to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,16,31,0.3)_100%)] z-10"></div>
      
      {/* 4. Brand tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-teal-900/20 mix-blend-overlay z-10"></div>

      <div className="relative z-20 container mx-auto px-6">
        <div className="animate-fade-in flex flex-col items-center">
            
            {/* Cinematic Headline - Smaller Size */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter mb-4 text-white drop-shadow-2xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">FROM INDIA</span>
              <span className="block text-3xl md:text-4xl lg:text-6xl font-light mt-1 text-white">TO THE WORLD.</span>
            </h1>
            
            {/* Subtext - Smaller Size */}
            <p className="text-base md:text-xl mb-8 max-w-2xl mx-auto font-medium text-gray-200 leading-relaxed drop-shadow-lg">
              The ultimate launchpad for Indian students planning to <strong>study abroad</strong>. Discover universities, ace your visa interviews, and find scholarships tailored just for you.
            </p>
            
            {/* Dynamic Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
                <button 
                  onClick={() => navigate('/college-finder')}
                  className="w-full sm:w-auto px-6 py-3 bg-[#F6520C] text-white rounded-full text-base font-bold shadow-[0_0_30px_rgba(246,82,12,0.5)] hover:shadow-[0_0_50px_rgba(246,82,12,0.7)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                >
                  Find Your University
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
                
                <button 
                  onClick={() => { const el = document.getElementById('destinations'); el?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full sm:w-auto px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full text-base font-bold hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Explore Destinations
                </button>
            </div>
        </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce opacity-70">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/80">Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
