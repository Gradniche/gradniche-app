import React from 'react';
import { Page } from '../App';

interface FooterProps {
    navigateTo: (page: Page) => void;
}

const socialIcons = [
    { href: 'https://www.instagram.com/gradniche.in/', label: 'Instagram', icon: <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg> },
    { href: 'https://www.youtube.com/@gradniche', label: 'YouTube', icon: <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.26 5 12 5 12 5s-6.26 0-7.82.44c-.86.23-1.52.9-1.76 1.75C2 8.05 2 12 2 12s0 3.95.42 4.81c.23.86.9 1.52 1.76 1.75C5.74 19 12 19 12 19s6.26 0 7.82-.44c.86.23 1.52.9 1.76-1.75C22 15.95 22 12 22 12s0-3.95-.42-4.81zM9.54 15.57V8.43L15.9 12l-6.36 3.57z"></path></svg> },
    { href: 'https://t.me/gradniche', label: 'Telegram', icon: <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24"><path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.78c.595-.394 1.136-.176.691.218Z"></path></svg> },
];

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  
  const navigationLinks = [
    { href: '#destinations', label: 'Destinations', isPage: false },
    { href: 'college-finder', label: 'College Finder', isPage: true },
    { href: 'about', label: 'About Us', isPage: true },
    { href: 'contact', label: 'Contact', isPage: true },
  ];

  const keyToolLinks = [
    { href: 'sop-analyzer' as Page, label: 'SOP Analyzer', isPage: true },
    { href: 'f1-visa-prep' as Page, label: 'F1 Visa Prep', isPage: true },
    { href: 'visa-guides' as Page, label: 'Visa Guides', isPage: true },
    { href: 'scholarship-finder' as Page, label: 'Scholarship Finder', isPage: true },
    { href: 'course-comparison' as Page, label: 'Compare Courses', isPage: true },
    { href: 'community-forums' as Page, label: 'Forums', isPage: true },
  ];

  const legalLinks = [
    { href: 'privacy-policy', label: 'Privacy Policy', isPage: true },
    { href: 'terms-and-conditions', label: 'Terms & Conditions', isPage: true },
    { href: 'disclaimer', label: 'Disclaimer', isPage: true },
    { href: 'cookie-policy', label: 'Cookie Policy', isPage: true },
  ];

  const renderLink = (link: { href: string; label: string; isPage: boolean; }) => {
    if (link.isPage) {
        return (
            <button onClick={() => navigateTo(link.href as Page)} className="text-sm text-left text-gray-400 hover:text-[#F6520C] transition focus:outline-none focus:ring-1 focus:ring-[#F6520C] rounded-sm">{link.label}</button>
        );
    }
    return (
        <a href={link.href} className="text-sm text-gray-400 hover:text-[#F6520C] transition focus:outline-none focus:ring-1 focus:ring-[#F6520C] rounded-sm">{link.label}</a>
    );
  };

  return (
    <div className="px-0 md:px-6 md:pb-4">
        <footer className="bg-gray-900 text-gray-400 md:rounded-xl">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Brand and Subscribe Section */}
                <div className="lg:col-span-1">
                    <button onClick={() => navigateTo('home')} className="text-2xl font-extrabold text-white text-left focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-sm">
                        Grad<span className="text-[#F6520C]">Niche</span>
                    </button>
                    <p className="text-sm mt-2 max-w-xs">Empowering your global education journey with data-driven tools and expert insights.</p>
                    <div className="mt-6">
                        <h4 className="font-semibold text-white mb-2">Get the Latest Intel</h4>
                        <form className="flex">
                            <label htmlFor="footer-email" className="sr-only">Email address</label>
                            <input id="footer-email" type="email" placeholder="your.email@example.com" className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#F6520C]"/>
                            <button type="submit" aria-label="Subscribe to newsletter" className="bg-[#F6520C] text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#F6520C]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Links Section */}
                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-semibold text-white mb-4">Navigation</h4>
                        <ul className="space-y-3">
                            {navigationLinks.map(link => <li key={link.label}>{renderLink(link)}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Key Tools</h4>
                        <ul className="space-y-3">
                            {keyToolLinks.map(link => <li key={link.label}>{renderLink(link)}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal & Contact</h4>
                        <ul className="space-y-3">
                            {legalLinks.map(link => <li key={link.label}>{renderLink(link)}</li>)}
                             <li>
                                <a href="mailto:hello@gradniche.com" className="text-sm hover:text-[#F6520C] transition focus:outline-none focus:ring-1 focus:ring-[#F6520C] rounded-sm">hello@gradniche.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} GradNiche. All Rights Reserved.</p>
                <div className="flex space-x-4 mt-4 sm:mt-0">
                    {socialIcons.map(social => (
                        <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F6520C] transition focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-full">
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
