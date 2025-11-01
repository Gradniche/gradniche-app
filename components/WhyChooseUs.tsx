import React from 'react';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1014.12 11.88a3 3 0 00-4.242 4.242zM19.932 19.932a3 3 0 01-4.242 0 3 3 0 010-4.242m4.242 4.242L15.5 15.5" />
      </svg>
    ),
    title: 'AI-Powered Matching',
    description: 'Our advanced algorithm matches your profile with the best-fit universities and courses worldwide.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '99.7% Visa Success',
    description: 'Leverage our meticulous documentation and mock interview prep for a near-guaranteed visa approval.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
        <path d="M7 13.5a5.5 5.5 0 1111 0v-1a5.5 5.5 0 00-11 0v1z" />
      </svg>
    ),
    title: 'Elite Scholarship Access',
    description: 'We provide exclusive access to scholarship portals and assist in crafting winning applications.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 12a12 12 0 11-24 0 12 12 0 0124 0z" clipRule="evenodd" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v1.5M12 20.25v1.5M4.929 4.929l1.061 1.06M18.01 18.01l1.06 1.06M2.25 12h1.5M20.25 12h1.5M4.929 19.071l1.06-1.06M18.01 5.99l1.06-1.06" />
      </svg>
    ),
    title: '24/7 Global Support',
    description: 'From pre-departure to post-arrival, our global support network is always available for you.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-[#0a101f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">The GradNiche Advantage</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            We merge cutting-edge technology with human expertise to redefine your path to global education.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-teal-500/20 hover:border-teal-400">
              <div className="flex justify-center items-center mb-4 h-12">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;