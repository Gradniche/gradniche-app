import React, { useState } from 'react';
import { recommendCountryStream } from '../services/geminiService';

const fieldsOfInterest = ["Engineering & Technology", "Business & Management", "Medicine & Healthcare", "Arts & Humanities", "Computer Science & IT"];
const careerGoals = ["High-paying job", "Research opportunities", "Permanent Residency (PR)", "Entrepreneurship"];

const AIDestinationFinder: React.FC = () => {
  const [field, setField] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!field || !goal) {
      setError("Please select both your field of interest and career goal.");
      return;
    }
    setError("");
    setLoading(true);
    setRecommendation("");

    try {
      const stream = await recommendCountryStream(field, goal);
      for await (const chunk of stream) {
        setRecommendation((prev) => prev + chunk);
      }
    } catch (err) {
      setError("Sorry, our AI is currently busy. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-finder" className="py-24 relative bg-[#0a101f] overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 lg:flex lg:items-stretch lg:space-x-12 border border-white/5">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 w-fit">
              <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">AI Assistant</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>AI Destination Finder</h2>
            <p className="text-lg text-gray-400 mb-8 font-light leading-relaxed">
              Unsure where to start? Our AI can help. Get an instant, data-driven recommendation on the best countries for your academic future.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Your Field of Interest</label>
                <select id="field" value={field} onChange={(e) => setField(e.target.value)} className="mt-1 block w-full px-5 py-4 text-base bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#F6520C]/50 focus:border-[#F6520C]/50 rounded-xl text-white transition-all duration-300 appearance-none">
                  <option value="" disabled className="text-gray-500">Select a field</option>
                  {fieldsOfInterest.map(f => <option key={f} value={f} className="text-black">{f}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Your Primary Career Goal</label>
                <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-1 block w-full px-5 py-4 text-base bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#F6520C]/50 focus:border-[#F6520C]/50 rounded-xl text-white transition-all duration-300 appearance-none">
                  <option value="" disabled className="text-gray-500">Select a goal</option>
                  {careerGoals.map(g => <option key={g} value={g} className="text-black">{g}</option>)}
                </select>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none mt-4">
                {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Analyzing...</span>
                    </span>
                ) : 'Find My Destination'}
              </button>
            </form>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex flex-col">
            <div className="bg-black/20 rounded-2xl p-8 min-h-[400px] border border-white/5 shadow-inner flex-grow flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
              <h3 className="font-bold text-xl mb-6 text-white tracking-tight flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                AI Recommendation
              </h3>
              
              <div className="flex-grow flex flex-col justify-center">
                  {loading && !recommendation && (
                      <div className="flex flex-col items-center justify-center text-center text-gray-400 animate-pulse">
                          <div className="w-16 h-16 bg-[#F6520C]/10 rounded-full flex items-center justify-center mb-4 border border-[#F6520C]/20">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846-.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                          </div>
                          <p className="font-light">Crafting your personalized recommendation...</p>
                      </div>
                  )}
                  {error && (
                      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <p className="text-red-400/80 font-light">{error}</p>
                      </div>
                  )}
                  {!loading && !recommendation && !error && (
                      <div className="flex flex-col items-center justify-center text-center text-gray-500">
                          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          </div>
                          <p className="font-light">Your recommendation will appear here.</p>
                      </div>
                  )}
                  {recommendation && (
                      <div className="text-gray-300 whitespace-pre-wrap font-light leading-relaxed h-full overflow-y-auto pr-2 modern-scrollbar">
                          {recommendation}
                          <span className="inline-block w-2 h-4 bg-[#F6520C] animate-pulse ml-1 align-middle"></span>
                      </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDestinationFinder;