
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Destination, FAQ, VisaGuide } from '../data/destinations';
import { generateAvatarUrl } from '../data/forums';

interface DestinationDetailProps {
  country: Destination;
  onBack: () => void;
  navigate: (path: string) => void;
}

// --- Helper Components ---

const PremiumIcon = ({ icon, color = 'from-orange-500 to-pink-500' }: { icon: React.ReactNode, color?: string }) => (
    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg shadow-orange-500/10 text-white transform group-hover:scale-110 transition-transform duration-300`}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-7 h-7" })}
    </div>
);

const SectionWrapper: React.FC<{id: string, title: string, children: React.ReactNode, icon?: React.ReactNode, className?: string}> = ({ id, title, children, icon, className = "" }) => (
    <div id={id} className={`bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full scroll-mt-36 shadow-2xl ${className}`}>
        <div className="flex items-center space-x-4 mb-6">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
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
        const highlighted = text.replace(/(\$[\d,]+|£[\d,]+|€[\d,]+|₹[\d,]+)/g, '<strong class="text-[#F6520C] font-extrabold text-xl">$1</strong>');
        return <p className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: highlighted }} />;
    };

    return (
        <SectionWrapper id={id} title={title.replace(/ in .*/, '')} icon={
             <PremiumIcon icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
             } color="from-green-500 to-emerald-600" />
        }>
            <div className="grid gap-6">
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors">
                    <h4 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span> Tuition Fees
                    </h4>
                    {parseAndHighlight(tuitionContent)}
                </div>
                 <div className="bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
                    <h4 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span> Living Costs
                    </h4>
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
            <PremiumIcon icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            } color="from-blue-500 to-indigo-600" />
        }>
            <div className="relative pl-4 mt-4 space-y-6">
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 to-transparent"></div>
                {steps.map((step, index) => (
                    <div key={index} className="relative flex items-start group">
                        <div className="absolute left-0 w-10 h-10 bg-gray-900 border-2 border-blue-500 rounded-full flex items-center justify-center text-blue-400 font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">{step?.number}</div>
                        <div className="pl-14 pt-1">
                            <h4 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">{step?.title}</h4>
                            <p className="text-gray-400 text-sm mt-1 leading-relaxed">{step?.description}</p>
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
            <PremiumIcon icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 011.806-.547z" />
                </svg>
            } color="from-pink-500 to-rose-500" />
        }>
            <div className="flex flex-wrap gap-3 mt-4">
                {courses.map(course => (
                    <span key={course} className="bg-gray-800/80 border border-gray-700 text-gray-300 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#F6520C] hover:text-white hover:border-[#F6520C] transition-all duration-300 cursor-default shadow-sm">
                        {course}
                    </span>
                ))}
            </div>
        </SectionWrapper>
    );
};

const GenericInfoCard: React.FC<{ title: string, content: string, id: string, icon: React.ReactNode, cta?: { text: string, action: () => void }, color?: string }> = ({ title, content, id, icon, cta, color }) => {
    const highlightContent = (text: string) => {
        const highlighted = text
            .replace(/(Optional Practical Training \(OPT\)|STEM OPT Extension)/g, '<strong class="text-white underline decoration-[#F6520C] decoration-2">$1</strong>')
            .replace(/(University Scholarships|Assistantships|External Scholarships|Fulbright-Nehru Fellowships|Tata Scholarship)/g, '<strong class="text-white underline decoration-green-500 decoration-2">$1</strong>')
            .replace(/(Bachelor's|Master's|doctoral degrees \(PhD\))/g, '<strong class="text-white">$1</strong>');
        return <div className="text-gray-400 leading-relaxed whitespace-pre-line space-y-4 text-base" dangerouslySetInnerHTML={{ __html: highlighted }} />;
    };

    return (
        <SectionWrapper id={id} title={title} icon={<PremiumIcon icon={icon} color={color} />}>
            {highlightContent(content)}
            {cta && (
                 <div className="mt-8">
                    <button onClick={cta.action} className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full hover:bg-[#F6520C] hover:border-[#F6520C] transition-all duration-300 font-semibold shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 group">
                      {cta.text}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                </div>
            )}
        </SectionWrapper>
    );
};

const VisaGuideSection: React.FC<{ visaGuide: VisaGuide; countryName: string; id: string }> = ({ visaGuide, countryName, id }) => {
    return (
        <div id={id} className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 scroll-mt-36 shadow-2xl">
            <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{countryName} Student Visa Guide</h3>
                <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto text-lg">{visaGuide.overview}</p>
            </div>
            
            <div className="space-y-12">
                <div>
                    <h4 className="text-xl font-bold text-[#F6520C] mb-6 uppercase tracking-wider flex items-center gap-3">
                        <span className="h-px w-8 bg-[#F6520C]"></span> Document Checklist
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {visaGuide.documents.map((doc, index) => (
                            <div key={index} className="bg-black/30 p-4 rounded-xl flex items-center space-x-4 border border-white/5 hover:border-white/20 transition-all hover:bg-black/40">
                                <div className="text-[#F6520C] flex-shrink-0 bg-white/5 p-2 rounded-lg">{React.cloneElement(doc.icon, { className: "w-6 h-6" })}</div>
                                <p className="font-medium text-gray-200 text-sm">{doc.item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div>
                    <h4 className="text-xl font-bold text-[#F6520C] mb-8 uppercase tracking-wider flex items-center gap-3">
                        <span className="h-px w-8 bg-[#F6520C]"></span> Application Steps
                    </h4>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 relative">
                        {/* Timeline line for large screens if needed, but here using cards */}
                        {visaGuide.steps.map((step, index) => (
                             <div key={index} className="relative flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">{index + 1}</div>
                                <div>
                                    <h5 className="font-bold text-white text-lg mb-2">{step.title}</h5>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-black/20 p-8 rounded-3xl border border-white/5">
                        <h4 className="text-lg font-bold text-green-400 mb-6 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>
                            Financial Requirements
                        </h4>
                        <ul className="space-y-4">
                           {visaGuide.financials.map((req, i) => (
                               <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                   {req}
                               </li>
                           ))}
                        </ul>
                    </div>
                     <div className="bg-black/20 p-8 rounded-3xl border border-white/5">
                        <h4 className="text-lg font-bold text-blue-400 mb-6 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            Interview Tips
                        </h4>
                        <ul className="space-y-4">
                           {visaGuide.interviewTips.map((tip, i) => (
                               <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                   {tip}
                               </li>
                           ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};


const AccordionItem: React.FC<{ faq: FAQ, isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick }) => (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-5 hover:bg-white/5 transition-colors"
            aria-expanded={isOpen}
        >
            <span className={`text-lg font-medium ${isOpen ? 'text-[#F6520C]' : 'text-white'}`}>{faq.question}</span>
            <svg
                className={`w-6 h-6 text-[#F6520C] transform transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-5 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                <p>{faq.answer}</p>
            </div>
        </div>
    </div>
);

const navLinks = [
    { id: 'why-study', label: 'Overview' },
    { id: 'costs', label: 'Costs' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'visa', label: 'Visa Guide' },
    { id: 'work', label: 'Career' },
    { id: 'universities', label: 'Universities' },
    { id: 'faq', label: 'FAQ' },
];

const DestinationDetail: React.FC<DestinationDetailProps> = ({ country, onBack, navigate }) => {
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
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

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

  const gradients = [
    'from-orange-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-purple-500 to-indigo-500',
  ];

  return (
    <div className="bg-[#0a101f] text-gray-300 font-sans selection:bg-[#F6520C] selection:text-white">
      {/* Cinematic Hero Section */}
      <section className="relative h-[75vh] min-h-[550px] text-white flex items-center justify-center text-center overflow-hidden -mt-20">
        <div 
            className="absolute inset-0 bg-center bg-cover z-0 transform scale-105"
            style={{ 
                backgroundImage: `url('${country.heroImage}')`,
                backgroundAttachment: 'fixed' // Simple parallax
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0a101f]/70 to-[#0a101f] z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a101f_90%)] z-10"></div>
        
        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center animate-fade-in">
            <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative w-40 h-40 md:w-48 md:h-48 bg-gray-900 p-1 rounded-full border-2 border-white/10">
                    <img
                        src={generateAvatarUrl(country.avatarConfig)}
                        alt={`${country.name} student avatar`}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#F6520C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Guide
                </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 drop-shadow-2xl">
                Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6520C] to-orange-300">{country.name}</span>
            </h1>
            <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto text-gray-200 leading-relaxed">
               {country.intro}
            </p>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7-7-7" />
            </svg>
        </div>
      </section>

       <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-30">
            <main className="py-12">
                {/* Back Button */}
                <div className="mb-8 absolute top-[-80px] left-4 md:left-8 z-40">
                    <button onClick={onBack} className="bg-black/40 backdrop-blur-md text-white hover:text-[#F6520C] transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-full py-2 px-5 border border-white/10 hover:border-[#F6520C]/50 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Back to Destinations</span>
                    </button>
                </div>

                {/* Sticky Navigation */}
                <div className="sticky top-20 z-40 mb-16 flex justify-center">
                    <div className="bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl shadow-black/50 inline-flex max-w-full overflow-x-auto modern-scrollbar">
                        <div ref={tabContainerRef} className="flex space-x-1">
                            {navLinks.map(link => (
                                 <a key={link.id} href={`#${link.id}`}
                                    className={`whitespace-nowrap px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${activeSection === link.id ? 'bg-[#F6520C] text-white shadow-lg shadow-orange-500/25' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bento Grid: Why Study */}
                <section id="why-study" className="mb-24 scroll-mt-36">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">Why {country.name}?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                        {country.whyStudy.map((reason, index) => {
                            // Create an asymmetrical bento grid layout
                            const colSpan = (index === 0 || index === 3) ? "md:col-span-2" : "md:col-span-1";
                            return (
                                <div key={reason.title} className={`bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 group flex flex-col justify-between ${colSpan} hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#F6520C]/5`}>
                                    <div>
                                        <div className="mb-6">
                                            <PremiumIcon icon={reason.icon} color={gradients[index % gradients.length]} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#F6520C] transition-colors">{reason.title}</h3>
                                        <p className="text-gray-400 text-lg leading-relaxed">{reason.point}</p>
                                    </div>
                                    {/* Decorative faint background number */}
                                    <div className="text-8xl font-black text-white/5 absolute -bottom-4 -right-4 pointer-events-none select-none">0{index+1}</div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Info Grid */}
                <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CostCard id="costs" title={`Tuition & Living Costs`} content={country.costOfStudyingInfo} />
                    <AdmissionProcessCard id="admissions" title="Admission Process" content={country.admissionProcessInfo} />
                    
                    <div className="lg:col-span-2">
                        <VisaGuideSection id="visa" countryName={country.name} visaGuide={country.visaGuide} />
                    </div>
                    
                    <GenericInfoCard 
                        id="work" 
                        title="Career Opportunities" 
                        content={country.postStudyWorkInfo} 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                        color="from-cyan-500 to-blue-600"
                    />
                    
                    <GenericInfoCard 
                        id="scholarships" 
                        title="Scholarships" 
                        content={country.scholarshipsInfo} 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                        cta={{ text: "Search Scholarships", action: () => navigate('/tools/scholarship-finder') }}
                        color="from-yellow-500 to-amber-600"
                    />
                    
                    <GenericInfoCard 
                        id="education-system" 
                        title="Education System" 
                        content={country.educationSystemInfo} 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>}
                        color="from-indigo-500 to-purple-600"
                    />
                    
                    <PopularCoursesCard id="courses" title={`Popular Courses`} content={country.coursesInfo} />
                </section>

                {/* Universities Grid */}
                <section id="universities" className="mb-24 scroll-mt-36">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-2">Top Universities</h2>
                            <p className="text-gray-400">Prestigious institutions in {country.name}</p>
                        </div>
                        <button onClick={() => navigate('/college-finder')} className="text-[#F6520C] font-bold hover:text-white transition-colors flex items-center group">
                            View All in Finder
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {country.topUniversities.map(uni => (
                            <div key={uni.name} className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-[#F6520C]/50 transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F6520C]/10">
                                <div className="w-24 h-24 bg-white rounded-2xl p-4 mb-6 shadow-lg shadow-white/5 group-hover:scale-105 transition-transform flex items-center justify-center">
                                    <img src={uni.logo} alt={`${uni.name} logo`} className="w-full h-full object-contain" />
                                </div>
                                <h4 className="font-bold text-white text-lg mb-2 leading-tight">{uni.name}</h4>
                                <div className="mt-auto pt-4 w-full border-t border-white/5">
                                    <p className="text-[#F6520C] font-bold text-sm uppercase tracking-wider">QS Rank #{uni.qsRanking}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* FAQ */}
                <section id="faq" className="scroll-mt-36 max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
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
