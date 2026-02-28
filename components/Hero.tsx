
import React, { useState, useEffect } from 'react';

interface HeroProps {
    navigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
  const [offsetY, setOffsetY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to college finder, potentially passing search params in the future
    navigate('/college-finder');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-24 bg-[#050810]">
      <style>
        {`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(var(--r)); }
            50% { transform: translateY(-20px) rotate(var(--r)); }
          }
          .animate-float {
            animation: float-slow 8s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-slow 10s ease-in-out infinite;
            animation-delay: -4s;
          }
        `}
      </style>

      {/* Mobile Background Image (Visible only on small screens where floating cards are hidden) */}
      <div 
        className="absolute inset-0 z-0 lg:hidden"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          opacity: 0.2,
          transform: `translateY(${offsetY * 0.3}px)`,
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Background glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F6520C]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Floating Destination Cards (Desktop only) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden lg:block">
        {/* USA */}
        <div className="absolute top-[15%] left-[5%] xl:left-[10%] w-56 h-72 rounded-3xl border border-white/10 p-2 bg-white/5 backdrop-blur-md animate-float shadow-2xl" style={{ '--r': '-8deg' } as React.CSSProperties}>
          <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-2xl opacity-70 grayscale-[20%]" alt="USA" />
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold border border-white/10 flex items-center gap-2">
            <span>🇺🇸</span> New York, USA
          </div>
        </div>
        
        {/* UK */}
        <div className="absolute top-[20%] right-[5%] xl:right-[10%] w-64 h-48 rounded-3xl border border-white/10 p-2 bg-white/5 backdrop-blur-md animate-float-delayed shadow-2xl" style={{ '--r': '12deg' } as React.CSSProperties}>
          <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-2xl opacity-70 grayscale-[20%]" alt="UK" />
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold border border-white/10 flex items-center gap-2">
            <span>🇬🇧</span> London, UK
          </div>
        </div>

        {/* Australia */}
        <div className="absolute bottom-[15%] left-[8%] xl:left-[12%] w-64 h-48 rounded-3xl border border-white/10 p-2 bg-white/5 backdrop-blur-md animate-float-delayed shadow-2xl" style={{ '--r': '-12deg' } as React.CSSProperties}>
          <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-2xl opacity-70 grayscale-[20%]" alt="Australia" />
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold border border-white/10 flex items-center gap-2">
            <span>🇦🇺</span> Sydney, AUS
          </div>
        </div>

        {/* Canada */}
        <div className="absolute bottom-[20%] right-[8%] xl:right-[12%] w-56 h-72 rounded-3xl border border-white/10 p-2 bg-white/5 backdrop-blur-md animate-float shadow-2xl" style={{ '--r': '8deg' } as React.CSSProperties}>
          <img src="https://images.unsplash.com/photo-1507992781348-310259076fe0?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-2xl opacity-70 grayscale-[20%]" alt="Canada" />
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold border border-white/10 flex items-center gap-2">
            <span>🇨🇦</span> Toronto, CAN
          </div>
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center mt-12">
        
        {/* Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs md:text-sm font-medium tracking-wider text-white/90 uppercase">Your Global Education Starts Here</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-6 text-white" style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>
            Study <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F6520C] to-orange-400">Abroad</span><br />
            Made Simple.
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed px-4">
            Discover top universities, secure scholarships, and ace your visa interviews with GradNiche's AI-powered platform.
          </p>
        </div>

        {/* Floating Search Widget */}
        <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
            
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#F6520C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="What do you want to study?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 text-lg outline-none"
              />
            </div>

            <div className="hidden md:block w-px bg-white/20 my-2"></div>

            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#F6520C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <select 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-transparent border-none text-white focus:ring-0 text-lg outline-none appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-900">Any Destination</option>
                <option value="usa" className="text-gray-900">United States</option>
                <option value="uk" className="text-gray-900">United Kingdom</option>
                <option value="canada" className="text-gray-900">Canada</option>
                <option value="australia" className="text-gray-900">Australia</option>
                <option value="germany" className="text-gray-900">Germany</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-[#F6520C] hover:bg-[#d44306] text-white rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(246,82,12,0.3)]"
            >
              Search
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </form>
        </div>

      </div>
      
      {/* Bottom Gradient to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a101f] to-transparent z-20 pointer-events-none"></div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">Explore</span>
        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
