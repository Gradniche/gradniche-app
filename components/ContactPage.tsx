import React from 'react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  return (
    <section id="contact" className="py-20 bg-[#0a101f] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-8 max-w-5xl mx-auto">
            <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to Home</span>
            </button>
        </div>
        <div className="lg:flex lg:items-center lg:justify-between bg-gray-900/50 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-md border border-gray-700 max-w-5xl mx-auto">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h1>
            <p className="text-lg text-gray-400 mt-4">
              Have questions, feedback, or need support? Our team is here to help. Reach out and we'll get back to you as soon as possible.
            </p>
            <div className="mt-8 space-y-6">
                <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                        <p className="text-sm text-gray-400">General Inquiries</p>
                        <a href="mailto:hello@gradniche.com" className="text-lg font-semibold text-[#F6520C] hover:underline">hello@gradniche.com</a>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" alt="Students collaborating" className="rounded-lg shadow-lg w-full h-64 object-cover"/>
            </div>
          </div>
          <div className="lg:w-2/5">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-[#F6520C]/20">
              <h3 className="text-2xl font-semibold mb-6 text-center text-white">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input type="text" id="name" placeholder="Your Name" className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input type="email" id="email" placeholder="Your Email" className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea id="message" placeholder="Your Message" rows={4} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#F6520C] text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#E84A00]">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
