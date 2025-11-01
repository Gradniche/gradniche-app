import React, { useState, useEffect, useRef } from 'react';
import { Destination, FAQ, VisaGuide } from '../data/destinations';
import { Page } from '../App';
import { generateAvatarUrl } from '../data/forums';

interface DestinationDetailProps {
  country: Destination;
  onBack: () => void;
  navigateTo: (page: Page) => void;
}

// --- NEW ENHANCED INFO CARD COMPONENTS ---

const SectionWrapper: React.FC<{id: string, title: string, children: React.ReactNode, icon?: React.ReactNode}> = ({ id, title, children, icon }) => (
    <div id={id} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 h-full scroll-mt-36">
        <div className="flex items-center space-x-3 mb-4">
            {icon && <div className="flex-shrink-0 bg-gray-800/50 p-3 rounded-lg ring-2 ring-gray-700">{icon}</div>}
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
        </div>
        {children}
    </div>
);


const CostCard: React.FC<{ title: string; content: string; id: string }> = ({ title, content, id }) => {
    const tuitionMatch = content.match(/Tuition Fees:([\s\S]*?)Living Costs:/);
    const livingMatch = content.match(/Living Costs:([\s\S]*)/);

    const tuitionContent = tuitionMatch ? tuitionMatch[1].trim() : content;
    const livingContent = livingMatch ? livingMatch[1].trim() : '';

    const parseAndHighlight = (text: string) => {
        const highlighted = text.replace(/(\$[\d,]+)/g, '<strong class="text-[#F6520C] font-bold text-lg">$1</strong>');
        return <p className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted }} />;
    };

    return (
        // FIX: Replaced hardcoded title cleaning with a regex to work for all countries and remove dependency on 'destinationData'.
        <SectionWrapper id={id} title={title.replace(/ in .*/, '')} icon={
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        }>
            <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg text-white mb-2">Tuition Fees</h4>
                    {parseAndHighlight(tuitionContent)}
                </div>
                 <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg text-white mb-2">Living Costs</h4>
                    {parseAndHighlight(livingContent)}
                </div>
            </div>
        </SectionWrapper>
    );
};

