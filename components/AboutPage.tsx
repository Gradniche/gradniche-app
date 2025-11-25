
import React from 'react';
import { AvatarConfig, generateAvatarUrl } from '../data/forums';

interface AboutPageProps {
    onBack: () => void;
    navigate: (path: string) => void;
}

const platformFeatures = [
    { 
        title: 'In-Depth College Finder', 
        description: 'Our powerful search engine allows you to filter thousands of universities by country, course, tuition, and QS ranking to discover your perfect match.', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
        page: '/college-finder',
        color: 'from-blue-500 to-cyan-500'
    },
    { 
        title: 'AI-Powered Application Tools', 
        description: 'Gain a competitive edge with our AI tools. Get instant feedback on your Statement of Purpose with our SOP Analyzer, or find your ideal study destination.', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846-.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.67-2.67L11.25 18l1.938-.648a3.375 3.375 0 002.67-2.67L16.75 13.5l.648 1.938a3.375 3.375 0 002.67 2.67L21.75 18l-1.938.648a3.375 3.375 0 00-2.67 2.67z" /></svg>,
        page: '/tools/sop-analyzer',
        color: 'from-orange-500 to-red-500'
    },
     { 
        title: 'Comprehensive Resource Hub', 
        description: 'Navigate every step with confidence. Access detailed Visa Guides, search for funding with our Scholarship Finder, and plan your budget with our calculators.', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
        page: '/tools/visa-guides',
        color: 'from-purple-500 to-pink-500'
    },
    { 
        title: 'Active Student Community', 
        description: "You're not alone. Connect with thousands of fellow aspirants in our Community Forums. Ask questions, share experiences, and get authentic advice.", 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        page: '/tools/community-forums',
        color: 'from-emerald-500 to-teal-500'
    },
];

