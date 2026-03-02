
import React, { useState, useEffect, useMemo } from 'react';
import { analyzeSOPStream } from '../services/geminiService';

interface AISOPSnalyzerProps {
  onBack: () => void;
}

interface ParaphraseInsight {
    originalSentence: string;
    suggestion: string;
    reason: string;
}

interface AnalysisResult {
    overallScore: number;
    summary: string;
    clarity: { score: number; feedback: string };
    storytelling: { score: number; feedback: string };
    grammar: { score: number; feedback: string };
    impact: { score: number; feedback: string };
    aiContentAnalysis: { score: number; feedback: string };
    plagiarismAnalysis: { score: number; feedback: string };
    paraphraseInsights?: ParaphraseInsight[];
}

const faqData = [
    { question: "What should be the ideal length of an SOP?", answer: "Most universities recommend an SOP to be between 800-1200 words, or 1.5-2 pages with standard formatting. Always check the specific guidelines of the university and program you are applying to, as some may have strict word or character limits." },
    { question: "How is this AI analysis different from a grammar checker?", answer: "While a grammar checker like Grammarly focuses on syntax, spelling, and punctuation, our AI SOP Analyzer goes much deeper. It evaluates the core components of a compelling SOP, such as the structure, storytelling, clarity of motivation, and overall impact, providing feedback similar to what an admissions officer might look for." },
    { question: "Is my SOP data saved?", answer: "No. Your privacy is paramount. The SOP text you enter is sent to the AI for analysis but is not stored or used for any other purpose. Each analysis is a one-time, stateless transaction." }
];

const ScoreGauge: React.FC<{ score: number, title: string }> = ({ score, title }) => {
    const percentage = score;
    let colorClass = 'text-green-400';
    if (percentage < 75) colorClass = 'text-yellow-400';
    if (percentage < 50) colorClass = 'text-red-400';

    return (
        <div className="relative w-48 h-24 mx-auto">
            <svg viewBox="0 0 100 50" className="w-full h-full">
                <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="#4a5568" strokeWidth="8" fill="none" />
                <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="125.6"
                    strokeDashoffset={125.6 - (percentage / 100 * 125.6)}
                    className={`transition-all duration-1000 ease-out ${colorClass}`}
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 flex flex-col items-center justify-center w-full">
                <span className={`text-4xl font-bold ${colorClass}`}>{score}</span>
                <span className="text-xs text-gray-400 -mt-1">/ 100</span>
            </div>
             <p className="text-sm text-gray-300 font-semibold text-center mt-1">{title}</p>
        </div>
    );
};

const FeedbackCard: React.FC<{ title: string; score: number; feedback: string; }> = ({ title, score, feedback }) => {
     let colorClass = 'border-green-500/50';
    if (score < 8) colorClass = 'border-yellow-500/50';
    if (score < 5) colorClass = 'border-red-500/50';
    return(
        <div className={`bg-gray-800/50 p-4 rounded-lg border-l-4 ${colorClass}`}>
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-white">{title}</h4>
                <span className={`text-xl font-bold ${score >= 8 ? 'text-green-400' : score >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>{score}/10</span>
            </div>
            <p className="text-gray-400 text-sm">{feedback}</p>
        </div>
    );
};

const OriginalityMeter: React.FC<{ score: number, title: string }> = ({ score, title }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let colorClass = 'stroke-green-500';
    if (score > 30) colorClass = 'stroke-yellow-500';
    if (score > 60) colorClass = 'stroke-red-500';

    let textColorClass = 'text-green-400';
    if (score > 30) textColorClass = 'text-yellow-400';
    if (score > 60) textColorClass = 'text-red-400';

    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
                    <circle
                        className={`${colorClass} transition-all duration-1000 ease-out`}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                        transform="rotate(-90 60 60)"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${textColorClass}`}>{score}%</span>
                </div>
            </div>
            <h4 className="text-md font-semibold text-white mt-3">{title}</h4>
        </div>
    );
};


