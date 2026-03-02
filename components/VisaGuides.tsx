import React, { useState, useEffect } from 'react';
import { destinationData } from '../data/destinations';
import { FAQ, VisaGuide } from '../data/destinations';

interface VisaGuidesProps {
    onBack: () => void;
}

type CountryKey = 'usa' | 'canada' | 'uk' | 'australia' | 'germany' | 'ireland' | 'uae' | 'new-zealand';

const countryDetails = {
    usa: { name: 'USA (F-1 Visa)', data: destinationData.usa },
    canada: { name: 'Canada (Study Permit)', data: destinationData.canada },
    uk: { name: 'UK (Student Visa)', data: destinationData.uk },
    australia: { name: 'Australia (subclass 500)', data: destinationData.australia },
    germany: { name: 'Germany (National Visa)', data: destinationData.germany },
    ireland: { name: 'Ireland (Study Visa)', data: destinationData.ireland },
    uae: { name: 'UAE (Student Visa)', data: destinationData.uae },
    'new-zealand': { name: 'New Zealand (Student Visa)', data: destinationData['new-zealand'] },
};


const AccordionItem: React.FC<{ faq: FAQ, isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick }) => (
    <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
            aria-expanded={isOpen}
        >
            <span className={`text-lg font-medium tracking-tight ${isOpen ? 'text-[#F6520C]' : 'text-white'}`}>{faq.question}</span>
            <svg
                className={`w-6 h-6 text-[#F6520C] transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2 font-light">
                <p>{faq.answer}</p>
            </div>
        </div>
    </div>
);

const VisaGuides: React.FC<VisaGuidesProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<CountryKey>('usa');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    const selectedGuide = countryDetails[activeTab].data.visaGuide;
    const countryName = countryDetails[activeTab].data.name;

    useEffect(() => {
        const scriptId = 'visa-guide-structured-data';
        document.getElementById(scriptId)?.remove();

        const howToData = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to Apply for a Student Visa for ${countryName}`,
            "step": selectedGuide.steps.map(step => ({
                "@type": "HowToStep",
                "name": step.title,
                "text": step.description
            }))
        };
        const faqJsonData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": selectedGuide.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": { "@type": "Answer", "text": item.answer }
            }))
        };

        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify([howToData, faqJsonData]);
        document.head.appendChild(script);

        return () => { document.getElementById(scriptId)?.remove(); };
    }, [activeTab, selectedGuide, countryName]);
    
    useEffect(() => {
        setOpenFaqIndex(0); // Reset accordion on tab change
    }, [activeTab]);


    return (
        <section className="py-24 relative bg-[#0a101f] min-h-screen overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-12">
                    <button onClick={onBack} className="bg-white/5 backdrop-blur-md text-white hover:text-[#F6520C] transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-full py-2 px-5 border border-white/10 hover:border-[#F6520C]/50 group w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span className="font-medium">Back to Tools</span>
                    </button>
                </div>

                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                        <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Visa Assistance</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Student Visa Application Guides</h1>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl mx-auto font-light">
                        Your complete step-by-step resource for navigating the student visa process for top study abroad destinations.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center mb-12 border-b border-white/10">
                    {Object.keys(countryDetails).map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key as CountryKey)}
                            className={`px-4 sm:px-6 py-4 text-sm sm:text-base font-medium transition-all duration-300 border-b-2 ${activeTab === key ? 'border-[#F6520C] text-[#F6520C]' : 'border-transparent text-gray-400 hover:text-white hover:border-white/20'}`}
                        >
                            {countryDetails[key as CountryKey].name}
                        </button>
                    ))}
                </div>

                <div key={activeTab} className="max-w-4xl mx-auto animate-fade-in">
                    <div className="bg-white/[0.02] backdrop-blur-md p-10 rounded-[2rem] border border-white/5 mb-12 shadow-2xl">
                        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Visa Overview</h2>
                        <p className="text-gray-300 leading-relaxed font-light text-lg">{selectedGuide.overview}</p>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Document Checklist</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {selectedGuide.documents.map((doc, index) => (
                                <div key={index} className="bg-white/[0.02] backdrop-blur-md p-6 rounded-2xl flex items-center space-x-4 border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F6520C]/5">
                                    <div className="text-[#F6520C] flex-shrink-0 bg-white/5 p-3 rounded-xl">
                                        {React.cloneElement(doc.icon, { className: "w-8 h-8" })}
                                    </div>
                                    <p className="font-medium text-white">{doc.item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Step-by-Step Application Process</h2>
                        <div className="space-y-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#F6520C] to-transparent hidden md:block"></div>
                           {selectedGuide.steps.map((step, index) => (
                                <div key={index} className="flex flex-col md:flex-row items-start md:space-x-8 group">
                                    <div className="flex-shrink-0 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full text-white flex items-center justify-center font-bold text-xl h-12 w-12 shadow-lg z-10 mb-4 md:mb-0 group-hover:scale-110 transition-transform duration-300">
                                        {index + 1}
                                    </div>
                                    <div className="bg-white/[0.02] backdrop-blur-md p-8 rounded-3xl border border-white/5 flex-1 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F6520C]/5">
                                        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#F6520C] transition-colors duration-300">{step.title}</h3>
                                        <p className="text-gray-400 font-light leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white/[0.02] backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Financial Requirements
                            </h3>
                            <ul className="space-y-4">
                               {selectedGuide.financials.map((req, i) => (
                                   <li key={i} className="flex items-start gap-3 text-gray-400 font-light">
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                       {req}
                                   </li>
                               ))}
                            </ul>
                        </div>
                         <div className="bg-white/[0.02] backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Interview Tips
                            </h3>
                            <ul className="space-y-4">
                               {selectedGuide.interviewTips.map((tip, i) => (
                                   <li key={i} className="flex items-start gap-3 text-gray-400 font-light">
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                       {tip}
                                   </li>
                               ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                         <h2 className="text-4xl font-bold text-white mb-10 text-center tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Visa FAQs</h2>
                         <div className="space-y-4">
                            {selectedGuide.faq.map((faqItem, index) => (
                                <AccordionItem 
                                    key={index} 
                                    faq={faqItem} 
                                    isOpen={openFaqIndex === index}
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisaGuides;