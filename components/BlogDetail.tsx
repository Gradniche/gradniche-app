
import React, { useState, useEffect } from 'react';
import { BlogPost } from '../data/blogs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BlogDetailProps {
    blog: BlogPost;
    onBack: () => void;
    navigate?: (path: string) => void;
}

// --- Internal Visualization Components ---

const CostChart = () => {
    const data = [
        { city: 'New York', Rent: 1400, Food: 400, Transport: 130 },
        { city: 'London', Rent: 1150, Food: 250, Transport: 190 }, // Converted GBP to approx USD for scale
        { city: 'Toronto', Rent: 800, Food: 260, Transport: 95 },   // Converted CAD to approx USD
        { city: 'Sydney', Rent: 950, Food: 300, Transport: 100 },   // Converted AUD to approx USD
    ];

    return (
        <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl border border-gray-700 my-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6520C]/10 rounded-full blur-3xl -z-10 group-hover:bg-[#F6520C]/20 transition-colors duration-500"></div>
            <h4 className="text-white font-bold mb-6 text-center text-lg tracking-wider uppercase">Monthly Cost Comparison (Approx. USD)</h4>
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis dataKey="city" stroke="#9CA3AF" tick={{fill: '#D1D5DB'}} axisLine={false} tickLine={false} />
                        <YAxis stroke="#9CA3AF" tick={{fill: '#D1D5DB'}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', color: '#fff', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="Rent" stackId="a" fill="#F6520C" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="Food" stackId="a" fill="#FDBA74" />
                        <Bar dataKey="Transport" stackId="a" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const ComparisonMatrix = () => {
    const data = [
        { criteria: 'Post-Study Work', USA: '3 Years (STEM)', UK: '2 Years', Canada: '3 Years' },
        { criteria: 'Avg. Tuition', USA: '$40k - $60k', UK: '£20k - £30k', Canada: 'CA$25k - CA$40k' },
        { criteria: 'PR Pathway', USA: 'Difficult (Lottery)', UK: 'Difficult (Sponsor)', Canada: 'Favorable (Express Entry)' },
        { criteria: 'Part-time Work', USA: 'On-campus only', UK: '20 hrs/week', Canada: '20 hrs/week' },
    ];

    return (
        <div className="my-12 overflow-hidden rounded-xl border border-gray-700 shadow-2xl relative">
             <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-10"></div>
            <table className="w-full text-left text-gray-300">
                <thead className="bg-gray-800/80 text-white backdrop-blur-sm">
                    <tr>
                        <th className="px-6 py-5 uppercase tracking-wider text-sm font-bold">Criteria</th>
                        <th className="px-6 py-5 uppercase tracking-wider text-sm font-bold text-[#F6520C]">USA</th>
                        <th className="px-6 py-5 uppercase tracking-wider text-sm font-bold text-blue-400">UK</th>
                        <th className="px-6 py-5 uppercase tracking-wider text-sm font-bold text-red-400">Canada</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-5 font-medium text-white group-hover:text-[#F6520C] transition-colors">{row.criteria}</td>
                            <td className="px-6 py-5 font-light">{row.USA}</td>
                            <td className="px-6 py-5 font-light">{row.UK}</td>
                            <td className="px-6 py-5 font-light">{row.Canada}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TimelineVisual = () => {
    const steps = [
        { date: "June - Aug '25", action: "GRE/GMAT Prep & University Shortlisting", status: 'done' },
        { date: "Sept '25", action: "Take Tests & Draft SOPs", status: 'active' },
        { date: "Nov - Dec '25", action: "Submit Applications (Priority Deadlines)", status: 'upcoming' },
        { date: "Jan - Mar '26", action: "Interview Prep & Decisions", status: 'upcoming' },
        { date: "May - June '26", action: "Visa Interviews & Loan Sanction", status: 'upcoming' }
    ];

    return (
        <div className="my-12 space-y-8 relative pl-8 md:pl-0 before:absolute before:left-8 md:before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-700 before:-ml-px">
            {steps.map((step, index) => (
                <div key={index} className={`relative flex items-center md:justify-between md:even:flex-row-reverse group ${step.status === 'active' ? 'scale-105' : ''} transition-transform duration-300`}>
                    <div className={`absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full border-4 border-gray-900 ${step.status === 'done' ? 'bg-green-500' : step.status === 'active' ? 'bg-[#F6520C] shadow-[0_0_15px_#F6520C]' : 'bg-gray-600'} z-10`}></div>
                    
                    <div className="hidden md:block w-[45%]"></div>
                    
                    <div className={`w-full md:w-[45%] ml-8 md:ml-0 bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border ${step.status === 'active' ? 'border-[#F6520C] bg-gray-800' : 'border-gray-700'} shadow-lg hover:shadow-xl transition-all`}>
                        <time className={`text-sm font-bold mb-1 block ${step.status === 'active' ? 'text-[#F6520C]' : 'text-gray-400'}`}>{step.date}</time>
                        <div className="text-white font-medium text-lg leading-tight">{step.action}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ScholarshipTable = () => (
    <div className="my-12 overflow-hidden rounded-xl border border-gray-700 shadow-2xl">
        <table className="w-full text-left text-gray-300">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="px-6 py-4">Scholarship</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Deadline</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-900/50">
                <tr className="hover:bg-white/5"><td className="px-6 py-4 font-medium text-white">Fulbright-Nehru</td><td className="px-6 py-4 text-green-400">Full Funding</td><td className="px-6 py-4">May/June</td></tr>
                <tr className="hover:bg-white/5"><td className="px-6 py-4 font-medium text-white">Chevening (UK)</td><td className="px-6 py-4 text-green-400">Full Funding</td><td className="px-6 py-4">November</td></tr>
                <tr className="hover:bg-white/5"><td className="px-6 py-4 font-medium text-white">Australia Awards</td><td className="px-6 py-4 text-green-400">Full Funding</td><td className="px-6 py-4">April</td></tr>
                <tr className="hover:bg-white/5"><td className="px-6 py-4 font-medium text-white">Vanier Canada</td><td className="px-6 py-4">$50k/year</td><td className="px-6 py-4">November</td></tr>
            </tbody>
        </table>
    </div>
);

// --- Main Component ---

const BlogDetail: React.FC<BlogDetailProps> = ({ blog, onBack, navigate }) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [headings, setHeadings] = useState<{id: string, text: string}[]>([]);

    useEffect(() => {
        // SEO: Update document title and meta description
        document.title = `${blog.title} | GradNiche Insights`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', blog.excerpt);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = blog.excerpt;
            document.head.appendChild(meta);
        }

        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [blog]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = blog.content;
        const h2s = tempDiv.querySelectorAll('h2');
        const extractedHeadings: {id: string, text: string}[] = [];
        h2s.forEach((h2, index) => {
            const id = h2.id || `section-${index}`;
            h2.id = id; // Ensure ID exists for linking
            extractedHeadings.push({ id, text: h2.innerText });
        });
        setHeadings(extractedHeadings);
    }, [blog]);

    return (
        <div className="bg-[#0a101f] min-h-screen text-gray-300 font-sans selection:bg-[#F6520C] selection:text-white pb-20">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-600 via-[#F6520C] to-yellow-500 z-50 shadow-[0_0_10px_#F6520C]" style={{ width: `${scrollProgress}%` }}></div>

            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a101f] via-[#0a101f]/60 to-transparent z-20"></div>
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform scale-105 animate-[pulse_20s_infinite]" />
                
                <div className="absolute bottom-0 left-0 right-0 z-30 container mx-auto px-6 pb-12 lg:pb-20">
                    <button onClick={onBack} className="group text-white/80 hover:text-white transition-colors flex items-center space-x-2 mb-6 bg-black/30 backdrop-blur-md py-2 px-4 rounded-full w-fit border border-white/10 hover:border-[#F6520C]/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Back to Insights</span>
                    </button>
                    
                    <span className="inline-block px-3 py-1 rounded-md bg-[#F6520C] text-white text-xs font-bold tracking-widest uppercase mb-4 shadow-lg shadow-orange-900/50">{blog.category}</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-2xl max-w-5xl">{blog.title}</h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300">
                        <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white font-bold mr-3 border border-white/20">
                                {blog.author.charAt(0)}
                            </div>
                            <span>{blog.author}</span>
                        </div>
                        <span className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                            <svg className="w-4 h-4 mr-2 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {blog.date}
                        </span>
                        <span className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                            <svg className="w-4 h-4 mr-2 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {blog.readTime}
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Table of Contents (Desktop) */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-700 shadow-xl">
                            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6 flex items-center">
                                <span className="w-1 h-4 bg-[#F6520C] mr-3 rounded-full"></span>
                                Contents
                            </h3>
                            <ul className="space-y-4 border-l border-gray-800 pl-4">
                                {headings.map(heading => (
                                    <li key={heading.id}>
                                        <a href={`#${heading.id}`} className="text-sm text-gray-500 hover:text-[#F6520C] transition-colors block py-1 hover:translate-x-1 transition-transform duration-300">
                                            {heading.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Article */}
                    <article className="lg:col-span-9">
                        {/* AI Summary Box */}
                        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl border border-[#F6520C]/30 mb-12 shadow-[0_0_30px_rgba(246,82,12,0.05)] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#F6520C]"></div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-[#F6520C]/20 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-wide">AI Executive Summary</h3>
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed font-light italic">
                                "{blog.excerpt}"
                            </p>
                        </div>

                        {/* Visualizations Injection */}
                        <div className="mb-12 animate-fade-in">
                            {blog.visualType === 'cost-chart' && <CostChart />}
                            {blog.visualType === 'comparison' && <ComparisonMatrix />}
                            {blog.visualType === 'timeline' && <TimelineVisual />}
                            {blog.visualType === 'scholarship-table' && <ScholarshipTable />}
                        </div>

                        {/* HTML Content */}
                        <div className="prose prose-lg prose-invert max-w-none 
                            prose-headings:text-white prose-headings:font-bold prose-headings:scroll-mt-32
                            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-800 prose-h2:pb-4
                            prose-h3:text-2xl prose-h3:text-[#F6520C] prose-h3:mt-10
                            prose-p:text-gray-300 prose-p:leading-8 prose-p:font-light
                            prose-a:text-[#F6520C] prose-a:no-underline hover:prose-a:underline hover:prose-a:text-white transition-colors
                            prose-strong:text-white prose-strong:font-bold
                            prose-ul:space-y-2 prose-li:text-gray-300
                            prose-blockquote:border-l-4 prose-blockquote:border-[#F6520C] prose-blockquote:bg-gray-800/30 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                        ">
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>

                        {/* Author Bio / Footer */}
                        <div className="mt-20 pt-10 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-2xl font-bold text-[#F6520C] border border-gray-700">
                                    {blog.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-wider font-bold">Written By</p>
                                    <p className="text-white text-xl font-bold">{blog.author}</p>
                                    <p className="text-gray-400 text-sm">Senior Education Analyst</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <button className="p-3 rounded-full bg-gray-800 hover:bg-[#F6520C] hover:text-white text-gray-400 transition-all duration-300">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                                </button>
                                <button className="p-3 rounded-full bg-gray-800 hover:bg-[#F6520C] hover:text-white text-gray-400 transition-all duration-300">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </button>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-16 p-1 rounded-2xl bg-gradient-to-r from-orange-600 to-purple-600 shadow-2xl">
                            <div className="bg-gray-900 rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
                                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Get personalized university recommendations, analyze your SOP, and join a community of ambitious students just like you.</p>
                                    <a 
                                        href="#/college-finder" 
                                        onClick={(e) => { 
                                            e.preventDefault(); 
                                            if(navigate) navigate('/college-finder'); 
                                        }} 
                                        className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-transform hover:scale-105 shadow-xl cursor-pointer"
                                    >
                                        Find My Dream University
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
