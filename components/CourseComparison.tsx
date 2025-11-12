
import React, { useState, useMemo, useEffect } from 'react';
import { University, Program, universities as allUniversities } from '../data/universities';

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
    <div className="border border-gray-700 rounded-lg overflow-hidden">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-5 bg-gray-800/50 hover:bg-gray-800 transition-colors"
            aria-expanded={isOpen}
        >
            <span className="text-lg font-medium text-white">{faq.question}</span>
            <svg
                className={`w-6 h-6 text-[#F6520C] transform transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="p-5 bg-white/5 text-gray-400"><p>{faq.answer}</p></div>
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
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {filteredUniversities.map(uni => {
                    const isSelected = selectedUniversities.some(u => u.name === uni.name);
                    return (
                        <button key={uni.name} onClick={() => handleUniversitySelect(uni)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left flex items-center space-x-4 ${isSelected ? 'bg-[#F6520C]/20 border-[#F6520C]' : 'bg-white/5 border-gray-700 hover:border-gray-500'}`}>
                            <img src={uni.logo} alt={`${uni.name} logo`} className="w-12 h-12 rounded-full object-contain bg-white p-1" />
                            <div>
                                <p className="font-semibold text-white">{uni.name}</p>
                                <p className="text-sm text-gray-400">{uni.location}</p>
                            </div>
                        </button>
                    )
                })}
            </div>
             <div className="mt-8 text-center">
                <button onClick={() => setStep(2)} disabled={selectedUniversities.length === 0}
                    className="bg-[#F6520C] text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition disabled:bg-gray-600 disabled:cursor-not-allowed">
                    Next: Select Courses ({selectedUniversities.length}/3)
                </button>
            </div>
        </div>
    );
    
    const renderProgramSelector = () => (
        <div className="animate-fade-in">
             <div className="bg-gray-800/50 p-4 rounded-lg mb-6 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">STEM Designation</label>
                        <div className="flex bg-gray-700/50 p-1 rounded-md">
                            {(['all', 'yes', 'no'] as const).map(val => (
                                <button key={val} onClick={() => setStemFilter(val)} className={`flex-1 text-center capitalize px-2 py-1 text-xs font-medium rounded transition ${stemFilter === val ? 'bg-[#F6520C] text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Test Requirement</label>
                        <div className="flex bg-gray-700/50 p-1 rounded-md">
                           {(['all', 'required', 'not_required'] as const).map(val => (
                                <button key={val} onClick={() => setTestFilter(val)} className={`flex-1 text-center px-2 py-1 text-xs font-medium rounded transition ${testFilter === val ? 'bg-[#F6520C] text-white' : 'text-gray-300 hover:bg-gray-600'}`}>
                                    {val === 'not_required' ? 'Optional/No' : 'Required'}
                                </button>
                           ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="gpa-filter" className="block text-sm font-medium text-gray-300 mb-2">Min. Recommended GPA: {gpaFilter.toFixed(1)}</label>
                        <input id="gpa-filter" type="range" min="2.5" max="4.0" step="0.1" value={gpaFilter} onChange={e => setGpaFilter(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#F6520C]" />
                    </div>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-2">
                {filteredPrograms.length > 0 ? filteredPrograms.map(item => {
                    const isSelected = selectedPrograms.some(p => p.program.name === item.program.name && p.university.name === item.university.name);
                    return (
                        <button key={`${item.university.name}-${item.program.name}`} onClick={() => handleProgramSelect(item)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left flex flex-col h-full ${isSelected ? 'bg-[#F6520C]/20 border-[#F6520C]' : 'bg-white/5 border-gray-700 hover:border-gray-500'}`}>
                            <div className="flex items-center space-x-3 mb-3">
                                <img src={item.university.logo} alt={`${item.university.name} logo`} className="w-8 h-8 rounded-full object-contain bg-white p-0.5" />
                                <p className="text-sm text-gray-400">{item.university.name}</p>
                            </div>
                            <p className="font-semibold text-white flex-grow">{item.program.name}</p>
                        </button>
                    )
                }) : (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-400">No programs match your filter criteria.</p>
                    </div>
                )}
            </div>
             <div className="mt-8 flex justify-center items-center space-x-4">
                <button onClick={() => setStep(1)} className="bg-gray-700 text-gray-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition">Back</button>
                <button onClick={() => setStep(3)} disabled={selectedPrograms.length < 2}
                    className="bg-[#F6520C] text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition disabled:bg-gray-600 disabled:cursor-not-allowed">
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
                <div className="overflow-x-auto modern-scrollbar">
                    <div className="grid gap-px bg-gray-700" style={{ gridTemplateColumns: `minmax(150px, 1fr) repeat(${selectedPrograms.length}, minmax(250px, 1fr))`}}>
                        {/* Empty corner */}
                        <div className="bg-gray-800 p-4"></div>
                        {/* Program Headers */}
                        {selectedPrograms.map((p, i) => (
                            <div key={i} className="bg-gray-800 p-4 text-center">
                                <img src={p.university.logo} alt={`${p.university.name} logo`} className="w-12 h-12 rounded-full object-contain bg-white p-1 mx-auto mb-2" />
                                <p className="font-bold text-white">{p.program.name}</p>
                                <p className="text-sm text-gray-400">{p.university.name}</p>
                            </div>
                        ))}
                        {/* Data Rows */}
                        {headers.map((header, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                                <div className="bg-gray-800 p-4 font-semibold text-gray-300 flex items-center">{header}</div>
                                {programData.map((p, colIndex) => (
                                    <div key={`${rowIndex}-${colIndex}`} className="bg-[#0a101f] p-4 text-center flex items-center justify-center">
                                         <span className={`${header === 'STEM Designated' && p[Object.keys(p)[rowIndex] as keyof typeof p] === 'Yes' ? 'bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm' : 'text-gray-300'}`}>
                                            {p[Object.keys(p)[rowIndex] as keyof typeof p]}
                                        </span>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                        {/* Apply Button Row */}
                         <div className="bg-gray-800 p-4"></div>
                         {selectedPrograms.map((p, i) => (
                             <div key={`apply-${i}`} className="bg-[#0a101f] p-4 text-center flex items-center justify-center">
                                 <a href={p.program.applyLink} target="_blank" rel="noopener noreferrer" className="bg-[#F6520C] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105">
                                    Apply Now
                                </a>
                             </div>
                         ))}
                    </div>
                </div>
                <div className="mt-8 flex justify-center items-center space-x-4">
                    <button onClick={() => setStep(2)} className="bg-gray-700 text-gray-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition">Back</button>
                    <button onClick={reset} className="text-[#F6520C] px-8 py-3 rounded-md font-semibold hover:bg-[#F6520C]/10 transition">Start New Comparison</button>
                </div>
            </div>
        );
    }
    
    const ProgressBar = () => (
        <div className="w-full max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between">
                <div className={`flex flex-col items-center relative ${step >= 1 ? 'text-[#F6520C]' : 'text-gray-500'}`}>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 1 ? 'bg-[#F6520C]/20 border-[#F6520C]' : 'border-gray-500'}`}>1</div>
                    <p className="text-sm mt-2">Universities</p>
                </div>
                <div className={`flex-grow h-1 mx-2 transition-colors ${step >= 2 ? 'bg-[#F6520C]' : 'bg-gray-700'}`}></div>
                <div className={`flex flex-col items-center relative ${step >= 2 ? 'text-[#F6520C]' : 'text-gray-500'}`}>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 2 ? 'bg-[#F6520C]/20 border-[#F6520C]' : 'border-gray-500'}`}>2</div>
                    <p className="text-sm mt-2">Courses</p>
                </div>
                <div className={`flex-grow h-1 mx-2 transition-colors ${step >= 3 ? 'bg-[#F6520C]' : 'bg-gray-700'}`}></div>
                <div className={`flex flex-col items-center relative ${step >= 3 ? 'text-[#F6520C]' : 'text-gray-500'}`}>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 3 ? 'bg-[#F6520C]/20 border-[#F6520C]' : 'border-gray-500'}`}>3</div>
                    <p className="text-sm mt-2">Compare</p>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Course Comparison Tool</h1>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        Make an informed decision. Select universities and courses to compare key details side-by-side.
                    </p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-gray-700 shadow-xl">
                    <ProgressBar />
                    <hr className="border-gray-700 my-8" />
                    {renderStepContent()}
                </div>

                <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
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
