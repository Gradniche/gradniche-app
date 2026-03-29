
import React, { useState, useRef, useEffect } from 'react';
import { FileText, GraduationCap, Map, Wallet, PlaneTakeoff, Calculator, PenTool } from 'lucide-react';

interface DropdownChild {
  label: string;
  href?: string;
  description?: string;
  icon?: React.ReactElement;
  color?: string;
  isDropdown?: boolean;
  name?: string;
  children?: DropdownChild[];
}

const getDestinationIcon = (code: string, flagCode: string) => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-xl">
    <img 
      src={`https://flagcdn.com/w320/${flagCode}.png`} 
      alt={`${code} flag`} 
      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
    <span className="absolute bottom-1 right-1.5 text-white font-bold text-[10px] tracking-wider drop-shadow-md">{code}</span>
  </div>
);

const navLinks: DropdownChild[] = [
  { 
    label: 'Destinations', 
    isDropdown: true, 
    name: 'destinations',
    children: [
      { label: 'United States', href: '/destinations/usa', description: 'Ivy League & Tech Hubs', icon: getDestinationIcon('US', 'us'), color: 'from-blue-500 to-indigo-500' },
      { label: 'Canada', href: '/destinations/canada', description: 'Welcoming & High-Tech', icon: getDestinationIcon('CA', 'ca'), color: 'from-purple-500 to-rose-500' },
      { label: 'United Kingdom', href: '/destinations/uk', description: 'Historic Excellence', icon: getDestinationIcon('UK', 'gb'), color: 'from-blue-600 to-purple-500' },
      { label: 'Australia', href: '/destinations/australia', description: 'Innovation & Lifestyle', icon: getDestinationIcon('AU', 'au'), color: 'from-sky-500 to-blue-600' },
      { label: 'Germany', href: '/destinations/germany', description: 'Engineering Powerhouse', icon: getDestinationIcon('DE', 'de'), color: 'from-amber-500 to-purple-500' },
      { label: 'Ireland', href: '/destinations/ireland', description: 'Europe\'s Silicon Valley', icon: getDestinationIcon('IE', 'ie'), color: 'from-emerald-500 to-green-600' },
      { label: 'UAE', href: '/destinations/uae', description: 'Modern & Fast-Growing', icon: getDestinationIcon('AE', 'ae'), color: 'from-teal-500 to-emerald-500' },
      { label: 'New Zealand', href: '/destinations/new-zealand', description: 'Research & Nature', icon: getDestinationIcon('NZ', 'nz'), color: 'from-blue-400 to-indigo-500' },
    ]
  },
  { href: '/college-finder', label: 'College Finder' },
  { href: '/tools/scholarship-finder', label: 'Scholarship Finder' },
  { href: '/blogs', label: 'Blog' },
  { 
    label: 'Resources', 
    isDropdown: true, 
    name: 'resources',
    children: [
      { 
        label: 'Premium SOP Generator', 
        href: '/tools/sop-generator', 
        description: 'Counselor-grade essays.', 
        icon: <PenTool />,
        color: 'from-blue-500 to-purple-500'
      },
      { 
        label: 'AI SOP Analyzer', 
        href: '/tools/sop-analyzer', 
        description: 'Instant essay feedback.', 
        icon: <FileText />,
        color: 'from-blue-500 to-cyan-400'
      },
      { 
        label: 'F1 Visa Prep', 
        href: '/tools/f1-visa-prep', 
        description: 'AI Mock Interviews.', 
        icon: <GraduationCap />,
        color: 'from-purple-500 to-pink-500'
      },
      { 
        label: 'Visa Guides', 
        href: '/tools/visa-guides', 
        description: 'Step-by-step procedures.', 
        icon: <Map />,
        color: 'from-emerald-500 to-teal-400'
      },
      { 
        label: 'Living Costs', 
        href: '/tools/cost-of-living-calculator', 
        description: 'Budget estimator.', 
        icon: <Wallet />,
        color: 'from-amber-500 to-blue-400'
      },
      { 
        label: 'Pre-Departure', 
        href: '/tools/pre-departure-checklists', 
        description: 'Interactive checklists.', 
        icon: <PlaneTakeoff />,
        color: 'from-indigo-500 to-blue-500'
      },
      { 
        label: 'GPA Calculator', 
        href: '/tools/gpa-calculator', 
        description: 'Grade conversion.', 
        icon: <Calculator />,
        color: 'from-rose-500 to-purple-400'
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
        <div className={`fixed ${topClass} left-0 right-0 mx-auto w-[95vw] max-w-[800px] transition-all ease-out duration-300 z-50 ${openDropdown === link.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
          <div className="bg-black/95 backdrop-blur-xl rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.7)] border border-white/10 p-2 relative overflow-hidden flex flex-col md:flex-row">
             <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
             <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

             {/* Left Sidebar - Featured */}
             <div className="w-full md:w-[280px] bg-white/[0.02] rounded-2xl p-6 border border-white/5 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50"></div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center border border-blue-500/20 mb-5 text-blue-400">
                        <Map className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Study in USA</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Home to Ivy League institutions and tech hubs. Discover top universities, scholarships, and visa guides for the United States.
                    </p>
                </div>
                <div className="mt-8 relative z-10">
                    <a href="/destinations/usa" onClick={(e) => handleNavClick(e, '/destinations/usa')} className="flex items-center justify-between w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white text-sm font-medium transition-all group/btn">
                        Explore USA
                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>
             </div>

             {/* Right Content - Grid */}
             <div className="flex-1 p-4 md:p-6">
                <div className="mb-4 px-2 flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Global Destinations</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                  {link.children?.filter(c => c.label !== 'United States').map((child) => (
                    <a
                        key={child.label}
                        href={child.href!}
                        onClick={(e) => handleNavClick(e, child.href!)}
                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200"
                    >
                        <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${child.color || 'from-white/10 to-white/5'} p-[1px] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                            <div className="w-full h-full bg-black/90 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden relative">
                                {child.icon && React.isValidElement(child.icon) && child.icon.type === 'div' ? (
                                    child.icon
                                ) : (
                                    <div className={`relative z-10 text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110`}>
                                        {child.icon && React.isValidElement(child.icon) ? React.cloneElement(child.icon as React.ReactElement<any>, { className: "w-5 h-5", strokeWidth: 2 }) : null}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-200 group-hover:text-white transition-colors text-sm">
                                {child.label}
                            </p>
                            <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors line-clamp-1 mt-0.5">
                                {child.description}
                            </p>
                        </div>
                    </a>
                  ))}
                </div>
             </div>
          </div>
        </div>
      );
    }
    if (link.name === 'resources') {
      return (
        <div className={`fixed ${topClass} left-0 right-0 mx-auto w-[95vw] max-w-[800px] transition-all ease-out duration-300 z-50 ${openDropdown === link.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
          <div className="bg-black/95 backdrop-blur-xl rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.7)] border border-white/10 p-2 relative overflow-hidden flex flex-col md:flex-row">
             <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
             <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

             {/* Left Sidebar - Featured */}
             <div className="w-full md:w-[280px] bg-white/[0.02] rounded-2xl p-6 border border-white/5 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
                <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 flex items-center justify-center border border-blue-500/20 mb-5 text-blue-500">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 13H8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 17H8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 9H8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="18" cy="18" r="3" className="text-blue-500/50" fill="currentColor" fillOpacity="0.2" stroke="none"/></svg>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">AI SOP Analyzer</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Get instant, AI-driven feedback on your Statement of Purpose. Improve structure, tone, and maximize your admission chances.
                    </p>
                </div>
                <div className="mt-8">
                    <a href="/tools/sop-analyzer" onClick={(e) => handleNavClick(e, '/tools/sop-analyzer')} className="flex items-center justify-between w-full px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white text-sm font-medium transition-all group/btn">
                        Try it for free
                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>
             </div>

             {/* Right Content - Grid */}
             <div className="flex-1 p-4 md:p-6">
                <div className="mb-4 px-2 flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">More Tools & Resources</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                  {link.children?.filter(c => c.label !== 'AI SOP Analyzer').map((child) => (
                    <a
                        key={child.label}
                        href={child.href!}
                        onClick={(e) => handleNavClick(e, child.href!)}
                        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200"
                    >
                        <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${child.color || 'from-white/10 to-white/5'} p-[1px] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                            <div className="w-full h-full bg-black/90 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden relative">
                                <div className={`relative z-10 text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110`}>
                                    {child.icon && React.isValidElement(child.icon) ? React.cloneElement(child.icon as React.ReactElement<any>, { className: "w-5 h-5", strokeWidth: 2 }) : null}
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-200 group-hover:text-white transition-colors text-sm">
                                {child.label}
                            </p>
                            <p className="text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors line-clamp-1 mt-0.5">
                                {child.description}
                            </p>
                        </div>
                    </a>
                  ))}
                </div>
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
      <a href={href} onClick={(e) => handleNavClick(e, href)} className="flex justify-between items-center w-full p-5 text-white font-bold text-lg bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all shadow-sm active:scale-95">
        <span>{children}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </a>
    </li>
  );

  const MobileAccordion: React.FC<{
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
  }> = ({ title, children, isOpen, onToggle }) => (
    <li className="bg-black/40 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
      <button onClick={onToggle} className="flex justify-between items-center w-full p-5 text-white font-bold text-lg hover:bg-white/5 transition-colors">
        <span>{title}</span>
        <svg className={`w-6 h-6 text-blue-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
        <div className="px-2">
            {children}
        </div>
      </div>
    </li>
  );

  return (
    <header className={`bg-black/80 backdrop-blur-xl sticky z-50 md:mx-6 md:rounded-3xl transition-all duration-300 ${isScrolled ? 'top-0 md:top-4 shadow-[0_8px_30px_rgb(0,0,0,0.5)] border-b md:border border-white/10' : 'top-0 md:top-6 shadow-lg border-b md:border border-white/5'}`}>
      <div className={`container mx-auto px-6 md:px-8 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-3 md:py-3' : 'py-5 md:py-5'}`}>
        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="text-2xl font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm tracking-tight relative z-[110]">
          Grad<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Niche</span>
        </a>
        
        <nav className="hidden md:flex space-x-1 items-center" ref={navRef}>
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.isDropdown ? (
                <>
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name!)} 
                    className={`text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 font-medium flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full px-5 py-2.5 text-sm tracking-wide ${openDropdown === link.name ? 'bg-white/10 text-white shadow-inner' : ''}`}
                  >
                    {link.label}
                    <svg className={`w-4 h-4 ml-1.5 transition-transform duration-300 ${openDropdown === link.name ? 'transform rotate-180 text-blue-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {renderDropdown(link)}
                </>
              ) : (
                <a href={link.href!} onClick={(e) => handleNavClick(e, link.href!)} className="text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full px-5 py-2.5 text-sm tracking-wide">
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        <div className="md:hidden relative z-[110]">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 focus:outline-none p-2 hover:bg-white/5 rounded-full transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col w-screen h-screen overflow-hidden md:hidden">
            <div className="absolute inset-0 pointer-events-none">
               <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px]"></div>
               <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="h-[80px] flex-none w-full bg-black/95 backdrop-blur-md border-b border-white/5"></div>

            <div className="flex-1 overflow-y-auto px-6 py-8 pb-24 w-full modern-scrollbar">
                <ul className="space-y-4">
                    {navLinks.filter(l => !l.isDropdown).map(link => (
                        <MobileNavLink key={link.label} href={link.href!}>
                            {link.label}
                        </MobileNavLink>
                    ))}
                    
                    <MobileAccordion title="Destinations" isOpen={mobileNavOpen === 'destinations'} onToggle={() => setMobileNavOpen(p => p === 'destinations' ? null : 'destinations')}>
                        <ul className="space-y-3 p-2">
                             {navLinks.find(l => l.name === 'destinations')?.children?.map((child) => (
                                <li key={child.label}>
                                     <a href={child.href!} onClick={(e) => handleNavClick(e, child.href!)} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all w-full group active:scale-95">
                                        <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${child.color || 'from-white/10 to-white/5'} p-[1px] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300`}>
                                            <div className="w-full h-full bg-black/90 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden relative">
                                                {child.icon && React.isValidElement(child.icon) && child.icon.type === 'div' ? (
                                                    child.icon
                                                ) : (
                                                    <div className={`relative z-10 text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110`}>
                                                        {child.icon && React.isValidElement(child.icon) ? React.cloneElement(child.icon as React.ReactElement<any>, { className: "w-5 h-5", strokeWidth: 2 }) : null}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-base">{child.label}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 font-light">{child.description}</p>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </MobileAccordion>
                    
                    <MobileAccordion title="Resources" isOpen={mobileNavOpen === 'resources'} onToggle={() => setMobileNavOpen(p => p === 'resources' ? null : 'resources')}>
                        <ul className="space-y-3 p-2">
                             {navLinks.find(l => l.name === 'resources')?.children?.map((child) => (
                                <li key={child.label}>
                                     <a href={child.href!} onClick={(e) => handleNavClick(e, child.href!)} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all w-full group active:scale-95">
                                        <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${child.color || 'from-white/10 to-white/5'} p-[1px] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300`}>
                                            <div className="w-full h-full bg-black/90 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden relative">
                                                <div className={`relative z-10 text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110`}>
                                                    {child.icon && React.isValidElement(child.icon) ? React.cloneElement(child.icon as React.ReactElement<any>, { className: "w-5 h-5", strokeWidth: 2 }) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-base group-hover:text-blue-500 transition-colors">{child.label}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 font-light">{child.description}</p>
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
