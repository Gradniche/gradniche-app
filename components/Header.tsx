
import React, { useState, useRef, useEffect } from 'react';
import { generateAvatarUrl, AvatarConfig } from '../data/forums';

interface DropdownChild {
  label: string;
  href?: string;
  description?: string;
  icon?: React.ReactElement;
  isDropdown?: boolean;
  name?: string;
  children?: DropdownChild[];
}

const usaAvatarConfig: AvatarConfig = { style: 'adventurer', options: { seed: 'gradniche-usa', hair: 'short01', eyes: 'variant01', skinColor: 'F5C6A0', hairColor: '4D4D4D', clothing: 'shirt', clothingColor: 'F6520C' } };
const canadaAvatarConfig: AvatarConfig = { style: 'adventurer', options: { seed: 'gradniche-canada-female', hair: 'long01', eyes: 'variant06', skinColor: 'E4A381', hairColor: 'A25900', clothing: 'hoodie', clothingColor: 'FF0000' } };
const ukAvatarConfig: AvatarConfig = { style: 'adventurer', options: { seed: 'gradniche-uk', hair: 'short02', eyes: 'variant02', skinColor: 'AF6E5A', hairColor: '282828', clothing: 'blazer', clothingColor: '00247D' } };
const australiaAvatarConfig: AvatarConfig = { style: 'adventurer', options: { seed: 'gradniche-australia-female', hair: 'long02', eyes: 'variant07', skinColor: 'C47D6A', hairColor: 'B86B25', clothing: 'crewNeck', clothingColor: 'FFCD00' } };
const germanyAvatarConfig: AvatarConfig = { style: 'adventurer', options: { seed: 'gradniche-germany', hair: 'short06', eyes: 'variant03', skinColor: 'D88C7A', hairColor: '2c1b18', clothing: 'blazer', clothingColor: '000000' } };
const irelandAvatarConfig: AvatarConfig = { style: 'adventurer', options: { seed: 'gradniche-ireland-female', hair: 'long06', eyes: 'variant11', skinColor: 'F5C6A0', hairColor: 'cb6820', clothing: 'crewNeck', clothingColor: '009A44' } };
const uaeAvatarConfig: AvatarConfig = { style: 'adventurer', options: { seed: 'gradniche-uae', hair: 'short08', eyes: 'variant12', skinColor: 'AF6E5A', hairColor: '000000', clothing: 'shirt', clothingColor: '000000', accessories: 'sunglasses', accessoriesProbability: 100 } };
const newZealandAvatarConfig: AvatarConfig = { style: 'adventurer', options: { seed: 'gradniche-nz-female', hair: 'long07', eyes: 'variant01', skinColor: 'E4A381', hairColor: '4D4D4D', clothing: 'blazer', clothingColor: '000000' } };


