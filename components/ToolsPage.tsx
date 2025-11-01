import React from 'react';

interface ToolsPageProps {
  tool: {
    name: string;
    description: string;
  };
  onBack: () => void;
}

const ToolIcon: React.FC = () => (
    <div className="p-4 bg-gray-800/50 rounded-full ring-4 ring-[#F6520C]/30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
    </div>
);

const ToolsPage: React.FC<ToolsPageProps> = ({ tool, onBack }) => {
  return (
    <section className="py-20 bg-[#0a101f] min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
            <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to Home</span>
            </button>
        </div>
        <div className="bg-white/5 backdrop-blur-sm p-12 rounded-lg border border-gray-700 max-w-2xl mx-auto flex flex-col items-center">
          <ToolIcon />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-6">{tool.name}</h1>
          <p className="text-lg text-gray-400 mt-4">{tool.description}</p>
          <div className="mt-8 bg-[#F6520C]/20 text-[#F6520C] font-bold py-4 px-8 rounded-lg">
            Coming Soon!
          </div>
          <p className="text-sm text-gray-500 mt-4">This powerful new tool is currently under development. Stay tuned for updates!</p>
        </div>
      </div>
    </section>
  );
};

export default ToolsPage;
