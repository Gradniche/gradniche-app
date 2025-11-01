import React from 'react';

interface CookiePolicyProps {
  onBack: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onBack }) => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Cookie Policy</h1>
          
          <div className="text-gray-400 space-y-6 text-left leading-relaxed">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>This Cookie Policy explains how GradNiche uses cookies and similar technologies like local storage to recognize you, improve your experience, and operate our website.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">1. What are Cookies and Similar Technologies?</h2>
            <p>Cookies are small text files placed on your device when you visit a website. Local storage is a similar technology that allows data to be stored in your browser without an expiration date. We use these technologies to make our website work correctly and to provide certain features.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">2. How We Use These Technologies</h2>
            <p>We use these technologies for several purposes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Essential Operations:</strong> Some cookies are necessary for the website to function properly. For example, they may be used for security features or to keep you logged into the forum.
              </li>
              <li>
                <strong>Functionality:</strong> We use local storage to remember your progress and preferences on tools like our Pre-Departure Checklist. This allows you to close your browser and return later without losing your work, creating a more seamless experience.
              </li>
              <li>
                <strong>Performance and Analytics:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This allows us to improve the site's performance and content.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">3. Your Choices and How to Control Them</h2>
            <p>Most web browsers allow you to control cookies through their settings. You can set your browser to block cookies or to alert you when cookies are being sent. Please note that if you disable or refuse cookies, some parts of this site may become inaccessible or not function properly.</p>
            <p>You can find more information about managing cookies in popular browsers here:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#F6520C] hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-[#F6520C] hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#F6520C] hover:underline">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#F6520C] hover:underline">Microsoft Edge</a></li>
            </ul>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">4. Changes to this Cookie Policy</h2>
            <p>We may update this Cookie Policy from time to time. We encourage you to review this policy periodically to stay informed about our use of cookies.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">5. Contact Us</h2>
            <p>If you have any questions about our use of cookies, please email us at <a href="mailto:hello@gradniche.com" className="text-[#F6520C] hover:underline">hello@gradniche.com</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicy;