const navLinks: DropdownChild[] = [
  { 
    label: 'Destinations', 
    isDropdown: true, 
    name: 'destinations',
    children: [
      { label: 'USA', href: '/destinations/usa', icon: <img src={generateAvatarUrl(usaAvatarConfig)} alt="USA" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'Canada', href: '/destinations/canada', icon: <img src={generateAvatarUrl(canadaAvatarConfig)} alt="Canada" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'UK', href: '/destinations/uk', icon: <img src={generateAvatarUrl(ukAvatarConfig)} alt="UK" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'Australia', href: '/destinations/australia', icon: <img src={generateAvatarUrl(australiaAvatarConfig)} alt="Australia" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'Germany', href: '/destinations/germany', icon: <img src={generateAvatarUrl(germanyAvatarConfig)} alt="Germany" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'Ireland', href: '/destinations/ireland', icon: <img src={generateAvatarUrl(irelandAvatarConfig)} alt="Ireland" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'UAE', href: '/destinations/uae', icon: <img src={generateAvatarUrl(uaeAvatarConfig)} alt="UAE" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'New Zealand', href: '/destinations/new-zealand', icon: <img src={generateAvatarUrl(newZealandAvatarConfig)} alt="New Zealand" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
    ]
  },
  { href: '/college-finder', label: 'College Finder' },
  { href: '/shortlist', label: 'My Shortlist' },
  { href: '/blogs', label: 'Blog' },
  { 
    label: 'Resources', 
    isDropdown: true, 
    name: 'resources',
    children: [
      { label: 'Course Comparison', href: '/tools/course-comparison', description: 'Analyze courses side-by-side.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h5m-5 4h5m2-16l-4 4m0 0l-4-4m4 4V3" /></svg> },
      { label: 'AI SOP Analyzer', href: '/tools/sop-analyzer', description: 'Get instant feedback on your essay.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12l1.549-3.326a.5.5 0 00-.948-.442L12 11.549l-3.601-1.309a.5.5 0 00-.548.848L11.549 12l-1.309 3.601a.5.5 0 00.848.548L12 13.451l3.326 1.549a.5.5 0 00.442-.948L13.451 12z" /></svg> },
      { label: 'F1 Visa Interview Prep', href: '/tools/f1-visa-prep', description: 'Practice with an AI visa officer.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg> },
      { label: 'AI Destination Finder', href: '/#ai-finder', description: 'Let our AI suggest countries for you.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.343a9 9 0 0110.592 0m-12.592 0A9 9 0 009.296 2.343M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
      { label: 'Visa Application Guides', href: '/tools/visa-guides', description: 'Step-by-step visa assistance.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
      { label: 'Scholarship Finder', href: '/tools/scholarship-finder', description: 'Find funding for your studies.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 100-8 4 4 0 000 8z" /></svg> },
      { label: 'Community Forums', href: '/tools/community-forums', description: 'Connect with fellow students.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h4M9 12l2 2 4-4" /></svg> },
      { label: 'Cost of Living Calculator', href: '/tools/cost-of-living-calculator', description: 'Estimate your expenses abroad.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
      { label: 'Pre-Departure Checklists', href: '/tools/pre-departure-checklists', description: 'Stay organized before you fly.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
      { label: 'GPA Calculator', href: '/tools/gpa-calculator', description: 'Convert your grades to the 4.0 scale.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg> },
    ]
  },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

interface HeaderProps {
    navigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
      if (isMenuOpen) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = '';
      }
      return () => {
          document.body.style.overflow = '';
      };
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
    setOpenDropdown(null);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const renderDropdown = (link: DropdownChild) => {
    if (link.name === 'destinations') {
      return (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 transition-all ease-in-out duration-300 z-10 ${openDropdown === link.name ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
          <div className="bg-gray-800/[.95] backdrop-blur-xl rounded-lg shadow-2xl border border-[#F6520C]/30 p-2 overflow-hidden">
            {link.children?.map(child => (
              <a 
                key={child.label} 
                href={`#${child.href!}`}
                onClick={(e) => handleNavClick(e, child.href!)}
                className="group flex items-center gap-3 w-full p-3 rounded-md hover:bg-[#F6520C]/10 transition-colors text-left focus:outline-none focus-visible:bg-[#F6520C]/20"
              >
                <div className="h-8 w-8">{child.icon}</div>
                <p className="font-semibold text-white">{child.label}</p>
              </a>
            ))}
          </div>
        </div>
      );
    }
    if (link.name === 'resources') {
      return (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[40rem] transition-all ease-in-out duration-300 z-10 ${openDropdown === link.name ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
          <div className="bg-gray-800/[.95] backdrop-blur-xl rounded-lg shadow-2xl border border-[#F6520C]/30 p-6 overflow-hidden">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {link.children?.map(child => (
                <a
                  key={child.label}
                  href={`#${child.href!}`}
                  onClick={(e) => handleNavClick(e, child.href!)}
                  className="group flex items-start gap-4 p-3 rounded-md hover:bg-[#F6520C]/10 transition-colors text-left focus:outline-none focus-visible:bg-[#F6520C]/20"
                >
                  <div className="flex-shrink-0 bg-gray-700/50 p-3 rounded-lg text-[#F6520C] group-hover:bg-[#F6520C] group-hover:text-white transition-all">
                    {child.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{child.label}</p>
                    <p className="text-sm text-gray-400">{child.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const MobileNavLink: React.FC<{
    href: string;
    children: React.ReactNode;
  }> = ({ href, children }) => (
    <li>
      <a href={`#${href}`} onClick={(e) => handleNavClick(e, href)} className="flex justify-between items-center w-full p-4 text-white font-semibold text-left text-lg hover:bg-white/5 transition-colors rounded-lg">
        <span>{children}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </a>
    </li>
  );

  const MobileAccordion: React.FC<{
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
  }> = ({ title, children, isOpen, onToggle }) => (
    <li className="bg-white/5 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="flex justify-between items-center w-full p-4 text-white font-semibold text-left text-lg">
        <span>{title}</span>
        <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="pb-2 px-2">
            {children}
        </div>
      </div>
    </li>
  );

  return (
    <header className={`bg-[#0a101f]/95 md:bg-white/10 backdrop-blur-md sticky z-50 md:mx-6 md:rounded-xl transition-all duration-300 ${isScrolled ? 'top-0 md:top-2 shadow-2xl shadow-black/20' : 'top-0 md:top-4 shadow-lg'}`}>
      <div className={`container mx-auto px-4 md:px-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2 md:py-3' : 'py-3 md:py-4'}`}>
        <a href="#/" onClick={(e) => handleNavClick(e, '/')} className="text-2xl font-extrabold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C] rounded-sm">
          Grad<span className="text-[#F6520C]">Niche</span>
        </a>
        <nav className="hidden md:flex space-x-2 items-center" ref={navRef}>
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.isDropdown ? (
                <>
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name!)} 
                    className="text-gray-300 hover:text-white hover:bg-[#F6520C]/80 transition-all duration-300 font-medium flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C] rounded-full px-4 py-2"
                  >
                    {link.label}
                    <svg className={`w-4 h-4 ml-1 transition-transform ${openDropdown === link.name ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {renderDropdown(link)}
                </>
              ) : (
                <a href={`#${link.href!}`} onClick={(e) => handleNavClick(e, link.href!)} className="text-gray-300 hover:text-white hover:bg-[#F6520C]/80 transition-all duration-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C] rounded-full px-4 py-2">
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C] rounded-md p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900/90 backdrop-blur-xl z-60 animate-slide-in-right">
            <div className="flex justify-between items-center p-4">
                 <span className="text-2xl font-extrabold text-white">Grad<span className="text-[#F6520C]">Niche</span></span>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors z-70"
                    aria-label="Close menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-4 h-[calc(100vh-64px)] overflow-y-auto modern-scrollbar">
                <ul className="space-y-2">
                    {navLinks.filter(l => !l.isDropdown).map(link => (
                        <MobileNavLink key={link.label} href={link.href!}>
                            {link.label}
                        </MobileNavLink>
                    ))}
                    <MobileAccordion title="Destinations" isOpen={mobileNavOpen === 'destinations'} onToggle={() => setMobileNavOpen(p => p === 'destinations' ? null : 'destinations')}>
                        <div className="grid grid-cols-2 gap-2 p-2">
                            {navLinks.find(l => l.name === 'destinations')?.children?.map(child => (
                                <a key={child.label} href={`#${child.href!}`} onClick={(e) => handleNavClick(e, child.href!)} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 text-center hover:bg-white/10 transition-colors">
                                    <div className="w-16 h-16">{child.icon}</div>
                                    <span className="text-sm font-semibold text-gray-300">{child.label}</span>
                                </a>
                            ))}
                        </div>
                    </MobileAccordion>
                    <MobileAccordion title="Resources" isOpen={mobileNavOpen === 'resources'} onToggle={() => setMobileNavOpen(p => p === 'resources' ? null : 'resources')}>
                        <ul className="space-y-1 p-2">
                             {navLinks.find(l => l.name === 'resources')?.children?.map(child => (
                                <li key={child.label}>
                                     <a href={`#${child.href!}`} onClick={(e) => handleNavClick(e, child.href!)} className="flex items-center gap-4 p-3 rounded-lg text-left hover:bg-white/10 transition-colors w-full">
                                        <div className="text-[#F6520C] flex-shrink-0 w-6 h-6">{child.icon}</div>
                                        <div>
                                            <p className="font-semibold text-white">{child.label}</p>
                                            <p className="text-xs text-gray-400">{child.description}</p>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </MobileAccordion>
                </ul>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
