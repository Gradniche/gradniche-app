import React, { useState, useRef, useEffect } from 'react';
import { Page, Notification } from '../App';
import { User, generateAvatarUrl, AvatarConfig } from '../data/forums';

// FIX: Added optional properties to the DropdownChild interface to match its usage for both individual links and dropdown containers. This resolves multiple TypeScript errors.
interface DropdownChild {
  label: string;
  page?: Page;
  href?: string;
  isPage?: boolean;
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
      { label: 'USA', page: 'destination-usa' as Page, icon: <img src={generateAvatarUrl(usaAvatarConfig)} alt="USA" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'Canada', page: 'destination-canada' as Page, icon: <img src={generateAvatarUrl(canadaAvatarConfig)} alt="Canada" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'UK', page: 'destination-uk' as Page, icon: <img src={generateAvatarUrl(ukAvatarConfig)} alt="UK" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'Australia', page: 'destination-australia' as Page, icon: <img src={generateAvatarUrl(australiaAvatarConfig)} alt="Australia" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'Germany', page: 'destination-germany' as Page, icon: <img src={generateAvatarUrl(germanyAvatarConfig)} alt="Germany" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'Ireland', page: 'destination-ireland' as Page, icon: <img src={generateAvatarUrl(irelandAvatarConfig)} alt="Ireland" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'UAE', page: 'destination-uae' as Page, icon: <img src={generateAvatarUrl(uaeAvatarConfig)} alt="UAE" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
      { label: 'New Zealand', page: 'destination-new-zealand' as Page, icon: <img src={generateAvatarUrl(newZealandAvatarConfig)} alt="New Zealand" className="h-full w-full rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" /> },
    ]
  },
  { href: 'college-finder', label: 'College Finder', isPage: true },
  { 
    label: 'Resources', 
    isDropdown: true, 
    name: 'resources',
    children: [
      { label: 'Course Comparison', page: 'course-comparison' as Page, description: 'Analyze courses side-by-side.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h5m-5 4h5m2-16l-4 4m0 0l-4-4m4 4V3" /></svg> },
      { label: 'AI SOP Analyzer', page: 'sop-analyzer' as Page, description: 'Get instant feedback on your essay.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12l1.549-3.326a.5.5 0 00-.948-.442L12 11.549l-3.601-1.309a.5.5 0 00-.548.848L11.549 12l-1.309 3.601a.5.5 0 00.848.548L12 13.451l3.326 1.549a.5.5 0 00.442-.948L13.451 12z" /></svg> },
      { label: 'F1 Visa Interview Prep', page: 'f1-visa-prep' as Page, description: 'Practice with an AI visa officer.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg> },
      { label: 'AI Destination Finder', href: '#ai-finder', isPage: false, description: 'Let our AI suggest countries for you.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.343a9 9 0 0110.592 0m-12.592 0A9 9 0 009.296 2.343M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
      { label: 'Visa Application Guides', page: 'visa-guides' as Page, description: 'Step-by-step visa assistance.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
      { label: 'Scholarship Finder', page: 'scholarship-finder' as Page, description: 'Find funding for your studies.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 100-8 4 4 0 000 8z" /></svg> },
      { label: 'Community Forums', page: 'community-forums' as Page, description: 'Connect with fellow students.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h4M9 12l2 2 4-4" /></svg> },
      { label: 'Cost of Living Calculator', page: 'cost-of-living-calculator' as Page, description: 'Estimate your expenses abroad.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
      { label: 'Pre-Departure Checklists', page: 'pre-departure-checklists' as Page, description: 'Stay organized before you fly.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
      { label: 'GPA Calculator', page: 'gpa-calculator' as Page, description: 'Convert your grades to the 4.0 scale.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg> },
    ]
  },
  { href: 'about', label: 'About Us', isPage: true },
  { href: 'contact', label: 'Contact Us', isPage: true },
];

interface HeaderProps {
    navigateTo: (page: Page) => void;
    isAuthenticated: boolean;
    onLogout: () => void;
    currentUser: User | null;
    notifications: Notification[];
    onMarkNotificationsAsRead: () => void;
    onNotificationClick: (threadId: string) => void;
    onCustomizeAvatar: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, isAuthenticated, onLogout, currentUser, notifications, onMarkNotificationsAsRead, onNotificationClick, onCustomizeAvatar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const userNotifications = currentUser ? notifications.filter(n => n.recipientId === currentUser.id) : [];
  const unreadCount = userNotifications.filter(n => !n.isRead).length;

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

  const handleNavClick = (page: Page | string, isPage: boolean) => {
    if (isPage) {
        navigateTo(page as Page);
    } else {
        navigateTo('home');
        setTimeout(() => {
            const element = document.querySelector(page as string);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
    setIsMenuOpen(false);
  }
  
  const handleToggleNotifications = () => {
    setIsNotificationsOpen(prev => !prev);
    if (!isNotificationsOpen && unreadCount > 0) {
        onMarkNotificationsAsRead();
    }
    setIsUserMenuOpen(false);
  };

  const handleToggleUserMenu = () => {
    setIsUserMenuOpen(prev => !prev);
    setIsNotificationsOpen(false);
  };

  const handleNotificationItemClick = (threadId: string) => {
    onNotificationClick(threadId);
    setIsNotificationsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
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
              <button 
                key={child.label} 
                onClick={() => { navigateTo(child.page!); setOpenDropdown(null); }}
                className="group flex items-center gap-3 w-full p-3 rounded-md hover:bg-[#F6520C]/10 transition-colors text-left focus:outline-none focus-visible:bg-[#F6520C]/20"
              >
                <div className="h-8 w-8">{child.icon}</div>
                <p className="font-semibold text-white">{child.label}</p>
              </button>
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
                <button
                  key={child.label}
                  onClick={() => {
                    if (child.page) navigateTo(child.page);
                    else if (child.href) handleNavClick(child.href, child.isPage ?? false);
                    setOpenDropdown(null);
                  }}
                  className="group flex items-start gap-4 p-3 rounded-md hover:bg-[#F6520C]/10 transition-colors text-left focus:outline-none focus-visible:bg-[#F6520C]/20"
                >
                  <div className="flex-shrink-0 bg-gray-700/50 p-3 rounded-lg text-[#F6520C] group-hover:bg-[#F6520C] group-hover:text-white transition-all">
                    {child.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{child.label}</p>
                    <p className="text-sm text-gray-400">{child.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };


  return (
    <header className={`bg-white/10 backdrop-blur-md sticky z-50 md:mx-6 md:rounded-xl transition-all duration-300 ${isScrolled ? 'top-0 md:top-2 shadow-2xl shadow-black/20' : 'top-0 md:top-4 shadow-lg'}`}>
      <div className={`container mx-auto px-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <button onClick={() => navigateTo('home')} className="text-2xl font-extrabold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C] rounded-sm">
          Grad<span className="text-[#F6520C]">Niche</span>
        </button>
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
                <button onClick={() => handleNavClick(link.href!, link.isPage!)} className="text-gray-300 hover:text-white hover:bg-[#F6520C]/80 transition-all duration-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C] rounded-full px-4 py-2">
                  {link.label}
                </button>
              )}
            </div>
          ))}
          {isAuthenticated && currentUser ? (
            <div className="flex items-center space-x-3 ml-2">
                 <div className="relative" ref={notificationsRef}>
                    <button onClick={handleToggleNotifications} className="relative text-gray-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 block h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full text-white bg-red-600 text-xs flex items-center justify-center">{unreadCount}</span>
                      )}
                    </button>
                    <div className={`absolute top-full right-0 mt-4 w-80 max-h-96 overflow-y-auto modern-scrollbar transition-all ease-in-out duration-300 z-20 ${isNotificationsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                      <div className="bg-gray-800/90 backdrop-blur-md rounded-md shadow-lg border border-[#F6520C]/20 overflow-hidden">
                        <div className="p-3 border-b border-gray-700">
                          <h4 className="font-semibold text-white">Notifications</h4>
                        </div>
                        {userNotifications.length > 0 ? (
                          userNotifications.map(notification => (
                            <button key={notification.id} onClick={() => handleNotificationItemClick(notification.threadId)} className={`block w-full text-left px-4 py-3 text-sm transition-colors hover:bg-[#F6520C]/80 ${!notification.isRead ? 'bg-[#F6520C]/20' : ''}`}>
                              <p className="text-gray-300">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{new Date(notification.timestamp).toLocaleString()}</p>
                            </button>
                          ))
                        ) : (
                          <p className="p-4 text-sm text-gray-400">You have no new notifications.</p>
                        )}
                      </div>
                    </div>
                  </div>
                
                 <div className="relative" ref={userMenuRef}>
                    <button onClick={handleToggleUserMenu} className="flex items-center space-x-2 p-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C]">
                      <img src={generateAvatarUrl(currentUser.avatarConfig)} alt={currentUser.name} className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-[#F6520C]" />
                      <span className="text-white text-sm font-semibold hidden lg:block">{currentUser.name}</span>
                       <svg className={`w-4 h-4 text-gray-300 transition-transform hidden lg:block ${isUserMenuOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                     <div className={`absolute top-full right-0 mt-4 w-56 transition-all ease-in-out duration-300 z-10 ${isUserMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                        <div className="bg-gray-800/90 backdrop-blur-md rounded-md shadow-lg border border-[#F6520C]/20 py-2 overflow-hidden">
                            <div className="px-4 py-2 border-b border-gray-700">
                                <p className="text-sm text-white font-semibold">{currentUser.name}</p>
                                <p className="text-xs text-gray-400">{currentUser.username}</p>
                            </div>
                            <button onClick={() => { navigateTo('shortlist'); setIsUserMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#F6520C] hover:text-white transition-colors">
                              My Shortlist
                            </button>
                            <button onClick={() => { onCustomizeAvatar(); setIsUserMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#F6520C] hover:text-white transition-colors">
                              Customize Avatar
                            </button>
                            <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition-colors">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          ) : (
             <button onClick={() => navigateTo('login')} className="bg-[#F6520C] text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-[#E84A00]">
                Login
            </button>
          )}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6520C] rounded-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-xl z-60 h-screen overflow-y-auto font-sans animate-fade-in">
            <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-70"
                aria-label="Close menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="container mx-auto px-6 pt-24 pb-12 flex flex-col h-full">
                <div className="flex-grow overflow-y-auto modern-scrollbar -mr-4 pr-4">
                    <div className="flex flex-col gap-y-10">
                        {/* User Section */}
                        {isAuthenticated && currentUser ? (
                            <div>
                                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-gray-700">
                                    <img src={generateAvatarUrl(currentUser.avatarConfig)} alt={currentUser.name} className="w-14 h-14 rounded-full" />
                                    <div>
                                        <p className="font-bold text-white text-lg">{currentUser.name}</p>
                                        <p className="text-sm text-gray-400">@{currentUser.username}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-3">
                                    <button onClick={() => { navigateTo('shortlist'); setIsMenuOpen(false); }} className="text-center py-3 bg-white/5 rounded-lg text-sm font-semibold text-gray-300 hover:bg-white/10 transition-colors">My Shortlist</button>
                                    <button onClick={() => { onCustomizeAvatar(); setIsMenuOpen(false); }} className="text-center py-3 bg-white/5 rounded-lg text-sm font-semibold text-gray-300 hover:bg-white/10 transition-colors">Customize Avatar</button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => { navigateTo('login'); setIsMenuOpen(false); }} className="w-full bg-[#F6520C] text-white py-3.5 text-lg font-semibold rounded-lg hover:bg-opacity-90 transition transform hover:scale-105">
                                Login / Sign Up
                            </button>
                        )}

                        {/* Main Navigation */}
                        <nav>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-2 mb-3">Menu</h3>
                            <div className="flex flex-col gap-2">
                                {navLinks.filter(l => !l.isDropdown).map(link => (
                                    <button key={link.label} onClick={() => { handleNavClick(link.href!, link.isPage!); setIsMenuOpen(false); }} className="flex justify-between items-center w-full p-4 bg-white/5 rounded-lg text-white font-semibold text-left hover:bg-white/10 transition-colors">
                                        <span>{link.label}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                ))}
                            </div>
                        </nav>

                        {/* Destinations */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-2 mb-3">Destinations</h3>
                            <div className="flex gap-4 overflow-x-auto snap-x py-2 modern-scrollbar -mx-6 px-6">
                                {navLinks.find(l => l.name === 'destinations')?.children?.map(child => (
                                    <button key={child.label} onClick={() => { navigateTo(child.page!); setIsMenuOpen(false); }} className="flex-shrink-0 snap-center flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 w-28 text-center hover:bg-white/10 transition-colors">
                                        <div className="w-16 h-16">{child.icon}</div>
                                        <span className="text-sm font-semibold text-gray-300">{child.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-2 mb-3">Resources</h3>
                            <div className="flex flex-col gap-1">
                                {navLinks.find(l => l.name === 'resources')?.children?.map(child => (
                                    <button key={child.label} onClick={() => {
                                        if (child.page) navigateTo(child.page);
                                        else if (child.href) handleNavClick(child.href, child.isPage ?? false);
                                        setIsMenuOpen(false);
                                    }} className="flex items-center gap-4 p-3 rounded-lg text-left hover:bg-white/10 transition-colors">
                                        <div className="text-[#F6520C] flex-shrink-0 w-6 h-6">{child.icon}</div>
                                        <div>
                                            <p className="font-semibold text-white">{child.label}</p>
                                            <p className="text-xs text-gray-400">{child.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout button */}
                {isAuthenticated && (
                    <div className="mt-auto pt-6">
                        <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full text-center py-3 bg-red-600/20 rounded-lg text-red-300 font-semibold hover:bg-red-600/40 transition-colors">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
