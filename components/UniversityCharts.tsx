import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { universities as universityData } from '../data/universities';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-600">
        <p className="label text-[#F6520C] font-bold">{`${label}`}</p>
        <p className="intro text-white">{`Avg Tuition : $${payload[0].value.toLocaleString()}`}</p>
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
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg mb-12 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white text-center mb-8">University Data Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ minHeight: '350px' }}>
                {/* Tuition Chart */}
                <div>
                    <h3 className="text-lg font-semibold text-center text-gray-300 mb-4">Average Tuition Fees by Country (USD)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={tuitionByCountry} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                            <XAxis dataKey="name" stroke="#a0aec0" />
                            <YAxis stroke="#a0aec0" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(246, 82, 12, 0.1)' }} />
                            <Bar dataKey="avgTuition" fill="#F6520C" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Ranking Chart */}
                <div>
                    <h3 className="text-lg font-semibold text-center text-gray-300 mb-4">University Distribution by QS Ranking</h3>
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
                             <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: '1px solid #4a5568', borderRadius: '0.5rem' }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default UniversityCharts;