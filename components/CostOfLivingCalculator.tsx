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
    <div className="border border-gray-700 rounded-lg overflow-hidden">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-5 bg-gray-800/50 hover:bg-gray-800 transition-colors"
            aria-expanded={isOpen}
        >
            <span className="text-lg font-medium text-white">{faq.question}</span>
            <svg
                className={`w-6 h-6 text-[#F6520C] transform transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="p-5 bg-white/5 text-gray-400"><p>{faq.answer}</p></div>
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

    const costCategories = ['accommodation', 'food', 'transport', 'utilities', 'entertainment'];
    const COLORS = ['#F6520C', '#FF7B40', '#FFA580', '#FFC2A6', '#FFE8DD'];

    
    return (
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Cost of Living Comparison Tool</h1>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        Select up to 3 cities to compare estimated monthly living expenses side-by-side and plan your budget effectively.
                    </p>
                </div>

                {/* Refined Selection Panel */}
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 mb-12">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Your Comparison List ({selectedCities.length}/3)</h2>
                        <div className="bg-gray-900/50 p-4 rounded-lg min-h-[60px] flex flex-wrap items-center gap-3">
                            {selectedCities.length === 0 ? (
                                <p className="text-gray-500">Select cities from the list below to start comparing.</p>
                            ) : (
                                selectedCities.map(city => (
                                    <div key={city.name} className="flex items-center bg-[#F6520C]/80 text-white font-semibold py-1 pl-3 pr-1 rounded-full text-sm animate-fade-in">
                                        <span>{city.name}</span>
                                        <button onClick={() => handleCitySelect(city)} className="ml-2 text-white/70 hover:text-white hover:bg-black/20 rounded-full p-0.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {Object.entries(costData).map(([country, cities]) => (
                            <div key={country}>
                                <h3 className="font-bold text-lg text-gray-300 mb-2">{country}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {cities.map(city => {
                                        const isSelected = selectedCities.some(c => c.name === city.name);
                                        const isMaxed = !isSelected && selectedCities.length >= 3;
                                        return (
                                            <button 
                                                key={city.name} 
                                                onClick={() => handleCitySelect(city)}
                                                disabled={isMaxed}
                                                className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-200 ${isSelected ? 'bg-[#F6520C] text-white border-[#F6520C]' : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-[#F6520C]/50'} ${isMaxed ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700 mb-12 animate-fade-in">
                        <h2 className="text-3xl font-bold text-white text-center mb-8">Visual Cost Breakdown</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {selectedCities.map(city => {
                                const chartData = costCategories.map(category => ({
                                    name: category.charAt(0).toUpperCase() + category.slice(1),
                                    value: city.costs[category as keyof typeof city.costs]
                                }));
                                const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

                                return (
                                    <div key={city.name} className="flex flex-col items-center">
                                        <h3 className="text-xl font-semibold text-white mb-2">{city.name}</h3>
                                        <p className="text-lg font-bold text-[#F6520C] mb-4">{city.currencySymbol}{total.toLocaleString()}<span className="text-sm font-normal text-gray-400"> / month</span></p>
                                        <div style={{ width: '100%', height: 250 }}>
                                            <ResponsiveContainer>
                                                <PieChart>
                                                    <Pie
                                                        data={chartData}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                        nameKey="name"
                                                        // FIX: Explicitly typed the 'percent' property in the Pie chart's label function to resolve an arithmetic operation error where 'percent' was not being inferred as a number.
                                                        label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {chartData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        formatter={(value: number) => `${city.currencySymbol}${value.toLocaleString()}`}
                                                        contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', border: '1px solid #4a5568', borderRadius: '0.5rem' }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
                            {costCategories.map((category, index) => (
                                <div key={`legend-${index}`} className="flex items-center space-x-2">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                    <span className="text-gray-300 capitalize">{category}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Responsive Comparison Table */}
                {selectedCities.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-sm p-0 sm:p-6 rounded-lg border border-gray-700 animate-fade-in">
                        <h2 className="text-3xl font-bold text-white mb-6 px-6 sm:px-0 pt-6 sm:pt-0">Detailed Comparison Table</h2>
                        <div className="overflow-x-auto modern-scrollbar">
                            <table className="w-full min-w-[700px] border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-gray-700">
                                        <th className="p-4 text-left text-lg font-semibold text-white sticky left-0 bg-[#0a101f] z-10">Expense</th>
                                        {selectedCities.map(city => (
                                            <th key={city.name} className="p-4 text-center text-lg font-semibold text-white">
                                                {city.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {costCategories.map(category => (
                                        <tr key={category} className="border-b border-gray-800">
                                            <td className="p-4 text-gray-300 capitalize sticky left-0 bg-[#0a101f] z-10">{category}</td>
                                            {selectedCities.map(city => (
                                                <td key={city.name} className="p-4 text-center">
                                                    <div className="font-semibold text-white">{city.currencySymbol}{city.costs[category as keyof typeof city.costs].toLocaleString()}</div>
                                                    <div className="text-xs text-gray-500">₹ {(city.costs[category as keyof typeof city.costs] * conversionRates[city.currency]).toLocaleString()}</div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-800/50">
                                        <td className="p-4 text-xl font-bold text-[#F6520C] sticky left-0 bg-[#0f172a] z-10">Total (Monthly)</td>
                                        {selectedCities.map(city => {
                                            const totalLocal = Object.values(city.costs).reduce((sum: number, cost: number) => sum + cost, 0);
                                            const totalInr = totalLocal * conversionRates[city.currency];
                                            return (
                                                <td key={city.name} className="p-4 text-center bg-gray-800/50">
                                                    <div className="text-xl font-bold text-[#F6520C]">{city.currencySymbol}{totalLocal.toLocaleString()}</div>
                                                    <div className="text-sm text-gray-400 font-semibold">₹ {totalInr.toLocaleString()}</div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                
                 <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Understanding the Calculator</h2>
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
                
                <div className="mt-16 max-w-4xl mx-auto text-center">
                    <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6">
                        <h4 className="font-bold text-lg text-yellow-300 mb-2">Disclaimer</h4>
                        <p className="text-sm text-yellow-400/80">
                            The figures provided are estimates for a single student and are for informational purposes only. Actual costs can vary significantly based on individual lifestyle, accommodation choices, and spending habits. This tool should be used as a starting point for your financial planning.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CostOfLivingCalculator;