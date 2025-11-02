import React from 'react';
import { generateAvatarUrl, AvatarConfig } from '../data/forums';

const PlatformFeatures: React.FC = () => {
    const communityAvatars: AvatarConfig[] = [
        { style: 'adventurer', options: { seed: 'rohan-mehta', hair: 'short08', eyes: 'variant05', skinColor: 'AF6E5A', hairColor: '2c1b18', clothing: 'shirt', clothingColor: '607d8b' } },
        { style: 'adventurer', options: { seed: 'priya-sharma', hair: 'long14', eyes: 'variant12', skinColor: 'D88C7A', hairColor: '4D4D4D', clothing: 'hoodie', clothingColor: 'f44336' } },
        { style: 'adventurer', options: { seed: 'vikram-kumar', hair: 'short06', eyes: 'variant03', skinColor: 'E4A381', hairColor: 'A25900', clothing: 'crewNeck', clothingColor: '009688' } },
    ];

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'AI-Powered Tools',
      description: 'Our suite of AI tools simplifies your research, from finding the right country to analyzing your SOP.',
      customContent: null,
    },
    {
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Vast University Database',
      description: 'Access detailed, up-to-date information on thousands of universities and courses worldwide.',
      customContent: null,
    },
    {
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Comprehensive Guides',
      description: 'From visa applications to scholarship essays, our free resources cover every step of your journey.',
      customContent: null,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Student Community',
      description: 'Connect with peers, read authentic reviews, and get advice from students already studying abroad.',
      customContent: (
        <div className="mt-4 flex justify-center -space-x-3">
            {communityAvatars.map((config, index) => (
                <img
                    key={index}
                    className="h-10 w-10 rounded-full border-2 border-gray-800"
                    src={generateAvatarUrl(config)}
                    alt={`Community user ${index + 1}`}
                />
            ))}
            <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white border-2 border-gray-800">
                +9k
            </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 bg-[#0a101f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Why GradNiche?</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            We merge cutting-edge technology with comprehensive data to empower your path to global education.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 border border-[#F6520C]/20 hover:border-[#F6520C] flex flex-col">
              <div className="flex justify-center items-center mb-4 h-12">{feature.icon}</div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
              {feature.customContent && <div className="mt-auto">{feature.customContent}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;