const values = [
    { title: 'Student-Centric', description: 'Our students are at the heart of everything we do. Their success is our success.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, color: 'from-amber-500 to-orange-500' },
    { title: 'Data-Driven', description: 'We leverage technology and data to provide the most accurate and personalized guidance.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>, color: 'from-blue-500 to-indigo-500' },
    { title: 'Integrity', description: 'We believe in transparent, honest, and ethical guidance throughout the entire process.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, color: 'from-green-500 to-emerald-500' },
    { title: 'Innovation', description: 'We are constantly evolving and building new tools to make the study abroad journey seamless.', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, color: 'from-purple-500 to-pink-500' },
];

const socialIcons = [
    { href: 'https://www.instagram.com/gradniche.in/', label: 'Instagram', icon: <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg> },
    { href: 'https://www.youtube.com/@gradniche', label: 'YouTube', icon: <svg fill="currentColor" className="w-8 h-8" viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.26 5 12 5 12 5s-6.26 0-7.82.44c-.86.23-1.52.9-1.76 1.75C2 8.05 2 12 2 12s0 3.95.42 4.81c.23.86.9 1.52 1.76 1.75C5.74 19 12 19 12 19s6.26 0 7.82-.44c.86.23 1.52.9 1.76-1.75C22 15.95 22 12 22 12s0-3.95-.42-4.81zM9.54 15.57V8.43L15.9 12l-6.36 3.57z"></path></svg> },
    { href: 'https://t.me/gradniche', label: 'Telegram', icon: <svg fill="currentColor" className="w-8 h-8" viewBox="0 0 24 24"><path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.78c.595-.394 1.136-.176.691.218Z"></path></svg> },
];

const avatar1Config: AvatarConfig = { style: 'adventurer', options: { seed: 'about-us-female-1', hair: 'long14', eyes: 'variant12', skinColor: 'D88C7A', hairColor: '4D4D4D', clothing: 'hoodie', clothingColor: 'f44336' } };
const avatar2Config: AvatarConfig = { style: 'adventurer', options: { seed: 'about-us-male-1', hair: 'short08', eyes: 'variant05', skinColor: 'AF6E5A', hairColor: '2c1b18', clothing: 'blazer', clothingColor: '394867' } };
const avatar3Config: AvatarConfig = { style: 'adventurer', options: { seed: 'about-us-female-2', hair: 'long06', eyes: 'variant11', skinColor: 'F5C6A0', hairColor: 'cb6820', clothing: 'crewNeck', clothingColor: '8bc34a' } };


const AboutPage: React.FC<AboutPageProps> = ({ onBack, navigate }) => {
    return (
        <div className="bg-[#0a101f] text-gray-300">
            <section
                className="relative h-[60vh] min-h-[450px] text-white flex items-center justify-center text-center bg-center bg-cover"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')` }}
            >
                <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
                <div className="relative z-20 container mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold" style={{ textShadow: '0px 2px 10px rgba(0, 0, 0, 0.7)' }}>
                        Democratizing Global Education
                    </h1>
                    <p className="mt-4 text-lg md:text-xl font-light max-w-3xl mx-auto" style={{ textShadow: '0px 1px 5px rgba(0, 0, 0, 0.5)' }}>
                        We believe that every student deserves access to the world's best educational opportunities, and we're building the tools to make that a reality.
                    </p>
                </div>
            </section>

            <main className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 flex items-center space-x-2 mb-12 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back to Home</span>
                    </button>
                    
                    <section className="text-center mb-24">
                        <div className="flex justify-center items-center space-x-[-15px] sm:space-x-[-30px] mb-12 animate-fade-in">
                            <div className="transform transition-transform hover:scale-110 duration-300 z-10">
                                <img src={generateAvatarUrl(avatar1Config)} alt="Student Avatar 1" className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-700 bg-gray-800 animate-wave-hello" style={{ animationDelay: '0.6s' }} />
                            </div>
                            <div className="transform transition-transform hover:scale-110 duration-300 z-20 scale-110">
                                <img src={generateAvatarUrl(avatar2Config)} alt="Student Avatar 2" className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-[#F6520C] bg-gray-800 animate-wave-hello" style={{ animationDelay: '0.3s' }} />
                            </div>
                            <div className="transform transition-transform hover:scale-110 duration-300 z-10">
                                <img src={generateAvatarUrl(avatar3Config)} alt="Student Avatar 3" className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-700 bg-gray-800 animate-wave-hello" style={{ animationDelay: '0.9s' }} />
                            </div>
                        </div>
                        <div className="max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
                            <h2 className="text-3xl font-bold text-white mb-4">Our Mission & Story</h2>
                            <p className="text-[#F6520C] text-xl font-medium mb-6">
                                To empower every student with the clarity, confidence, and tools to navigate their global education journey successfully.
                            </p>
                            <p className="text-gray-400 mb-4 leading-relaxed">
                                GradNiche was born from a simple observation: the path to studying abroad was cluttered with misinformation, expensive agents, and overwhelming complexity. We knew there had to be a better, more transparent way.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                We're building a single, comprehensive platform that combines our passion for education with cutting-edge AI, providing data-driven tools and a supportive community to make life-changing learning experiences accessible to all.
                            </p>
                        </div>
                    </section>
                    
                    <section className="mb-24">
                         <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Explore the GradNiche Toolkit</h2>
                            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                                We've built a comprehensive suite of tools to give you an unfair advantage in your study abroad preparations.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {platformFeatures.map((feature, index) => (
                                <div key={feature.title} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-gray-600 hover:-translate-y-2 transition-all duration-300 animate-fade-in flex flex-col group" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 mb-6 flex-grow">{feature.description}</p>
                                    <button onClick={() => navigate(feature.page)} className="mt-auto bg-gray-800/80 text-white border border-gray-600 px-6 py-2 rounded-full hover:bg-[#F6520C] hover:border-[#F6520C] transition-colors duration-300 self-start">
                                        Explore Feature
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    <section className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Core Values</h2>
                            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                                The principles that guide our work and our commitment to you.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <div key={value.title} className="bg-gray-800/50 p-6 rounded-2xl flex flex-col items-center text-center animate-fade-in group hover:bg-gray-800/80 transition-colors" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className={`mb-4 w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {value.icon}
                                    </div>
                                    <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
                                    <p className="text-gray-400">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-24 text-center">
                        <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-md p-8 rounded-lg border border-gray-700">
                            <h2 className="text-2xl font-bold text-white mb-4">A Note from the Creator</h2>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                This website is solely created and maintained by one person. While I strive for accuracy, clarity, and a seamless user experience, occasional errors may occur as the site continues to grow. If you notice any issues or have suggestions, please share your feedback through the form—your input directly helps me improve and prioritize updates.
                            </p>
                            <button onClick={() => navigate('/contact')} className="bg-gray-700/50 text-gray-300 px-6 py-2 rounded-full hover:bg-gray-700 hover:text-white transition-colors duration-300">
                                Provide Feedback
                            </button>
                        </div>
                    </section>
                    
                    <section className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Connect With Us</h2>
                            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                                Follow our journey and get the latest updates on our social media channels.
                            </p>
                        </div>
                        <div className="flex justify-center space-x-6 sm:space-x-8">
                            {socialIcons.map(social => (
                                <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F6520C] transition transform hover:scale-125 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#F6520C] rounded-full">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </section>

                     <section className="bg-gray-800/50 backdrop-blur-md p-12 rounded-lg text-center border border-[#F6520C]/30 shadow-lg">
                        <h2 className="text-3xl font-bold text-white">Ready to Start Your Journey?</h2>
                        <p className="text-lg text-gray-400 mt-4 mb-8 max-w-2xl mx-auto">
                            Our tools and resources are designed to guide you every step of the way. Explore top universities and find your perfect fit today.
                        </p>
                        <button onClick={() => navigate('/college-finder')} className="bg-[#F6520C] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg transform hover:scale-105 glow-border focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#F6520C]/80">
                            Launch College Finder
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AboutPage;
