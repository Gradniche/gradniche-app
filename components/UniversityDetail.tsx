
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { University, Program } from '../data/universities';
import { ShortlistItem } from '../App';
import { threads as allThreads, generateAvatarUrl, users } from '../data/forums';
import UniversityLogo from './UniversityLogo';


interface UniversityDetailProps {
  university: University;
  onProgramSelect: (program: Program) => void;
  onBack: () => void;
  shortlist: ShortlistItem[];
  onToggleShortlist: (item: ShortlistItem) => void;
  navigate: (path: string) => void; 
  onThreadSelect: (threadId: string) => void;
}

const StarIcon: React.FC<{ isFilled: boolean; className?: string }> = ({ isFilled, className = "h-6 w-6" }) => (
    isFilled ? (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className} text-yellow-400`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className} text-gray-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
    )
);

const KeyFact: React.FC<{ label: string; value: string | number | undefined }> = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="bg-white/[0.02] p-5 rounded-2xl text-center border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 shadow-lg">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-2">{label}</p>
            <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
        </div>
    )
};

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => (
    <div className="border border-white/5 rounded-2xl mb-4 bg-white/[0.02] overflow-hidden">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F6520C] hover:bg-white/[0.02] transition-colors"
            aria-expanded={isOpen}
        >
            <span className="font-bold text-white text-lg">{title}</span>
            <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#F6520C]/20 text-[#F6520C]' : 'text-gray-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-6 pt-0 text-gray-400 leading-relaxed font-light">{children}</div>
        </div>
    </div>
);


const UniversityDetail: React.FC<UniversityDetailProps> = ({ university, onProgramSelect, onBack, shortlist, onToggleShortlist, navigate, onThreadSelect }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const isUniversityShortlisted = shortlist.some(item => item.type === 'university' && item.universityId === university.id);

  const overviewRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);
  const scholarshipsRef = useRef<HTMLDivElement>(null);
  const admissionsRef = useRef<HTMLDivElement>(null);
  const studentLifeRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const navLinks = useMemo(() => [
    { id: 'overview', label: 'Overview', ref: overviewRef },
    { id: 'programs', label: 'Programs', ref: programsRef, count: university.programs.length },
    { id: 'scholarships', label: 'Scholarships', ref: scholarshipsRef },
    { id: 'admissions', label: 'Admissions', ref: admissionsRef },
    { id: 'student-life', label: 'Student Life', ref: studentLifeRef },
    { id: 'reviews', label: 'Community', ref: reviewsRef },
    { id: 'faq', label: 'FAQ', ref: faqRef },
  ], [university.programs.length]);

  const relevantThreads = useMemo(() => {
    const universityNameLower = university.name.toLowerCase();
    const universityAcronym = university.name.match(/\(([^)]+)\)/)?.[1]?.toLowerCase();

    return allThreads.filter(thread => {
        const title = thread.title.toLowerCase();
        const content = thread.content.toLowerCase();

        if (title.includes(universityNameLower) || content.includes(universityNameLower)) {
            return true;
        }
        if (universityAcronym && (title.includes(universityAcronym) || content.includes(universityAcronym))) {
            return true;
        }
        return thread.replies.some(reply => reply.content.toLowerCase().includes(universityNameLower));
    }).slice(0, 3);
  }, [university.name]);

  const enhancedAbout = `${university.about}\n\nBeyond the lecture halls, the university thrives with a vibrant campus life that celebrates diversity and fosters personal growth. Students from over 100 countries create a rich tapestry of cultures, perspectives, and ideas. You can immerse yourself in a wide array of student-led clubs—from technical societies and entrepreneurial hubs to cultural groups and sports teams. This dynamic environment encourages collaboration, networking, and the formation of lifelong friendships, ensuring a holistic and enriching student experience.\n\nThe university is a hub of groundbreaking research and innovation, offering graduate students unparalleled opportunities to work alongside world-renowned faculty at the forefront of their fields. State-of-the-art laboratories and research centers provide the perfect ecosystem to tackle complex challenges and contribute to meaningful discoveries. Complementing this academic rigor is a dedicated career services department, which offers personalized coaching, networking events with top employers, and comprehensive resources to help you translate your academic achievements into a successful global career.`;
    
    const faqs = useMemo(() => [
        { question: "What is the student-faculty ratio like?", answer: `While it varies by department, ${university.name} is known for fostering a collaborative environment. Graduate-level courses, in particular, often have small class sizes, allowing for direct interaction with world-renowned faculty and personalized mentorship.` },
        { question: "What are the on-campus accommodation options for graduate students?", answer: "Most graduate students are offered dedicated housing options, ranging from dorm-style residences to university-owned apartments. These are typically separate from undergraduate housing to provide a more mature and focused living environment. It's recommended to apply for housing as soon as you receive your admission offer, as spots can be competitive." },
        { question: "What kind of career support does the university offer?", answer: `${university.name} has a dedicated career services center that provides comprehensive support, including resume workshops, mock interviews, networking events with top employers, and access to a vast alumni database. They also host career fairs specifically for graduate students.` },
        { question: "Is it easy for international students to get involved in campus life?", answer: "Absolutely. The university has a dedicated International Student Office and hundreds of student-led clubs and organizations. From cultural societies to academic groups and sports clubs, there are countless opportunities to get involved, build a community, and feel at home." },
    ], [university.name]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    navLinks.forEach(link => {
      if (link.ref.current) {
        observer.observe(link.ref.current);
      }
    });

    return () => {
      navLinks.forEach(link => {
        if (link.ref.current) {
          if(link.ref.current && document.body.contains(link.ref.current)) {
              observer.unobserve(link.ref.current);
          }
        }
      });
    };
  }, [navLinks]);


  return (
    <section className="py-24 bg-[#050810] min-h-screen relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-8">
            <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to University List</span>
            </button>
        </div>
        
        <div className="relative bg-white/[0.02] backdrop-blur-xl p-8 md:p-12 rounded-3xl mb-12 border border-white/5 shadow-2xl overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-full bg-gradient-to-tr from-[#F6520C]/20 via-transparent to-transparent rounded-full opacity-50 blur-3xl pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
                 <div className="absolute top-0 right-0 z-20">
                    <button
                        onClick={() => onToggleShortlist({ type: 'university', universityId: university.id })}
                        className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 hover:text-yellow-400 hover:border-yellow-400/30 transition-all duration-300 group shadow-lg"
                        aria-label={isUniversityShortlisted ? 'Remove university from shortlist' : 'Add university to shortlist'}
                    >
                        <StarIcon isFilled={isUniversityShortlisted} />
                        <span className="text-sm font-semibold hidden sm:block tracking-wide">{isUniversityShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                    </button>
                </div>
                <div className="flex flex-col md:flex-row items-center md:space-x-10">
                    <div className="w-32 h-32 rounded-2xl mb-8 md:mb-0 bg-white/5 p-3 flex-shrink-0 border border-white/10 shadow-xl overflow-hidden flex items-center justify-center">
                        <UniversityLogo src={university.logo} alt={university.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{university.name}</h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light">{university.location} <span className="text-gray-600 mx-2">&middot;</span> {university.setting}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/5 lg:hidden mb-12 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Key Facts</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <KeyFact label="QS Ranking" value={university.qsRanking ? `#${university.qsRanking}` : 'N/A'} />
                <KeyFact label="US News Global" value={university.otherRankings?.usNewsGlobal ? `#${university.otherRankings.usNewsGlobal}` : undefined} />
                <KeyFact label="National Rank" value={university.otherRankings?.national ? `#${university.otherRankings.national}` : undefined} />
                <KeyFact label="Acceptance Rate" value={university.acceptanceRate} />
                <KeyFact label="Type" value={university.type} />
                <KeyFact label="Founded" value={university.foundedYear} />
                <KeyFact label="Student:Faculty" value={university.studentFacultyRatio} />
                <KeyFact label="Int'l Students" value={university.internationalStudents} />
                <KeyFact label="Application Fee" value={university.applicationFee} />
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                {/* Inner glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                
                <div className="relative z-10">
                    <section id="overview" ref={overviewRef} className="scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>About University</h2>
                        <p className="text-gray-400 leading-relaxed whitespace-pre-line font-light text-lg">{enhancedAbout}</p>
                    </section>
                    
                    <hr className="my-12 border-white/5" />

                    <section id="programs" ref={programsRef} className="scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Graduate Programs Offered</h2>
                        <div className="space-y-4">
                            {university.programs.length > 0 ? university.programs.map(program => (
                                <button 
                                    key={program.id} 
                                    onClick={() => onProgramSelect(program)} 
                                    className="w-full text-left bg-black/20 p-6 rounded-2xl shadow-lg border border-white/5 hover:border-[#F6520C]/50 hover:bg-white/[0.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F6520C] group"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="pr-4">
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#F6520C] transition-colors">{program.name}</h4>
                                            <p className="text-sm text-gray-400 font-light">{program.level} <span className="text-gray-600 mx-2">&middot;</span> {program.duration}</p>
                                            {program.rankings && (
                                                <div className="mt-4 flex items-center flex-wrap gap-3 text-xs">
                                                    {program.rankings.qsSubject && (
                                                        <span className="bg-[#F6520C]/10 text-[#F6520C] border border-[#F6520C]/20 font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            QS Subject: #{program.rankings.qsSubject}
                                                        </span>
                                                    )}
                                                    {program.rankings.usNewsSubject && (
                                                        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold px-3 py-1.5 rounded-full">US News Subject: #{program.rankings.usNewsSubject}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-shrink-0 text-gray-500 group-hover:text-[#F6520C] transition-colors group-hover:translate-x-1 transform duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            )) : (
                                <p className="text-gray-500 text-center py-8 bg-black/20 rounded-2xl border border-white/5">No graduate programs listed for this university.</p>
                            )}
                        </div>
                    </section>
                    
                    <hr className="my-12 border-white/5" />
                    
                    <section id="scholarships" ref={scholarshipsRef} className="scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Scholarships & Funding</h2>
                        <p className="text-gray-400 leading-relaxed mb-8 font-light text-lg">{university.scholarships}</p>
                         <button onClick={() => navigate('/tools/scholarship-finder')} className="bg-white/5 text-white border border-white/10 px-8 py-3 rounded-xl hover:bg-[#F6520C] hover:border-[#F6520C] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050810] focus:ring-[#F6520C] font-medium shadow-lg hover:shadow-[0_0_20px_rgba(246,82,12,0.3)]">
                          Find Relevant Scholarships
                        </button>
                    </section>
                    
                    <hr className="my-12 border-white/5" />
                    
                    <section id="admissions" ref={admissionsRef} className="scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Admission Insights</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <KeyFact label="Acceptance Rate" value={university.acceptanceRate} />
                            <KeyFact label="Application Fee" value={university.applicationFee} />
                        </div>
                    </section>
                    
                    <hr className="my-12 border-white/5" />

                    <section id="student-life" ref={studentLifeRef} className="scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Student Life</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <KeyFact label="Int'l Students" value={university.internationalStudents} />
                            <KeyFact label="Student:Faculty Ratio" value={university.studentFacultyRatio} />
                        </div>
                    </section>
                    
                    <hr className="my-12 border-white/5" />
                    
                     <section id="reviews" ref={reviewsRef} className="scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Community Discussions</h2>
                        {relevantThreads.length > 0 ? (
                            <div className="space-y-4">
                                {relevantThreads.map(thread => {
                                    const author = users.find(u => u.id === thread.authorId);
                                    return (
                                    <button key={thread.id} onClick={() => onThreadSelect(thread.id)} className="w-full text-left bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300 group">
                                        <p className="font-bold text-white truncate text-lg mb-3 group-hover:text-[#F6520C] transition-colors">{thread.title}</p>
                                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                                            <img src={generateAvatarUrl(author!.avatarConfig)} alt={author!.name} className="w-6 h-6 rounded-full border border-gray-700" />
                                            <span className="font-medium">{author!.name}</span>
                                            <span className="text-gray-600">&middot;</span>
                                            <span>{thread.replies.length} replies</span>
                                        </div>
                                    </button>
                                )})}
                            </div>
                        ) : (
                            <p className="text-gray-500 py-8 text-center bg-black/20 rounded-2xl border border-white/5">No community discussions found for this university yet.</p>
                        )}
                        <button onClick={() => navigate('/tools/community-forums')} className="mt-8 text-sm font-semibold text-[#F6520C] hover:text-orange-400 transition-colors flex items-center gap-2">
                            View All Discussions 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </section>
                    
                    <hr className="my-12 border-white/5" />
                    
                    <section id="faq" ref={faqRef} className="scroll-mt-32">
                        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    title={faq.question}
                                    isOpen={openFaqIndex === index}
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                >
                                    {faq.answer}
                                </AccordionItem>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            
            <aside className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-32 space-y-8">
                    <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Key Facts</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <KeyFact label="QS Ranking" value={university.qsRanking ? `#${university.qsRanking}` : 'N/A'} />
                                 <KeyFact label="US News Global" value={university.otherRankings?.usNewsGlobal ? `#${university.otherRankings.usNewsGlobal}` : undefined} />
                                <KeyFact label="National Rank" value={university.otherRankings?.national ? `#${university.otherRankings.national}` : undefined} />
                                <KeyFact label="Acceptance Rate" value={university.acceptanceRate} />
                                <KeyFact label="Type" value={university.type} />
                                <KeyFact label="Founded" value={university.foundedYear} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/[0.02] backdrop-blur-xl p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-4 px-2 tracking-tight">On This Page</h3>
                            <ul className="space-y-2">
                                {navLinks.map(link => (
                                    <li key={link.id}>
                                        <a href={`#${link.id}`}
                                          className={`flex items-center justify-between text-sm px-4 py-3 rounded-xl transition-all duration-300 ${activeSection === link.id ? 'bg-[#F6520C]/10 text-[#F6520C] font-semibold border border-[#F6520C]/20 shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                                            {link.label}
                                            {link.count !== undefined && <span className={`ml-2 text-xs font-bold px-2.5 py-1 rounded-full ${activeSection === link.id ? 'bg-[#F6520C]/20 text-[#F6520C]' : 'bg-white/5 text-gray-400'}`}>{link.count}</span>}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
      </div>
    </section>
  );
};

export default UniversityDetail;
