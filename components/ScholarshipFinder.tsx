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

const ScholarshipCard: React.FC<{ scholarship: Scholarship; isExpanded: boolean; onToggle: () => void; }> = ({ scholarship, isExpanded, onToggle }) => {
    const providerInitial = scholarship.provider.charAt(0);

    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:border-[#F6520C]/50 hover:shadow-lg hover:shadow-[#F6520C]/10">
            <button onClick={onToggle} className="w-full text-left p-4 sm:p-6 hover:bg-gray-800/20" aria-expanded={isExpanded}>
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center font-bold text-xl text-white ring-2 ring-gray-600">
                        {providerInitial}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                             <div>
                                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[#F6520C]">{scholarship.name}</h3>
                                <p className="text-sm text-gray-400">{scholarship.provider}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ml-2 ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3 text-xs">
                            {scholarship.isFullFunding && <span className="font-bold px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-300 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>Full Funding</span>}
                            <span className="font-semibold px-2.5 py-1 rounded-full bg-gray-700 text-gray-300">{scholarship.country}</span>
                            {scholarship.levelOfStudy.map(l => <span key={l} className="font-semibold px-2.5 py-1 rounded-full bg-gray-700 text-gray-300">{l}</span>)}
                        </div>
                    </div>
                </div>
                 <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-400">Amount</p>
                        <p className="font-semibold text-white">{scholarship.amountDisplay}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Deadline</p>
                        <p className="font-semibold text-white">{scholarship.deadline}</p>
                    </div>
                </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="bg-gray-900/50 px-6 pb-6 pt-4">
                    <h4 className="font-semibold text-white mb-2">Eligibility Requirements:</h4>
                    <ul className="list-disc list-outside pl-5 text-gray-400 space-y-1 text-sm mb-4 marker:text-[#F6520C]">
                        {scholarship.eligibility.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                    <a href={scholarship.applyLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#F6520C] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                        Visit Official Site &rarr;
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
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Scholarship Finder</h1>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        Search our comprehensive database to find prestigious scholarships from around the world. Filter by country, field, funding, and more to discover the perfect opportunity to fund your education.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Panel */}
                    <aside className="lg:col-span-1 lg:sticky top-24 h-max">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 space-y-6">
                            <h2 className="text-xl font-bold text-white">Filter Scholarships</h2>
                            <div>
                                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">Scholarship Name</label>
                                <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="e.g., Chevening..." className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                                <select id="country" value={countryFilter} onChange={e => setCountryFilter(e.target.value)} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white">
                                    <option value="all">All Countries</option>
                                    {uniqueCountries.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="level" className="block text-sm font-medium text-gray-300 mb-1">Level of Study</label>
                                <select id="level" value={levelFilter} onChange={e => setLevelFilter(e.target.value as any)} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white">
                                    <option value="all">All Levels</option>
                                    <option value="Masters">Masters</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="field" className="block text-sm font-medium text-gray-300 mb-1">Field of Study</label>
                                <select id="field" value={fieldFilter} onChange={e => setFieldFilter(e.target.value)} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white">
                                    <option value="all">All Fields</option>
                                    {uniqueFields.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Funding</label>
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input type="checkbox" checked={isFullFunding} onChange={handleFullFundingToggle} className="sr-only" />
                                        <div className={`block w-12 h-6 rounded-full transition ${isFullFunding ? 'bg-[#F6520C]' : 'bg-gray-600'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isFullFunding ? 'translate-x-6' : ''}`}></div>
                                    </div>
                                    <div className="ml-3 text-gray-300 text-sm font-medium">Full Funding Only</div>
                                </label>
                            </div>
                             <div className={`${isFullFunding ? 'opacity-50' : ''}`}>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Minimum Amount (USD): ${amountFilter.toLocaleString()}</label>
                                <input type="range" id="amount" min="0" max="150000" step="5000" value={amountFilter} onChange={handleAmountSliderChange} disabled={isFullFunding} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#F6520C] disabled:accent-gray-500" />
                            </div>
                            <button onClick={resetFilters} className="w-full text-center text-sm font-semibold text-gray-400 hover:text-white transition mt-2">Reset Filters</button>
                        </div>
                    </aside>

                    {/* Results Panel */}
                    <main className="lg:col-span-3">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-white">Showing {filteredScholarships.length} Scholarships</h2>
                        </div>
                        <div className="space-y-4">
                            {filteredScholarships.length > 0 ? (
                                filteredScholarships.map(s => (
                                    <ScholarshipCard key={s.id} scholarship={s} isExpanded={expandedCardId === s.id} onToggle={() => toggleExpand(s.id)} />
                                ))
                            ) : (
                                <div className="text-center py-16 bg-white/5 rounded-lg border border-dashed border-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10.5a.5.5 0 11-1 0 .5.5 0 011 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 13.5L10 10" /></svg>
                                    <h3 className="text-2xl text-white mt-4">No Scholarships Found</h3>
                                    <p className="text-gray-400 mt-2">Try adjusting or resetting your filters to find more results.</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>

                 <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Scholarship FAQs</h2>
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
