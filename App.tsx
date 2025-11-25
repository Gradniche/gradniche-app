
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
import BlogHighlights from './components/BlogHighlights';
import BlogsArchive from './components/BlogsArchive';
import BlogDetail from './components/BlogDetail';
import { blogPosts } from './data/blogs';


export type ShortlistItem = 
    | { type: 'university'; universityId: string; }
    | { type: 'program'; universityId: string; programId: string; };

type ToolID = 'course-comparison' | 'sop-analyzer' | 'visa-guides' | 'scholarship-finder' | 'community-forums' | 'cost-of-living-calculator' | 'pre-departure-checklists' | 'gpa-calculator' | 'f1-visa-prep';

const toolDetails: Record<ToolID, {name: string, description: string}> = {
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

const pageMetadata: Record<string, { title: string, description: string }> = {
    '/': { title: 'GradNiche | AI-Powered Study Abroad Platform', description: 'Plan your global education with GradNiche. Use AI tools, a university finder, and expert guides to find top destinations and achieve your study abroad dreams. ' },
    '/college-finder': { title: 'University Finder | Search & Compare Colleges | GradNiche', description: 'Find your perfect university. Search and compare thousands of global colleges by country, course, tuition, and QS ranking with GradNiche\'s advanced tool.' },
    '/shortlist': { title: 'My Shortlist | Compare Universities & Programs | GradNiche', description: 'Manage and compare shortlisted universities and programs. Make an informed decision for your future education abroad with GradNiche\'s comparison tools.' },
    '/about': { title: 'About GradNiche | Our Mission in Global Education', description: 'Learn about GradNiche, our mission, and the team dedicated to making global education accessible for all students through innovative technology and support.' },
    '/contact': { title: 'Contact Us | Study Abroad Guidance | GradNiche', description: 'Have questions about studying abroad? Get in touch with the GradNiche team. We\'re here to help you with applications, visas, and university selection.' },
    '/blogs': { title: 'GradNiche Insights | Study Abroad Blog', description: 'Explore the GradNiche blog for expert tips on university applications, visa interviews, scholarship hunting, and student life abroad. Your essential resource.' },
    '/terms-and-conditions': { title: 'Terms & Conditions | GradNiche', description: 'Read the terms and conditions for using the GradNiche platform and its services.' },
    '/disclaimer': { title: 'Disclaimer | GradNiche', description: 'Read the disclaimer for the use of GradNiche\'s platform, tools, and information.' },
    '/cookie-policy': { title: 'Cookie Policy | GradNiche', description: 'Understand how GradNiche uses cookies and similar technologies to enhance your experience on our platform.' },
    '/privacy-policy': { title: 'Privacy Policy | GradNiche', description: 'Learn about how GradNiche collects, uses, and protects your personal data when you use our services.' },
    '/destinations/usa': { title: 'Study in the USA | Top Universities & Visa Guide | GradNiche', description: 'Explore top universities, visa requirements, costs, and scholarships for studying in the USA. Your complete guide with GradNiche.' },
    '/destinations/uk': { title: 'Study in the UK | Top Universities & Visa Guide | GradNiche', description: 'Your guide to studying in the United Kingdom. Find universities, course information, and post-study work options with GradNiche.' },
    '/destinations/canada': { title: 'Study in Canada | Top Universities & Visa Guide | GradNiche', description: 'Discover the benefits of studying in Canada, from top universities to clear immigration pathways. Your complete guide with GradNiche.' },
    '/destinations/australia': { title: 'Study in Australia | Top Universities & Visa Guide | GradNiche', description: 'Learn about studying in Australia, known for world-class education and an incredible lifestyle. Your complete guide with GradNiche.' },
    '/destinations/germany': { title: 'Study in Germany | Top Universities & Visa Guide | GradNiche', description: 'Explore engineering excellence, low-cost education, and top research universities in Germany. Your complete guide with GradNiche.' },
    '/destinations/ireland': { title: 'Study in Ireland | Top Universities & Visa Guide | GradNiche', description: 'Your guide to studying in Europe\'s tech hub. Discover universities and post-study work opportunities in Ireland with GradNiche.' },
    '/destinations/uae': { title: 'Study in the UAE | Top Universities & Visa Guide | GradNiche', description: 'Learn about studying in a global business hub known for modern universities and an international outlook. Your complete guide with GradNiche.' },
    '/destinations/new-zealand': { title: 'Study in New Zealand | Top Universities & Guide | GradNiche', description: 'Discover a world-class education, stunning landscapes, and a high quality of life in New Zealand. Your complete guide with GradNiche.' },
    '/tools/course-comparison': { title: 'Course Comparison Tool | Compare Programs | GradNiche', description: 'Compare university courses side-by-side. Analyze tuition, duration, requirements, and more to find the perfect program for your study abroad journey.' },
    '/tools/sop-analyzer': { title: 'AI SOP Analyzer | Instant Essay Feedback | GradNiche', description: 'Improve your Statement of Purpose with our AI Analyzer. Get instant, data-driven feedback on clarity, storytelling, and impact to boost your application.' },
    '/tools/f1-visa-prep': { title: 'F1 Visa Interview Prep | AI Mock Interview | GradNiche', description: 'Practice for your US F-1 student visa interview with a realistic AI tool. Get confident with common questions, tips, and sample answers from GradNiche.' },
    '/tools/visa-guides': { title: 'Student Visa Guides | Application Help | GradNiche', description: 'Access detailed, step-by-step student visa application guides for top destinations like the USA, UK, Canada, and more. Prepare with GradNiche.' },
    '/tools/scholarship-finder': { title: 'Scholarship Finder | Fund Your Studies Abroad | GradNiche', description: 'Find funding for your education. Search our comprehensive database for international scholarships that match your profile, country, and field of study.' },
    '/tools/community-forums': { title: 'Community Forums | Study Abroad Discussions | GradNiche', description: 'Join the GradNiche community. Connect with fellow students, ask questions about applications and visas, and share your experiences studying abroad.' },
    '/tools/cost-of-living-calculator': { title: 'Cost of Living Calculator | Plan Your Budget | GradNiche', description: 'Estimate your monthly living expenses abroad. Compare costs for accommodation, food, and transport in major student cities to plan your study abroad budget.' },
    '/tools/pre-departure-checklists': { title: 'Pre-Departure Checklist | Study Abroad Prep | GradNiche', description: 'Stay organized before you fly. Use our interactive pre-departure checklist to manage your documents, finances, and packing for a smooth transition.' },
    '/tools/gpa-calculator': { title: 'GPA Calculator | Convert Your Grades to 4.0 Scale | GradNiche', description: 'Convert your Indian percentage or 10-point CGPA to the 4.0 scale used by international universities. Understand your academic standing with our easy tool.' },
};


const App: React.FC = () => {
  // Use Hash routing
  const [path, setPath] = useState(window.location.hash.substring(1) || '/');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shortlist, setShortlist] = useState<ShortlistItem[]>(() => {
    try {
        const saved = localStorage.getItem('gradniche-shortlist');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
  });

  const navigate = (to: string) => {
    window.location.hash = to;
    // Scroll to top is handled by the effect below or can be done here
  };

  useEffect(() => {
    const handleHashChange = () => {
        const currentPath = window.location.hash.substring(1) || '/';
        setPath(currentPath);
        window.scrollTo(0, 0);
    };

    // Handle initial load if there is a hash
    if (window.location.hash) {
        handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [users, setUsers] = useState<User[]>(forumUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(users[0]);

  const handleAddNotification = (recipientId: string, message: string, threadId: string) => {
    console.log(`Notification for ${recipientId}: ${message} (Thread: ${threadId})`);
  };

  const handleSaveShortlist = () => {
    try {
        localStorage.setItem('gradniche-shortlist', JSON.stringify(shortlist));
        alert('Your shortlist has been saved!');
    } catch (error) {
        console.error("Could not save shortlist to localStorage", error);
        alert('There was an error saving your shortlist.');
    }
  };


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

  const updateMetaTags = (title: string, description: string, imageUrl?: string, urlPath?: string) => {
    const defaultImage = 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto.format&fit=crop';
    const baseUrl = "https://gradniche.com";
    // For hash routing, canonical might just be the base, or we can append hash for specificity if crawlers support it.
    // Standard SEO prefers clean URLs, but for this SPA fix, we stick to functional meta updates.
    const canonicalUrl = `${baseUrl}/#${urlPath || ''}`;

    document.title = title;
    
    let descEl = document.querySelector('meta[name="description"]');
    if (!descEl) {
        descEl = document.createElement('meta');
        descEl.setAttribute('name', 'description');
        document.head.appendChild(descEl);
    }
    descEl.setAttribute('content', description);

    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', imageUrl || defaultImage);

    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', imageUrl || defaultImage);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);
};

  useEffect(() => {
    const pathOnly = path.split('?')[0];
    let title = pageMetadata['/']?.title || 'GradNiche';
    let description = pageMetadata['/']?.description || '';
    let imageUrl = undefined;
    
    const pathSegments = pathOnly.split('/').filter(Boolean);

    if (pathSegments[0] === 'college-finder' && pathSegments.length >= 2) {
        const university = universities.find(u => u.id === pathSegments[1]);
        if (university) {
            if (pathSegments.length === 3) {
                const program = university.programs.find(p => p.id === pathSegments[2]);
                if (program) {
                    title = `${program.name} at ${university.name} | GradNiche`;
                    description = `Learn about the ${program.name} program at ${university.name}. Explore tuition, requirements, and admission details with GradNiche.`;
                    imageUrl = university.logo;
                }
            } else {
                 title = `${university.name} | Programs & Rankings | GradNiche`;
                 description = `Explore ${university.name}. Find details on programs, QS ranking, tuition fees, and admission insights on GradNiche's university profile page.`;
                 imageUrl = university.logo;
            }
        }
    } else if (pathSegments[0] === 'blogs' && pathSegments.length === 2) {
        const blog = blogPosts.find(b => b.id === parseInt(pathSegments[1]));
        if (blog) {
            title = `${blog.title} | GradNiche Insights`;
            description = blog.excerpt;
            imageUrl = blog.image;
        }
    } else {
        const meta = pageMetadata[pathOnly];
        if (meta) {
            title = meta.title;
            description = meta.description;
        }
        if (pathOnly.startsWith('/destinations/')) {
          const countryKey = pathSegments[1];
          const destData = destinationData[countryKey as keyof typeof destinationData];
          if (destData) imageUrl = destData.heroImage;
        }
    }

    updateMetaTags(title, description, imageUrl, pathOnly);
  }, [path]);
  
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
        { threshold: 0.1 }
    );

    const elementsToAnimate = document.querySelectorAll('.scroll-animate');
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => {
        elementsToAnimate.forEach((el) => {
            if (el && document.body.contains(el)) {
                observer.unobserve(el);
            }
        });
    };
  }, [path]);


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
    navigate(`/tools/community-forums?thread=${threadId}`);
  };

  const renderMainContent = () => {
    const [pathOnly, queryString] = path.split('?');
    const pathSegments = pathOnly.split('/').filter(Boolean);
    const queryParams = new URLSearchParams(queryString || '');

    if (pathOnly === '/' || pathOnly === '') {
      return (
        <>
          <Hero navigate={navigate} />
          <div className="scroll-animate"><PlatformFeatures /></div>
          <div className="scroll-animate"><Destinations navigate={navigate} /></div>
          <div className="scroll-animate"><CoreTools navigate={navigate} /></div>
          <div className="scroll-animate"><Tools navigate={navigate} /></div>
          <div className="scroll-animate"><BlogHighlights navigate={navigate} /></div>
          <div className="scroll-animate"><CommunityHighlights navigate={navigate} /></div>
          <div className="scroll-animate"><F1VisaPrepFeature navigate={navigate} /></div>
        </>
      );
    }
    if (pathOnly === '/shortlist') {
        return <ShortlistPage 
            shortlist={shortlist} 
            onToggleShortlist={handleToggleShortlist}
            onBack={() => navigate('/')}
            onNavigateToUniversity={(uni) => navigate(`/college-finder/${uni.id}`)}
            onNavigateToProgram={(uni, prog) => navigate(`/college-finder/${uni.id}/${prog.id}`)}
            onSave={handleSaveShortlist}
        />;
    }
    if (pathOnly.startsWith('/college-finder')) {
        if (pathSegments.length === 3) {
            const university = universities.find(u => u.id === pathSegments[1]);
            const program = university?.programs.find(p => p.id === pathSegments[2]);
            if (university && program) {
                return <ProgramDetail 
                    program={program} 
                    university={university} 
                    onBack={() => navigate(`/college-finder/${university.id}`)} 
                    onNavigateToProgram={(uni, prog) => navigate(`/college-finder/${uni.id}/${prog.id}`)}
                />;
            }
        }
        if (pathSegments.length === 2) {
            const university = universities.find(u => u.id === pathSegments[1]);
            if (university) {
                return <UniversityDetail 
                    university={university} 
                    onProgramSelect={(prog) => navigate(`/college-finder/${university.id}/${prog.id}`)} 
                    onBack={() => navigate('/college-finder')}
                    shortlist={shortlist}
                    onToggleShortlist={handleToggleShortlist}
                    navigate={navigate}
                    onThreadSelect={handleThreadSelect}
                />;
            }
        }
        return <CollegeFinder 
            navigate={navigate} 
            shortlist={shortlist}
            onToggleShortlist={handleToggleShortlist}
        />;
    }
    if (pathOnly.startsWith('/destinations/')) {
        const countryKey = pathSegments[1];
        const countryData = destinationData[countryKey as keyof typeof destinationData];
        if (countryData) {
            return <DestinationDetail country={countryData} onBack={() => navigate('/')} navigate={navigate} />;
        }
    }
     if (pathOnly === '/about') {
        return <AboutPage onBack={() => navigate('/')} navigate={navigate} />;
    }
    if (pathOnly === '/contact') {
        return <ContactPage onBack={() => navigate('/')} />;
    }
     if (pathOnly === '/blogs') {
        return <BlogsArchive onBack={() => navigate('/')} navigate={navigate} />;
    }
    if (pathOnly.startsWith('/blogs/')) {
        const blogId = parseInt(pathSegments[1]);
        const blog = blogPosts.find(b => b.id === blogId);
        if (blog) {
            return <BlogDetail blog={blog} onBack={() => navigate('/blogs')} navigate={navigate} />;
        }
        return <BlogsArchive onBack={() => navigate('/')} navigate={navigate} />;
    }
    if (pathOnly === '/terms-and-conditions') {
        return <TermsAndConditions onBack={() => navigate('/')} />;
    }
    if (pathOnly === '/disclaimer') {
        return <DisclaimerPage onBack={() => navigate('/')} />;
    }
    if (pathOnly === '/cookie-policy') {
        return <CookiePolicy onBack={() => navigate('/')} />;
    }
     if (pathOnly === '/privacy-policy') {
        return <PrivacyPolicy onBack={() => navigate('/')} />;
    }
    if (pathOnly.startsWith('/tools/')) {
        const toolId = pathSegments[1] as ToolID;
        if (toolId === 'course-comparison') return <CourseComparison onBack={() => navigate('/')} navigate={navigate} />;
        if (toolId === 'gpa-calculator') return <GPACalculator onBack={() => navigate('/')} navigate={navigate} />;
        if (toolId === 'sop-analyzer') return <AISOPSnalyzer onBack={() => navigate('/')} />;
        if (toolId === 'f1-visa-prep') return <F1VisaPrep onBack={() => navigate('/')} />;
        if (toolId === 'visa-guides') return <VisaGuides onBack={() => navigate('/')} />;
        if (toolId === 'scholarship-finder') return <ScholarshipFinder onBack={() => navigate('/')} />;
        if (toolId === 'cost-of-living-calculator') return <CostOfLivingCalculator onBack={() => navigate('/')} />;
        if (toolId === 'pre-departure-checklists') return <PreDepartureChecklists onBack={() => navigate('/')} />;
        if (toolId === 'community-forums') {
            const threadId = queryParams.get('thread');
            return <CommunityForums 
                onBack={() => navigate('/')} 
                activeThreadId={threadId}
                onClearActiveThreadId={() => navigate('/tools/community-forums')}
                currentUser={currentUser}
                users={users}
                onAddNotification={handleAddNotification}
            />;
        }
        const tool = toolDetails[toolId];
        if (tool) {
            return <ToolsPage tool={tool} onBack={() => navigate('/')} />;
        }
    }

    // Fallback to home page for unknown routes
      return (
        <>
          <Hero navigate={navigate} />
          <div className="scroll-animate"><PlatformFeatures /></div>
          <div className="scroll-animate"><Destinations navigate={navigate} /></div>
          <div className="scroll-animate"><CoreTools navigate={navigate} /></div>
          <div className="scroll-animate"><Tools navigate={navigate} /></div>
          <div className="scroll-animate"><BlogHighlights navigate={navigate} /></div>
          <div className="scroll-animate"><CommunityHighlights navigate={navigate} /></div>
          <div className="scroll-animate"><F1VisaPrepFeature navigate={navigate} /></div>
        </>
      );
  }


  return (
    <div className="bg-[#0a101f] min-h-screen">
      <Header navigate={navigate} />
      <main>
        {renderMainContent()}
      </main>
      <Footer navigate={navigate} />
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
