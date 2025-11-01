import React from 'react';

interface DisclaimerPageProps {
  onBack: () => void;
}

const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onBack }) => {
  return (
    <section className="py-20 bg-[#0a101f] min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Back to Home</span>
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Disclaimer</h1>
          
          <div className="text-gray-400 space-y-6 text-left leading-relaxed">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>The information provided by GradNiche is for general informational and educational purposes only. All information on the site is provided in good faith, but we make no representation or warranty of any kind regarding its accuracy, adequacy, or completeness.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">1. Educational and Informational Purposes Only</h2>
            <p>The content on this website is not intended to be a substitute for professional academic, financial, legal, or immigration advice. GradNiche is an informational tool, not a certified educational consultancy or immigration advisory service. You should always consult with a qualified professional before making significant decisions.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">2. Accuracy of Information</h2>
            <p>We strive to provide accurate and up-to-date information. However, university admission requirements, tuition fees, scholarship details, and visa regulations change frequently and without notice. We do not guarantee the accuracy of any information and are not responsible for any errors or omissions. <strong>It is your sole responsibility to verify all critical information with official university and government sources.</strong></p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">3. AI-Powered Tools</h2>
            <p>Our AI tools (SOP Analyzer, AI Assistant, etc.) provide automated suggestions based on algorithms. This output is for guidance only and should be considered a starting point for your own work. The final responsibility for your application materials and decisions rests with you. GradNiche is not liable for any outcomes resulting from the use of these tools.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">4. No Guarantees of Outcome</h2>
            <p>Use of GradNiche's services does not guarantee admission to any educational institution, the award of any scholarship, or the approval of any visa application. These decisions are at the sole discretion of the respective authorities.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">5. Affiliate Disclaimer</h2>
            <p>GradNiche may participate in affiliate marketing programs. This means we may earn a commission if you click on or make purchases via affiliate links on our site. This comes at no additional cost to you and does not influence the information we provide. We only recommend products and services that we believe will add value to our users.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">6. Testimonials and User Experiences</h2>
            <p>Testimonials and experiences shared on our site, including in the Community Forums, represent individual results and opinions. They are not a guarantee that you will achieve the same or similar results. Each student's journey is unique.</p>
            
            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">7. No Endorsements</h2>
            <p>The inclusion of any university, program, or service on our website does not constitute an official endorsement or partnership unless explicitly stated. They are listed for informational purposes to assist you in your research.</p>

            <p className="pt-4 border-t border-gray-700">By using our website, you hereby acknowledge and agree to this Disclaimer.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerPage;
