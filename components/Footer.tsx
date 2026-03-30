import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface FooterProps {
    navigate: (path: string) => void;
}

const socialIcons = [
    { href: 'https://www.instagram.com/gradniche.in/', label: 'Instagram', icon: <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg> },
    { href: 'https://www.youtube.com/@gradniche', label: 'YouTube', icon: <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.26 5 12 5 12 5s-6.26 0-7.82.44c-.86.23-1.52.9-1.76 1.75C2 8.05 2 12 2 12s0 3.95.42 4.81c.23.86.9 1.52 1.76 1.75C5.74 19 12 19 12 19s6.26 0 7.82-.44c.86.23 1.52.9 1.76-1.75C22 15.95 22 12 22 12s0-3.95-.42-4.81zM9.54 15.57V8.43L15.9 12l-6.36 3.57z"></path></svg> },
    { href: 'https://t.me/gradniche', label: 'Telegram', icon: <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24"><path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.78c.595-.394 1.136-.176.691.218Z"></path></svg> },
];

const Footer: React.FC<FooterProps> = ({ navigate }) => {
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
  };
  
  const navigationLinks = [
    { href: '/#destinations', label: 'Destinations'},
    { href: '/college-finder', label: 'College Finder'},
    { href: '/blogs', label: 'Blog' },
    { href: '/about', label: 'About Us'},
    { href: '/contact', label: 'Contact'},
  ];

  const keyToolLinks = [
    { href: '/tools/sop-analyzer', label: 'SOP Analyzer' },
    { href: '/tools/f1-visa-prep', label: 'F1 Visa Prep' },
    { href: '/tools/visa-guides', label: 'Visa Guides' },
    { href: '/tools/scholarship-finder', label: 'Scholarship Finder' },
    { href: '/tools/course-comparison', label: 'Compare Courses' },
  ];

  const legalLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-and-conditions', label: 'Terms & Conditions' },
    { href: '/disclaimer', label: 'Disclaimer' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
  ];

  const renderLink = (link: { href: string; label: string; }) => (
    <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-sm text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm flex items-center group">
        <span className="w-0 h-[1px] bg-white/50 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
        {link.label}
    </a>
  );

  return (
    <div className="px-0 md:px-6 md:pb-6 bg-black">
        <footer className="bg-[#1C1C1E]/50 backdrop-blur-3xl text-gray-400 rounded-t-[32px] md:rounded-[48px] border-t md:border border-white/10 relative overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none mix-blend-screen"></div>

        <div className="container mx-auto px-6 md:px-10 py-12 md:py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
                <div className="lg:col-span-1 space-y-6 md:space-y-8">
                    <a href="/" onClick={(e) => handleNavClick(e, '/')} className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm inline-block">
                        <Logo className="text-3xl md:text-4xl" iconSize="w-10 h-10 md:w-12 md:h-12" />
                    </a>
                    <p className="text-sm text-gray-400 leading-relaxed font-normal">Empowering your global education journey with data-driven tools and expert insights.</p>
                    <div className="mt-6 md:mt-8">
                        <h4 className="font-semibold text-white mb-3 md:mb-4 tracking-tight">Get the Latest Intel</h4>
                        <form className="flex relative group">
                            <label htmlFor="footer-email" className="sr-only">Email address</label>
                            <input id="footer-email" type="email" placeholder="your.email@example.com" className="w-full px-4 py-3 md:px-5 md:py-4 bg-black/40 text-gray-300 border border-white/10 rounded-xl md:rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-600 text-sm md:text-base"/>
                            <button type="submit" aria-label="Subscribe to newsletter" className="absolute right-1.5 top-1.5 bottom-1.5 md:right-2 md:top-2 md:bottom-2 bg-white/10 hover:bg-white/20 text-white px-3 md:px-4 rounded-lg md:rounded-xl focus:outline-none transition-all duration-300 flex items-center justify-center backdrop-blur-md border border-white/5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 lg:pl-12 pt-2 md:pt-4">
                    <div>
                        <h4 className="font-semibold text-white mb-6 md:mb-8 tracking-widest uppercase text-xs">Navigation</h4>
                        <ul className="space-y-3 md:space-y-4">
                            {navigationLinks.map(link => <li key={link.label}>{renderLink(link)}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-6 md:mb-8 tracking-widest uppercase text-xs">Key Tools</h4>
                        <ul className="space-y-3 md:space-y-4">
                            {keyToolLinks.map(link => <li key={link.label}>{renderLink(link)}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-6 md:mb-8 tracking-widest uppercase text-xs">Legal & Contact</h4>
                        <ul className="space-y-3 md:space-y-4">
                            {legalLinks.map(link => <li key={link.label}>{renderLink(link)}</li>)}
                             <li>
                                <a href="mailto:hello@gradniche.com" className="text-sm text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-sm flex items-center group">
                                    <span className="w-0 h-[1px] bg-white/50 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                                    hello@gradniche.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-12 md:mt-8 border-t border-white/5 py-6 px-6 md:py-8 md:px-10 flex flex-col sm:flex-row justify-between items-center bg-black/20 rounded-b-[32px] md:rounded-b-[48px] -mx-6 md:-mx-10 -mb-12 md:-mb-20">
                <p className="text-xs md:text-sm text-gray-500 font-normal">&copy; {new Date().getFullYear()} GradNiche. All Rights Reserved.</p>
                <div className="flex space-x-6 mt-4 sm:mt-0">
                    {socialIcons.map(social => (
                        <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full hover:scale-110 transform">
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
        </footer>
    </div>
  );
};

export default Footer;