import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { universities as universityData } from '../data/universities';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a101f]/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl">
        <p className="label text-[#F6520C] font-bold tracking-tight mb-1">{`${label}`}</p>
        <p className="intro text-white font-medium">{`Avg Tuition : $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const UniversityCharts: React.FC = () => {
    const tuitionByCountry = useMemo(() => {
        const countryData: { [key: string]: { totalTuition: number; count: number } } = {};
        universityData.forEach(uni => {
            if (!countryData[uni.country]) {
                countryData[uni.country] = { totalTuition: 0, count: 0 };
            }
            countryData[uni.country].totalTuition += uni.avgTuition;
            countryData[uni.country].count++;
        });

        return Object.entries(countryData).map(([country, data]) => ({
            name: country,
            avgTuition: Math.round(data.totalTuition / data.count)
        })).sort((a, b) => b.avgTuition - a.avgTuition);
    }, []);

    const rankingDistribution = useMemo(() => {
        const brackets = {
            'Top 10': { min: 1, max: 10, count: 0 },
            '11-20': { min: 11, max: 20, count: 0 },
            '21-50': { min: 21, max: 50, count: 0 },
            '51+': { min: 51, max: Infinity, count: 0 },
        };

        universityData.forEach(uni => {
            if (uni.qsRanking) {
                if (uni.qsRanking <= brackets['Top 10'].max) brackets['Top 10'].count++;
                else if (uni.qsRanking <= brackets['11-20'].max) brackets['11-20'].count++;
                else if (uni.qsRanking <= brackets['21-50'].max) brackets['21-50'].count++;
                else brackets['51+'].count++;
            }
        });

        return Object.entries(brackets).map(([name, data]) => ({
            name,
            value: data.count
        })).filter(d => d.value > 0);
    }, []);

    const COLORS = ['#F6520C', '#FF7B40', '#FFA580', '#FFC2A6'];

    return (
        <div className="bg-white/[0.02] backdrop-blur-md p-8 rounded-3xl mb-12 border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F6520C]/5 rounded-full blur-[80px] -z-10 group-hover:bg-[#F6520C]/10 transition-colors duration-700"></div>
            <h2 className="text-3xl font-bold text-white text-center mb-10 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>University Data Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" style={{ minHeight: '350px' }}>
                {/* Tuition Chart */}
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-semibold text-center text-gray-300 mb-6 tracking-tight">Average Tuition Fees by Country (USD)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={tuitionByCountry} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                            <Bar dataKey="avgTuition" fill="#F6520C" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Ranking Chart */}
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-semibold text-center text-gray-300 mb-6 tracking-tight">University Distribution by QS Ranking</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={rankingDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                // FIX: Explicitly typed the 'percent' property in the Pie chart's label function to resolve an arithmetic operation error where 'percent' was not being inferred as a number.
                                label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {rankingDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip contentStyle={{ backgroundColor: 'rgba(10, 16, 31, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: '#F3F4F6', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }} itemStyle={{ color: '#F3F4F6', fontWeight: 500 }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default UniversityCharts;