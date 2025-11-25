
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
      { label: 'USA', href: '/destinations/usa', icon: <img src={generateAvatarUrl(usaAvatarConfig)} alt="USA" className="h-full w-full rounded-full object-cover" /> },
      { label: 'Canada', href: '/destinations/canada', icon: <img src={generateAvatarUrl(canadaAvatarConfig)} alt="Canada" className="h-full w-full rounded-full object-cover" /> },
      { label: 'UK', href: '/destinations/uk', icon: <img src={generateAvatarUrl(ukAvatarConfig)} alt="UK" className="h-full w-full rounded-full object-cover" /> },
      { label: 'Australia', href: '/destinations/australia', icon: <img src={generateAvatarUrl(australiaAvatarConfig)} alt="Australia" className="h-full w-full rounded-full object-cover" /> },
      { label: 'Germany', href: '/destinations/germany', icon: <img src={generateAvatarUrl(germanyAvatarConfig)} alt="Germany" className="h-full w-full rounded-full object-cover" /> },
      { label: 'Ireland', href: '/destinations/ireland', icon: <img src={generateAvatarUrl(irelandAvatarConfig)} alt="Ireland" className="h-full w-full rounded-full object-cover" /> },
      { label: 'UAE', href: '/destinations/uae', icon: <img src={generateAvatarUrl(uaeAvatarConfig)} alt="UAE" className="h-full w-full rounded-full object-cover" /> },
      { label: 'New Zealand', href: '/destinations/new-zealand', icon: <img src={generateAvatarUrl(newZealandAvatarConfig)} alt="New Zealand" className="h-full w-full rounded-full object-cover" /> },
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
      { 
        label: 'Course Comparison', 
        href: '/tools/course-comparison', 
        description: 'Side-by-side analysis.', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3V6a2 2 0 0 1 2-2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 10v4" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 14h-2" strokeLinecap="round" strokeLinejoin="round"/></svg> 
      },
      { 
        label: 'AI SOP Analyzer', 
        href: '/tools/sop-analyzer', 
        description: 'Instant essay feedback.', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 13H8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 17H8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 9H8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="18" cy="18" r="3" className="text-white/50" fill="currentColor" fillOpacity="0.2" stroke="none"/></svg> 
      },
      { 
        label: 'F1 Visa Prep', 
        href: '/tools/f1-visa-prep', 
        description: 'AI Mock Interviews.', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8v8" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12h8" strokeLinecap="round" strokeLinejoin="round"/></svg> 
      },
      { 
        label: 'Visa Guides', 
        href: '/tools/visa-guides', 
        description: 'Step-by-step procedures.', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12h20" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 12V7a3 3 0 0 0-6 0v5" strokeLinecap="round" strokeLinejoin="round"/></svg> 
      },
      { 
        label: 'Scholarship Finder', 
        href: '/tools/scholarship-finder', 
        description: 'Find global funding.', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="7" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" strokeLinecap="round" strokeLinejoin="round"/></svg> 
      },
      { 
        label: 'Community Forums', 
        href: '/tools/community-forums', 
        description: 'Connect with peers.', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round"/></svg> 
      },
      { 
        label: 'Living Costs', 
        href: '/tools/cost-of-living-calculator', 
        description: 'Budget estimator.', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18V6" strokeLinecap="round" strokeLinejoin="round"/></svg> 
      },
      { 
        label: 'Pre-Departure', 
        href: '/tools/pre-departure-checklists', 
        description: 'Interactive checklists.', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg> 
      },
      { 
        label: 'GPA Calculator', 
        href: '/tools/gpa-calculator', 
        description: 'Grade conversion.', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12h4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 12h4" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 12v-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 12v4" strokeLinecap="round" strokeLinejoin="round"/></svg> 
      },
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
    const topClass = isScrolled ? 'top-[70px]' : 'top-[85px]';

    if (link.name === 'destinations') {
      return (
        <div className={`fixed ${topClass} left-0 right-0 mx-auto w-[95vw] max-w-[600px] transition-all ease-out duration-300 z-50 ${openDropdown === link.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
            <div className="bg-[#050a14] rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.7)] border border-white/10 p-5 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none rounded-3xl"></div>
                
                <div className="grid grid-cols-2 gap-3 relative z-10">
                    {link.children?.map(child => (
                    <a 
                        key={child.label} 
                        href={`#${child.href!}`}
                        onClick={(e) => handleNavClick(e, child.href!)}
                        className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 relative overflow-hidden"
                    >
                        <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/10 group-hover:ring-[#F6520C] group-hover:shadow-[0_0_15px_rgba(246,82,12,0.4)] transition-all duration-300">
                            {child.icon}
                        </div>
                        <span className="font-semibold text-gray-300 group-hover:text-white transition-colors">{child.label}</span>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F6520C] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                    ))}
                </div>
            </div>
        </div>
      );
    }
    if (link.name === 'resources') {
      return (
        <div className={`fixed ${topClass} left-0 right-0 mx-auto w-[95vw] max-w-[900px] transition-all ease-out duration-300 z-50 ${openDropdown === link.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
          <div className="bg-[#050a14] rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10 p-6 relative">
             <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#F6520C]/10 rounded-full blur-3xl -z-10"></div>
             <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              {link.children?.map((child, index) => {
                 const gradients = [
                    'from-blue-600 to-cyan-400', 
                    'from-violet-600 to-fuchsia-400',
                    'from-orange-500 to-red-500',
                    'from-emerald-500 to-teal-400',
                    'from-pink-500 to-rose-500',
                    'from-amber-400 to-orange-500',
                    'from-indigo-500 to-blue-500',
                    'from-green-500 to-emerald-600',
                    'from-red-500 to-pink-600',
                 ];
                 const gradient = gradients[index % gradients.length];

                 return (
                    <a
                    key={child.label}
                    href={`#${child.href!}`}
                    onClick={(e) => handleNavClick(e, child.href!)}
                    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 relative overflow-hidden"
                    >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center border border-white/5 group-hover:border-transparent transition-all duration-300 relative overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300">
                             {child.icon && React.isValidElement(child.icon) ? React.cloneElement(child.icon as React.ReactElement, { className: "w-6 h-6" }) : null}
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-gray-200 group-hover:text-white transition-colors mb-0.5 text-sm">
                            {child.label}
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors leading-tight">{child.description}</p>
                    </div>
                    </a>
              )})}
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
      <a href={`#${href}`} onClick={(e) => handleNavClick(e, href)} className="flex justify-between items-center w-full p-5 text-white font-bold text-lg bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all shadow-sm active:scale-95">
        <span>{children}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </a>
    </li>
  );

  const MobileAccordion: React.FC<{
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
  }> = ({ title, children, isOpen, onToggle }) => (
    <li className="bg-[#050a14]/50 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
      <button onClick={onToggle} className="flex justify-between items-center w-full p-5 text-white font-bold text-lg hover:bg-white/5 transition-colors">
        <span>{title}</span>
        <svg className={`w-6 h-6 text-[#F6520C] transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
        <div className="px-2">
            {children}
        </div>
      </div>
    </li>
  );

  return (
    <header className={`bg-[#0a101f]/95 md:bg-white/5 backdrop-blur-xl sticky z-50 md:mx-6 md:rounded-2xl transition-all duration-300 ${isScrolled ? 'top-0 md:top-3 shadow-2xl shadow-black/40 border-b md:border border-white/10' : 'top-0 md:top-6 shadow-lg border-b md:border border-white/5'}`}>
      <div className={`container mx-auto px-4 md:px-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-3 md:py-3' : 'py-4 md:py-4'}`}>
        <a href="#/" onClick={(e) => handleNavClick(e, '/')} className="text-2xl font-extrabold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C] rounded-sm tracking-tight relative z-[110]">
          Grad<span className="text-[#F6520C]">Niche</span>
        </a>
        
        <nav className="hidden md:flex space-x-1 items-center" ref={navRef}>
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.isDropdown ? (
                <>
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name!)} 
                    className={`text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C] rounded-full px-5 py-2 ${openDropdown === link.name ? 'bg-white/10 text-white' : ''}`}
                  >
                    {link.label}
                    <svg className={`w-4 h-4 ml-1.5 transition-transform duration-300 ${openDropdown === link.name ? 'transform rotate-180 text-[#F6520C]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {renderDropdown(link)}
                </>
              ) : (
                <a href={`#${link.href!}`} onClick={(e) => handleNavClick(e, link.href!)} className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C] rounded-full px-5 py-2">
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        <div className="md:hidden relative z-[110]">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 focus:outline-none p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col w-screen h-screen overflow-hidden md:hidden">
            <div className="absolute inset-0 pointer-events-none">
               <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
               <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F6520C]/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="h-[80px] flex-none w-full bg-[#020617]/95 backdrop-blur-md border-b border-white/5"></div>

            <div className="flex-1 overflow-y-auto px-6 py-8 pb-24 w-full">
                <ul className="space-y-4">
                    {navLinks.filter(l => !l.isDropdown).map(link => (
                        <MobileNavLink key={link.label} href={link.href!}>
                            {link.label}
                        </MobileNavLink>
                    ))}
                    
                    <MobileAccordion title="Destinations" isOpen={mobileNavOpen === 'destinations'} onToggle={() => setMobileNavOpen(p => p === 'destinations' ? null : 'destinations')}>
                        <div className="grid grid-cols-2 gap-4 p-2">
                            {navLinks.find(l => l.name === 'destinations')?.children?.map(child => (
                                <a key={child.label} href={`#${child.href!}`} onClick={(e) => handleNavClick(e, child.href!)} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-center hover:bg-white/10 hover:border-white/20 transition-all active:scale-95">
                                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/10 shadow-md">
                                        {child.icon}
                                    </div>
                                    <span className="text-sm font-bold text-gray-300">{child.label}</span>
                                </a>
                            ))}
                        </div>
                    </MobileAccordion>
                    
                    <MobileAccordion title="Resources" isOpen={mobileNavOpen === 'resources'} onToggle={() => setMobileNavOpen(p => p === 'resources' ? null : 'resources')}>
                        <ul className="space-y-3 p-2">
                             {navLinks.find(l => l.name === 'resources')?.children?.map((child, index) => {
                                 const gradients = [
                                    'from-blue-600 to-cyan-400', 
                                    'from-violet-600 to-fuchsia-400',
                                    'from-orange-500 to-red-500',
                                    'from-emerald-500 to-teal-400',
                                    'from-pink-500 to-rose-500',
                                    'from-amber-400 to-orange-500',
                                 ];
                                 const gradient = gradients[index % gradients.length];
                                 return (
                                <li key={child.label}>
                                     <a href={`#${child.href!}`} onClick={(e) => handleNavClick(e, child.href!)} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all w-full group active:scale-95">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center relative overflow-hidden`}>
                                            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                                            <div className="relative z-10 text-gray-300 group-hover:text-white">
                                                {child.icon && React.isValidElement(child.icon) ? React.cloneElement(child.icon as React.ReactElement, { className: "w-5 h-5" }) : null}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-base">{child.label}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{child.description}</p>
                                        </div>
                                    </a>
                                </li>
                            )})}
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
