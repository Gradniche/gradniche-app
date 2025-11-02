


import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PlatformFeatures from './components/PlatformFeatures';
import Destinations from './components/Destinations';
import CoreTools from './components/CoreTools';
import Tools from './components/Tools';
import AIDestinationFinder from './components/AIDestinationFinder';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import CollegeFinder from './components/CollegeFinder';
// FIX: Changed to a default import for UniversityDetail.
import UniversityDetail from './components/UniversityDetail';
import ProgramDetail from './components/ProgramDetail';
import DestinationDetail from './components/DestinationDetail';
import ToolsPage from './components/ToolsPage';
import GPACalculator from './components/GPACalculator';
import CourseComparison from './components/CourseComparison';
import AISOPSnalyzer from './components/AISOPSnalyzer';
import VisaGuides from './components/VisaGuides';
import ScholarshipFinder from './components/ScholarshipFinder';
import CommunityForums from './components/CommunityForums';
import CostOfLivingCalculator from './components/CostOfLivingCalculator';
import PreDepartureChecklists from './components/PreDepartureChecklists';
import FloatingChatButton from './components/FloatingChatButton';
import AIStudyAbroadAssistant from './components/AIStudyAbroadAssistant';
import AboutPage from './components/AboutPage';
import TermsAndConditions from './components/TermsAndConditions';
import DisclaimerPage from './components/DisclaimerPage';
import CookiePolicy from './components/CookiePolicy';
import PrivacyPolicy from './components/PrivacyPolicy';
import { University, Program, universities } from './data/universities';
import { destinationData } from './data/destinations';
import CommunityHighlights from './components/CommunityHighlights';
import ShortlistPage from './components/ShortlistPage';
import F1VisaPrep from './components/F1VisaPrep';
import F1VisaPrepFeature from './components/F1VisaPrepFeature';
import { User, users as forumUsers } from './data/forums';


export type ShortlistItem = 
    | { type: 'university'; universityId: string; }
    | { type: 'program'; universityId: string; programId: string; };


export type ToolPage = 'course-comparison' | 'sop-analyzer' | 'visa-guides' | 'scholarship-finder' | 'community-forums' | 'cost-of-living-calculator' | 'pre-departure-checklists' | 'gpa-calculator' | 'f1-visa-prep';
export type Page = 'home' | 'college-finder' | 'about' | 'destination-usa' | 'destination-uk' | 'destination-canada' | 'destination-australia' | 'destination-germany' | 'destination-ireland' | 'destination-uae' | 'destination-new-zealand' | 'contact' | 'terms-and-conditions' | 'disclaimer' | 'cookie-policy' | 'privacy-policy' | 'shortlist' | ToolPage;

const toolDetails: Record<ToolPage, {name: string, description: string}> = {
    'course-comparison': { name: 'Course Comparison', description: 'Compare courses from different universities side-by-side to find your perfect fit.' },
    'sop-analyzer': { name: 'AI SOP Analyzer', description: 'Get instant, data-driven feedback on your Statement of Purpose to boost your application.' },
    'visa-guides': { name: 'Visa Application Guides', description: 'Access step-by-step guides for student visa applications for top study destinations.' },
    'scholarship-finder': { name: 'Scholarship Finder', description: 'Search our comprehensive database to find scholarships that match your profile and needs.' },
    'community-forums': { name: 'Community Forums', description: 'Connect with fellow students, ask questions, and share experiences in our dedicated forums.' },
    'cost-of-living-calculator': { name: 'Cost of Living Calculator', description: 'Estimate your living expenses in different cities abroad to plan your budget effectively.' },
    'pre-departure-checklists': { name: 'Pre-Departure Checklists', description: 'Make sure you have everything in order before you fly with our interactive checklists.' },
    'gpa-calculator': { name: 'GPA Calculator', description: 'Convert your local grades into the 4.0 scale used by international universities.' },
    'f1-visa-prep': { name: 'F1 Visa Interview Prep', description: 'Practice for your F-1 visa interview with a realistic AI-powered mock interview.' },
};

