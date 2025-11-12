
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
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>
                
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">AI SOP Analyzer</h1>
                </div>

                {/* SEO Intro Section */}
                <div className="max-w-4xl mx-auto my-8 bg-white/5 backdrop-blur-sm border border-gray-700 p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-center text-[#F6520C] mb-4">Elevate Your Statement of Purpose with AI</h2>
                    <p className="text-center text-gray-300">
                        Is your SOP strong enough to impress the admissions committee? Our advanced AI tool goes beyond simple grammar checks. Get instant, in-depth feedback on your essay's structure, storytelling, and impact. We also provide a crucial originality report, checking for signs of AI-generated content and plagiarism, ensuring your unique voice shines through.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Panel */}
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                        <h2 className="text-2xl font-semibold text-white mb-4">Paste Your SOP Here</h2>
                        <div className="relative">
                            <textarea
                                value={sopText}
                                onChange={(e) => setSopText(e.target.value)}
                                placeholder="Paste your Statement of Purpose here..."
                                className="w-full h-96 bg-gray-900/50 p-4 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-gray-300 resize-none"
                                aria-label="Statement of Purpose Text Area"
                            />
                            <div className="absolute bottom-3 right-3 text-sm text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                                {wordCount} words
                            </div>
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={isLoading}
                            className="w-full mt-6 bg-[#F6520C] text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Analyzing...' : 'Analyze My SOP'}
                        </button>
                    </div>
                    {/* Results Panel */}
                    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 min-h-[500px] flex flex-col justify-center">
                        {isLoading && (
                            <div className="text-center text-gray-400 animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-[#F6520C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846-.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                                <p>Our AI is reading your SOP and preparing detailed feedback. This may take a moment...</p>
                            </div>
                        )}
                        {error && !isLoading && (
                            <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-md">
                                <h3 className="font-bold text-lg mb-2">Analysis Failed</h3>
                                <p>{error}</p>
                            </div>
                        )}
                        {!isLoading && !analysis && !error && (
                             <div className="text-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                <p>Your analysis results will appear here.</p>
                            </div>
                        )}
                        {analysis && (
                            <div className="animate-fade-in space-y-6 max-h-[80vh] overflow-y-auto pr-2">
                                <h2 className="text-3xl font-bold text-white text-center">Your SOP Report</h2>
                                
                                {/* Section 1: Overall Score & Summary */}
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                                    <h3 className="text-xl font-bold text-white text-center mb-4">Overall Score & Summary</h3>
                                    <ScoreGauge score={analysis.overallScore} title="Overall Score" />
                                    <div className="bg-white/5 p-4 rounded-lg mt-4">
                                        <h4 className="font-semibold text-white mb-1">Key Takeaways</h4>
                                        <p className="text-sm text-gray-300">{analysis.summary}</p>
                                    </div>
                                </div>

                                {/* Section 2: Originality Report */}
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                                    <h3 className="text-xl font-bold text-white text-center mb-4">Originality & Authenticity Report</h3>
                                    <div className="flex justify-around items-start text-center">
                                        <div className="px-2">
                                            <OriginalityMeter title="AI Content Score" score={analysis.aiContentAnalysis.score} />
                                            <p className="text-gray-400 text-xs mt-2">{analysis.aiContentAnalysis.feedback}</p>
                                        </div>
                                        <div className="px-2">
                                            <OriginalityMeter title="Plagiarism Score" score={analysis.plagiarismAnalysis.score} />
                                            <p className="text-gray-400 text-xs mt-2">{analysis.plagiarismAnalysis.feedback}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Section 3: Detailed Feedback */}
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                                    <h3 className="text-xl font-bold text-white text-center mb-4">Detailed Feedback</h3>
                                    <div className="space-y-3">
                                      <FeedbackCard title="Clarity & Structure" score={analysis.clarity.score} feedback={analysis.clarity.feedback} />
                                      <FeedbackCard title="Storytelling & Motivation" score={analysis.storytelling.score} feedback={analysis.storytelling.feedback} />
                                      <FeedbackCard title="Grammar & Tone" score={analysis.grammar.score} feedback={analysis.grammar.feedback} />
                                      <FeedbackCard title="Overall Impact" score={analysis.impact.score} feedback={analysis.impact.feedback} />
                                    </div>
                                </div>
                                
                                {/* Section 4: Writing Suggestions */}
                                {analysis.paraphraseInsights && analysis.paraphraseInsights.length > 0 && (
                                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                                        <h3 className="text-xl font-bold text-white text-center mb-4">AI Writing Suggestions</h3>
                                        <div className="space-y-4">
                                            {analysis.paraphraseInsights.map((insight, index) => (
                                                <div key={index} className="border-t border-gray-700 pt-3 first:border-t-0 first:pt-0">
                                                    <p className="text-sm text-gray-500 italic">Original:</p>
                                                    <blockquote className="border-l-2 border-gray-600 pl-2 text-gray-400 text-sm my-1">"{insight.originalSentence}"</blockquote>
                                                    <p className="text-sm text-green-400 font-semibold mt-2">Suggestion:</p>
                                                    <blockquote className="border-l-2 border-green-500 pl-2 text-green-300 text-sm my-1">"{insight.suggestion}"</blockquote>
                                                    <p className="text-xs text-gray-400 mt-2"><span className="font-bold">Reason:</span> {insight.reason}</p>
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
