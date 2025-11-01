import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-[#0a101f]">
      <div className="container mx-auto px-6">
        <div className="lg:flex lg:items-center lg:justify-between bg-gray-900/50 p-8 md:p-12 rounded-lg shadow-md border border-gray-700">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h2>
            <p className="text-lg text-gray-400 mt-4">
              Have questions, feedback, or need support? Our team is here to help. Reach out and we'll get back to you as soon as possible.
            </p>
            <div className="mt-8">
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

export default ContactForm;