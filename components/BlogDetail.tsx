
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
        <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl border border-gray-700 my-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6520C]/10 rounded-full blur-3xl -z-10 group-hover:bg-[#F6520C]/20 transition-colors duration-500"></div>
            <h4 className="text-white font-bold mb-6 text-center">Monthly Expenses Comparison (USD)</h4>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis dataKey="city" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                    <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', color: '#F3F4F6' }}
                        itemStyle={{ color: '#F3F4F6' }}
                        cursor={{ fill: '#374151', opacity: 0.4 }}
                    />
                    <Legend />
                    <Bar dataKey="Rent" stackId="a" fill="#F6520C" />
                    <Bar dataKey="Food" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="Transport" stackId="a" fill="#10B981" />
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
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-8">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Back to Articles</span>
                    </button>
                </div>

                <article className="animate-fade-in">
                    <header className="mb-10 text-center">
                        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider text-white uppercase bg-[#F6520C] rounded-full">
                            {blog.category}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mr-3"></div>
                                {blog.author}
                            </span>
                            <span>&bull;</span>
                            <span>{blog.date}</span>
                            <span>&bull;</span>
                            <span>{blog.readTime}</span>
                        </div>
                    </header>

                    <div className="rounded-2xl overflow-hidden mb-12 shadow-2xl border border-gray-800">
                        <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover" />
                    </div>

                    <div className="prose prose-lg prose-invert mx-auto max-w-none text-gray-300 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        
                        {blog.visualType === 'cost-chart' && <CostChart />}
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-800 flex justify-between items-center">
                        <p className="text-gray-500 italic">Share this article if you found it helpful.</p>
                        <div className="flex space-x-4">
                            <button className="p-2 bg-gray-800 rounded-full hover:bg-[#F6520C] hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </button>
                            <button className="p-2 bg-gray-800 rounded-full hover:bg-[#1877F2] hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </button>
                            <button className="p-2 bg-gray-800 rounded-full hover:bg-[#0A66C2] hover:text-white transition-colors">
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
