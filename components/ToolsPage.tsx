import React from 'react';

interface ToolsPageProps {
  tool: {
    name: string;
    description: string;
  };
  onBack: () => void;
}

const ToolIcon: React.FC = () => (
    <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-500/20 to-pink-500/20 flex items-center justify-center border border-blue-500/30 shadow-2xl shadow-blue-500/20 mb-6 md:mb-8 relative group">
        <div className="absolute inset-0 bg-blue-600 rounded-2xl md:rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12 text-blue-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
    </div>
);

const ToolsPage: React.FC<ToolsPageProps> = ({ tool, onBack }) => {
  return (
    <section className="py-16 md:py-24 relative bg-[#050a14] min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="mb-8 md:mb-12">
            <button onClick={onBack} className="bg-white/5 backdrop-blur-md text-white hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full py-2 px-4 md:px-5 border border-white/10 hover:border-blue-500/50 group mx-auto text-sm md:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Back to Tools</span>
            </button>
        </div>
        
        <div className="bg-white/[0.02] backdrop-blur-xl p-6 md:p-16 rounded-3xl md:rounded-[3rem] border border-white/5 shadow-2xl max-w-3xl mx-auto flex flex-col items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-blue-600/5 rounded-full blur-[40px] md:blur-[80px] -z-10 group-hover:bg-blue-600/10 transition-colors duration-700"></div>
          
          <ToolIcon />
          
          <div className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-blue-500/30 bg-blue-600/10 backdrop-blur-md mb-4 md:mb-6">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-blue-400 uppercase">Under Development</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {tool.name}
          </h1>
          
          <p className="text-base md:text-xl text-gray-400 max-w-xl font-light leading-relaxed mb-8 md:mb-10 px-4 md:px-0">
            {tool.description}
          </p>
          
          <div className="w-full max-w-md bg-black/40 border border-white/10 rounded-2xl p-4 md:p-6">
            <h3 className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">Get Notified</h3>
            <p className="text-xs md:text-sm text-gray-500 mb-4 font-light">We'll let you know as soon as this tool is ready.</p>
            <div className="flex flex-col sm:flex-row gap-2">
                <input type="email" placeholder="Enter your email" className="w-full sm:flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm" />
                <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 text-sm">
                    Notify Me
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsPage;
