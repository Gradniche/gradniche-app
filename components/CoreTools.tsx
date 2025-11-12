
import React from 'react';

interface CoreToolsProps {
    navigate: (path: string) => void;
}

const toolsData = [
  {
    title: 'College Finder',
    description: 'Search, filter, and compare thousands of universities. Your perfect match is just a few clicks away.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    cta: 'Launch Finder',
    action: '/college-finder',
  },
  {
    title: 'Resource Hub',
    description: 'In-depth articles and downloadable guides to navigate every aspect of studying abroad.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    cta: 'Explore Resources',
    action: '/tools/visa-guides',
  },
  {
    title: 'AI-Powered Tools',
    description: 'Leverage artificial intelligence to find the right destination or get instant feedback on your application essays.',
     icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    cta: 'Discover AI Tools',
    action: '/tools/sop-analyzer',
  },
];

const CoreTools: React.FC<CoreToolsProps> = ({ navigate }) => {
  return (
    <section id="college-finder" className="py-20 bg-[#0a101f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Your Study Abroad Command Center</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            Everything you need to plan your education journey, all in one place.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toolsData.map((tool) => (
                <div key={tool.title} className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 border border-[#F6520C]/20 hover:border-[#F6520C] flex flex-col items-center">
                    <div className="mb-6">{tool.icon}</div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">{tool.title}</h3>
                    <p className="text-gray-400 flex-grow mb-6">{tool.description}</p>
                    <a href={`#${tool.action}`} onClick={(e) => { e.preventDefault(); navigate(tool.action); }} className="mt-auto bg-gray-800/80 text-[#F6520C] border border-[#F6520C] px-6 py-2 rounded-full hover:bg-[#F6520C] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#F6520C]">
                      {tool.cta}
                    </a>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CoreTools;
