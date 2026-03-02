
import React, { useState, useEffect } from 'react';
import { costData, conversionRates, CityCost } from '../data/costs';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface CostOfLivingCalculatorProps {
  onBack: () => void;
}

const faqData = [
    { question: "How are these cost estimates calculated?", answer: "These figures are estimates based on crowdsourced data and various public indexes. They are intended to provide a general idea of living costs for a single student and can vary based on lifestyle, spending habits, and location within a city." },
    { question: "Are tuition fees included in this calculation?", answer: "No, this calculator focuses solely on living expenses such as rent, food, and transport. Tuition fees vary dramatically by university and program and should be considered a separate, major expense." },
    { question: "How often is this data updated?", answer: "We aim to review and update the cost data periodically to reflect current economic conditions. However, for the most precise and up-to-the-minute planning, we recommend checking local sources and official city guides as well." }
];


const AccordionItem: React.FC<{ faq: { question: string, answer: string }, isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick }) => (
    <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
            aria-expanded={isOpen}
        >
            <span className={`text-lg font-medium tracking-tight ${isOpen ? 'text-[#F6520C]' : 'text-white'}`}>{faq.question}</span>
            <svg
                className={`w-6 h-6 text-[#F6520C] transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2 font-light"><p>{faq.answer}</p></div>
        </div>
    </div>
);


const CostOfLivingCalculator: React.FC<CostOfLivingCalculatorProps> = ({ onBack }) => {
    const [selectedCities, setSelectedCities] = useState<CityCost[]>([]);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    
    useEffect(() => {
        const scriptId = 'cost-calculator-structured-data';
        document.getElementById(scriptId)?.remove();

        const faqJsonData = {
            "@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
                "@type": "Question", "name": item.question,
                "acceptedAnswer": { "@type": "Answer", "text": item.answer }
            }))
        };
        
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(faqJsonData);
        document.head.appendChild(script);

        return () => { document.getElementById(scriptId)?.remove(); };
    }, []);
    
    const handleCitySelect = (city: CityCost) => {
        setSelectedCities(prev => {
            const isSelected = prev.some(c => c.name === city.name);
            if (isSelected) {
                return prev.filter(c => c.name !== city.name);
            }
            if (prev.length < 3) {
                return [...prev, city];
            }
            return prev;
        });
    };

    const costCategories: (keyof CityCost['costs'])[] = ['accommodation', 'food', 'transport', 'utilities', 'entertainment'];
    const COLORS = ['#F6520C', '#FF7B40', '#FFA580', '#FFC2A6', '#FFE8DD'];

    
    return (
        <section className="py-24 relative bg-[#0a101f] min-h-screen overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-12">
                    <button onClick={onBack} className="bg-white/5 backdrop-blur-md text-white hover:text-[#F6520C] transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-full py-2 px-5 border border-white/10 hover:border-[#F6520C]/50 group w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span className="font-medium">Back to Tools</span>
                    </button>
                </div>
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                        <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Finance</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Cost of Living Comparison</h1>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl mx-auto font-light">
                        Select up to 3 cities to compare estimated monthly living expenses side-by-side and plan your budget effectively.
                    </p>
                </div>

                {/* Refined Selection Panel */}
                <div className="bg-white/[0.02] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl mb-16">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white tracking-tight mb-6">Your Comparison List ({selectedCities.length}/3)</h2>
                        <div className="bg-black/20 border border-white/5 p-5 rounded-2xl min-h-[72px] flex flex-wrap items-center gap-3">
                            {selectedCities.length === 0 ? (
                                <p className="text-gray-500 font-light">Select cities from the list below to start comparing.</p>
                            ) : (
                                selectedCities.map(city => (
                                    <div key={city.name} className="flex items-center bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold py-1.5 pl-4 pr-1.5 rounded-full text-sm shadow-lg animate-fade-in">
                                        <span>{city.name}</span>
                                        <button onClick={() => handleCitySelect(city)} className="ml-3 text-white/80 hover:text-white hover:bg-black/20 rounded-full p-1 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        {Object.entries(costData).map(([country, cities]) => (
                            <div key={country} className="border-t border-white/5 pt-6 first:border-0 first:pt-0">
                                <h3 className="font-bold text-xl text-white tracking-tight mb-4">{country}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {cities.map(city => {
                                        const isSelected = selectedCities.some(c => c.name === city.name);
                                        const isMaxed = !isSelected && selectedCities.length >= 3;
                                        return (
                                            <button 
                                                key={city.name} 
                                                onClick={() => handleCitySelect(city)}
                                                disabled={isMaxed}
                                                className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-300 ${isSelected ? 'bg-[#F6520C] text-white border-[#F6520C] shadow-lg shadow-orange-500/20' : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/10'} ${isMaxed ? 'opacity-40 cursor-not-allowed' : ''}`}
                                            >
                                                {city.name}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pie Chart Visualization */}
                {selectedCities.length > 0 && (
                    <div className="bg-white/[0.02] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl mb-16 animate-fade-in">
                        <h2 className="text-3xl font-bold text-white text-center tracking-tight mb-12">Visual Cost Breakdown</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {selectedCities.map(city => {
                                const chartData = costCategories.map(category => ({
                                    name: category.charAt(0).toUpperCase() + category.slice(1),
                                    value: city.costs[category]
                                }));
                                const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

                                return (
                                    <div key={city.name} className="flex flex-col items-center bg-black/20 p-6 rounded-2xl border border-white/5">
                                        <h3 className="text-2xl font-bold text-white tracking-tight mb-2">{city.name}</h3>
                                        <p className="text-xl font-bold text-[#F6520C] mb-6">{city.currencySymbol}{total.toLocaleString()}<span className="text-sm font-light text-gray-400"> / month</span></p>
                                        <div style={{ width: '100%', height: 280 }}>
                                            <ResponsiveContainer>
                                                <PieChart>
                                                    <Pie
                                                        data={chartData}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        outerRadius={90}
                                                        innerRadius={60}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                        nameKey="name"
                                                        label={({ name, percent }: any) => `${(percent * 100).toFixed(0)}%`}
                                                        stroke="rgba(255,255,255,0.1)"
                                                        strokeWidth={2}
                                                    >
                                                        {chartData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        formatter={(value: number) => `${city.currencySymbol}${value.toLocaleString()}`}
                                                        contentStyle={{ backgroundColor: 'rgba(10, 16, 31, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', backdropFilter: 'blur(8px)', color: '#fff' }}
                                                        itemStyle={{ color: '#fff' }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 mt-10 text-sm bg-black/20 py-4 px-6 rounded-2xl border border-white/5 w-fit mx-auto">
                            {costCategories.map((category, index) => (
                                <div key={`legend-${index}`} className="flex items-center space-x-3">
                                    <span className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                    <span className="text-gray-300 capitalize font-medium">{category}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Responsive Comparison Table */}
                {selectedCities.length > 0 && (
                    <div className="bg-white/[0.02] backdrop-blur-md p-0 sm:p-10 rounded-3xl border border-white/5 shadow-2xl animate-fade-in overflow-hidden">
                        <h2 className="text-3xl font-bold text-white tracking-tight mb-8 px-6 sm:px-0 pt-8 sm:pt-0">Detailed Comparison Table</h2>
                        <div className="overflow-x-auto modern-scrollbar pb-4">
                            <table className="w-full min-w-[700px] border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="p-5 text-left text-lg font-bold text-white tracking-tight sticky left-0 bg-[#0a101f]/90 backdrop-blur-md z-10">Expense Category</th>
                                        {selectedCities.map(city => (
                                            <th key={city.name} className="p-5 text-center text-lg font-bold text-white tracking-tight">
                                                {city.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {costCategories.map(category => (
                                        <tr key={category} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                            <td className="p-5 text-gray-300 capitalize sticky left-0 bg-[#0a101f]/90 backdrop-blur-md z-10 font-medium">{category}</td>
                                            {selectedCities.map(city => (
                                                <td key={city.name} className="p-5 text-center">
                                                    <div className="font-bold text-white text-lg">{city.currencySymbol}{city.costs[category].toLocaleString()}</div>
                                                    <div className="text-sm text-gray-500 font-light mt-1">₹ {(city.costs[category] * conversionRates[city.currency]).toLocaleString()}</div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    <tr className="bg-black/20">
                                        <td className="p-6 text-xl font-bold text-[#F6520C] sticky left-0 bg-[#0a101f]/95 backdrop-blur-md z-10 tracking-tight">Total (Monthly)</td>
                                        {selectedCities.map(city => {
                                            const totalLocal = (Object.values(city.costs) as number[]).reduce((sum: number, cost: number) => sum + cost, 0);
                                            const totalInr = totalLocal * conversionRates[city.currency];
                                            return (
                                                <td key={city.name} className="p-6 text-center">
                                                    <div className="text-2xl font-bold text-[#F6520C]">{city.currencySymbol}{totalLocal.toLocaleString()}</div>
                                                    <div className="text-sm text-gray-400 font-medium mt-1">₹ {totalInr.toLocaleString()}</div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                
                 <div className="mt-24 max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-12 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Understanding the Calculator</h2>
                    <div className="space-y-4">
                        {faqData.map((faqItem, index) => (
                            <AccordionItem 
                                key={index} 
                                faq={faqItem} 
                                isOpen={openFaqIndex === index}
                                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="mt-20 max-w-4xl mx-auto text-center">
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-8 backdrop-blur-sm">
                        <h4 className="font-bold text-xl text-yellow-500 mb-3 tracking-tight">Disclaimer</h4>
                        <p className="text-yellow-500/70 font-light leading-relaxed">
                            The figures provided are estimates for a single student and are for informational purposes only. Actual costs can vary significantly based on individual lifestyle, accommodation choices, and spending habits. This tool should be used as a starting point for your financial planning.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CostOfLivingCalculator;
