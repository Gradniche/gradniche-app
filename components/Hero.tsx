
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
      className="relative h-[100vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden -mt-20"
    >
      {/* Cinematic Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-center bg-cover z-0"
        style={{ 
          // High-quality 'Study Abroad' vibe image (University Campus)
          backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')`,
          transform: `translateY(${offsetY * 0.4}px) scale(1.1)`, // Slightly stronger parallax for cinematic feel
          filter: 'brightness(0.85)', // Slight dim to help text pop without killing the image vibrancy
          transition: 'transform 0.1s ease-out'
        }}
        aria-hidden="true"
      />
      
      {/* Complex Gradient Overlays for Readability & Cinematic Feel */}
      {/* 1. Dark fade from bottom to make text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-[#0a101f]/40 to-transparent z-10"></div>
      {/* 2. Radial vignette to focus center but keep edges dark */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,16,31,0.8)_100%)] z-10"></div>
      {/* 3. Subtle blue tint for brand consistency */}
      <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10"></div>

      <div className="relative z-20 container mx-auto px-6">
        <div className="animate-fade-in flex flex-col items-center">
            
            {/* Cinematic Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter mb-6 text-white drop-shadow-2xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">GO GLOBAL.</span>
              <span className="block text-4xl md:text-6xl lg:text-7xl font-light mt-2">Study Without Limits.</span>
            </h1>
            
            <p className="text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-medium text-gray-200 leading-relaxed drop-shadow-lg">
              Your intelligent companion for universities, visas, and scholarships. Join the community of future global leaders.
            </p>
            
            {/* Dynamic Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-lg mx-auto">
                <button 
                  onClick={() => navigate('/college-finder')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#F6520C] text-white rounded-full text-lg font-bold shadow-[0_0_30px_rgba(246,82,12,0.5)] hover:shadow-[0_0_50px_rgba(246,82,12,0.7)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                >
                  Find Your University
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
                
                <button 
                  onClick={() => { const el = document.getElementById('destinations'); el?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Explore Destinations
                </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-white/10 w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
                <div className="text-center">
                    <p className="text-3xl font-bold text-white">5000+</p>
                    <p className="text-xs uppercase tracking-widest text-gray-300 font-semibold">Universities</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-white">98%</p>
                    <p className="text-xs uppercase tracking-widest text-gray-300 font-semibold">Visa Success</p>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-bold text-white">$10M+</p>
                    <p className="text-xs uppercase tracking-widest text-gray-300 font-semibold">Scholarships Found</p>
                </div>
            </div>
        </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce opacity-70">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/80">Scroll to Explore</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
