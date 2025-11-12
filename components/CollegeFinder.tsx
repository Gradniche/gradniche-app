
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { universities as universityData, University } from '../data/universities';
import { ShortlistItem } from '../App';

interface CollegeFinderProps {
    navigate: (path: string) => void;
    shortlist: ShortlistItem[];
    onToggleShortlist: (item: ShortlistItem) => void;
}

const StarIcon: React.FC<{ isFilled: boolean }> = ({ isFilled }) => (
    isFilled ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
    )
);

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
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white flex justify-between items-center"
            >
                <span className="truncate">{displayValue}</span>
                <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
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
                                    className="h-4 w-4 rounded border-gray-300 text-[#F6520C] focus:ring-[#F6520C] bg-gray-700"
                                />
                                <span className={`ml-3 text-sm ${selected.includes(option) ? 'font-semibold text-[#F6520C]' : 'text-gray-300'}`}>{option}</span>
                            </label>
                        ))}
                    </div>
                    <div className="p-2 border-t border-gray-600 flex justify-between bg-gray-800/50">
                        <button
                            onClick={() => onChange(options)}
                            className="text-xs text-[#F6520C] hover:underline"
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

const CollegeFinder: React.FC<CollegeFinderProps> = ({ navigate, shortlist, onToggleShortlist }) => {
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
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">University Finder</h1>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        Search and compare thousands of universities worldwide. Filter by country, course, tuition, and ranking to find your perfect fit.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-1/3 xl:w-1/4 lg:sticky top-24 h-max w-full">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 space-y-6">
                            <h2 className="text-xl font-bold text-white">Filters</h2>
                             <div>
                                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">Search by Name</label>
                                <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="e.g., MIT, Canada" className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                            </div>

                             <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Quick Select Country</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['USA', 'UK', 'Canada', 'Australia']).map(country => (
                                        <button key={country} onClick={() => handleQuickCountry(country)} className={`w-full text-center px-2 py-2 text-sm font-medium rounded-md border-2 transition ${countryFilters.includes(country) ? 'bg-[#F6520C] text-white border-[#F6520C]' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500'}`}>
                                            {country}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <MultiSelectDropdown label="Country" options={countries} selected={countryFilters} onChange={setCountryFilters} placeholder="All Countries"/>
                            <MultiSelectDropdown label="Course" options={popularCourses} selected={courseFilters} onChange={setCourseFilters} placeholder="All Courses" />
                            
                             <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">University Type</label>
                                <div className="flex bg-gray-800/50 p-1 rounded-md">
                                    {(['all', 'Public', 'Private'] as const).map(type => (
                                        <button key={type} onClick={() => setUniversityType(type)} className={`flex-1 capitalize text-center px-2 py-1 text-sm font-medium rounded transition ${universityType === type ? 'bg-[#F6520C] text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                                            {type === 'all' ? 'All' : type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="tuition-range" className="block text-sm font-medium text-gray-300 mb-2">Max. Avg. Tuition (USD): ${maxTuition.toLocaleString()}</label>
                                <input id="tuition-range" type="range" min="0" max="100000" step="5000" value={maxTuition} onChange={e => setMaxTuition(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#F6520C]" />
                            </div>
                            <div>
                                <label htmlFor="ranking-range" className="block text-sm font-medium text-gray-300 mb-2">Max. QS World Ranking: #{maxRanking}</label>
                                <input id="ranking-range" type="range" min="1" max="1000" step="10" value={maxRanking} onChange={e => setMaxRanking(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#F6520C]" />
                            </div>

                            <button onClick={resetFilters} className="w-full text-center text-sm font-semibold text-gray-400 hover:text-white transition py-2 rounded-md bg-gray-700/50 hover:bg-gray-700">Reset Filters</button>
                        </div>
                    </aside>

                    {/* Results Content */}
                    <main className="lg:w-2/3 xl:w-3/4 w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                            <p className="text-gray-400 text-sm mb-2 sm:mb-0">Found <strong>{filteredUniversities.length}</strong> universities</p>
                            <div>
                                <label htmlFor="sort-by" className="sr-only">Sort by</label>
                                <select id="sort-by" value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="px-3 py-2 text-sm bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F6520C] text-white">
                                    <option value="qs-asc">Sort by: Ranking</option>
                                    <option value="name-asc">Sort by: Name (A-Z)</option>
                                    <option value="tuition-asc">Sort by: Tuition (Low-High)</option>
                                    <option value="tuition-desc">Sort by: Tuition (High-Low)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                             {paginatedUniversities.map(uni => {
                                const isShortlisted = shortlist.some(item => item.type === 'university' && item.universityId === uni.id);
                                return (
                                    <div key={uni.id} className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-[#F6520C]/80 transition-all duration-300 flex flex-col text-center overflow-hidden hover:-translate-y-1 hover:shadow-xl" style={{ minHeight: '320px' }}>
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#F6520C]/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        <a href={`#/college-finder/${uni.id}`} onClick={(e) => { e.preventDefault(); navigate(`/college-finder/${uni.id}`); }} className="w-full h-full flex flex-col p-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F6520C]">
                                            <div className="flex-grow flex flex-col items-center justify-start">
                                                <img src={uni.logo} alt={`${uni.name} logo`} className="w-24 h-24 rounded-full object-contain bg-white p-1.5 mb-5 border-2 border-gray-600 group-hover:border-[#F6520C] transition-colors" />
                                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-300 transition-colors flex-grow flex items-center justify-center line-clamp-3">{uni.name}</h3>
                                                <p className="text-sm text-gray-400 mt-1">{uni.location}</p>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-700 w-full flex-shrink-0">
                                                <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider">QS World Rank</p>
                                                <p className="font-bold text-white text-2xl mt-1">#{uni.qsRanking || 'N/A'}</p>
                                            </div>
                                        </a>
                                        <div className="absolute top-4 right-4 z-10">
                                            <button onClick={() => onToggleShortlist({ type: 'university', universityId: uni.id })} className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 hover:text-yellow-400 relative group/tooltip" aria-label={isShortlisted ? 'Remove from shortlist' : 'Add to shortlist'}>
                                                <StarIcon isFilled={isShortlisted} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                         {filteredUniversities.length === 0 && (
                            <div className="text-center py-16 bg-white/5 rounded-lg border border-dashed border-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10.5a.5.5 0 11-1 0 .5.5 0 011 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 13.5L10 10" /></svg>
                                <h3 className="text-2xl text-white mt-4">No Universities Found</h3>
                                <p className="text-gray-400 mt-2">Try adjusting your filters to find more results.</p>
                            </div>
                        )}
                         {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-1 mt-12">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-800/50 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
                                    aria-label="Previous page"
                                >
                                    &larr;
                                </button>
                                {paginationItems.map((page, index) =>
                                    typeof page === 'number' ? (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-10 h-10 flex items-center justify-center text-sm rounded-md font-semibold transition ${currentPage === page ? 'bg-[#F6520C] text-white' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'}`}
                                            aria-current={currentPage === page ? 'page' : undefined}
                                        >
                                            {page}
                                        </button>
                                    ) : (
                                        <span key={index} className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
                                    )
                                )}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 flex items-center justify-center bg-gray-800/50 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
                                    aria-label="Next page"
                                >
                                    &rarr;
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
