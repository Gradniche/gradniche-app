import React, { useState, useMemo, useEffect } from 'react';
import { Scholarship, scholarships as allScholarships } from '../data/scholarships';

interface ScholarshipFinderProps {
    onBack: () => void;
}

const faqData = [
    { question: "How competitive are these scholarships?", answer: "Most prestigious international scholarships are highly competitive, attracting thousands of applicants worldwide. A strong application requires not only excellent academic records but also demonstrated leadership potential, compelling essays, and strong letters of recommendation." },
    { question: "Do I need to pay a fee to apply for scholarships?", answer: "Generally, no. Legitimate scholarship programs do not require an application fee. Be cautious of any service or listing that asks for payment to apply for a scholarship, as it may be a scam." },
    { question: "Can I apply for multiple scholarships at once?", answer: "Absolutely! You are encouraged to apply for as many scholarships as you are eligible for. This increases your chances of securing funding. Just be sure to tailor each application to the specific requirements and values of each scholarship program." }
];

const AccordionItem: React.FC<{ faq: { question: string; answer: string }; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => (
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

const ScholarshipCard: React.FC<{ scholarship: Scholarship; isExpanded: boolean; onToggle: () => void; }> = ({ scholarship, isExpanded, onToggle }) => {
    const providerInitial = scholarship.provider.charAt(0);

    return (
        <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#F6520C]/5">
            <button onClick={onToggle} className="w-full text-left p-6 sm:p-8 focus:outline-none" aria-expanded={isExpanded}>
                <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-lg">
                        {providerInitial}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                             <div>
                                <h3 className="text-xl font-bold text-white tracking-tight transition-colors group-hover:text-[#F6520C]">{scholarship.name}</h3>
                                <p className="text-sm text-gray-400 font-light mt-1">{scholarship.provider}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-500 transition-transform duration-500 flex-shrink-0 ml-4 ${isExpanded ? 'rotate-180 text-[#F6520C]' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4 text-xs">
                            {scholarship.isFullFunding && <span className="font-semibold px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>Full Funding</span>}
                            <span className="font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">{scholarship.country}</span>
                            {scholarship.levelOfStudy.map(l => <span key={l} className="font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300">{l}</span>)}
                        </div>
                    </div>
                </div>
                 <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Amount</p>
                        <p className="font-bold text-white text-lg">{scholarship.amountDisplay}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Deadline</p>
                        <p className="font-bold text-white text-lg">{scholarship.deadline}</p>
                    </div>
                </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-black/20 px-6 sm:px-8 pb-8 pt-4 border-t border-white/5">
                    <h4 className="font-bold text-white mb-4 tracking-tight">Eligibility Requirements:</h4>
                    <ul className="list-disc list-outside pl-5 text-gray-400 space-y-2 text-sm mb-8 font-light marker:text-[#F6520C]">
                        {scholarship.eligibility.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                    <a href={scholarship.applyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full hover:bg-[#F6520C] hover:border-[#F6520C] transition-all duration-300 font-semibold shadow-lg hover:shadow-orange-500/30 group">
                        Visit Official Site
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </a>
                </div>
            </div>
        </div>
    )
};


const ScholarshipFinder: React.FC<ScholarshipFinderProps> = ({ onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [countryFilter, setCountryFilter] = useState('all');
    const [levelFilter, setLevelFilter] = useState<'all' | 'Masters' | 'PhD'>('all');
    const [fieldFilter, setFieldFilter] = useState('all');
    const [amountFilter, setAmountFilter] = useState(0);
    const [isFullFunding, setIsFullFunding] = useState(false);
    const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>(allScholarships);
    const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    const uniqueCountries = useMemo(() => [...new Set(allScholarships.map(s => s.country))].sort(), []);
    const uniqueFields = useMemo(() => [...new Set(allScholarships.flatMap(s => s.fieldOfStudy))].sort(), []);
    
    const resetFilters = () => {
        setSearchTerm('');
        setCountryFilter('all');
        setLevelFilter('all');
        setFieldFilter('all');
        setAmountFilter(0);
        setIsFullFunding(false);
    };

    const handleFullFundingToggle = () => {
        setIsFullFunding(!isFullFunding);
    };

    const handleAmountSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFullFunding(false);
        setAmountFilter(parseInt(e.target.value, 10));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const results = allScholarships.filter(s => {
                if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !s.provider.toLowerCase().includes(searchTerm.toLowerCase())) return false;
                if (countryFilter !== 'all' && s.country !== countryFilter) return false;
                if (levelFilter !== 'all' && !s.levelOfStudy.includes(levelFilter)) return false;
                if (fieldFilter !== 'all' && !s.fieldOfStudy.includes(fieldFilter) && !s.fieldOfStudy.includes("All Fields")) return false;
                if (isFullFunding) {
                    if (!s.isFullFunding) return false;
                } else {
                    if (s.amount < amountFilter) return false;
                }
                return true;
            });
            setFilteredScholarships(results);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, countryFilter, levelFilter, fieldFilter, amountFilter, isFullFunding]);
    
    useEffect(() => {
        const scriptId = 'scholarship-finder-structured-data';
        document.getElementById(scriptId)?.remove();
        const itemListData = {
            "@context": "https://schema.org", "@type": "ItemList", "name": "International Student Scholarships",
            "itemListElement": filteredScholarships.map((s, index) => ({
                "@type": "ListItem", "position": index + 1, "item": {
                    "@type": "FinancialAid", "name": s.name, "url": s.applyLink, "description": `A scholarship for ${s.levelOfStudy.join('/')} studies in ${s.country}. Provided by ${s.provider}.`,
                    "provider": { "@type": "Organization", "name": s.provider }, "amount": { "@type": "MonetaryAmount", "value": s.amount, "currency": "USD" }
                }
            }))
        };
        const faqJsonData = {
            "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqData.map(item => ({"@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer }}))
        };
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify([itemListData, faqJsonData]);
        document.head.appendChild(script);
        return () => { document.getElementById(scriptId)?.remove(); };
    }, [filteredScholarships]);

    const toggleExpand = (id: number) => {
        setExpandedCardId(expandedCardId === id ? null : id);
    };

    return (
        <section className="py-24 relative bg-[#0a101f] min-h-screen overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none"></div>
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
                        <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Financial Aid</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Scholarship Finder</h1>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl mx-auto font-light">
                        Search our comprehensive database to find prestigious scholarships from around the world. Filter by country, field, funding, and more to discover the perfect opportunity to fund your education.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Panel */}
                    <aside className="lg:col-span-1 lg:sticky top-24 h-max">
                        <div className="bg-white/[0.02] backdrop-blur-md p-8 rounded-3xl border border-white/5 space-y-8 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Filters</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-2">Scholarship Name</label>
                                    <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="e.g., Chevening..." className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white transition-all placeholder-gray-600" />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                                    <select id="country" value={countryFilter} onChange={e => setCountryFilter(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white transition-all appearance-none">
                                        <option value="all">All Countries</option>
                                        {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="level" className="block text-sm font-medium text-gray-400 mb-2">Level of Study</label>
                                    <select id="level" value={levelFilter} onChange={e => setLevelFilter(e.target.value as any)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white transition-all appearance-none">
                                        <option value="all">All Levels</option>
                                        <option value="Masters">Masters</option>
                                        <option value="PhD">PhD</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="field" className="block text-sm font-medium text-gray-400 mb-2">Field of Study</label>
                                    <select id="field" value={fieldFilter} onChange={e => setFieldFilter(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white transition-all appearance-none">
                                        <option value="all">All Fields</option>
                                        {uniqueFields.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                                
                                <div className="pt-4 border-t border-white/5">
                                    <label className="flex items-center cursor-pointer group">
                                        <div className="relative">
                                            <input type="checkbox" checked={isFullFunding} onChange={handleFullFundingToggle} className="sr-only" />
                                            <div className={`block w-12 h-6 rounded-full transition-colors duration-300 ${isFullFunding ? 'bg-[#F6520C]' : 'bg-white/10'}`}></div>
                                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${isFullFunding ? 'translate-x-6' : ''}`}></div>
                                        </div>
                                        <div className="ml-4 text-white text-sm font-medium group-hover:text-[#F6520C] transition-colors">Full Funding Only</div>
                                    </label>
                                </div>
                                
                                 <div className={`pt-4 border-t border-white/5 transition-opacity duration-300 ${isFullFunding ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                                    <div className="flex justify-between items-center mb-4">
                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-400">Min. Amount</label>
                                        <span className="text-[#F6520C] font-bold">${amountFilter.toLocaleString()}</span>
                                    </div>
                                    <input type="range" id="amount" min="0" max="150000" step="5000" value={amountFilter} onChange={handleAmountSliderChange} disabled={isFullFunding} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#F6520C]" />
                                </div>
                                
                                <button onClick={resetFilters} className="w-full py-3 text-sm font-semibold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/5 hover:border-white/10 mt-6">
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Results Panel */}
                    <main className="lg:col-span-3">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                Showing <span className="text-[#F6520C]">{filteredScholarships.length}</span> Scholarships
                            </h2>
                        </div>
                        <div className="space-y-6">
                            {filteredScholarships.length > 0 ? (
                                filteredScholarships.map(s => (
                                    <ScholarshipCard key={s.id} scholarship={s} isExpanded={expandedCardId === s.id} onToggle={() => toggleExpand(s.id)} />
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/5">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10.5a.5.5 0 11-1 0 .5.5 0 011 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 13.5L10 10" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">No Scholarships Found</h3>
                                    <p className="text-gray-400 font-light">Try adjusting or resetting your filters to find more results.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>

                 <div className="mt-24 max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-12 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Scholarship FAQs</h2>
                     <div className="space-y-4">
                        {faqData.map((faqItem, index) => (
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
        </section>
    );
};

export default ScholarshipFinder;