const AdmissionProcessCard: React.FC<{ title: string; content: string; id: string }> = ({ title, content, id }) => {
    const steps = content.split('\n').map(line => {
        const match = line.match(/^(\d+)\.\s*(.*?):\s*(.*)/);
        if (!match) return null;
        return { number: match[1], title: match[2], description: match[3] };
    }).filter(Boolean);

    return (
        <SectionWrapper id={id} title={title} icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        }>
            <div className="relative pl-8 mt-4 border-l-2 border-dashed border-gray-700">
                {steps.map((step, index) => (
                    <div key={index} className="relative mb-8 last:mb-0">
                        <div className="absolute -left-[17px] top-0 w-8 h-8 bg-[#F6520C] rounded-full flex items-center justify-center text-white font-bold ring-4 ring-[#0a101f]">{step?.number}</div>
                        <div className="pl-6">
                            <h4 className="font-bold text-white text-lg">{step?.title}</h4>
                            <p className="text-gray-400 text-sm mt-1">{step?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

const PopularCoursesCard: React.FC<{ title: string; content: string; id: string }> = ({ title, content, id }) => {
    const courses = content.split('\n')[1]?.split(', ').map(c => c.trim()) || [];
    return (
         <SectionWrapper id={id} title={title.replace(/ in .*/, '')} icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4M14 3v4m-2 2h4M15 17v4m-2-2h4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        }>
            <div className="flex flex-wrap gap-3 mt-2">
                {courses.map(course => (
                    <span key={course} className="bg-gray-700/50 text-gray-300 text-sm font-medium px-3 py-1.5 rounded-full">{course}</span>
                ))}
            </div>
        </SectionWrapper>
    );
};

const GenericInfoCard: React.FC<{ title: string, content: string, id: string, icon: React.ReactNode, cta?: { text: string, action: () => void } }> = ({ title, content, id, icon, cta }) => {
    // A function to highlight key terms
    const highlightContent = (text: string) => {
        const highlighted = text
            .replace(/(Optional Practical Training \(OPT\)|STEM OPT Extension)/g, '<strong class="text-orange-300">$1</strong>')
            .replace(/(University Scholarships|Assistantships|External Scholarships|Fulbright-Nehru Fellowships|Tata Scholarship)/g, '<strong class="text-orange-300">$1</strong>')
            .replace(/(Bachelor's|Master's|doctoral degrees \(PhD\))/g, '<strong class="text-orange-300">$1</strong>');
        return <div className="text-gray-400 leading-relaxed whitespace-pre-line space-y-3" dangerouslySetInnerHTML={{ __html: highlighted }} />;
    };

    return (
        <SectionWrapper id={id} title={title} icon={icon}>
            {highlightContent(content)}
            {cta && (
                 <div className="mt-6">
                    <button onClick={cta.action} className="bg-gray-800/80 text-[#F6520C] border border-[#F6520C] px-6 py-2 rounded-full hover:bg-[#F6520C] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#F6520C]">
                      {cta.text}
                    </button>
                </div>
            )}
        </SectionWrapper>
    );
};

const VisaGuideSection: React.FC<{ visaGuide: VisaGuide; countryName: string; id: string }> = ({ visaGuide, countryName, id }) => {
    return (
        <div id={id} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 scroll-mt-36">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">{countryName} Student Visa Guide</h3>
            <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto mb-10">{visaGuide.overview}</p>
            
            <div className="space-y-12">
                <div>
                    <h4 className="text-2xl font-semibold text-white mb-6 text-center">Document Checklist</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {visaGuide.documents.map((doc, index) => (
                            <div key={index} className="bg-gray-800/50 p-4 rounded-lg flex items-center space-x-4 border border-gray-700">
                                <div className="text-[#F6520C] flex-shrink-0">{React.cloneElement(doc.icon, { className: "w-8 h-8" })}</div>
                                <p className="font-medium text-white text-sm">{doc.item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div>
                    <h4 className="text-2xl font-semibold text-white mb-8 text-center">Step-by-Step Application Process</h4>
                    <div className="relative pl-8 border-l-2 border-dashed border-gray-700">
                        {visaGuide.steps.map((step, index) => (
                             <div key={index} className="relative mb-8 last:mb-0">
                                <div className="absolute -left-[17px] top-0 w-8 h-8 bg-gray-800 border-2 border-[#F6520C] rounded-full flex items-center justify-center text-white font-bold">{index + 1}</div>
                                <div className="pl-6">
                                    <h5 className="font-bold text-orange-300 text-lg">{step.title}</h5>
                                    <p className="text-gray-400 text-sm mt-1">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold text-white mb-4">Financial Requirements</h4>
                        <ul className="list-disc list-outside pl-5 text-gray-400 space-y-2 marker:text-[#F6520C]">
                           {visaGuide.financials.map((req, i) => <li key={i}>{req}</li>)}
                        </ul>
                    </div>
                     <div className="bg-gray-800/50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold text-white mb-4">Interview Tips</h4>
                        <ul className="list-disc list-outside pl-5 text-gray-400 space-y-2 marker:text-[#F6520C]">
                           {visaGuide.interviewTips.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
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
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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

const navLinks = [
    { id: 'why-study', label: 'Why Study' },
    { id: 'costs', label: 'Costs' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'visa', label: 'Student Visa' },
    { id: 'work', label: 'Work Rights' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'education-system', label: 'Education System'},
    { id: 'courses', label: 'Popular Courses'},
    { id: 'universities', label: 'Universities' },
    { id: 'faq', label: 'FAQ' },
];

const DestinationDetail: React.FC<DestinationDetailProps> = ({ country, onBack, navigateTo }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<string>('why-study');
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({});
  const tabContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = 'faq-structured-data';
    document.getElementById(scriptId)?.remove();

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": country.faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px', threshold: 0 });

    navLinks.forEach(link => {
        const el = document.getElementById(link.id);
        if (el) {
            sectionRefs.current[link.id] = el;
            observer.observe(el);
        }
    });

    return () => {
        document.getElementById(scriptId)?.remove();
        const currentRefs = sectionRefs.current;
        Object.keys(currentRefs).forEach(key => {
            const el = currentRefs[key];
            if (el) {
                observer.unobserve(el);
            }
        });
    };
  }, [country.faq]);
  
  useEffect(() => {
    if (activeSection && tabContainerRef.current) {
        const activeTabElement = tabContainerRef.current.querySelector(`a[href="#${activeSection}"]`);
        if (activeTabElement) {
            activeTabElement.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }
  }, [activeSection]);
  
  const handleFaqClick = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#0a101f] text-gray-300">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] text-white flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a101f] via-[#1a233a] to-[#0a101f]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(246,82,12,0.2)_0%,rgba(10,16,31,0)_70%)]"></div>
        
        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center">
            <div className="w-40 h-40 md:w-48 md:h-48 mb-6 bg-white/10 backdrop-blur-sm p-3 rounded-full border-2 border-white/20 shadow-2xl shadow-[#F6520C]/20 transform transition-transform hover:scale-105 duration-300">
                <img
                    src={generateAvatarUrl(country.avatarConfig)}
                    alt={`${country.name} student avatar`}
                    className="w-full h-full"
                />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold" style={{ textShadow: '0px 2px 10px rgba(0, 0, 0, 0.7)' }}>
                Study in {country.name}
            </h1>
            <p className="mt-4 text-lg md:text-xl font-light max-w-3xl mx-auto" style={{ textShadow: '0px 1px 5px rgba(0, 0, 0, 0.5)' }}>
               Your Guide to Top Universities, Visas, and Costs for Indian Students
            </p>
        </div>
      </section>

       <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
            <main className="py-16 transform lg:-translate-y-24">
                <div className="mb-8">
                    <button onClick={onBack} className="bg-black/30 backdrop-blur-md text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-full py-2 px-4 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Back</span>
                    </button>
                </div>

                <div className="sticky top-[80px] lg:top-44 z-30 bg-[#0a101f]/80 backdrop-blur-md py-2 mb-8 -mx-6">
                    <div ref={tabContainerRef} className="flex space-x-4 overflow-x-auto px-6 pb-2 modern-scrollbar">
                        {navLinks.map(link => (
                             <a key={link.id} href={`#${link.id}`}
                                className={`block whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeSection === link.id ? 'bg-[#F6520C] text-white' : 'text-gray-300 bg-gray-800/50 hover:bg-gray-700'}`}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto text-center mb-16 bg-white/5 backdrop-blur-md border border-gray-700 p-8 rounded-lg shadow-xl">
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{country.intro}</p>
                </div>

                <section id="why-study" className="mb-20 scroll-mt-36">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Why Study in {country.name}?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {country.whyStudy.map(reason => (
                            <div key={reason.title} className="bg-white/5 p-6 rounded-lg text-center border border-[#F6520C]/20 hover:border-[#F6520C] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
                                <div className="mb-4 bg-gray-800/50 p-4 rounded-full inline-block ring-2 ring-[#F6520C]/30">{React.cloneElement(reason.icon, { className: "h-8 w-8 text-[#F6520C]" })}</div>
                                <h3 className="text-xl font-semibold text-[#F6520C] mb-3">{reason.title}</h3>
                                <p className="text-gray-400 flex-grow">{reason.point}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CostCard id="costs" title={`Tuition & Living Costs in ${country.name}`} content={country.costOfStudyingInfo} />
                    <AdmissionProcessCard id="admissions" title="Admission Process" content={country.admissionProcessInfo} />
                    <div className="lg:col-span-2">
                        <VisaGuideSection id="visa" countryName={country.name} visaGuide={country.visaGuide} />
                    </div>
                    <GenericInfoCard id="work" title="Post-Study Work Opportunities" content={country.postStudyWorkInfo} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    } />
                    <GenericInfoCard id="scholarships" title="Scholarships and Funding" content={country.scholarshipsInfo} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    } cta={{ text: "Find Scholarships", action: () => navigateTo('scholarship-finder') }} />
                    <GenericInfoCard id="education-system" title="The Higher Education System" content={country.educationSystemInfo} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                    } />
                    <PopularCoursesCard id="courses" title={`Popular Master's Courses in ${country.name}`} content={country.coursesInfo} />
                </section>

                <section id="universities" className="my-20 scroll-mt-36">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Top Universities in {country.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {country.topUniversities.map(uni => (
                            <div key={uni.name} className="bg-gray-800/50 p-6 rounded-lg text-center border border-gray-700 transition-shadow hover:shadow-lg hover:shadow-[#F6520C]/10 flex flex-col items-center justify-center space-y-3">
                                <img src={uni.logo} alt={`${uni.name} logo`} className="w-16 h-16 rounded-full object-contain bg-white p-1" />
                                <h4 className="font-semibold text-white text-md">{uni.name}</h4>
                                <p className="text-yellow-400 text-sm mt-1">QS Ranking: #{uni.qsRanking}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <button onClick={() => navigateTo('college-finder')} className="bg-[#F6520C] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#E84A00]">
                            Explore More in College Finder
                        </button>
                    </div>
                </section>
                
                <section id="faq" className="scroll-mt-36">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {country.faq.map((faqItem, index) => (
                            <AccordionItem 
                                key={index} 
                                faq={faqItem} 
                                isOpen={openFaqIndex === index}
                                onClick={() => handleFaqClick(index)}
                            />
                        ))}
                    </div>
                </section>
            </main>
      </div>
    </div>
  );
};

export default DestinationDetail;