const AISOPSnalyzer: React.FC<AISOPSnalyzerProps> = ({ onBack }) => {
    const [sopText, setSopText] = useState('');
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const wordCount = useMemo(() => sopText.trim().split(/\s+/).filter(Boolean).length, [sopText]);

    useEffect(() => {
        // Add JSON-LD Structured Data for SEO
        const scriptId = 'sop-analyzer-structured-data';
        document.getElementById(scriptId)?.remove();

        const howToData = {
            "@context": "https://schema.org", "@type": "HowTo", "name": "How to Use the AI SOP Analyzer",
            "step": [
                { "@type": "HowToStep", "name": "Paste Your SOP", "text": "Copy and paste your complete Statement of Purpose into the text editor." },
                { "@type": "HowToStep", "name": "Analyze", "text": "Click the 'Analyze My SOP' button to submit your essay for AI-powered feedback." },
                { "@type": "HowToStep", "name": "Review Feedback", "text": "Receive an overall score and a detailed breakdown of your SOP's strengths and weaknesses across key criteria like clarity, storytelling, and grammar."}
            ]
        };
        const faqJsonData = {
            "@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({"@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer }}))
        };
        
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify([howToData, faqJsonData]);
        document.head.appendChild(script);

        return () => { document.getElementById(scriptId)?.remove(); };
    }, []);

    const handleAnalyze = async () => {
        if (wordCount < 100) {
            setError("Please provide an SOP with at least 100 words for an effective analysis.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        let fullResponse = '';

        try {
            const stream = await analyzeSOPStream(sopText);
            for await (const chunk of stream) {
                fullResponse += chunk;
            }
            // Sanitize the response to remove markdown backticks if any
            const cleanedResponse = fullResponse.replace(/```json|```/g, '').trim();
            const result: AnalysisResult = JSON.parse(cleanedResponse);
            setAnalysis(result);
        } catch (err) {
            console.error(err);
            setError("An error occurred while analyzing your SOP. The AI may be busy or the response was not in the correct format. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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
                        <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">AI Tool</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>AI SOP Analyzer</h1>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl mx-auto font-light leading-relaxed">
                        Elevate your Statement of Purpose. Get instant, in-depth feedback on structure, storytelling, and impact.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Input Panel */}
                    <div className="bg-white/[0.02] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl flex flex-col">
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Paste Your SOP Here</h2>
                        <div className="relative flex-grow flex flex-col">
                            <textarea
                                value={sopText}
                                onChange={(e) => setSopText(e.target.value)}
                                placeholder="Paste your Statement of Purpose here..."
                                className="w-full flex-grow min-h-[400px] bg-black/20 p-6 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#F6520C]/50 focus:border-[#F6520C]/50 text-gray-300 resize-none font-light leading-relaxed modern-scrollbar transition-all duration-300"
                                aria-label="Statement of Purpose Text Area"
                            />
                            <div className="absolute bottom-4 right-4 text-sm text-gray-400 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                {wordCount} words
                            </div>
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={isLoading || wordCount < 100}
                            className="w-full mt-8 bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    <span>Analyzing...</span>
                                </span>
                            ) : 'Analyze My SOP'}
                        </button>
                    </div>
                    {/* Results Panel */}
                    <div className="bg-white/[0.02] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl min-h-[500px] flex flex-col">
                        {isLoading && (
                            <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-400 animate-pulse">
                                <div className="w-20 h-20 bg-[#F6520C]/10 rounded-full flex items-center justify-center mb-6 border border-[#F6520C]/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846-.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                                </div>
                                <p className="text-lg font-light max-w-sm">Our AI is reading your SOP and preparing detailed feedback. This may take a moment...</p>
                            </div>
                        )}
                        {error && !isLoading && (
                            <div className="flex-grow flex flex-col items-center justify-center text-center">
                                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl max-w-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <h3 className="font-bold text-white text-xl mb-2">Analysis Failed</h3>
                                    <p className="text-red-400/80 font-light">{error}</p>
                                </div>
                            </div>
                        )}
                        {!isLoading && !analysis && !error && (
                             <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500">
                                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <p className="text-lg font-light">Your analysis results will appear here.</p>
                            </div>
                        )}
                        {analysis && (
                            <div className="animate-fade-in space-y-8 max-h-[600px] overflow-y-auto pr-4 modern-scrollbar">
                                <h2 className="text-3xl font-bold text-white text-center tracking-tight sticky top-0 bg-[#0a101f]/90 backdrop-blur-md py-4 z-10 border-b border-white/5">Your SOP Report</h2>
                                
                                {/* Section 1: Overall Score & Summary */}
                                <div className="bg-black/20 p-8 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white text-center mb-6 tracking-tight">Overall Score & Summary</h3>
                                    <ScoreGauge score={analysis.overallScore} title="Overall Score" />
                                    <div className="bg-white/5 p-6 rounded-xl mt-8 border border-white/5">
                                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F6520C]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                            Key Takeaways
                                        </h4>
                                        <p className="text-gray-300 font-light leading-relaxed">{analysis.summary}</p>
                                    </div>
                                </div>

                                {/* Section 2: Originality Report */}
                                <div className="bg-black/20 p-8 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white text-center mb-8 tracking-tight">Originality & Authenticity</h3>
                                    <div className="flex flex-col sm:flex-row justify-around items-center gap-8">
                                        <div className="w-full sm:w-1/2 flex justify-center">
                                            <OriginalityMeter title="AI Content Score" score={analysis.aiContentAnalysis.score} />
                                        </div>
                                        <div className="w-full sm:w-1/2 flex justify-center">
                                            <OriginalityMeter title="Plagiarism Score" score={analysis.plagiarismAnalysis.score} />
                                        </div>
                                    </div>
                                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <p className="text-gray-400 text-sm font-light text-center bg-white/5 p-3 rounded-lg">{analysis.aiContentAnalysis.feedback}</p>
                                        <p className="text-gray-400 text-sm font-light text-center bg-white/5 p-3 rounded-lg">{analysis.plagiarismAnalysis.feedback}</p>
                                    </div>
                                </div>
                                
                                {/* Section 3: Detailed Feedback */}
                                <div className="bg-black/20 p-8 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white text-center mb-6 tracking-tight">Detailed Feedback</h3>
                                    <div className="space-y-4">
                                      <FeedbackCard title="Clarity & Structure" score={analysis.clarity.score} feedback={analysis.clarity.feedback} />
                                      <FeedbackCard title="Storytelling & Motivation" score={analysis.storytelling.score} feedback={analysis.storytelling.feedback} />
                                      <FeedbackCard title="Grammar & Tone" score={analysis.grammar.score} feedback={analysis.grammar.feedback} />
                                      <FeedbackCard title="Overall Impact" score={analysis.impact.score} feedback={analysis.impact.feedback} />
                                    </div>
                                </div>
                                
                                {/* Section 4: Writing Suggestions */}
                                {analysis.paraphraseInsights && analysis.paraphraseInsights.length > 0 && (
                                    <div className="bg-gradient-to-br from-orange-500/10 to-pink-600/10 p-8 rounded-2xl border border-orange-500/20">
                                        <h3 className="text-xl font-bold text-white text-center mb-6 tracking-tight flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            AI Writing Suggestions
                                        </h3>
                                        <div className="space-y-6">
                                            {analysis.paraphraseInsights.map((insight, index) => (
                                                <div key={index} className="bg-black/20 p-5 rounded-xl border border-white/5">
                                                    <div className="mb-4">
                                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Original</p>
                                                        <p className="text-gray-400 font-light italic border-l-2 border-gray-600 pl-3 py-1">"{insight.originalSentence}"</p>
                                                    </div>
                                                    <div className="mb-4">
                                                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Suggestion</p>
                                                        <p className="text-emerald-100 font-medium border-l-2 border-emerald-500 pl-3 py-1">"{insight.suggestion}"</p>
                                                    </div>
                                                    <div className="bg-white/5 p-3 rounded-lg">
                                                        <p className="text-sm text-gray-300 font-light"><span className="font-semibold text-white">Why:</span> {insight.reason}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AISOPSnalyzer;
