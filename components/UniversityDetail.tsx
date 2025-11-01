

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { University, Program } from '../data/universities';
import { ShortlistItem, Page } from '../App';
import { threads as allThreads, users, User, generateAvatarUrl } from '../data/forums';


interface UniversityDetailProps {
  university: University;
  onProgramSelect: (program: Program) => void;
  onBack: () => void;
  shortlist: ShortlistItem[];
  onToggleShortlist: (item: ShortlistItem) => void;
  isAuthenticated: boolean;
  navigateTo: (page: Page) => void; 
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
            <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="pb-4 text-gray-400 leading-relaxed">{children}</div>
        </div>
    </div>
);


const UniversityDetail: React.FC<UniversityDetailProps> = ({ university, onProgramSelect, onBack, shortlist, onToggleShortlist, isAuthenticated, navigateTo, onThreadSelect }) => {
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

  const getUser = (userId: string): User | undefined => users.find(u => u.id === userId);

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
        // Also check replies for university name
        return thread.replies.some(reply => reply.content.toLowerCase().includes(universityNameLower));
    }).slice(0, 3); // Limit to 3 highlights
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
          // Check if ref is still in the DOM before unobserving
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
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/70 backdrop-blur-sm p-8 rounded-lg mb-12 border border-gray-700 overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-full bg-gradient-to-tr from-[#F6520C]/10 via-transparent to-transparent rounded-full opacity-50"></div>
            <div className="relative z-10">
                 <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={() => onToggleShortlist({ type: 'university', universityId: university.id })}
                        disabled={!isAuthenticated}
                        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:text-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed group"
                        aria-label={isUniversityShortlisted ? 'Remove university from shortlist' : 'Add university to shortlist'}
                    >
                        <StarIcon isFilled={isUniversityShortlisted} />
                        <span className="text-sm font-semibold hidden sm:block">{isUniversityShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                        {!isAuthenticated && <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-black text-xs text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap shadow-lg">Login to shortlist</span>}
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

        {/* Key Facts - for mobile screens */}
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
        
        {/* Two-Column Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column: Tabbed Content */}
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
                                                    <span className="bg-blue-500/20 text-blue-300 font-semibold px-2 py-1 rounded-full flex items-center gap-1.5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        U.S. News Subject: #{program.rankings.usNewsSubject}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-lg font-bold text-[#F6520C]">${program.tuition.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">/ year</p>
                                    </div>
                                </div>
                            </button>
                        )) : (
                            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                                <p className="text-gray-400">No graduate programs listed for this university. Please check the official university website for more information.</p>
                            </div>
                        )}
                    </div>
                </section>

                <hr className="my-10 border-gray-700" />

                <section id="scholarships" ref={scholarshipsRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-6">Scholarships & Financial Aid</h2>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">{university.scholarships || 'Information not available. Please check the university website.'}</p>
                </section>
                
                <hr className="my-10 border-gray-700" />
                
                <section id="admissions" ref={admissionsRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-6">Admissions Insights</h2>
                    <div className="bg-gray-800/50 p-6 rounded-lg space-y-4">
                        <p className="text-gray-300">Admissions at a top-tier institution like {university.name} are highly competitive and holistic. With an estimated acceptance rate of {university.acceptanceRate || 'just a small percentage'}, the admissions committee looks beyond just grades and test scores, seeking candidates who demonstrate passion, leadership, and a unique perspective.</p>
                        <ul className="list-disc list-outside pl-5 text-gray-400 space-y-2 marker:text-[#F6520C]">
                            <li><strong>Academic Excellence:</strong> A strong academic record in a relevant field is the foundation of any application.</li>
                            <li><strong>Statement of Purpose (SOP):</strong> A compelling SOP that clearly articulates your motivations, research interests, and career goals is essential to stand out.</li>
                            <li><strong>Letters of Recommendation (LORs):</strong> Strong LORs from professors or supervisors who can vouch for your academic and research potential carry significant weight.</li>
                            <li><strong>Relevant Experience:</strong> Internships, research projects, or full-time work experience can significantly strengthen your profile, especially for professional Master's programs and MBAs.</li>
                        </ul>
                    </div>
                </section>

                <hr className="my-10 border-gray-700" />

                <section id="student-life" ref={studentLifeRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-6">Student Life & Community</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">Vibrant International Community</h4>
                            <p className="text-gray-400">
                                {university.name} boasts a diverse student body, with approximately <strong className="text-orange-300">{university.internationalStudents || 'many'} of students coming from outside {university.country}</strong>. This creates a rich multicultural environment, offering global perspectives both inside and outside the classroom.
                            </p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">Personalized Academic Attention</h4>
                            <p className="text-gray-400">
                                With a student-to-faculty ratio of <strong className="text-orange-300">{university.studentFacultyRatio || 'N/A'}</strong>, the university emphasizes personalized learning and direct access to world-class professors. This is particularly beneficial for graduate students engaging in research and specialized coursework.
                            </p>
                        </div>
                    </div>
                </section>
                
                <hr className="my-10 border-gray-700" />
                
                <section id="reviews" ref={reviewsRef} className="scroll-mt-24">
                     <h2 className="text-2xl font-semibold text-white mb-6">Community Discussions</h2>
                     <div className="space-y-6">
                        {relevantThreads.length > 0 ? (
                            relevantThreads.map(thread => {
                                const author = getUser(thread.authorId);
                                if (!author) return null;
                                return (
                                    <div key={thread.id} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <img src={generateAvatarUrl(author.avatarConfig)} alt={author.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-semibold text-white">{author.name}</p>
                                                <p className="text-xs text-gray-500">{thread.timestamp}</p>
                                            </div>
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">{thread.title}</h4>
                                        <p className="text-gray-400 text-sm line-clamp-3">
                                            {thread.content}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                                            <div className="text-sm text-gray-400">
                                                {thread.replies.length} {thread.replies.length === 1 ? 'Reply' : 'Replies'}
                                            </div>
                                            <button onClick={() => onThreadSelect(thread.id)} className="text-sm font-semibold text-[#F6520C] hover:text-orange-400 transition">
                                                Read full discussion &rarr;
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                                <p className="text-gray-400">No community discussions found about {university.name} yet.</p>
                                <button onClick={() => navigateTo('community-forums')} className="mt-4 text-sm font-semibold text-[#F6520C] hover:text-orange-400 transition">
                                    Be the first to start one!
                                </button>
                            </div>
                        )}
                        <div className="text-center mt-6">
                            <button onClick={() => navigateTo('community-forums')} className="bg-gray-700/50 text-gray-300 px-6 py-2 rounded-full hover:bg-gray-700 transition-colors duration-300">
                                Explore More in Forums
                            </button>
                        </div>
                     </div>
                </section>
                
                <hr className="my-10 border-gray-700" />
                
                <section id="faq" ref={faqRef} className="scroll-mt-24">
                    <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
                    <div>
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                title={faq.question}
                                isOpen={openFaqIndex === index}
                                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                            >
                                <p>{faq.answer}</p>
                            </AccordionItem>
                        ))}
                    </div>
                </section>
                
                <hr className="my-10 border-gray-700" />
                
                <div className="bg-gradient-to-r from-[#F6520C]/20 to-gray-800/30 p-8 rounded-lg text-center border border-[#F6520C]/50">
                    <h2 className="text-2xl font-bold text-white">Need Help Applying to {university.name}?</h2>
                    <p className="text-lg text-gray-400 mt-2 mb-6 max-w-2xl mx-auto">
                        Our expert counselors can provide personalized guidance on your application, SOP, and visa process to maximize your chances of success.
                    </p>
                    <button onClick={() => navigateTo('contact')} className="bg-[#F6520C] text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg transform hover:scale-105">
                        Get Free Counseling
                    </button>
                </div>
            </div>
            
            {/* Right Column: Sticky Key Facts & Nav */}
            <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                    <div className="hidden lg:block bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-4">Key Facts</h2>
                        <div className="grid grid-cols-2 gap-4">
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
                    <nav className="mt-8 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-3 px-2">On this page</h3>
                        <ul className="space-y-1">
                            {navLinks.map(link => (
                                <li key={link.id}>
                                    <a href={`#${link.id}`}
                                       className={`flex justify-between items-center px-3 py-2 text-sm rounded-md transition-all duration-200 border-l-4 ${activeSection === link.id ? 'bg-[#F6520C]/10 text-[#F6520C] font-semibold border-[#F6520C]' : 'text-gray-400 hover:text-white hover:bg-gray-700/50 border-transparent'}`}
                                    >
                                        {link.label}
                                        {typeof link.count !== 'undefined' && <span className={`text-xs px-2 py-0.5 rounded-full ${activeSection === link.id ? 'bg-[#F6520C]/30' : 'bg-gray-600'}`}>{link.count}</span>}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>

      </div>
    </section>
  );
};

export default UniversityDetail;