import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    <section id="ai-finder" className="py-32 relative bg-[#050810] overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"
      ></motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 md:p-16 lg:flex lg:items-stretch lg:space-x-16 border border-white/5 relative overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>

          <div className="lg:w-1/2 flex flex-col justify-center relative z-10">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-8 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">AI Assistant</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Find Your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Perfect</span> Destination.
            </h2>
            
            <p className="text-lg text-gray-400 mb-10 font-light leading-relaxed max-w-lg">
              Unsure where to start? Let our AI analyze your goals and recommend the best countries for your academic future.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div className="group">
                <label htmlFor="field" className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">Your Field of Interest</label>
                <div className="relative">
                    <select id="field" value={field} onChange={(e) => setField(e.target.value)} className="block w-full px-6 py-4 text-base bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-2xl text-white transition-all duration-300 appearance-none cursor-pointer">
                    <option value="" disabled className="text-gray-500">Select a field</option>
                    {fieldsOfInterest.map(f => <option key={f} value={f} className="text-black">{f}</option>)}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </div>
                </div>
              </div>
              
              <div className="group">
                <label htmlFor="goal" className="block text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">Your Primary Career Goal</label>
                <div className="relative">
                    <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} className="block w-full px-6 py-4 text-base bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 rounded-2xl text-white transition-all duration-300 appearance-none cursor-pointer">
                    <option value="" disabled className="text-gray-500">Select a goal</option>
                    {careerGoals.map(g => <option key={g} value={g} className="text-black">{g}</option>)}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={loading} 
                className="w-full bg-blue-600 text-white px-8 py-5 rounded-2xl font-bold hover:bg-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)]"
              >
                {loading ? (
                    <span className="flex items-center justify-center space-x-3">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Analyzing Profile...</span>
                    </span>
                ) : 'Generate Recommendation'}
              </motion.button>
            </form>
          </div>

          <div className="lg:w-1/2 mt-16 lg:mt-0 flex flex-col relative z-10">
            <div className="bg-black/40 rounded-[2rem] p-8 md:p-10 min-h-[450px] border border-white/5 shadow-inner flex-grow flex flex-col relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
              
              <h3 className="font-bold text-xl mb-8 text-white tracking-tight flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                AI Analysis
              </h3>
              
              <div className="flex-grow flex flex-col justify-center relative">
                  {loading && !recommendation && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center text-center text-gray-400"
                      >
                          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20 relative">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-2 border-blue-500 rounded-full"
                              ></motion.div>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846-.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                          </div>
                          <p className="font-light text-lg">Synthesizing global data...</p>
                      </motion.div>
                  )}
                  {error && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl text-center"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <p className="text-red-400 font-light">{error}</p>
                      </motion.div>
                  )}
                  {!loading && !recommendation && !error && (
                      <div className="flex flex-col items-center justify-center text-center text-gray-500">
                          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          </div>
                          <p className="font-light text-lg">Your personalized recommendation will appear here.</p>
                      </div>
                  )}
                  {recommendation && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-300 whitespace-pre-wrap font-light leading-relaxed h-full overflow-y-auto pr-4 modern-scrollbar text-lg"
                      >
                          {recommendation}
                          <span className="inline-block w-2 h-5 bg-blue-500 animate-pulse ml-1 align-middle"></span>
                      </motion.div>
                  )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIDestinationFinder;
