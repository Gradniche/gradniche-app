

import React, { useMemo, useState } from 'react';
import { University, Program, universities } from '../data/universities';
import { ShortlistItem } from '../App';

interface ShortlistPageProps {
    shortlist: ShortlistItem[];
    onToggleShortlist: (item: ShortlistItem) => void;
    onBack: () => void;
    onNavigateToUniversity: (university: University) => void;
    onNavigateToProgram: (university: University, program: Program) => void;
    onSave: () => void;
}

interface UniversityComparisonProps {
    universities: University[];
    onNavigateToUniversity: (university: University) => void;
    onToggleShortlist: (item: ShortlistItem) => void;
}

const UniversityComparisonTable: React.FC<UniversityComparisonProps> = ({ universities: selectedUnis, onNavigateToUniversity, onToggleShortlist }) => {
    const dataRows = ['QS Ranking', 'Avg. Tuition (USD)', 'Location', 'Type'];

    return (
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 animate-fade-in">
            <div className="overflow-x-auto modern-scrollbar">
                <div className="grid gap-px bg-gray-700" style={{ gridTemplateColumns: `minmax(150px, 1fr) repeat(${selectedUnis.length}, minmax(220px, 1fr))`}}>
                    {/* Header Row */}
                    <div className="bg-gray-800 p-4 sticky left-0 z-10"></div>
                    {selectedUnis.map((uni) => (
                        <div key={uni.id} className="bg-gray-800 p-4 text-center space-y-2">
                            <img src={uni.logo} alt={`${uni.name} logo`} className="w-12 h-12 rounded-full object-contain bg-white p-1 mx-auto" />
                            <p className="font-bold text-white text-sm">{uni.name}</p>
                            <button onClick={() => onToggleShortlist({ type: 'university', universityId: uni.id })} className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Data Rows */}
                    {dataRows.map((header) => (
                        <React.Fragment key={header}>
                            <div className="bg-gray-800 p-4 font-semibold text-gray-300 flex items-center sticky left-0 z-10">{header}</div>
                            {selectedUnis.map(uni => (
                                <div key={`${header}-${uni.id}`} className="bg-[#0a101f] p-4 text-center flex items-center justify-center">
                                    {header === 'QS Ranking' && <span className="font-bold text-white text-lg">#{uni.qsRanking || 'N/A'}</span>}
                                    {header === 'Avg. Tuition (USD)' && <span className="text-white">${uni.avgTuition.toLocaleString()}</span>}
                                    {header === 'Location' && <span className="text-white text-sm">{uni.location}</span>}
                                    {header === 'Type' && <span className="text-white">{uni.type}</span>}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                    
                    {/* Action Row */}
                    <div className="bg-gray-800 p-4 sticky left-0 z-10 flex items-center font-semibold text-gray-300">Actions</div>
                    {selectedUnis.map((uni) => (
                        <div key={`view-${uni.id}`} className="bg-[#0a101f] p-4 text-center flex items-center justify-center">
                            <button onClick={() => onNavigateToUniversity(uni)} className="bg-[#F6520C] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface ProgramComparisonProps {
    programs: { program: Program; university: University }[];
    onNavigateToProgram: (university: University, program: Program) => void;
    onToggleShortlist: (item: ShortlistItem) => void;
}

const ProgramComparisonTable: React.FC<ProgramComparisonProps> = ({ programs, onNavigateToProgram, onToggleShortlist }) => {
    const dataRows = [
        { key: 'school', label: 'School / Dept.' },
        { key: 'tuition', label: 'Tuition (USD/year)' },
        { key: 'duration', label: 'Duration' },
        { key: 'isSTEM', label: 'STEM Designated' },
        { key: 'gpa', label: 'Rec. GPA' },
        { key: 'greScore', label: 'GRE' },
        { key: 'gmatScore', label: 'GMAT' },
        { key: 'ieltsScore', label: 'IELTS' },
        { key: 'toeflScore', label: 'TOEFL' },
    ];
    
    return (
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 animate-fade-in">
             <div className="overflow-x-auto modern-scrollbar">
                <div className="grid gap-px bg-gray-700" style={{ gridTemplateColumns: `minmax(150px, 1fr) repeat(${programs.length}, minmax(220px, 1fr))`}}>
                    {/* Header Row */}
                    <div className="bg-gray-800 p-4 sticky left-0 z-10"></div>
                    {programs.map(({ program, university }) => (
                        <div key={program.id} className="bg-gray-800 p-4 text-center space-y-2">
                            <img src={university.logo} alt={`${university.name} logo`} className="w-12 h-12 rounded-full object-contain bg-white p-1 mx-auto" />
                            <p className="font-bold text-white text-sm">{program.name}</p>
                            <p className="text-xs text-gray-400">{university.name}</p>
                            <button onClick={() => onToggleShortlist({ type: 'program', universityId: university.id, programId: program.id })} className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Data Rows */}
                    {dataRows.map((row) => (
                        <React.Fragment key={row.key}>
                            <div className="bg-gray-800 p-4 font-semibold text-gray-300 flex items-center sticky left-0 z-10">{row.label}</div>
                            {programs.map(({program}) => {
                                const value = program[row.key as keyof Program]
                                let displayValue: React.ReactNode = typeof value === 'string' ? value : 'N/A';
                                if (typeof value === 'boolean') {
                                    displayValue = value ? 
                                        <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-semibold">Yes</span> : 
                                        <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-semibold">No</span>;
                                }
                                if (row.key === 'tuition' && typeof value === 'number') {
                                    displayValue = `$${value.toLocaleString()}`;
                                }
                                if (!value) displayValue = 'N/A';
                                
                                return (
                                    <div key={`${row.key}-${program.id}`} className="bg-[#0a101f] p-4 text-center flex items-center justify-center text-white">
                                        {displayValue}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                    
                    {/* Action Row */}
                    <div className="bg-gray-800 p-4 sticky left-0 z-10 flex items-center font-semibold text-gray-300">Actions</div>
                    {programs.map(({program, university}) => (
                        <div key={`view-${program.id}`} className="bg-[#0a101f] p-4 text-center flex items-center justify-center">
                            <button onClick={() => onNavigateToProgram(university, program)} className="bg-[#F6520C] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};


const ShortlistPage: React.FC<ShortlistPageProps> = ({ shortlist, onToggleShortlist, onBack, onNavigateToUniversity, onNavigateToProgram, onSave }) => {
    
    const [activeTab, setActiveTab] = useState<'universities' | 'programs'>('universities');
    
    const shortlistedUniversities = useMemo(() => {
        const universityIds = shortlist
            .filter(item => item.type === 'university')
            .map(item => item.universityId);
        
        return universities.filter(uni => universityIds.includes(uni.id));
    }, [shortlist]);

    const shortlistedPrograms = useMemo(() => {
        const programShortlists = shortlist.filter(item => item.type === 'program');
        return programShortlists.map(item => {
            const university = universities.find(uni => uni.id === item.universityId);
            if (!university) return null;
            const program = university.programs.find(p => p.id === (item as any).programId);
            if (!program) return null;
            return { program, university };
        }).filter((item): item is { program: Program; university: University } => item !== null);
    }, [shortlist]);

    const renderEmptyState = (type: string) => (
        <div className="text-center py-16 bg-white/5 rounded-lg border border-dashed border-gray-700 mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
            <h3 className="text-2xl text-white mt-4">No {type} Shortlisted</h3>
            <p className="text-gray-400 mt-2">Explore our College Finder to add {type} to your list for comparison.</p>
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
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">My Shortlist</h1>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        Your personal hub to compare and contrast your top university and program choices.
                    </p>
                    {shortlist.length > 0 && (
                        <div className="mt-6">
                            <button onClick={onSave} className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 flex items-center space-x-2 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2 1v10h6V5H7z" />
                                    <path d="M9 1a1 1 0 00-1 1v2a1 1 0 002 0V2a1 1 0 00-1-1z" />
                                </svg>
                                <span>Save My Shortlist</span>
                            </button>
                        </div>
                    )}
                </div>
                
                {shortlist.length === 0 ? (
                     <div className="text-center py-16 bg-white/5 rounded-lg border border-dashed border-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                        <h3 className="text-2xl text-white mt-4">Your Shortlist is Empty</h3>
                        <p className="text-gray-400 mt-2">Start exploring and add universities or programs to compare them here.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8 flex justify-center border-b border-gray-700">
                             <button onClick={() => setActiveTab('universities')} className={`px-6 py-3 font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F6520C] ${activeTab === 'universities' ? 'border-b-2 border-[#F6520C] text-white' : 'text-gray-400 hover:text-white border-b-2 border-transparent'}`}>
                                University Comparison ({shortlistedUniversities.length})
                            </button>
                             <button onClick={() => setActiveTab('programs')} className={`px-6 py-3 font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F6520C] ${activeTab === 'programs' ? 'border-b-2 border-[#F6520C] text-white' : 'text-gray-400 hover:text-white border-b-2 border-transparent'}`}>
                                Program Comparison ({shortlistedPrograms.length})
                            </button>
                        </div>

                        {activeTab === 'universities' && (
                            shortlistedUniversities.length > 0 ? (
                                <UniversityComparisonTable 
                                    universities={shortlistedUniversities} 
                                    onNavigateToUniversity={onNavigateToUniversity} 
                                    onToggleShortlist={onToggleShortlist} 
                                />
                            ) : (
                                renderEmptyState('Universities')
                            )
                        )}

                        {activeTab === 'programs' && (
                            shortlistedPrograms.length > 0 ? (
                                <ProgramComparisonTable 
                                    programs={shortlistedPrograms} 
                                    onNavigateToProgram={onNavigateToProgram} 
                                    onToggleShortlist={onToggleShortlist} 
                                />
                            ) : (
                                renderEmptyState('Programs')
                            )
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default ShortlistPage;