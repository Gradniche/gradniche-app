import React from 'react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Privacy Policy</h1>
          
          <div className="text-gray-400 space-y-6 text-left leading-relaxed">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>GradNiche ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">1. Information We Collect</h2>
            <p>We may collect information about you in several ways:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, username, and email address, that you voluntarily provide when registering for our Community Forums or subscribing to a newsletter.</li>
                <li><strong>User-Generated Content:</strong> Text you submit to our AI tools (e.g., your Statement of Purpose) is processed transiently to provide you with a response and is not stored long-term or used for training. Content you post in our Community Forums (threads, replies) is stored to operate the forums.</li>
                <li><strong>Technical and Usage Data:</strong> We may collect anonymous data such as your IP address, browser type, and pages visited to help us understand how our site is used and to improve our service.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Create and manage your forum account and provide customer support.</li>
                <li>Operate and maintain our AI-powered tools and other services.</li>
                <li>Analyze usage to improve our website and service offerings.</li>
                <li>Send you newsletters or marketing communications if you have opted in to receive them.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">3. Disclosure of Your Information</h2>
            <p>We do not sell or rent your personal information. We may share information in the following situations:</p>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>With Service Providers:</strong> We may share data with third-party vendors who perform services on our behalf, such as AI API providers. These providers are contractually obligated to protect your data.</li>
                <li><strong>For Legal Reasons:</strong> We may disclose your information if required by law or to protect the rights, property, and safety of ourselves or others.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">4. Your Rights and Choices</h2>
            <p>You have rights regarding your personal data. You may:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Access and Update:</strong> Review and change your account information at any time by logging into the forum settings (if applicable) or by contacting us.</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time by using the "unsubscribe" link in the email.</li>
              <li><strong>Request Deletion:</strong> You can request the deletion of your account and associated personal data by contacting us. Please note that some data, such as forum posts, may be retained in an anonymized form.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">5. Data Security and Retention</h2>
            <p>We use appropriate technical and organizational measures to protect your personal information. We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, such as maintaining your forum account, unless a longer retention period is required by law.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">6. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies (like local storage) to operate and personalize our website. For more detailed information about the technologies we use and how to control them, please see our <strong>Cookie Policy</strong>.</p>
            
            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">7. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. The updated version will be indicated by a "Last Updated" date and will be effective as soon as it is accessible.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">8. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:hello@gradniche.com" className="text-[#F6520C] hover:underline">hello@gradniche.com</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
