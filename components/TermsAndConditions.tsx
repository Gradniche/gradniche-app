import React from 'react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Terms and Conditions</h1>
          
          <div className="text-gray-400 space-y-6 text-left leading-relaxed">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>Welcome to GradNiche. These Terms and Conditions ("Terms") govern your access to and use of the GradNiche website, its content, tools, and services (collectively, the "Service"). Please read these Terms carefully.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">1. Acceptance of Terms</h2>
            <p>By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use the Service. This Service is intended for users who are at least 18 years of age.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">2. User Accounts and Conduct</h2>
            <p>To access certain features like the Community Forums, you must register for an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to provide accurate and complete information and to update it as necessary.</p>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Post any content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</li>
                <li>Impersonate any person or entity.</li>
                <li>Engage in any activity that interferes with or disrupts the Service (or the servers and networks which are connected to the Service).</li>
                <li>Attempt to gain unauthorized access to any portion of the Service.</li>
            </ul>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">3. Intellectual Property Rights</h2>
            <p>All content included on the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of GradNiche or its suppliers and protected by copyright and other intellectual property laws. You are granted a non-exclusive, non-transferable, revocable license to access and use the Service strictly in accordance with these Terms.</p>
            
            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">4. Disclaimers</h2>
            <p>The Service is provided on an "as is" and "as available" basis. GradNiche makes no warranties, express or implied, regarding the operation of the Service or the information, content, or materials included. For a complete understanding of the limitations and nature of the information we provide, please refer to our full <strong>Disclaimer</strong> page.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">5. Limitation of Liability</h2>
            <p>In no event shall GradNiche, its directors, employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of the Service or any content obtained from it. Your sole remedy for dissatisfaction with the Service is to stop using it.</p>
            
            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">6. Privacy</h2>
            <p>Your privacy is important to us. Our <strong>Privacy Policy</strong> explains how we collect, use, and protect your personal information. By using the Service, you agree to the collection and use of information in accordance with our Privacy Policy.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">7. Third-Party Links</h2>
            <p>The Service may contain links to third-party websites or services that are not owned or controlled by GradNiche. We are not responsible for the content or practices of any third-party websites and you access them at your own risk.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">8. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will indicate the date of the latest revision at the top of this page. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">9. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes will be subject to the exclusive jurisdiction of the courts located in India.</p>
            
            <h2 className="text-xl font-semibold text-white pt-4 border-t border-gray-700">10. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:hello@gradniche.com" className="text-[#F6520C] hover:underline">hello@gradniche.com</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
