
import React, { useMemo, useState } from 'react';
import { University, Program, universities } from '../data/universities';
import { ShortlistItem } from '../App';
import UniversityLogo from './UniversityLogo';

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
        <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="overflow-x-auto modern-scrollbar relative z-10">
                <div className="grid gap-[1px] bg-white/10 rounded-2xl overflow-hidden" style={{ gridTemplateColumns: `minmax(180px, 1fr) repeat(${selectedUnis.length}, minmax(250px, 1fr))`}}>
                    {/* Header Row */}
                    <div className="bg-[#050810] p-6 sticky left-0 z-20 shadow-[4px_0_10px_rgba(0,0,0,0.5)]"></div>
                    {selectedUnis.map((uni) => (
                        <div key={uni.id} className="bg-[#0a101f] p-6 text-center space-y-4 relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 p-2 flex items-center justify-center overflow-hidden border border-white/10 shadow-lg">
                                <UniversityLogo src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                            </div>
                            <p className="font-bold text-white text-base tracking-tight">{uni.name}</p>
                            <button onClick={() => onToggleShortlist({ type: 'university', universityId: uni.id })} className="text-xs font-medium text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-red-400/10">
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Data Rows */}
                    {dataRows.map((header) => (
                        <React.Fragment key={header}>
                            <div className="bg-[#050810] p-6 font-semibold text-gray-300 flex items-center sticky left-0 z-20 shadow-[4px_0_10px_rgba(0,0,0,0.5)] tracking-wide">{header}</div>
                            {selectedUnis.map(uni => (
                                <div key={`${header}-${uni.id}`} className="bg-[#0a101f]/80 p-6 text-center flex items-center justify-center hover:bg-[#0a101f] transition-colors">
                                    {header === 'QS Ranking' && <span className="font-bold text-white text-xl">#{uni.qsRanking || 'N/A'}</span>}
                                    {header === 'Avg. Tuition (USD)' && <span className="text-white font-medium">${uni.avgTuition.toLocaleString()}</span>}
                                    {header === 'Location' && <span className="text-gray-300 text-sm">{uni.location}</span>}
                                    {header === 'Type' && <span className="text-gray-300">{uni.type}</span>}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                    
                    {/* Action Row */}
                    <div className="bg-[#050810] p-6 sticky left-0 z-20 flex items-center font-semibold text-gray-300 shadow-[4px_0_10px_rgba(0,0,0,0.5)] tracking-wide">Actions</div>
                    {selectedUnis.map((uni) => (
                        <div key={`view-${uni.id}`} className="bg-[#0a101f]/80 p-6 text-center flex items-center justify-center">
                            <button onClick={() => onNavigateToUniversity(uni)} className="bg-white/5 text-white border border-white/10 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#F6520C] hover:border-[#F6520C] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(246,82,12,0.3)] w-full max-w-[160px]">
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
        <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl animate-fade-in relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
             <div className="overflow-x-auto modern-scrollbar relative z-10">
                <div className="grid gap-[1px] bg-white/10 rounded-2xl overflow-hidden" style={{ gridTemplateColumns: `minmax(180px, 1fr) repeat(${programs.length}, minmax(250px, 1fr))`}}>
                    {/* Header Row */}
                    <div className="bg-[#050810] p-6 sticky left-0 z-20 shadow-[4px_0_10px_rgba(0,0,0,0.5)]"></div>
                    {programs.map(({ program, university }) => (
                        <div key={program.id} className="bg-[#0a101f] p-6 text-center space-y-3 relative group">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            <div className="w-14 h-14 mx-auto rounded-xl bg-white/5 p-2 flex items-center justify-center overflow-hidden border border-white/10 shadow-lg">
                                <UniversityLogo src={university.logo} alt={university.name} className="w-full h-full object-contain" />
                            </div>
                            <p className="font-bold text-white text-base tracking-tight leading-tight">{program.name}</p>
                            <p className="text-xs text-gray-400 font-medium">{university.name}</p>
                            <button onClick={() => onToggleShortlist({ type: 'program', universityId: university.id, programId: program.id })} className="text-xs font-medium text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-red-400/10 mt-2">
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Data Rows */}
                    {dataRows.map((row) => (
                        <React.Fragment key={row.key}>
                            <div className="bg-[#050810] p-6 font-semibold text-gray-300 flex items-center sticky left-0 z-20 shadow-[4px_0_10px_rgba(0,0,0,0.5)] tracking-wide">{row.label}</div>
                            {programs.map(({program}) => {
                                const value = program[row.key as keyof Program]
                                let displayValue: React.ReactNode = typeof value === 'string' ? value : 'N/A';
                                if (typeof value === 'boolean') {
                                    displayValue = value ? 
                                        <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">Yes</span> : 
                                        <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">No</span>;
                                }
                                if (row.key === 'tuition' && typeof value === 'number') {
                                    displayValue = <span className="font-medium">${value.toLocaleString()}</span>;
                                }
                                if (!value) displayValue = <span className="text-gray-500">N/A</span>;
                                
                                return (
                                    <div key={`${row.key}-${program.id}`} className="bg-[#0a101f]/80 p-6 text-center flex items-center justify-center text-white hover:bg-[#0a101f] transition-colors">
                                        {displayValue}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                    
                    {/* Action Row */}
                    <div className="bg-[#050810] p-6 sticky left-0 z-20 flex items-center font-semibold text-gray-300 shadow-[4px_0_10px_rgba(0,0,0,0.5)] tracking-wide">Actions</div>
                    {programs.map(({program, university}) => (
                        <div key={`view-${program.id}`} className="bg-[#0a101f]/80 p-6 text-center flex items-center justify-center">
                            <button onClick={() => onNavigateToProgram(university, program)} className="bg-white/5 text-white border border-white/10 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#F6520C] hover:border-[#F6520C] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(246,82,12,0.3)] w-full max-w-[160px]">
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
        <div className="text-center py-24 bg-white/[0.02] rounded-3xl border border-dashed border-white/10 mt-8 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
                <div className="w-20 h-20 mx-auto bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-6 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>No {type} Shortlisted</h3>
                <p className="text-gray-400 mt-4 font-light text-lg max-w-md mx-auto">Explore our College Finder to add {type} to your list for comparison.</p>
            </div>
        </div>
    );

    return (
        <section className="py-24 bg-[#050810] min-h-screen relative overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-12">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>My Shortlist</h1>
                    <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                        Your personal hub to compare and contrast your top university and program choices.
                    </p>
                    {shortlist.length > 0 && (
                        <div className="mt-10">
                            <button onClick={onSave} className="bg-white/5 text-white border border-white/10 px-8 py-3.5 rounded-xl font-semibold hover:bg-green-500/20 hover:border-green-500/50 hover:text-green-400 transition-all duration-300 flex items-center space-x-3 mx-auto shadow-lg group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2 1v10h6V5H7z" />
                                    <path d="M9 1a1 1 0 00-1 1v2a1 1 0 002 0V2a1 1 0 00-1-1z" />
                                </svg>
                                <span>Save My Shortlist</span>
                            </button>
                        </div>
                    )}
                </div>
                
                {shortlist.length === 0 ? (
                     <div className="text-center py-24 bg-white/[0.02] rounded-3xl border border-dashed border-white/10 relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mb-6 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Your Shortlist is Empty</h3>
                            <p className="text-gray-400 mt-4 font-light text-lg max-w-md mx-auto">Start exploring and add universities or programs to compare them here.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-12 flex justify-center border-b border-white/10">
                             <button onClick={() => setActiveTab('universities')} className={`px-8 py-4 font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F6520C] relative ${activeTab === 'universities' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                                University Comparison <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs ${activeTab === 'universities' ? 'bg-[#F6520C]/20 text-[#F6520C]' : 'bg-white/5 text-gray-400'}`}>({shortlistedUniversities.length})</span>
                                {activeTab === 'universities' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F6520C] shadow-[0_-2px_10px_rgba(246,82,12,0.5)]"></div>}
                            </button>
                             <button onClick={() => setActiveTab('programs')} className={`px-8 py-4 font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F6520C] relative ${activeTab === 'programs' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                                Program Comparison <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs ${activeTab === 'programs' ? 'bg-[#F6520C]/20 text-[#F6520C]' : 'bg-white/5 text-gray-400'}`}>({shortlistedPrograms.length})</span>
                                {activeTab === 'programs' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F6520C] shadow-[0_-2px_10px_rgba(246,82,12,0.5)]"></div>}
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
