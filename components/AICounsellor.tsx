import React, { useState, useEffect } from 'react';
import { recommendCountryStream } from '../services/geminiService';

const fieldsOfInterest = ["Engineering & Technology", "Business & Management", "Medicine & Healthcare", "Arts & Humanities", "Computer Science & IT"];
const careerGoals = ["High-paying job", "Research opportunities", "Permanent Residency (PR)", "Entrepreneurship"];

const AICounsellor: React.FC = () => {
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
      setError("Sorry, our AI is currently busy helping other students. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-counsellor" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-8 md:p-12 lg:flex lg:items-center lg:space-x-12 border border-teal-500/20">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Your AI Counsellor</h2>
            <p className="text-lg text-gray-400 mt-4 mb-6">
              Leverage our generative AI to get an instant, data-driven recommendation on the best countries for your academic future.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-300 mb-1">Your Field of Interest</label>
                <select id="field" value={field} onChange={(e) => setField(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-3 text-base bg-gray-800/50 border-gray-600 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md text-white">
                  <option value="" disabled>Select a field</option>
                  {fieldsOfInterest.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-1">Your Primary Career Goal</label>
                <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-3 text-base bg-gray-800/50 border-gray-600 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md text-white">
                  <option value="" disabled>Select a goal</option>
                  {careerGoals.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-md font-semibold hover:from-teal-600 hover:to-cyan-600 transition duration-300 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transform hover:scale-105">
                {loading ? 'Analyzing...' : 'Generate Recommendation'}
              </button>
            </form>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="bg-[#0a101f] rounded-lg p-6 min-h-[300px] border border-teal-500/30 shadow-inner">
              <h3 className="font-semibold text-lg mb-4 text-white">AI Recommendation:</h3>
              {loading && !recommendation && <p className="text-gray-400 animate-pulse">Our AI is crafting your personalized recommendation...</p>}
              {error && <p className="text-red-400">{error}</p>}
              {recommendation && <div className="text-gray-300 whitespace-pre-wrap font-mono">{recommendation}<span className="inline-block w-2 h-4 bg-teal-400 animate-pulse ml-1"></span></div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICounsellor;