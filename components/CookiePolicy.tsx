import React from 'react';

interface CookiePolicyProps {
  onBack: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onBack }) => {
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
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Cookie Policy</h1>
              <p className="text-gray-400 font-light">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="text-gray-300 space-y-8 text-left leading-relaxed font-light">
            <p className="text-lg">This Cookie Policy explains how GradNiche uses cookies and similar technologies like local storage to recognize you, improve your experience, and operate our website.</p>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">1</span> 
                    What are Cookies and Similar Technologies?
                </h2>
                <p className="pl-11">Cookies are small text files placed on your device when you visit a website. Local storage is a similar technology that allows data to be stored in your browser without an expiration date. We use these technologies to make our website work correctly and to provide certain features.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">2</span> 
                    How We Use These Technologies
                </h2>
                <div className="pl-11 space-y-4">
                    <p>We use these technologies for several purposes:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 marker:text-[#F6520C]">
                      <li>
                        <strong className="text-white font-medium">Essential Operations:</strong> Some cookies are necessary for the website to function properly. For example, they may be used for security features or to keep you logged into the forum.
                      </li>
                      <li>
                        <strong className="text-white font-medium">Functionality:</strong> We use local storage to remember your progress and preferences on tools like our Pre-Departure Checklist. This allows you to close your browser and return later without losing your work, creating a more seamless experience.
                      </li>
                      <li>
                        <strong className="text-white font-medium">Performance and Analytics:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This allows us to improve the site's performance and content.
                      </li>
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">3</span> 
                    Your Choices and How to Control Them
                </h2>
                <div className="pl-11 space-y-4">
                    <p>Most web browsers allow you to control cookies through their settings. You can set your browser to block cookies or to alert you when cookies are being sent. Please note that if you disable or refuse cookies, some parts of this site may become inaccessible or not function properly.</p>
                    <p>You can find more information about managing cookies in popular browsers here:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 marker:text-[#F6520C]">
                      <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#F6520C] hover:text-orange-400 transition-colors">Google Chrome</a></li>
                      <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-[#F6520C] hover:text-orange-400 transition-colors">Mozilla Firefox</a></li>
                      <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#F6520C] hover:text-orange-400 transition-colors">Apple Safari</a></li>
                      <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#F6520C] hover:text-orange-400 transition-colors">Microsoft Edge</a></li>
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#F6520C] font-bold border border-white/10">4</span> 
                    Changes to this Cookie Policy
                </h2>
                <p className="pl-11">We may update this Cookie Policy from time to time. We encourage you to review this policy periodically to stay informed about our use of cookies.</p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold text-white tracking-tight">Contact Us</h2>
                <p>If you have any questions about our use of cookies, please email us at <a href="mailto:hello@gradniche.com" className="text-[#F6520C] hover:text-orange-400 transition-colors font-medium">hello@gradniche.com</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicy;
