import React from 'react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
  return (
    <section className="py-24 relative bg-[#0a101f] min-h-screen overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="mb-12">
            <button onClick={onBack} className="bg-white/5 backdrop-blur-md text-white hover:text-[#F6520C] transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-full py-2 px-5 border border-white/10 hover:border-[#F6520C]/50 group w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span className="font-medium">Back to Home</span>
            </button>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
          <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                  <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Legal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Terms and Conditions</h1>
              <p className="text-gray-400 font-light">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="text-gray-300 space-y-8 text-left leading-relaxed font-light">
            <p className="text-lg">Welcome to GradNiche. These Terms and Conditions ("Terms") govern your access to and use of the GradNiche website, its content, tools, and services (collectively, the "Service"). Please read these Terms carefully.</p>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">1</span> 
                    Acceptance of Terms
                </h2>
                <p className="pl-11">By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use the Service. This Service is intended for users who are at least 18 years of age.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">2</span> 
                    User Accounts and Conduct
                </h2>
                <div className="pl-11 space-y-4">
                    <p>To access certain features like the Community Forums, you must register for an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to provide accurate and complete information and to update it as necessary.</p>
                    <p>You agree not to use the Service to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 marker:text-[#F6520C]">
                        <li>Post any content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</li>
                        <li>Impersonate any person or entity.</li>
                        <li>Engage in any activity that interferes with or disrupts the Service (or the servers and networks which are connected to the Service).</li>
                        <li>Attempt to gain unauthorized access to any portion of the Service.</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">3</span> 
                    Intellectual Property Rights
                </h2>
                <p className="pl-11">All content included on the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of GradNiche or its suppliers and protected by copyright and other intellectual property laws. You are granted a non-exclusive, non-transferable, revocable license to access and use the Service strictly in accordance with these Terms.</p>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">4</span> 
                    Disclaimers
                </h2>
                <p className="pl-11">The Service is provided on an "as is" and "as available" basis. GradNiche makes no warranties, express or implied, regarding the operation of the Service or the information, content, or materials included. For a complete understanding of the limitations and nature of the information we provide, please refer to our full <strong className="text-white font-medium">Disclaimer</strong> page.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">5</span> 
                    Limitation of Liability
                </h2>
                <p className="pl-11">In no event shall GradNiche, its directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the Service or any content obtained from it. Your sole remedy for dissatisfaction with the Service is to stop using it.</p>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">6</span> 
                    Privacy
                </h2>
                <p className="pl-11">Your privacy is important to us. Our <strong className="text-white font-medium">Privacy Policy</strong> explains how we collect, use, and protect your personal information. By using the Service, you agree to the collection and use of information in accordance with our Privacy Policy.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">7</span> 
                    Third-Party Links
                </h2>
                <p className="pl-11">The Service may contain links to third-party websites or services that are not owned or controlled by GradNiche. We are not responsible for the content or practices of any third-party websites and you access them at your own risk.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">8</span> 
                    Changes to Terms
                </h2>
                <p className="pl-11">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will indicate the date of the latest revision at the top of this page. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">9</span> 
                    Governing Law
                </h2>
                <p className="pl-11">These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes will be subject to the exclusive jurisdiction of the courts located in India.</p>
            </div>
            
            <div className="space-y-4 pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold text-white tracking-tight">Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us at <a href="mailto:hello@gradniche.com" className="text-[#F6520C] hover:text-orange-400 transition-colors font-medium">hello@gradniche.com</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
