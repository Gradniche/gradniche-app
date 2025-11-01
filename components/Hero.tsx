import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative h-screen min-h-[600px] text-white flex items-center justify-center text-center overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-center bg-cover z-0"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop')`,
          transform: `translateY(${offsetY * 0.4}px)`
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <div className="relative z-20 container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 max-w-4xl mx-auto" style={{ textShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)' }}>
          Empowering Your Global Education Journey
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto font-light">
          The ultimate platform for Indian students, offering data-driven tools, comprehensive guides, and community insights to navigate your study abroad options.
        </p>
        <a href="#destinations" className="bg-[#F6520C] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105 glow-border focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-[#F6520C]/80">
          Explore Destinations
        </a>
      </div>
    </section>
  );
};

export default Hero;