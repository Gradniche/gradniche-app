
import React from 'react';

interface CoreToolsProps {
    navigate: (path: string) => void;
}

const toolsData = [
  {
    title: 'College Finder',
    description: 'Search, filter, and compare thousands of universities. Your perfect match is just a few clicks away.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    color: 'from-blue-500 to-cyan-500',
    cta: 'Launch Finder',
    action: '/college-finder',
  },
  {
    title: 'Resource Hub',
    description: 'In-depth articles and downloadable guides to navigate every aspect of studying abroad.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    color: 'from-purple-500 to-pink-500',
    cta: 'Explore Resources',
    action: '/tools/visa-guides',
  },
  {
    title: 'AI-Powered Tools',
    description: 'Leverage artificial intelligence to find the right destination or get instant feedback on your application essays.',
     icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-orange-500 to-red-500',
    cta: 'Discover AI Tools',
    action: '/tools/sop-analyzer',
  },
];

const CoreTools: React.FC<CoreToolsProps> = ({ navigate }) => {
  return (
    <section id="college-finder" className="py-24 relative bg-[#0a101f] overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Command Center</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Your Study Abroad Toolkit</h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Everything you need to plan your education journey, all in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toolsData.map((tool) => (
                <div key={tool.title} className="relative group overflow-hidden bg-white/[0.02] backdrop-blur-md p-10 rounded-[2rem] text-center hover:bg-white/[0.04] transition-all duration-500 border border-white/5 hover:border-white/10 flex flex-col items-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F6520C]/5">
                    {/* Gradient Glow */}
                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${tool.color} opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10 flex flex-col items-center h-full w-full">
                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                            {tool.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white tracking-tight group-hover:text-[#F6520C] transition-colors duration-300">{tool.title}</h3>
                        <p className="text-gray-400 font-light flex-grow mb-10 leading-relaxed">{tool.description}</p>
                        <a href={tool.action} onClick={(e) => { e.preventDefault(); navigate(tool.action); }} className="mt-auto bg-white/5 text-white border border-white/10 px-8 py-3.5 rounded-full hover:bg-[#F6520C] hover:border-[#F6520C] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#F6520C] font-semibold w-full sm:w-auto shadow-lg hover:shadow-[#F6520C]/30 flex items-center justify-center gap-2 group/btn">
                          {tool.cta}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CoreTools;
