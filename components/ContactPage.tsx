import React from 'react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  return (
    <section id="contact" className="py-24 relative bg-[#050810] min-h-screen overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-8 max-w-5xl mx-auto">
            <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to Home</span>
            </button>
        </div>
        <div className="lg:flex lg:items-center lg:justify-between bg-white/[0.02] backdrop-blur-md p-8 md:p-16 rounded-3xl shadow-2xl border border-white/5 max-w-6xl mx-auto relative overflow-hidden">
          {/* Inner glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="lg:w-1/2 mb-12 lg:mb-0 relative z-10 lg:pr-12">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Get In Touch</h1>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              Have questions, feedback, or need support? Our team is here to help. Reach out and we'll get back to you as soon as possible.
            </p>
            <div className="mt-10 space-y-8">
                <div className="flex items-center space-x-6 bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">General Inquiries</p>
                        <a href="mailto:hello@gradniche.com" className="text-xl font-semibold text-white hover:text-[#F6520C] transition-colors">hello@gradniche.com</a>
                    </div>
                </div>
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" alt="Students collaborating" className="rounded-2xl shadow-2xl w-full h-72 object-cover border border-white/5"/>
            </div>
          </div>
          <div className="lg:w-5/12 relative z-10">
            <div className="bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
              {/* Form glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#F6520C]/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold mb-8 text-white tracking-tight">Send Us a Message</h3>
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input type="text" id="name" placeholder="Your Name" className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C]/50 focus:border-[#F6520C]/50 text-white placeholder-gray-500 transition-all" />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input type="email" id="email" placeholder="Your Email" className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C]/50 focus:border-[#F6520C]/50 text-white placeholder-gray-500 transition-all" />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea id="message" placeholder="Your Message" rows={5} className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C]/50 focus:border-[#F6520C]/50 text-white placeholder-gray-500 transition-all resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-[#F6520C] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#d44306] transition-all duration-300 shadow-[0_0_20px_rgba(246,82,12,0.3)] transform hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050810] focus:ring-[#F6520C]">
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
