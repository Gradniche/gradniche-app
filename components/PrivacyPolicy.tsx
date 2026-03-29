import React from 'react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Privacy Policy</h1>
              <p className="text-gray-400 font-light">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="text-gray-300 space-y-8 text-left leading-relaxed font-light">
            <p className="text-lg">GradNiche ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">1</span> 
                    Information We Collect
                </h2>
                <div className="pl-11 space-y-4">
                    <p>We may collect information about you in several ways:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 marker:text-blue-400">
                        <li><strong className="text-white font-medium">Personal Data:</strong> Personally identifiable information, such as your name, username, and email address, that you voluntarily provide when registering for our Community Forums or subscribing to a newsletter.</li>
                        <li><strong className="text-white font-medium">User-Generated Content:</strong> Text you submit to our AI tools (e.g., your Statement of Purpose) is processed transiently to provide you with a response and is not stored long-term or used for training. Content you post in our Community Forums (threads, replies) is stored to operate the forums.</li>
                        <li><strong className="text-white font-medium">Technical and Usage Data:</strong> We may collect anonymous data such as your IP address, browser type, and pages visited to help us understand how our site is used and to improve our service.</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">2</span> 
                    How We Use Your Information
                </h2>
                <div className="pl-11 space-y-4">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 marker:text-blue-400">
                        <li>Create and manage your forum account and provide customer support.</li>
                        <li>Operate and maintain our AI-powered tools and other services.</li>
                        <li>Analyze usage to improve our website and service offerings.</li>
                        <li>Send you newsletters or marketing communications if you have opted in to receive them.</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">3</span> 
                    Disclosure of Your Information
                </h2>
                <div className="pl-11 space-y-4">
                    <p>We do not sell or rent your personal information. We may share information in the following situations:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 marker:text-blue-400">
                        <li><strong className="text-white font-medium">With Service Providers:</strong> We may share data with third-party vendors who perform services on our behalf, such as AI API providers. These providers are contractually obligated to protect your data.</li>
                        <li><strong className="text-white font-medium">For Legal Reasons:</strong> We may disclose your information if required by law or to protect the rights, property, and safety of ourselves or others.</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">4</span> 
                    Your Rights and Choices
                </h2>
                <div className="pl-11 space-y-4">
                    <p>You have rights regarding your personal data. You may:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 marker:text-blue-400">
                      <li><strong className="text-white font-medium">Access and Update:</strong> Review and change your account information at any time by logging into the forum settings (if applicable) or by contacting us.</li>
                      <li><strong className="text-white font-medium">Opt-Out:</strong> Unsubscribe from marketing emails at any time by using the "unsubscribe" link in the email.</li>
                      <li><strong className="text-white font-medium">Request Deletion:</strong> You can request the deletion of your account and associated personal data by contacting us. Please note that some data, such as forum posts, may be retained in an anonymized form.</li>
                    </ul>
                </div>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">5</span> 
                    Data Security and Retention
                </h2>
                <p className="pl-11">We use appropriate technical and organizational measures to protect your personal information. We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, such as maintaining your forum account, unless a longer retention period is required by law.</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">6</span> 
                    Cookies and Tracking Technologies
                </h2>
                <p className="pl-11">We use cookies and similar tracking technologies (like local storage) to operate and personalize our website. For more detailed information about the technologies we use and how to control them, please see our <strong className="text-white font-medium">Cookie Policy</strong>.</p>
            </div>
            
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-blue-400 font-bold border border-white/10">7</span> 
                    Changes to This Privacy Policy
                </h2>
                <p className="pl-11">We may update this Privacy Policy from time to time. The updated version will be indicated by a "Last Updated" date and will be effective as soon as it is accessible.</p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
                <h2 className="text-2xl font-bold text-white tracking-tight">Contact Us</h2>
                <p>If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:hello@gradniche.com" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">hello@gradniche.com</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
