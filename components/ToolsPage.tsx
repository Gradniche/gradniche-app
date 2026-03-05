import React from 'react';

interface ToolsPageProps {
  tool: {
    name: string;
    description: string;
  };
  onBack: () => void;
}

const ToolIcon: React.FC = () => (
    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center border border-orange-500/30 shadow-2xl shadow-orange-500/20 mb-8 relative group">
        <div className="absolute inset-0 bg-[#F6520C] rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#F6520C] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
    </div>
);

const ToolsPage: React.FC<ToolsPageProps> = ({ tool, onBack }) => {
  return (
    <section className="py-24 relative bg-[#050810] min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="mb-12">
            <button onClick={onBack} className="bg-white/5 backdrop-blur-md text-white hover:text-[#F6520C] transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-full py-2 px-5 border border-white/10 hover:border-[#F6520C]/50 group mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Back to Tools</span>
            </button>
        </div>
        
        <div className="bg-white/[0.02] backdrop-blur-xl p-12 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl max-w-3xl mx-auto flex flex-col items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F6520C]/5 rounded-full blur-[80px] -z-10 group-hover:bg-[#F6520C]/10 transition-colors duration-700"></div>
          
          <ToolIcon />
          
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#F6520C]/30 bg-[#F6520C]/10 backdrop-blur-md mb-6">
            <span className="text-xs font-bold tracking-widest text-[#F6520C] uppercase">Under Development</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {tool.name}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-xl font-light leading-relaxed mb-10">
            {tool.description}
          </p>
          
          <div className="w-full max-w-md bg-black/40 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">Get Notified</h3>
            <p className="text-sm text-gray-500 mb-4 font-light">We'll let you know as soon as this tool is ready.</p>
            <div className="flex gap-2">
                <input type="email" placeholder="Enter your email" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F6520C]/50 focus:ring-1 focus:ring-[#F6520C]/50 transition-all text-sm" />
                <button className="bg-[#F6520C] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#d44306] transition-colors shadow-lg shadow-orange-500/20 text-sm">
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
