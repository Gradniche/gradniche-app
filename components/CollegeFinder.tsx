
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { universities as universityData, University } from '../data/universities';
import UniversityLogo from './UniversityLogo';

interface CollegeFinderProps {
    navigate: (path: string) => void;
}

const countries = [...new Set(universityData.map(u => u.country))].sort();
const popularCourses = [...new Set(universityData.flatMap(u => u.popularCourses))].sort();

const MultiSelectDropdown: React.FC<{
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder: string;
    label: string;
}> = ({ options, selected, onChange, placeholder, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const filteredOptions = options.filter(option => 
        option.toLowerCase().includes(search.toLowerCase())
    );

    const handleToggle = (option: string) => {
        const newSelected = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];
        onChange(newSelected);
    };

    const displayValue = selected.length === 0 
        ? placeholder 
        : selected.length === 1 
        ? selected[0] 
        : `${selected.length} selected`;

    return (
        <div className="relative" ref={ref}>
            <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white flex justify-between items-center"
            >
                <span className="truncate">{displayValue}</span>
                <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="absolute z-20 top-full mt-2 w-full bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-60 flex flex-col">
                    <div className="p-2 border-b border-gray-600">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-500 rounded-md text-white text-sm"
                        />
                    </div>
                    <div className="overflow-y-auto modern-scrollbar flex-1">
                        {filteredOptions.map(option => (
                            <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option)}
                                    onChange={() => handleToggle(option)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-400 focus:ring-blue-500 bg-gray-700"
                                />
                                <span className={`ml-3 text-sm ${selected.includes(option) ? 'font-semibold text-blue-400' : 'text-gray-300'}`}>{option}</span>
                            </label>
                        ))}
                    </div>
                    <div className="p-2 border-t border-gray-600 flex justify-between bg-gray-800/50">
                        <button
                            onClick={() => onChange(options)}
                            className="text-xs text-blue-400 hover:underline"
                        >
                            Select All
                        </button>
                        <button
                            onClick={() => onChange([])}
                            className="text-xs text-gray-400 hover:underline"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const CollegeFinder: React.FC<CollegeFinderProps> = ({ navigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [countryFilters, setCountryFilters] = useState<string[]>([]);
    const [courseFilters, setCourseFilters] = useState<string[]>([]);
    const [maxTuition, setMaxTuition] = useState(100000);
    const [maxRanking, setMaxRanking] = useState(1000);
    const [currentPage, setCurrentPage] = useState(1);
    const [universityType, setUniversityType] = useState<'all' | 'Public' | 'Private'>('all');
    const [sortBy, setSortBy] = useState<'qs-asc' | 'name-asc' | 'tuition-asc' | 'tuition-desc'>('qs-asc');
    
    const ITEMS_PER_PAGE = 21;

    const resetFilters = () => {
        setSearchTerm('');
        setCountryFilters([]);
        setCourseFilters([]);
        setMaxTuition(100000);
        setMaxRanking(1000);
        setUniversityType('all');
        setSortBy('qs-asc');
        setCurrentPage(1);
    };

    const handleQuickCountry = (country: string) => {
        setCountryFilters(prev => {
            if (prev.includes(country)) {
                return prev.filter(c => c !== country);
            } else {
                return [...prev, country];
            }
        });
    };

    const filteredUniversities = useMemo(() => {
        let universities = universityData
            .filter(uni => {
                const searchLower = searchTerm.toLowerCase();
                return !searchLower || uni.name.toLowerCase().includes(searchLower) || uni.country.toLowerCase().includes(searchLower);
            })
            .filter(uni => countryFilters.length === 0 || countryFilters.includes(uni.country))
            .filter(uni => courseFilters.length === 0 || courseFilters.some(course => uni.popularCourses.includes(course)))
            .filter(uni => uni.avgTuition <= maxTuition)
            .filter(uni => {
                if (!uni.qsRanking) return true;
                return uni.qsRanking <= maxRanking;
            })
            .filter(uni => universityType === 'all' || uni.type === universityType);

        switch (sortBy) {
            case 'qs-asc':
                universities.sort((a,b) => (a.qsRanking || 9999) - (b.qsRanking || 9999));
                break;
            case 'name-asc':
                universities.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'tuition-asc':
                 universities.sort((a, b) => a.avgTuition - b.avgTuition);
                break;
            case 'tuition-desc':
                 universities.sort((a, b) => b.avgTuition - a.avgTuition);
                break;
        }

        return universities;
    }, [searchTerm, countryFilters, courseFilters, maxTuition, maxRanking, universityType, sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, countryFilters, courseFilters, maxTuition, maxRanking, universityType, sortBy]);

    const totalPages = Math.ceil(filteredUniversities.length / ITEMS_PER_PAGE);
    const paginatedUniversities = filteredUniversities.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const paginationItems = useMemo(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, '...', totalPages];
        }
        if (currentPage > totalPages - 4) {
            return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }, [currentPage, totalPages]);
    
    return (
        <section className="py-16 md:py-24 bg-[#050a14] min-h-screen relative overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-500/5 rounded-full blur-[80px] md:blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <div className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 md:mb-6">
                        <span className="text-[10px] md:text-xs font-semibold tracking-widest text-blue-400 uppercase">Explore</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>University Finder</h1>
                    <p className="text-base md:text-xl text-gray-400 mt-4 md:mt-6 max-w-3xl mx-auto font-light leading-relaxed px-4 md:px-0">
                        Search and compare thousands of universities worldwide. Filter by country, course, tuition, and ranking to find your perfect fit.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-1/3 xl:w-1/4 lg:sticky top-24 h-max w-full">
                        <div className="bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl space-y-6 md:space-y-8 relative overflow-hidden">
                            {/* Inner glow */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 tracking-tight">Filters</h2>
                                 <div className="mb-4 md:mb-6">
                                    <label htmlFor="search" className="block text-xs md:text-sm font-medium text-gray-400 mb-2 md:mb-3 uppercase tracking-wider">Search by Name</label>
                                    <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="e.g., MIT, Canada" className="w-full px-4 md:px-5 py-3 md:py-4 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-500 transition-all text-sm md:text-base" />
                                </div>

                                 <div className="mb-4 md:mb-6">
                                    <label className="block text-xs md:text-sm font-medium text-gray-400 mb-2 md:mb-3 uppercase tracking-wider">Quick Select Country</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 md:gap-3">
                                        {(['USA', 'UK', 'Canada', 'Australia']).map(country => (
                                            <button key={country} onClick={() => handleQuickCountry(country)} className={`w-full text-center px-2 md:px-3 py-2 md:py-3 text-xs md:text-sm font-medium rounded-xl border transition-all duration-300 ${countryFilters.includes(country) ? 'bg-blue-600/10 text-blue-400 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'bg-black/20 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-300'}`}>
                                                {country}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    <MultiSelectDropdown label="Country" options={countries} selected={countryFilters} onChange={setCountryFilters} placeholder="All Countries"/>
                                    <MultiSelectDropdown label="Course" options={popularCourses} selected={courseFilters} onChange={setCourseFilters} placeholder="All Courses" />
                                </div>
                                
                                 <div className="mt-4 md:mt-6">
                                    <label className="block text-xs md:text-sm font-medium text-gray-400 mb-2 md:mb-3 uppercase tracking-wider">University Type</label>
                                    <div className="flex flex-row bg-black/20 p-1 md:p-1.5 rounded-xl border border-white/5">
                                        {(['all', 'Public', 'Private'] as const).map(type => (
                                            <button key={type} onClick={() => setUniversityType(type)} className={`flex-1 capitalize text-center px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 ${universityType === type ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
                                                {type === 'all' ? 'All' : type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="tuition-range" className="block text-xs md:text-sm font-medium text-gray-400 mb-2 md:mb-3 uppercase tracking-wider">Max. Avg. Tuition (USD): <span className="text-white font-semibold">${maxTuition.toLocaleString()}</span></label>
                                        <input id="tuition-range" type="range" min="0" max="100000" step="5000" value={maxTuition} onChange={e => setMaxTuition(Number(e.target.value))} className="w-full h-1.5 md:h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="ranking-range" className="block text-xs md:text-sm font-medium text-gray-400 mb-2 md:mb-3 uppercase tracking-wider">Max. QS World Ranking: <span className="text-white font-semibold">#{maxRanking}</span></label>
                                        <input id="ranking-range" type="range" min="1" max="1000" step="10" value={maxRanking} onChange={e => setMaxRanking(Number(e.target.value))} className="w-full h-1.5 md:h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                                    </div>
                                </div>

                                <button onClick={resetFilters} className="w-full mt-6 md:mt-8 text-center text-xs md:text-sm font-semibold text-gray-400 hover:text-white transition-colors py-3 md:py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5">Reset Filters</button>
                            </div>
                        </div>
                    </aside>

                    {/* Results Content */}
                    <main className="lg:w-2/3 xl:w-3/4 w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-8">
                            <p className="text-gray-400 text-xs md:text-sm mb-3 sm:mb-0 font-light">Found <strong className="text-white font-semibold">{filteredUniversities.length}</strong> universities</p>
                            <div className="relative w-full sm:w-auto">
                                <label htmlFor="sort-by" className="sr-only">Sort by</label>
                                <select id="sort-by" value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="w-full sm:w-auto appearance-none pl-4 pr-10 py-2.5 md:py-3 text-xs md:text-sm bg-white/[0.02] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white cursor-pointer hover:bg-white/[0.04] transition-colors">
                                    <option value="qs-asc" className="bg-gray-900">Sort by: Ranking</option>
                                    <option value="name-asc" className="bg-gray-900">Sort by: Name (A-Z)</option>
                                    <option value="tuition-asc" className="bg-gray-900">Sort by: Tuition (Low-High)</option>
                                    <option value="tuition-desc" className="bg-gray-900">Sort by: Tuition (High-Low)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                             {paginatedUniversities.map(uni => {
                                return (
                                    <div key={uni.id} className="group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl md:rounded-3xl border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col text-center overflow-hidden hover:-translate-y-2 hover:shadow-2xl" style={{ minHeight: '320px' }}>
                                        {/* Gradient Glow */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 pointer-events-none"></div>
                                        
                                        <a href={`/college-finder/${uni.id}`} onClick={(e) => { e.preventDefault(); navigate(`/college-finder/${uni.id}`); }} className="w-full h-full flex flex-col p-6 md:p-8 relative z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-2xl md:rounded-3xl">
                                            <div className="flex-grow flex flex-col items-center justify-start">
                                                <div className="w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-6 p-2 rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-500 flex items-center justify-center overflow-hidden shadow-lg">
                                                    <UniversityLogo src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                                                </div>
                                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors flex-grow flex items-center justify-center line-clamp-3 tracking-tight">{uni.name}</h3>
                                                <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2 font-light">{uni.location}</p>
                                            </div>
                                            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/5 w-full flex-shrink-0">
                                                <p className="text-gray-500 text-[10px] md:text-xs uppercase font-medium tracking-widest mb-1">QS World Rank</p>
                                                <p className="font-bold text-white text-2xl md:text-3xl tracking-tight">#{uni.qsRanking || 'N/A'}</p>
                                            </div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                         {filteredUniversities.length === 0 && (
                            <div className="text-center py-16 md:py-20 bg-white/[0.02] rounded-2xl md:rounded-3xl border border-dashed border-white/10 mt-6 md:mt-8">
                                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 md:mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10.5a.5.5 0 11-1 0 .5.5 0 011 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 13.5L10 10" /></svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 tracking-tight">No Universities Found</h3>
                                <p className="text-sm md:text-base text-gray-400 font-light px-4">Try adjusting your filters to find more results.</p>
                                <button onClick={resetFilters} className="mt-6 md:mt-8 px-6 md:px-8 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors text-sm md:text-base">Clear All Filters</button>
                            </div>
                        )}
                         {totalPages > 1 && (
                            <div className="flex flex-wrap justify-center items-center gap-2 mt-10 md:mt-16">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/[0.02] border border-white/5 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.05] hover:border-white/10 transition-all"
                                    aria-label="Previous page"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </button>
                                {paginationItems.map((page, index) =>
                                    typeof page === 'number' ? (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xs md:text-sm rounded-xl font-semibold transition-all duration-300 ${currentPage === page ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/[0.02] border border-white/5 text-gray-400 hover:bg-white/[0.05] hover:text-white'}`}
                                            aria-current={currentPage === page ? 'page' : undefined}
                                        >
                                            {page}
                                        </button>
                                    ) : (
                                        <span key={index} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-gray-500">...</span>
                                    )
                                )}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/[0.02] border border-white/5 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.05] hover:border-white/10 transition-all"
                                    aria-label="Next page"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
};

export default CollegeFinder;
