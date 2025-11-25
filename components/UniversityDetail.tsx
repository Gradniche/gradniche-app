
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { University, Program } from '../data/universities';
import { ShortlistItem } from '../App';
import { threads as allThreads, generateAvatarUrl, users } from '../data/forums';


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
        <div className="bg-gradient-to-br from-gray-700/50 via-gray-800 to-gray-900/80 p-4 rounded-lg text-center border border-gray-600 hover:border-[#F6520C]/70 transition-all duration-300 shadow-lg hover:shadow-[#F6520C]/20">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
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
    <div className="border-b border-gray-700">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left py-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#F6520C] rounded-sm"
            aria-expanded={isOpen}
        >
            <span className="font-semibold text-white">{title}</span>
            <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="pb-4 text-gray-400 leading-relaxed">{children}</div>
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
    <section className="py-20 bg-[#0a101f] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-8">
            <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to University List</span>
            </button>
        </div>
        
        <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/70 backdrop-blur-sm p-8 rounded-lg mb-12 border border-gray-700 overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-full bg-gradient-to-tr from-[#F6520C]/10 via-transparent to-transparent rounded-full opacity-50"></div>
            <div className="relative z-10">
                 <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={() => onToggleShortlist({ type: 'university', universityId: university.id })}
                        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:text-yellow-400 group"
                        aria-label={isUniversityShortlisted ? 'Remove university from shortlist' : 'Add university to shortlist'}
                    >
                        <StarIcon isFilled={isUniversityShortlisted} />
                        <span className="text-sm font-semibold hidden sm:block">{isUniversityShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                    </button>
                </div>
                <div className="flex flex-col md:flex-row items-center md:space-x-8">
                    <img src={university.logo} alt={`${university.name} logo`} className="w-28 h-28 rounded-full mb-6 md:mb-0 object-contain bg-white p-2 flex-shrink-0 border-4 border-gray-700" />
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">{university.name}</h1>
                        <p className="text-xl text-gray-400 mt-1">{university.location} &middot; {university.setting}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 lg:hidden mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Key Facts</h2>
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
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                <section id="overview" ref={overviewRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-6">About University</h2>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">{enhancedAbout}</p>
                </section>
                
                <hr className="my-10 border-gray-700" />

                <section id="programs" ref={programsRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-6">Graduate Programs Offered</h2>
                    <div className="space-y-4">
                        {university.programs.length > 0 ? university.programs.map(program => (
                            <button 
                                key={program.id} 
                                onClick={() => onProgramSelect(program)} 
                                className="w-full text-left bg-gray-800/50 p-6 rounded-lg shadow-md border border-gray-700 hover:border-[#F6520C] hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F6520C]"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="pr-4">
                                        <h4 className="text-lg font-semibold text-white">{program.name}</h4>
                                        <p className="text-sm text-gray-400">{program.level} &middot; {program.duration}</p>
                                        {program.rankings && (
                                            <div className="mt-2 flex items-center flex-wrap gap-2 text-xs">
                                                {program.rankings.qsSubject && (
                                                    <span className="bg-yellow-500/20 text-yellow-300 font-semibold px-2 py-1 rounded-full flex items-center gap-1.5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        QS Subject: #{program.rankings.qsSubject}
                                                    </span>
                                                )}
                                                {program.rankings.usNewsSubject && (
                                                    <span className="bg-blue-500/20 text-blue-300 font-semibold px-2 py-1 rounded-full">US News Subject: #{program.rankings.usNewsSubject}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-shrink-0 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        )) : (
                            <p className="text-gray-500 text-center">No graduate programs listed for this university.</p>
                        )}
                    </div>
                </section>
                
                <hr className="my-10 border-gray-700" />
                
                <section id="scholarships" ref={scholarshipsRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-4">Scholarships & Funding</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">{university.scholarships}</p>
                     <button onClick={() => navigate('/tools/scholarship-finder')} className="bg-gray-800/80 text-[#F6520C] border border-[#F6520C] px-6 py-2 rounded-full hover:bg-[#F6520C] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#F6520C]">
                      Find Relevant Scholarships
                    </button>
                </section>
                
                <hr className="my-10 border-gray-700" />
                
                <section id="admissions" ref={admissionsRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-4">Admission Insights</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <KeyFact label="Acceptance Rate" value={university.acceptanceRate} />
                        <KeyFact label="Application Fee" value={university.applicationFee} />
                    </div>
                </section>
                
                <hr className="my-10 border-gray-700" />

                <section id="student-life" ref={studentLifeRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-4">Student Life</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <KeyFact label="Int'l Students" value={university.internationalStudents} />
                        <KeyFact label="Student:Faculty Ratio" value={university.studentFacultyRatio} />
                    </div>
                </section>
                
                <hr className="my-10 border-gray-700" />
                
                 <section id="reviews" ref={reviewsRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-6">Community Discussions</h2>
                    {relevantThreads.length > 0 ? (
                        <div className="space-y-4">
                            {relevantThreads.map(thread => {
                                const author = users.find(u => u.id === thread.authorId);
                                return (
                                <button key={thread.id} onClick={() => onThreadSelect(thread.id)} className="w-full text-left bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
                                    <p className="font-semibold text-white truncate">{thread.title}</p>
                                    <div className="flex items-center space-x-2 text-xs text-gray-400 mt-2">
                                        <img src={generateAvatarUrl(author!.avatarConfig)} alt={author!.name} className="w-5 h-5 rounded-full" />
                                        <span>{author!.name}</span>
                                        <span>&middot;</span>
                                        <span>{thread.replies.length} replies</span>
                                    </div>
                                </button>
                            )})}
                        </div>
                    ) : (
                        <p className="text-gray-500">No community discussions found for this university yet.</p>
                    )}
                    <button onClick={() => navigate('/tools/community-forums')} className="mt-6 text-sm font-semibold text-[#F6520C] hover:text-orange-400 transition">
                        View All Discussions &rarr;
                    </button>
                </section>
                
                <hr className="my-10 border-gray-700" />
                
                <section id="faq" ref={faqRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-2">
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
            
            <aside className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-24 space-y-6">
                    <div className="bg-white/5 p-6 rounded-lg border border-gray-700">
                        <h2 className="text-xl font-bold text-white mb-4">Key Facts</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <KeyFact label="QS Ranking" value={university.qsRanking ? `#${university.qsRanking}` : 'N/A'} />
                             <KeyFact label="US News Global" value={university.otherRankings?.usNewsGlobal ? `#${university.otherRankings.usNewsGlobal}` : undefined} />
                            <KeyFact label="National Rank" value={university.otherRankings?.national ? `#${university.otherRankings.national}` : undefined} />
                            <KeyFact label="Acceptance Rate" value={university.acceptanceRate} />
                            <KeyFact label="Type" value={university.type} />
                            <KeyFact label="Founded" value={university.foundedYear} />
                        </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-gray-700">
                        <h3 className="text-lg font-bold text-white mb-2 px-2">On This Page</h3>
                        <ul className="space-y-1">
                            {navLinks.map(link => (
                                <li key={link.id}>
                                    <a href={`#${link.id}`}
                                      className={`block text-sm px-3 py-2 rounded-md transition-colors ${activeSection === link.id ? 'bg-[#F6520C]/20 text-[#F6520C] font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}>
                                        {link.label}
                                        {link.count !== undefined && <span className="ml-2 bg-gray-600 text-gray-200 text-xs font-bold px-2 py-0.5 rounded-full">{link.count}</span>}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>
        </div>
      </div>
    </section>
  );
};

export default UniversityDetail;
