
import React, { useState, useMemo, useEffect } from 'react';
import { University, Program, universities as allUniversities } from '../data/universities';
import UniversityLogo from './UniversityLogo';

interface CourseComparisonProps {
  onBack: () => void;
  navigate: (path: string) => void;
}

interface SelectedProgram {
    program: Program;
    university: University;
}

const faqData = [
    { question: "Why is it important to compare courses?", answer: "Comparing courses allows you to look beyond university rankings. You can analyze curriculum, tuition fees, duration, and admission requirements side-by-side. This detailed view helps you find the program that best aligns with your academic goals, budget, and career aspirations." },
    { question: "How accurate is the information provided?", answer: "We strive to provide the most accurate and up-to-date information. However, details like tuition and admission requirements can change. We always recommend cross-referencing with the official university website, which we provide a direct link to in the comparison table." },
    { question: "Can I compare undergraduate courses with this tool?", answer: "Currently, our Course Comparison tool is focused on graduate programs (Masters and MBA). We are working on expanding our database to include undergraduate courses in the future." }
];

const AccordionItem: React.FC<{ faq: { question: string, answer: string }, isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick }) => (
    <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
            aria-expanded={isOpen}
        >
            <span className={`text-lg font-medium tracking-tight ${isOpen ? 'text-[#F6520C]' : 'text-white'}`}>{faq.question}</span>
            <svg
                className={`w-6 h-6 text-[#F6520C] transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2 font-light"><p>{faq.answer}</p></div>
        </div>
    </div>
);


const CourseComparison: React.FC<CourseComparisonProps> = ({ onBack, navigate }) => {
    const [step, setStep] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUniversities, setSelectedUniversities] = useState<University[]>([]);
    const [selectedPrograms, setSelectedPrograms] = useState<SelectedProgram[]>([]);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    // Filters State
    const [stemFilter, setStemFilter] = useState<'all' | 'yes' | 'no'>('all');
    const [gpaFilter, setGpaFilter] = useState<number>(2.5);
    const [testFilter, setTestFilter] = useState<'all' | 'required' | 'not_required'>('all');

    useEffect(() => {
        const scriptId = 'course-comparison-structured-data';
        document.getElementById(scriptId)?.remove();

        const howToData = {
            "@context": "https://schema.org", "@type": "HowTo", "name": "How to Compare University Courses",
            "step": [
                { "@type": "HowToStep", "name": "Select Universities", "text": "Choose up to three universities from our comprehensive list to begin your comparison." },
                { "@type": "HowToStep", "name": "Choose Courses", "text": "From the selected universities, pick up to three graduate programs you are interested in." },
                { "@type": "HowToStep", "name": "View Side-by-Side Comparison", "text": "Analyze key details like tuition, duration, admission requirements, and more in a clear, side-by-side table."}
            ]
        };
        const faqJsonData = {
            "@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
                "@type": "Question", "name": item.question,
                "acceptedAnswer": { "@type": "Answer", "text": item.answer }
            }))
        };
        
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify([howToData, faqJsonData]);
        document.head.appendChild(script);

        return () => { document.getElementById(scriptId)?.remove(); };
    }, []);

    const filteredUniversities = useMemo(() => {
        const searchLower = searchTerm.toLowerCase();
        if (!searchLower) {
            return allUniversities.filter(uni => uni.programs.length > 0).sort((a,b) => (a.qsRanking || 9999) - (b.qsRanking || 9999));
        }
        return allUniversities.filter(uni => {
            const nameLower = uni.name.toLowerCase();
            // Fuzzy search for common names, acronyms, and typos
            if (searchLower === 'mit' && nameLower.includes('massachusetts institute of technology')) return true;
            if (searchLower === 'mass tech' && nameLower.includes('massachusetts institute of technology')) return true;
            if (searchLower === 'ucb' && nameLower.includes('university of california, berkeley')) return true;
            
            return nameLower.includes(searchLower) && uni.programs.length > 0;
        }).sort((a,b) => (a.qsRanking || 9999) - (b.qsRanking || 9999));
    }, [searchTerm]);

    const availablePrograms = useMemo(() =>
        selectedUniversities.flatMap(uni => uni.programs.map(prog => ({ program: prog, university: uni }))),
        [selectedUniversities]
    );

    const filteredPrograms = useMemo(() => {
        return availablePrograms.filter(item => {
            const { program } = item;

            // STEM filter
            if (stemFilter !== 'all') {
                if (stemFilter === 'yes' && !program.isSTEM) return false;
                if (stemFilter === 'no' && program.isSTEM) return false;
            }

            // GPA filter
            if (program.gpa) {
                const programGpa = parseFloat(program.gpa.replace(/[^\d.]/g, ''));
                if (!isNaN(programGpa) && programGpa < gpaFilter) {
                    return false;
                }
            }

            // Test filter
            if (testFilter !== 'all') {
                const greRequired = program.greScore && !/optional|not required/i.test(program.greScore);
                const gmatRequired = program.gmatScore && !/optional|not required/i.test(program.gmatScore);
                const isTestRequired = greRequired || gmatRequired;

                if (testFilter === 'required' && !isTestRequired) return false;
                if (testFilter === 'not_required' && isTestRequired) return false;
            }

            return true;
        });
    }, [availablePrograms, stemFilter, gpaFilter, testFilter]);

    const handleUniversitySelect = (university: University) => {
        setSelectedUniversities(prev => {
            if (prev.some(u => u.name === university.name)) {
                return prev.filter(u => u.name !== university.name);
            }
            if (prev.length < 3) {
                return [...prev, university];
            }
            return prev;
        });
    };
    
    const handleProgramSelect = (selection: SelectedProgram) => {
        setSelectedPrograms(prev => {
            if (prev.some(p => p.program.name === selection.program.name && p.university.name === selection.university.name)) {
                return prev.filter(p => !(p.program.name === selection.program.name && p.university.name === selection.university.name));
            }
            if (prev.length < 3) {
                return [...prev, selection];
            }
            return prev;
        });
    };

    const reset = () => {
        setStep(1);
        setSelectedUniversities([]);
        setSelectedPrograms([]);
        setSearchTerm('');
    };
    
    const renderStepContent = () => {
        switch (step) {
            case 1: return renderUniversitySelector();
            case 2: return renderProgramSelector();
            case 3: return renderComparisonTable();
            default: return null;
        }
    };

    const renderUniversitySelector = () => (
        <div className="animate-fade-in">
            <input
                type="text"
                placeholder="Search for a university (e.g., 'MIT', 'mass tech')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C]/50 focus:border-[#F6520C]/50 text-white placeholder-gray-500 transition-all mb-8"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2 modern-scrollbar">
                {filteredUniversities.map(uni => {
                    const isSelected = selectedUniversities.some(u => u.name === uni.name);
                    return (
                        <button key={uni.name} onClick={() => handleUniversitySelect(uni)}
                            className={`p-6 rounded-2xl border transition-all duration-300 text-left flex items-center space-x-5 ${isSelected ? 'bg-[#F6520C]/10 border-[#F6520C]/50 shadow-[0_0_15px_rgba(246,82,12,0.15)]' : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'}`}>
                            <div className="w-14 h-14 rounded-full bg-white p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                <UniversityLogo src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <p className={`font-bold tracking-tight mb-1 ${isSelected ? 'text-[#F6520C]' : 'text-white'}`}>{uni.name}</p>
                                <p className="text-sm text-gray-400 font-light">{uni.location}</p>
                            </div>
                        </button>
                    )
                })}
            </div>
             <div className="mt-10 text-center">
                <button onClick={() => setStep(2)} disabled={selectedUniversities.length === 0}
                    className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-all duration-300 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-white/20 transform hover:-translate-y-0.5">
                    Next: Select Courses ({selectedUniversities.length}/3)
                </button>
            </div>
        </div>
    );
    
    const renderProgramSelector = () => (
        <div className="animate-fade-in">
             <div className="bg-black/20 p-6 rounded-2xl mb-8 border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">STEM Designation</label>
                        <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/5">
                            {(['all', 'yes', 'no'] as const).map(val => (
                                <button key={val} onClick={() => setStemFilter(val)} className={`flex-1 text-center capitalize px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${stemFilter === val ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Test Requirement</label>
                        <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/5">
                           {(['all', 'required', 'not_required'] as const).map(val => (
                                <button key={val} onClick={() => setTestFilter(val)} className={`flex-1 text-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${testFilter === val ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
                                    {val === 'not_required' ? 'Optional/No' : 'Required'}
                                </button>
                           ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="gpa-filter" className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Min. Recommended GPA: <span className="text-white font-semibold">{gpaFilter.toFixed(1)}</span></label>
                        <input id="gpa-filter" type="range" min="2.5" max="4.0" step="0.1" value={gpaFilter} onChange={e => setGpaFilter(parseFloat(e.target.value))} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#F6520C]" />
                    </div>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto pr-2 modern-scrollbar">
                {filteredPrograms.length > 0 ? filteredPrograms.map(item => {
                    const isSelected = selectedPrograms.some(p => p.program.name === item.program.name && p.university.name === item.university.name);
                    return (
                        <button key={`${item.university.name}-${item.program.name}`} onClick={() => handleProgramSelect(item)}
                            className={`p-6 rounded-2xl border transition-all duration-300 text-left flex flex-col h-full ${isSelected ? 'bg-[#F6520C]/10 border-[#F6520C]/50 shadow-[0_0_15px_rgba(246,82,12,0.15)]' : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'}`}>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                    <UniversityLogo src={item.university.logo} alt={item.university.name} className="w-full h-full object-contain" />
                                </div>
                                <p className="text-sm text-gray-400 font-light">{item.university.name}</p>
                            </div>
                            <p className={`font-bold tracking-tight flex-grow ${isSelected ? 'text-[#F6520C]' : 'text-white'}`}>{item.program.name}</p>
                        </button>
                    )
                }) : (
                    <div className="col-span-full text-center py-12 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                        <p className="text-gray-400 font-light">No programs match your filter criteria.</p>
                    </div>
                )}
            </div>
             <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button onClick={() => setStep(1)} className="w-full sm:w-auto bg-white/5 text-white border border-white/10 px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300">Back</button>
                <button onClick={() => setStep(3)} disabled={selectedPrograms.length < 2}
                    className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-all duration-300 disabled:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-white/20 transform hover:-translate-y-0.5">
                    Compare Programs ({selectedPrograms.length}/3)
                </button>
            </div>
        </div>
    );

    const renderComparisonTable = () => {
        const headers = ['Tuition (USD/year)', 'Duration', 'STEM Designated', 'GPA', 'GRE', 'GMAT', 'IELTS', 'TOEFL'];
        const programData = selectedPrograms.map(p => ({
            tuition: `$${p.program.tuition.toLocaleString()}`,
            duration: p.program.duration,
            isSTEM: p.program.isSTEM ? 'Yes' : 'No',
            gpa: p.program.gpa || 'N/A',
            gre: p.program.greScore || 'N/A',
            gmat: p.program.gmatScore || 'N/A',
            ielts: p.program.ieltsScore || 'N/A',
            toefl: p.program.toeflScore || 'N/A',
        }));

        return (
            <div className="animate-fade-in">
                <div className="overflow-x-auto modern-scrollbar pb-4">
                    <div className="grid gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10" style={{ gridTemplateColumns: `minmax(180px, 1fr) repeat(${selectedPrograms.length}, minmax(280px, 1fr))`}}>
                        {/* Empty corner */}
                        <div className="bg-[#0a101f]/90 backdrop-blur-md p-6"></div>
                        {/* Program Headers */}
                        {selectedPrograms.map((p, i) => (
                            <div key={i} className="bg-[#0a101f]/90 backdrop-blur-md p-6 text-center flex flex-col items-center justify-center">
                                <div className="w-16 h-16 mb-4 rounded-full bg-white p-1.5 flex items-center justify-center overflow-hidden shadow-sm">
                                    <UniversityLogo src={p.university.logo} alt={p.university.name} className="w-full h-full object-contain" />
                                </div>
                                <p className="font-bold text-white tracking-tight text-lg mb-1">{p.program.name}</p>
                                <p className="text-sm text-gray-400 font-light">{p.university.name}</p>
                            </div>
                        ))}
                        {/* Data Rows */}
                        {headers.map((header, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                                <div className="bg-[#0a101f]/95 backdrop-blur-md p-5 font-bold text-white flex items-center tracking-tight border-t border-white/5">{header}</div>
                                {programData.map((p, colIndex) => (
                                    <div key={`${rowIndex}-${colIndex}`} className="bg-white/[0.02] p-5 text-center flex items-center justify-center border-t border-white/5 hover:bg-white/[0.04] transition-colors">
                                         <span className={`${header === 'STEM Designated' && p[Object.keys(p)[rowIndex] as keyof typeof p] === 'Yes' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-sm font-medium' : 'text-gray-300 font-light'}`}>
                                            {p[Object.keys(p)[rowIndex] as keyof typeof p]}
                                        </span>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                        {/* Apply Button Row */}
                         <div className="bg-[#0a101f]/95 backdrop-blur-md p-6 border-t border-white/5"></div>
                         {selectedPrograms.map((p, i) => (
                             <div key={`apply-${i}`} className="bg-white/[0.02] p-6 text-center flex items-center justify-center border-t border-white/5">
                                 <a href={p.program.applyLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-3 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-0.5 w-full max-w-[200px]">
                                    Apply Now
                                </a>
                             </div>
                         ))}
                    </div>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button onClick={() => setStep(2)} className="w-full sm:w-auto bg-white/5 text-white border border-white/10 px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300">Back</button>
                    <button onClick={reset} className="w-full sm:w-auto text-[#F6520C] px-10 py-4 rounded-full font-bold hover:bg-[#F6520C]/10 transition-colors duration-300 border border-transparent hover:border-[#F6520C]/20">Start New Comparison</button>
                </div>
            </div>
        );
    }
    
    const ProgressBar = () => (
        <div className="w-full max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 rounded-full -z-10"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
                
                <div className={`flex flex-col items-center relative ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${step >= 1 ? 'bg-gradient-to-r from-orange-500 to-pink-600 shadow-lg shadow-orange-500/20 text-white' : 'bg-[#0a101f] border-2 border-white/10 text-gray-500'}`}>1</div>
                    <p className="text-sm mt-3 font-medium tracking-wide">Universities</p>
                </div>
                <div className={`flex flex-col items-center relative ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${step >= 2 ? 'bg-gradient-to-r from-orange-500 to-pink-600 shadow-lg shadow-orange-500/20 text-white' : 'bg-[#0a101f] border-2 border-white/10 text-gray-500'}`}>2</div>
                    <p className="text-sm mt-3 font-medium tracking-wide">Courses</p>
                </div>
                <div className={`flex flex-col items-center relative ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${step >= 3 ? 'bg-gradient-to-r from-orange-500 to-pink-600 shadow-lg shadow-orange-500/20 text-white' : 'bg-[#0a101f] border-2 border-white/10 text-gray-500'}`}>3</div>
                    <p className="text-sm mt-3 font-medium tracking-wide">Compare</p>
                </div>
            </div>
        </div>
    );

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
                        <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Academics</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Course Comparison</h1>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl mx-auto font-light leading-relaxed">
                        Make an informed decision. Select universities and courses to compare key details side-by-side.
                    </p>
                </div>
                
                <div className="bg-white/[0.02] backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/5 shadow-2xl mb-24">
                    <ProgressBar />
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10"></div>
                    {renderStepContent()}
                </div>

                <div className="mt-24 max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-12 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>
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

export default CourseComparison;
