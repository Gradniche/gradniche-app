import React from 'react';

interface DisclaimerPageProps {
  onBack: () => void;
}

const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onBack }) => {
  return (
    <section className="py-24 relative bg-[#0a101f] min-h-screen overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="mb-12">
            <button onClick={onBack} className="bg-white/5 backdrop-blur-md text-white hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full py-2 px-5 border border-white/10 hover:border-blue-500/50 group w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span className="font-medium">Back to Home</span>
            </button>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
          <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                  <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">Legal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Disclaimer</h1>
              <p className="text-gray-400 font-light">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="text-gray-300 space-y-8 text-left leading-relaxed font-light">
            <p className="text-lg">The information provided by GradNiche is for general informational and educational purposes only. All information on the site is provided in good faith, but we make no representation or warranty of any kind regarding its accuracy, adequacy, or completeness.</p>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">1</span> 
                    Educational and Informational Purposes Only
                </h2>
                <p className="pl-11">The content on this website is not intended to be a substitute for professional academic, financial, legal, or immigration advice. GradNiche is an informational tool, not a certified educational consultancy or immigration advisory service. You should always consult with a qualified professional before making significant decisions.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">2</span> 
                    Accuracy of Information
                </h2>
                <p className="pl-11">We strive to provide accurate and up-to-date information. However, university admission requirements, tuition fees, scholarship details, and visa regulations change frequently and without notice. We do not guarantee the accuracy of any information and are not responsible for any errors or omissions. <strong className="text-white font-medium">It is your sole responsibility to verify all critical information with official university and government sources.</strong></p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">3</span> 
                    AI-Powered Tools
                </h2>
                <p className="pl-11">Our AI tools (SOP Analyzer, AI Assistant, etc.) provide automated suggestions based on algorithms. This output is for guidance only and should be considered a starting point for your own work. The final responsibility for your application materials and decisions rests with you. GradNiche is not liable for any outcomes resulting from the use of these tools.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">4</span> 
                    No Guarantees of Outcome
                </h2>
                <p className="pl-11">Use of GradNiche's services does not guarantee admission to any educational institution, the award of any scholarship, or the approval of any visa application. These decisions are at the sole discretion of the respective authorities.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">5</span> 
                    Affiliate Disclaimer
                </h2>
                <p className="pl-11">GradNiche may participate in affiliate marketing programs. This means we may earn a commission if you click on or make purchases via affiliate links on our site. This comes at no additional cost to you and does not influence the information we provide. We only recommend products and services that we believe will add value to our users.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">6</span> 
                    Testimonials and User Experiences
                </h2>
                <p className="pl-11">Testimonials and experiences shared on our site, including in the Community Forums, represent individual results and opinions. They are not a guarantee that you will achieve the same or similar results. Each student's journey is unique.</p>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">7</span> 
                    No Endorsements
                </h2>
                <p className="pl-11">The inclusion of any university, program, or service on our website does not constitute an official endorsement or partnership unless explicitly stated. They are listed for informational purposes to assist you in your research.</p>
            </div>

            <div className="pt-8 border-t border-white/10 mt-8">
                <p className="text-center text-gray-400">By using our website, you hereby acknowledge and agree to this Disclaimer.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerPage;