const pageMetadata: Record<Page, { title: string, description: string }> = {
    'home': { title: 'GradNiche | AI-Powered Study Abroad Platform', description: 'Plan your global education with GradNiche. Use AI tools, a university finder, and expert guides to find top destinations and achieve your study abroad dreams.' },
    'college-finder': { title: 'University Finder | Search & Compare Colleges | GradNiche', description: 'Find your perfect university. Search and compare thousands of global colleges by country, course, tuition, and QS ranking with GradNiche\'s advanced tool.' },
    'shortlist': { title: 'My Shortlist | Compare Universities & Programs | GradNiche', description: 'Manage and compare shortlisted universities and programs. Make an informed decision for your future education abroad with GradNiche\'s comparison tools.' },
    'about': { title: 'About GradNiche | Our Mission in Global Education', description: 'Learn about GradNiche, our mission, and the team dedicated to making global education accessible for all students through innovative technology and support.' },
    'contact': { title: 'Contact Us | Study Abroad Guidance | GradNiche', description: 'Have questions about studying abroad? Get in touch with the GradNiche team. We\'re here to help you with applications, visas, and university selection.' },
    'terms-and-conditions': { title: 'Terms & Conditions | GradNiche', description: 'Read the terms and conditions for using the GradNiche platform and its services.' },
    'disclaimer': { title: 'Disclaimer | GradNiche', description: 'Read the disclaimer for the use of GradNiche\'s platform, tools, and information.' },
    'cookie-policy': { title: 'Cookie Policy | GradNiche', description: 'Understand how GradNiche uses cookies and similar technologies to enhance your experience on our platform.' },
    'privacy-policy': { title: 'Privacy Policy | GradNiche', description: 'Learn about how GradNiche collects, uses, and protects your personal data when you use our services.' },
    'destination-usa': { title: 'Study in the USA | Top Universities & Visa Guide | GradNiche', description: 'Explore top universities, visa requirements, costs, and scholarships for studying in the USA. Your complete guide to American education with GradNiche.' },
    'destination-uk': { title: 'Study in the UK | Top Universities & Visa Guide | GradNiche', description: 'Your guide to studying in the United Kingdom. Find universities, course information, and post-study work options with GradNiche.' },
    'destination-canada': { title: 'Study in Canada | Top Universities & Visa Guide | GradNiche', description: 'Discover the benefits of studying in Canada, from top universities to clear immigration pathways. Your complete guide with GradNiche.' },
    'destination-australia': { title: 'Study in Australia | Top Universities & Visa Guide | GradNiche', description: 'Learn about studying in Australia, known for world-class education and an incredible lifestyle. Your complete guide with GradNiche.' },
    'destination-germany': { title: 'Study in Germany | Top Universities & Visa Guide | GradNiche', description: 'Explore engineering excellence, low-cost education, and top research universities in Germany. Your complete guide with GradNiche.' },
    'destination-ireland': { title: 'Study in Ireland | Top Universities & Visa Guide | GradNiche', description: 'Your guide to studying in Europe\'s tech hub. Discover universities and post-study work opportunities in Ireland with GradNiche.' },
    'destination-uae': { title: 'Study in the UAE | Top Universities & Visa Guide | GradNiche', description: 'Learn about studying in a global business hub known for modern universities and an international outlook. Your complete guide with GradNiche.' },
    'destination-new-zealand': { title: 'Study in New Zealand | Top Universities & Guide | GradNiche', description: 'Discover a world-class education, stunning landscapes, and a high quality of life in New Zealand. Your complete guide with GradNiche.' },
    'course-comparison': { title: 'Course Comparison Tool | Compare Programs | GradNiche', description: 'Compare university courses side-by-side. Analyze tuition, duration, requirements, and more to find the perfect program for your study abroad journey.' },
    'sop-analyzer': { title: 'AI SOP Analyzer | Instant Essay Feedback | GradNiche', description: 'Improve your Statement of Purpose with our AI Analyzer. Get instant, data-driven feedback on clarity, storytelling, and impact to boost your application.' },
    'f1-visa-prep': { title: 'F1 Visa Interview Prep | AI Mock Interview | GradNiche', description: 'Practice for your US F-1 student visa interview with a realistic AI tool. Get confident with common questions, tips, and sample answers from GradNiche.' },
    'visa-guides': { title: 'Student Visa Guides | Application Help | GradNiche', description: 'Access detailed, step-by-step student visa application guides for top destinations like the USA, UK, Canada, and more. Prepare with GradNiche.' },
    'scholarship-finder': { title: 'Scholarship Finder | Fund Your Studies Abroad | GradNiche', description: 'Find funding for your education. Search our comprehensive database for international scholarships that match your profile, country, and field of study.' },
    'community-forums': { title: 'Community Forums | Study Abroad Discussions | GradNiche', description: 'Join the GradNiche community. Connect with fellow students, ask questions about applications and visas, and share your experiences studying abroad.' },
    'cost-of-living-calculator': { title: 'Cost of Living Calculator | Plan Your Budget | GradNiche', description: 'Estimate your monthly living expenses abroad. Compare costs for accommodation, food, and transport in major student cities to plan your study abroad budget.' },
    'pre-departure-checklists': { title: 'Pre-Departure Checklist | Study Abroad Prep | GradNiche', description: 'Stay organized before you fly. Use our interactive pre-departure checklist to manage your documents, finances, and packing for a smooth transition.' },
    'gpa-calculator': { title: 'GPA Calculator | Convert Your Grades to 4.0 Scale | GradNiche', description: 'Convert your Indian percentage or 10-point CGPA to the 4.0 scale used by international universities. Understand your academic standing with our easy tool.' },
};


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shortlist, setShortlist] = useState<ShortlistItem[]>(() => {
    try {
        const saved = localStorage.getItem('gradniche-shortlist');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
  });

  // FIX: Added mock user state management for CommunityForums props.
  const [users, setUsers] = useState<User[]>(forumUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(users[0]); // Mock login: Rohan Mehta is logged in

  const handleAddNotification = (recipientId: string, message: string, threadId: string) => {
    // This is a mock function. In a real app, it would update state or call an API.
    console.log(`Notification for ${recipientId}: ${message} (Thread: ${threadId})`);
  };

  useEffect(() => {
    try {
        localStorage.setItem('gradniche-shortlist', JSON.stringify(shortlist));
    } catch (error) {
        console.error("Could not save shortlist to localStorage", error);
    }
  }, [shortlist]);


  const aiContext = useMemo(() => {
    const platformInfo = "GradNiche is a comprehensive platform for students planning to study abroad. It offers tools like a University Finder, AI-powered SOP Analyzer, detailed Visa Guides, a Scholarship Finder, and Community Forums to help students make informed decisions.";
    
    const services = [
      'University & Course Selection',
      'Application Assistance',
      'SOP/LOR Guidance',
      'Visa Interview Preparation',
      'Scholarship Support',
      'Pre-Departure Briefing',
      'Education Loan Assistance',
      'Post-Arrival Support',
    ];

    const servicesInfo = `In addition to its digital tools, GradNiche also offers a suite of personalized services to guide students. These include: ${services.join(', ')}.`;

    const fullPlatformSummary = `${platformInfo} ${servicesInfo}`;

    const destinationDetails = Object.values(destinationData).map(destination => {
      let summary = `Destination: ${destination.name}\n`;
      summary += `Known for: ${destination.whyStudy.map(w => w.title).join(', ')}.\n`;
      summary += `Top Universities in ${destination.name}:\n`;

      destination.topUniversities.forEach(topUni => {
        const fullUniData = universities.find(u => u.name === topUni.name);
        if (fullUniData) {
          summary += `- ${fullUniData.name}: QS Ranking #${fullUniData.qsRanking || 'N/A'}. Popular Courses: ${fullUniData.popularCourses.slice(0, 3).join(', ')}. Avg. Tuition: $${fullUniData.avgTuition.toLocaleString()} USD/year.\n`;
        }
      });
      return summary;
    }).join('\n\n');

    return `This is a summary of the data available on the GradNiche platform:\n\n${fullPlatformSummary}\n\nDETAILED DESTINATION & UNIVERSITY INFORMATION:\n\n${destinationDetails}`;
  }, []);

  const updateMetaTags = (title: string, description: string, imageUrl?: string) => {
    const defaultImage = 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop';
    const url = "https://gradniche.com"; // Placeholder canonical URL

    document.title = title;
    
    // Standard description
    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
        descEl = document.createElement('meta');
        descEl.setAttribute('name', 'description');
        document.head.appendChild(descEl);
    }
    descEl.setAttribute('content', description);

    // Open Graph
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', imageUrl || defaultImage);

    // Twitter Card
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', imageUrl || defaultImage);

    // Canonical
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
};


  useEffect(() => {
    let title = pageMetadata.home.title;
    let description = pageMetadata.home.description;
    let imageUrl = undefined;

    if (selectedProgram && selectedUniversity) {
        title = `${selectedProgram.name} at ${selectedUniversity.name} | GradNiche`;
        description = `Learn about the ${selectedProgram.name} program at ${selectedUniversity.name}. Explore tuition, requirements, and admission details with GradNiche.`;
        imageUrl = selectedUniversity.logo;
    } else if (selectedUniversity) {
        title = `${selectedUniversity.name} | Programs & Rankings | GradNiche`;
        description = `Explore ${selectedUniversity.name}. Find details on programs, QS ranking, tuition fees, and admission insights on GradNiche's university profile page.`;
        imageUrl = selectedUniversity.logo;
    } else {
        const meta = pageMetadata[currentPage];
        if (meta) {
            title = meta.title;
            description = meta.description;
        }
        if (currentPage.startsWith('destination-')) {
          const countryKey = currentPage.replace('destination-', '');
          const destData = destinationData[countryKey as keyof typeof destinationData];
          if (destData) imageUrl = destData.heroImage;
        }
    }

    updateMetaTags(title, description, imageUrl);
  }, [currentPage, selectedUniversity, selectedProgram]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => {
        elementsToAnimate.forEach((el) => {
            // Check if el is still in the DOM before unobserving
            if (el && document.body.contains(el)) {
                observer.unobserve(el);
            }
        });
    };
  }, [currentPage, selectedUniversity, selectedProgram]);


  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setSelectedUniversity(null);
    setSelectedProgram(null);
    window.scrollTo(0, 0);
  };

  const handleToggleShortlist = (item: ShortlistItem) => {
      setShortlist(prev => {
          const isPresent = prev.some(i => 
              i.type === item.type && 
              i.universityId === item.universityId &&
              (i.type === 'program' ? i.programId === (item as any).programId : true)
          );

          if (isPresent) {
              return prev.filter(i => !(
                  i.type === item.type && 
                  i.universityId === item.universityId &&
                  (i.type === 'program' ? i.programId === (item as any).programId : true)
              ));
          } else {
              return [...prev, item];
          }
      });
  };

  const handleThreadSelect = (threadId: string) => {
    setActiveThreadId(threadId);
    navigateTo('community-forums');
  };

  const clearActiveThreadId = () => {
    setActiveThreadId(null);
  };

  const handleSelectUniversity = (university: University) => {
    setSelectedUniversity(university);
    window.scrollTo(0, 0);
  };

  const handleSelectProgram = (program: Program) => {
    setSelectedProgram(program);
    window.scrollTo(0, 0);
  };
  
  const handleNavigateToProgram = (university: University, program: Program) => {
    setSelectedUniversity(university);
    setSelectedProgram(program);
    setCurrentPage('college-finder');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    if (selectedProgram) {
      setSelectedProgram(null);
    } else if (selectedUniversity) {
      setSelectedUniversity(null);
    } else if (currentPage.startsWith('destination-')) {
        navigateTo('home');
    } else if (['about', 'contact', 'shortlist', 'terms-and-conditions', 'disclaimer', 'cookie-policy', 'privacy-policy'].includes(currentPage)) {
        navigateTo('home');
    } else if (Object.keys(toolDetails).includes(currentPage)) {
        navigateTo('home');
    }
  };
  
  const renderMainContent = () => {
    if (currentPage === 'home') {
      return (
        <>
          <Hero />
          <div className="scroll-animate"><PlatformFeatures /></div>
          <div className="scroll-animate"><Destinations navigateTo={navigateTo} /></div>
          <div className="scroll-animate"><CoreTools navigateTo={navigateTo} /></div>
          <div className="scroll-animate"><Tools navigateTo={navigateTo} /></div>
          <div className="scroll-animate"><CommunityHighlights navigateTo={navigateTo} /></div>
          <div className="scroll-animate"><F1VisaPrepFeature navigateTo={navigateTo} /></div>
        </>
      );
    }
    if (currentPage === 'shortlist') {
        return <ShortlistPage 
            shortlist={shortlist} 
            onToggleShortlist={handleToggleShortlist}
            onBack={handleBack}
            onNavigateToUniversity={(uni) => {
                setSelectedUniversity(uni);
                setCurrentPage('college-finder');
            }}
            onNavigateToProgram={handleNavigateToProgram}
        />;
    }
    if (currentPage === 'college-finder') {
      if (selectedProgram && selectedUniversity) {
        return <ProgramDetail 
                    program={selectedProgram} 
                    university={selectedUniversity} 
                    onBack={handleBack} 
                    onNavigateToProgram={handleNavigateToProgram}
                />;
      }
      if (selectedUniversity) {
        return <UniversityDetail 
                    university={selectedUniversity} 
                    onProgramSelect={handleSelectProgram} 
                    onBack={handleBack}
                    shortlist={shortlist}
                    onToggleShortlist={handleToggleShortlist}
                    navigateTo={navigateTo}
                    onThreadSelect={handleThreadSelect}
                />;
      }
      return <CollegeFinder 
                onUniversitySelect={handleSelectUniversity} 
                shortlist={shortlist}
                onToggleShortlist={handleToggleShortlist}
            />;
    }
    if (currentPage.startsWith('destination-')) {
        const countryKey = currentPage.replace('destination-', '') as keyof typeof destinationData;
        const countryData = destinationData[countryKey];
        return <DestinationDetail country={countryData} onBack={handleBack} navigateTo={navigateTo} />;
    }
     if (currentPage === 'about') {
        return <AboutPage onBack={handleBack} navigateTo={navigateTo} />;
    }
    if (currentPage === 'contact') {
        return <ContactPage onBack={handleBack} />;
    }
    if (currentPage === 'terms-and-conditions') {
        return <TermsAndConditions onBack={handleBack} />;
    }
    if (currentPage === 'disclaimer') {
        return <DisclaimerPage onBack={handleBack} />;
    }
    if (currentPage === 'cookie-policy') {
        return <CookiePolicy onBack={handleBack} />;
    }
     if (currentPage === 'privacy-policy') {
        return <PrivacyPolicy onBack={handleBack} />;
    }
    if (currentPage === 'course-comparison') {
        return <CourseComparison onBack={handleBack} navigateTo={navigateTo} />;
    }
    if (currentPage === 'gpa-calculator') {
        return <GPACalculator onBack={handleBack} navigateTo={navigateTo} />;
    }
    if (currentPage === 'sop-analyzer') {
        return <AISOPSnalyzer onBack={handleBack} />;
    }
    if (currentPage === 'f1-visa-prep') {
        return <F1VisaPrep onBack={handleBack} />;
    }
    if (currentPage === 'visa-guides') {
        return <VisaGuides onBack={handleBack} />;
    }
     if (currentPage === 'scholarship-finder') {
        return <ScholarshipFinder onBack={handleBack} />;
    }
    if (currentPage === 'cost-of-living-calculator') {
        return <CostOfLivingCalculator onBack={handleBack} />;
    }
    if (currentPage === 'pre-departure-checklists') {
        return <PreDepartureChecklists onBack={handleBack} />;
    }
    if (currentPage === 'community-forums') {
        return <CommunityForums 
            onBack={handleBack} 
            activeThreadId={activeThreadId}
            onClearActiveThreadId={clearActiveThreadId}
            // FIX: Pass missing props to CommunityForums component.
            currentUser={currentUser}
            users={users}
            onAddNotification={handleAddNotification}
        />;
    }
    if (Object.keys(toolDetails).includes(currentPage)) {
        const tool = toolDetails[currentPage as ToolPage];
        return <ToolsPage tool={tool} onBack={handleBack} />;
    }
    return null;
  }


  return (
    <div className="bg-[#0a101f] min-h-screen">
      <Header 
        navigateTo={navigateTo} 
      />
      <main>
        {renderMainContent()}
      </main>
      <Footer navigateTo={navigateTo} />
      <AIStudyAbroadAssistant 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        context={aiContext}
      />
      <FloatingChatButton onClick={() => setIsChatOpen(true)} />
    </div>
  );
};

export default App;