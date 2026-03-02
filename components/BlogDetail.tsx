
import React, { useState, useEffect } from 'react';
import { BlogPost } from '../data/blogs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BlogDetailProps {
    blog: BlogPost;
    onBack: () => void;
    navigate?: (path: string) => void;
}

const CostChart = () => {
    const data = [
        { city: 'New York', Rent: 1400, Food: 400, Transport: 130 },
        { city: 'London', Rent: 1150, Food: 250, Transport: 190 },
        { city: 'Toronto', Rent: 800, Food: 260, Transport: 95 },
        { city: 'Sydney', Rent: 950, Food: 300, Transport: 100 },
    ];

    return (
        <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 my-16 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F6520C]/5 rounded-full blur-[80px] -z-10 group-hover:bg-[#F6520C]/10 transition-colors duration-700"></div>
            <h4 className="text-white font-bold mb-8 text-center text-xl tracking-tight">Monthly Expenses Comparison (USD)</h4>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="city" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: '#F3F4F6', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                        itemStyle={{ color: '#F3F4F6', fontWeight: 500 }}
                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="Rent" stackId="a" fill="#F6520C" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="Food" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="Transport" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const BlogDetail: React.FC<BlogDetailProps> = ({ blog, onBack, navigate }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="bg-[#050810] min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-4xl pt-32 pb-24 relative z-10">
                <div className="mb-12">
                    <button onClick={onBack} className="bg-white/5 backdrop-blur-md text-white hover:text-[#F6520C] transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-full py-2 px-5 border border-white/10 hover:border-[#F6520C]/50 group w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Back to Articles</span>
                    </button>
                </div>

                <article className="animate-fade-in">
                    <header className="mb-16 text-center">
                        <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-[#F6520C] uppercase bg-[#F6520C]/10 border border-[#F6520C]/20 rounded-full">
                            {blog.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 font-medium">
                            <span className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mr-3 shadow-sm"></div>
                                <span className="text-gray-200">{blog.author}</span>
                            </span>
                            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">{blog.date}</span>
                            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">{blog.readTime}</span>
                        </div>
                    </header>

                    <div className="rounded-[2rem] overflow-hidden mb-16 shadow-2xl shadow-black/50 border border-white/10 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] to-transparent opacity-40 z-10"></div>
                        <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover max-h-[600px]" />
                    </div>

                    <div className="prose prose-lg prose-invert mx-auto max-w-none text-gray-300 leading-relaxed font-light prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-a:text-[#F6520C] hover:prose-a:text-orange-400 prose-strong:text-white prose-strong:font-semibold">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        
                        {blog.visualType === 'cost-chart' && <CostChart />}
                    </div>

                    <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-gray-400 font-medium">Share this article if you found it helpful.</p>
                        <div className="flex space-x-4">
                            <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#F6520C] hover:border-[#F6520C] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#F6520C]/20 hover:-translate-y-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </button>
                            <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#1877F2]/20 hover:-translate-y-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </button>
                            <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#0A66C2]/20 hover:-translate-y-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default BlogDetail;
