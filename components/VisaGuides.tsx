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
    <div className="border border-gray-700 rounded-lg overflow-hidden">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-5 bg-gray-800/50 hover:bg-gray-800 transition-colors"
            aria-expanded={isOpen}
        >
            <span className="text-lg font-medium text-white">{faq.question}</span>
            <svg
                className={`w-6 h-6 text-[#F6520C] transform transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="p-5 bg-white/5 text-gray-400">
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
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Student Visa Application Guides</h1>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        Your complete step-by-step resource for navigating the student visa process for top study abroad destinations.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center mb-8 border-b border-gray-700">
                    {Object.keys(countryDetails).map(key => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key as CountryKey)}
                            className={`px-4 sm:px-6 py-3 text-sm sm:text-base font-medium transition-colors border-b-2 ${activeTab === key ? 'border-[#F6520C] text-[#F6520C]' : 'border-transparent text-gray-400 hover:text-white'}`}
                        >
                            {countryDetails[key as CountryKey].name}
                        </button>
                    ))}
                </div>

                <div key={activeTab} className="max-w-4xl mx-auto animate-fade-in">
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-gray-700 mb-10">
                        <h2 className="text-3xl font-bold text-white mb-4">Visa Overview</h2>
                        <p className="text-gray-300 leading-relaxed">{selectedGuide.overview}</p>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">Document Checklist</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {selectedGuide.documents.map((doc, index) => (
                                <div key={index} className="bg-gray-800/50 p-4 rounded-lg flex items-center space-x-4 border border-gray-700">
                                    <div className="text-[#F6520C] flex-shrink-0">
                                        {React.cloneElement(doc.icon, { className: "w-8 h-8" })}
                                    </div>
                                    <p className="font-medium text-white">{doc.item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">Step-by-Step Application Process</h2>
                        <div className="space-y-8">
                           {selectedGuide.steps.map((step, index) => (
                                <div key={index} className="flex items-start space-x-6">
                                    <div className="flex-shrink-0 bg-[#F6520C] rounded-full text-white flex items-center justify-center font-bold text-2xl h-12 w-12 shadow-lg border-2 border-[#F6520C]/50">
                                        {index + 1}
                                    </div>
                                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex-1 hover:border-[#F6520C]/50 transition-colors">
                                        <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                                        <p className="text-gray-400">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="bg-white/5 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-2xl font-semibold text-white mb-4">Financial Requirements</h3>
                            <ul className="list-disc list-outside pl-5 text-gray-400 space-y-2 marker:text-[#F6520C]">
                               {selectedGuide.financials.map((req, i) => <li key={i}>{req}</li>)}
                            </ul>
                        </div>
                         <div className="bg-white/5 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-2xl font-semibold text-white mb-4">Interview Tips</h3>
                            <ul className="list-disc list-inside text-gray-400 space-y-2">
                               {selectedGuide.interviewTips.map((tip, i) => <li key={i}>{tip}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div>
                         <h2 className="text-3xl font-bold text-white mb-6 text-center">Visa FAQs</h2>
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