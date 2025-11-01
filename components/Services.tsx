import React from 'react';

const services = [
  'University & Course Selection',
  'Application Assistance',
  'SOP/LOR Guidance',
  'Visa Interview Preparation',
  'Scholarship Support',
  'Pre-Departure Briefing',
  'Education Loan Assistance',
  'Post-Arrival Support',
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-[#0a101f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Your Complete Pathway</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            We provide a comprehensive suite of services, ensuring a seamless transition from your home to your global future.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg shadow-md flex items-center space-x-4 border border-gray-700 hover:border-teal-500 hover:bg-gray-800 transition-all duration-300">
              <div className="bg-teal-600/20 text-teal-400 rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-md font-semibold text-gray-300">{service}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;