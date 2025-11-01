import React from 'react';

const steps = [
  { number: 1, title: 'AI-Powered Counselling', description: 'We understand your profile and aspirations through an advanced assessment.' },
  { number: 2, title: 'Data-Driven Shortlisting', description: 'Our AI suggests the best-fit country, university, and course for you.' },
  { number: 3, title: 'Optimized Application', description: 'We guide you through a streamlined, error-free application process.' },
  { number: 4, title: 'Strategic Visa Prep', description: 'Expert assistance and mock interviews for a high success rate.' },
  { number: 5, title: 'Smart Departure', description: 'Pre-departure guidance to ensure a smooth transition to your new life.' },
];

const Process: React.FC = () => {
  return (
    <section className="py-20 bg-[#0a101f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Futurized 5-Step Process</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            We've engineered a seamless, tech-driven pathway to your global education.
          </p>
        </div>
        
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div className="absolute border-opacity-20 border-gray-700 h-full border" style={{left: '50%'}}></div>

          {steps.map((step, index) => (
            <div key={step.number} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-teal-500 shadow-xl w-12 h-12 rounded-full">
                <h1 className="mx-auto font-bold text-lg text-white">{step.number}</h1>
              </div>
              <div className="order-1 bg-gray-800/50 rounded-lg shadow-xl w-5/12 px-6 py-4 border border-gray-700">
                <h3 className="mb-3 font-bold text-white text-xl">{step.title}</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-400 text-opacity-100">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;