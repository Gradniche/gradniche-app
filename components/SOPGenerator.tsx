import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { FileText, ChevronRight, ChevronLeft, Sparkles, Upload, CheckCircle, Copy, AlertCircle, BookOpen, Briefcase, Target, Globe, User, Download, RefreshCw, Edit3, ShieldCheck, Zap, History, Lightbulb, Award, CheckCircle2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface FormData {
  fullName: string;
  targetCountry: string;
  targetUniversity: string;
  targetProgram: string;
  
  academicDegree: string;
  academicUniversity: string;
  academicGPA: string;
  academicSubjects: string;
  
  workRoles: string;
  workResponsibilities: string;
  workSkills: string;
  
  whyCourse: string;
  whyCountry: string;
  shortTermGoals: string;
  longTermGoals: string;
  achievements: string;
  challenges: string;
}

interface ResumeData {
  mimeType: string;
  data: string;
}

interface SOPVersion {
  id: string;
  timestamp: number;
  text: string;
  tone: string;
  scores: {
    clarity: number;
    personalization: number;
    impact: number;
  };
}

const SOPGenerator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatedSOP, setGeneratedSOP] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [versions, setVersions] = useState<SOPVersion[]>([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState<number>(0);
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewriteStatus, setRewriteStatus] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    targetCountry: '',
    targetUniversity: '',
    targetProgram: '',
    
    academicDegree: '',
    academicUniversity: '',
    academicGPA: '',
    academicSubjects: '',
    
    workRoles: '',
    workResponsibilities: '',
    workSkills: '',
    
    whyCourse: '',
    whyCountry: '',
    shortTermGoals: '',
    longTermGoals: '',
    achievements: '',
    challenges: '',
  });

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setResumeData({
        mimeType: file.type,
        data: base64String
      });
      setFileName(file.name);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStatus('Drafting initial SOP...');
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Act as a senior SOP writer with 10+ years experience in study abroad applications.

Your task is to deeply analyze the student profile below, identify their key strengths and story, and build a strong, highly personalized Statement of Purpose (SOP) narrative.

Student Profile:
- Full Name: ${formData.fullName}
- Target Country: ${formData.targetCountry}
- Target University: ${formData.targetUniversity}
- Target Program: ${formData.targetProgram}

Academic Background:
- Degree: ${formData.academicDegree}
- University: ${formData.academicUniversity}
- GPA/Percentage: ${formData.academicGPA}
- Key Subjects: ${formData.academicSubjects}

Professional Experience:
- Job Roles: ${formData.workRoles}
- Responsibilities: ${formData.workResponsibilities}
- Skills Gained: ${formData.workSkills}

Motivations & Personal Story:
- Why this course?: ${formData.whyCourse}
- Why this country?: ${formData.whyCountry}
- Short-term Goals: ${formData.shortTermGoals}
- Long-term Goals: ${formData.longTermGoals}
- Achievements: ${formData.achievements}
- Challenges/Gaps (and how they were overcome): ${formData.challenges}

Write a highly personalized SOP that:
- Feels human-written
- Avoids generic phrases
- Connects past, present, and future
- Clearly explains course choice and career goals

Structure (DO NOT include these as headings in the final output, just follow the flow):
1. Introduction
2. Academic background
3. Work experience
4. Why course & country
5. Career goals
6. Conclusion

Tone:
- Natural, authentic, non-robotic
- No clichés
- No AI patterns

Word limit: 800–1000 words
IMPORTANT: Do NOT use any headings or subheadings in the final output. Write it as a continuous essay with clear paragraphs.`;

      const parts: any[] = [{ text: prompt }];
      if (resumeData) {
        parts.push({ inlineData: resumeData });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts }
      });

      if (!response.text) {
        throw new Error("Failed to generate initial SOP draft. Please try again.");
      }

      setGenerationStatus('Refining and humanizing tone...');

      const refinePrompt = `Refine the following Statement of Purpose (SOP) to:
- Remove AI-like patterns and robotic phrasing
- Improve natural flow and readability
- Add human tone and sentence length variation
- Make it sound like it was written by a real, passionate student

CRITICAL INSTRUCTIONS:
- Do NOT change the core meaning, facts, or experiences.
- Only improve the tone, vocabulary, and flow.
- Do NOT add any headings or subheadings.
- Keep the word count around 800-1000 words.

Here is the draft SOP to refine:

${response.text}`;

      const finalResponse = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: refinePrompt
      });

      if (!finalResponse.text) {
        throw new Error("Failed to refine SOP. Please try again.");
      }

      setGenerationStatus('Evaluating SOP strength...');
      
      const evaluatePrompt = `Evaluate the following Statement of Purpose on three criteria: Clarity, Personalization, and Impact. 
Provide a score out of 10 for each.
Return ONLY a valid JSON object in this exact format, with no markdown formatting or backticks:
{"clarity": 8, "personalization": 9, "impact": 7}

SOP Text:
${finalResponse.text}`;

      const evalResponse = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: evaluatePrompt,
        config: { responseMimeType: "application/json" }
      });
      
      let scores = { clarity: 8, personalization: 8, impact: 8 };
      try {
        if (evalResponse.text) {
          scores = JSON.parse(evalResponse.text);
        }
      } catch (e) {
        console.error("Failed to parse scores", e);
      }

      const newVersion: SOPVersion = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        text: finalResponse.text,
        tone: 'Original',
        scores
      };

      setVersions([newVersion]);
      setCurrentVersionIndex(0);
      setGeneratedSOP(finalResponse.text);
      setStep(7); // Move to result step
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while generating your SOP.');
    } finally {
      setIsGenerating(false);
      setGenerationStatus(null);
    }
  };

  const handleRewriteTone = async (targetTone: string) => {
    setIsRewriting(true);
    setRewriteStatus(`Rewriting for ${targetTone} style...`);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const currentText = versions[currentVersionIndex].text;
      
      const prompt = `Rewrite the following Statement of Purpose (SOP) to fit the typical admission style and tone of universities in the ${targetTone}.
      
For USA: Focus on holistic profile, leadership, extracurriculars, and a strong personal narrative.
For UK: Focus heavily on academic rigor, subject passion, and independent research.
For UAE: Focus on innovation, global perspective, career readiness, and cultural adaptability.

Do not change the core facts, just adapt the tone, structure, and emphasis to match the ${targetTone} style.
Keep the word count around 800-1000 words. Do not include headings.

Original SOP:
${currentText}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt
      });

      if (response.text) {
        setRewriteStatus('Evaluating new draft...');
        const evalPrompt = `Evaluate the following Statement of Purpose on three criteria: Clarity, Personalization, and Impact. Provide a score out of 10 for each. Return ONLY a valid JSON object with keys "clarity", "personalization", "impact".
SOP Text:
${response.text}`;
        const evalResponse = await ai.models.generateContent({
          model: 'gemini-3.1-pro-preview',
          contents: evalPrompt,
          config: { responseMimeType: "application/json" }
        });
        
        let scores = { clarity: 8, personalization: 8, impact: 8 };
        try {
          if (evalResponse.text) {
            scores = JSON.parse(evalResponse.text);
          }
        } catch (e) {
          console.error("Failed to parse scores", e);
        }

        const newVersion: SOPVersion = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          text: response.text,
          tone: targetTone,
          scores
        };
        
        const newVersions = [...versions, newVersion];
        setVersions(newVersions);
        setCurrentVersionIndex(newVersions.length - 1);
        setGeneratedSOP(response.text);
        setSuggestions(null);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to rewrite SOP.");
    } finally {
      setIsRewriting(false);
      setRewriteStatus(null);
    }
  };

  const handleSuggestImprovements = async () => {
    setIsGettingSuggestions(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const currentText = versions[currentVersionIndex].text;
      
      const prompt = `Analyze the following Statement of Purpose (SOP) and provide 3-4 specific, actionable suggestions to improve it. 
Focus on narrative flow, impact, and persuasiveness.
Keep the suggestions concise and bulleted.

SOP Text:
${currentText}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt
      });

      if (response.text) {
        setSuggestions(response.text);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to get suggestions.");
    } finally {
      setIsGettingSuggestions(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedSOP) {
      navigator.clipboard.writeText(generatedSOP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById('sop-document-content');
    if (element) {
      const opt = {
        margin:       1,
        filename:     `${formData.fullName ? formData.fullName.replace(/\s+/g, '_') : 'Student'}_SOP.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  const wordCount = generatedSOP ? generatedSOP.trim().split(/\s+/).length : 0;

  const totalSteps = 6;

  return (
    <div className="min-h-screen bg-[#0a101f] text-white pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-2xl border border-blue-500/20 mb-6">
            <Sparkles className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Premium SOP Generator</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Craft a highly personalized, counselor-grade Statement of Purpose tailored for top universities globally.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Built by Study Abroad Experts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Not a generic AI SOP generator</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Based on real admission success strategies</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {step <= totalSteps && (
          <div className="mb-12 overflow-x-auto pb-4 modern-scrollbar">
            <div className="min-w-[600px]">
              <div className="flex items-center justify-between relative px-4">
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-white/5 rounded-full z-0"></div>
                <div 
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-400 rounded-full z-0 transition-all duration-500"
                  style={{ width: `calc(${((step - 1) / (totalSteps - 1)) * 100}% - ${((step - 1) / (totalSteps - 1)) * 32}px)` }}
                ></div>
                
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <div key={s} className={`relative z-10 flex flex-col items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300 ${step >= s ? 'bg-[#0a101f] border-blue-500 text-blue-400' : 'bg-[#0a101f] border-white/10 text-gray-500'}`}>
                    {step > s ? <CheckCircle className="w-5 h-5" /> : <span className="font-bold">{s}</span>}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mt-3 font-medium uppercase tracking-wider px-2">
                <span className="w-16 text-center">Basic</span>
                <span className="w-16 text-center">Academic</span>
                <span className="w-16 text-center">Work</span>
                <span className="w-16 text-center">Personal</span>
                <span className="w-16 text-center">Resume</span>
                <span className="w-16 text-center">Review</span>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-400 opacity-50"></div>
          
          {error && (
            <div className="mb-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-start gap-3 text-purple-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Step 1: Basic Details */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
                <User className="text-blue-400" /> Basic Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Country</label>
                  <select 
                    name="targetCountry" 
                    value={formData.targetCountry} 
                    onChange={handleInputChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="">Select a country...</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="Germany">Germany</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target University</label>
                  <input 
                    type="text" 
                    name="targetUniversity" 
                    value={formData.targetUniversity} 
                    onChange={handleInputChange}
                    placeholder="e.g., Stanford University, Imperial College London"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Program / Major</label>
                  <input 
                    type="text" 
                    name="targetProgram" 
                    value={formData.targetProgram} 
                    onChange={handleInputChange}
                    placeholder="e.g., MS in Computer Science, MBA"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Background */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
                <BookOpen className="text-blue-400" /> Academic Background
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Degree</label>
                  <input 
                    type="text" 
                    name="academicDegree" 
                    value={formData.academicDegree} 
                    onChange={handleInputChange}
                    placeholder="e.g., Bachelor of Technology in Computer Science"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">University / College</label>
                  <input 
                    type="text" 
                    name="academicUniversity" 
                    value={formData.academicUniversity} 
                    onChange={handleInputChange}
                    placeholder="e.g., Indian Institute of Technology"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">GPA / Percentage</label>
                  <input 
                    type="text" 
                    name="academicGPA" 
                    value={formData.academicGPA} 
                    onChange={handleInputChange}
                    placeholder="e.g., 3.8/4.0 or 85%"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Key Subjects / Relevant Coursework</label>
                  <textarea 
                    name="academicSubjects" 
                    value={formData.academicSubjects} 
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="e.g., Data Structures, Machine Learning, Operating Systems"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Work Experience */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
                <Briefcase className="text-blue-400" /> Work Experience
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Job Roles & Companies</label>
                  <textarea 
                    name="workRoles" 
                    value={formData.workRoles} 
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="e.g., Software Engineer at Google (2021-Present)"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Key Responsibilities & Projects</label>
                  <textarea 
                    name="workResponsibilities" 
                    value={formData.workResponsibilities} 
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe your main tasks, projects you led, and impact..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Skills Gained</label>
                  <textarea 
                    name="workSkills" 
                    value={formData.workSkills} 
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="e.g., Python, Team Leadership, Agile Methodologies"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Personal Questions */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
                <Target className="text-blue-400" /> Personal Questions
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Why this course?</label>
                  <textarea 
                    name="whyCourse" 
                    value={formData.whyCourse} 
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="What specific aspects of the curriculum appeal to you?"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Why this country?</label>
                  <textarea 
                    name="whyCountry" 
                    value={formData.whyCountry} 
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Why study here instead of your home country?"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Short-term Goals</label>
                    <textarea 
                      name="shortTermGoals" 
                      value={formData.shortTermGoals} 
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Goals immediately after graduation"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Long-term Goals</label>
                    <textarea 
                      name="longTermGoals" 
                      value={formData.longTermGoals} 
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Where do you see yourself in 5-10 years?"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Key Achievements</label>
                  <textarea 
                    name="achievements" 
                    value={formData.achievements} 
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Awards, publications, or significant milestones"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Challenges or Gaps (Optional)</label>
                  <textarea 
                    name="challenges" 
                    value={formData.challenges} 
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Explain any academic gaps or challenges you've overcome"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Resume Upload */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
                <FileText className="text-blue-400" /> Resume Upload
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-300">
                  Upload your Resume or CV to provide the AI with more context about your background. This helps generate a more personalized and accurate Statement of Purpose.
                </p>
                
                <div className="relative group">
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx,.txt" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`w-full border-2 border-dashed ${fileName ? 'border-blue-500/50 bg-blue-600/5' : 'border-white/20 bg-black/20 group-hover:border-white/40'} rounded-xl p-12 text-center transition-colors`}>
                    <Upload className={`w-12 h-12 mx-auto mb-4 ${fileName ? 'text-blue-400' : 'text-gray-500'}`} />
                    <p className="text-lg text-gray-200 font-medium mb-2">
                      {fileName ? fileName : 'Click or drag file to upload'}
                    </p>
                    {!fileName && <p className="text-sm text-gray-500">PDF, DOCX, or TXT (Max 5MB)</p>}
                    {fileName && <p className="text-sm text-blue-400">File selected successfully</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {step === 6 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
                <CheckCircle className="text-blue-400" /> Review Details
              </h2>
              
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5 space-y-6 text-sm max-h-[60vh] overflow-y-auto modern-scrollbar">
                
                {/* Basic Details */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 border-b border-white/10 pb-2">Basic Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="text-gray-500 block mb-1">Full Name</span><span className="font-medium text-gray-200">{formData.fullName || 'Not specified'}</span></div>
                    <div><span className="text-gray-500 block mb-1">Target Country</span><span className="font-medium text-gray-200">{formData.targetCountry || 'Not specified'}</span></div>
                    <div><span className="text-gray-500 block mb-1">Target University</span><span className="font-medium text-gray-200">{formData.targetUniversity || 'Not specified'}</span></div>
                    <div><span className="text-gray-500 block mb-1">Target Program</span><span className="font-medium text-gray-200">{formData.targetProgram || 'Not specified'}</span></div>
                  </div>
                </div>

                {/* Academic Background */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 border-b border-white/10 pb-2">Academic Background</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div><span className="text-gray-500 block mb-1">Degree</span><span className="font-medium text-gray-200">{formData.academicDegree || 'Not specified'}</span></div>
                    <div><span className="text-gray-500 block mb-1">University</span><span className="font-medium text-gray-200">{formData.academicUniversity || 'Not specified'}</span></div>
                    <div><span className="text-gray-500 block mb-1">GPA / Percentage</span><span className="font-medium text-gray-200">{formData.academicGPA || 'Not specified'}</span></div>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Key Subjects</span>
                    <p className="text-gray-300">{formData.academicSubjects || 'Not specified'}</p>
                  </div>
                </div>

                {/* Work Experience */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 border-b border-white/10 pb-2">Work Experience</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-500 block mb-1">Job Roles</span>
                      <p className="text-gray-300">{formData.workRoles || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Responsibilities</span>
                      <p className="text-gray-300">{formData.workResponsibilities || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Skills Gained</span>
                      <p className="text-gray-300">{formData.workSkills || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Personal Questions */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 border-b border-white/10 pb-2">Personal Questions</h3>
                  <div className="space-y-3">
                    <div><span className="text-gray-500 block mb-1">Why this course?</span><p className="text-gray-300">{formData.whyCourse || 'Not specified'}</p></div>
                    <div><span className="text-gray-500 block mb-1">Why this country?</span><p className="text-gray-300">{formData.whyCountry || 'Not specified'}</p></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><span className="text-gray-500 block mb-1">Short-term Goals</span><p className="text-gray-300">{formData.shortTermGoals || 'Not specified'}</p></div>
                      <div><span className="text-gray-500 block mb-1">Long-term Goals</span><p className="text-gray-300">{formData.longTermGoals || 'Not specified'}</p></div>
                    </div>
                    <div><span className="text-gray-500 block mb-1">Achievements</span><p className="text-gray-300">{formData.achievements || 'Not specified'}</p></div>
                    <div><span className="text-gray-500 block mb-1">Challenges/Gaps</span><p className="text-gray-300">{formData.challenges || 'None specified'}</p></div>
                  </div>
                </div>

                {/* Resume */}
                {fileName && (
                  <div className="pt-2 flex items-center gap-2 text-blue-400">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">Resume attached: {fileName}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 7: Result */}
          {step === 7 && generatedSOP && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Sparkles className="text-blue-400" /> Your Premium SOP
                  </h2>
                  <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    Crafted using expert admission insights
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    onClick={() => setStep(6)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Details
                  </button>
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} /> 
                    {isGenerating ? 'Regenerating...' : 'Regenerate'}
                  </button>
                  <button 
                    onClick={downloadPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-blue-500/20"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                </div>
              </div>

              {/* Score Cards */}
              {versions[currentVersionIndex] && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-gray-400 text-sm mb-1 flex items-center gap-1"><BookOpen className="w-4 h-4"/> Clarity</div>
                    <div className="text-3xl font-bold text-white">{versions[currentVersionIndex].scores.clarity}<span className="text-lg text-gray-500">/10</span></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-gray-400 text-sm mb-1 flex items-center gap-1"><User className="w-4 h-4"/> Personalization</div>
                    <div className="text-3xl font-bold text-white">{versions[currentVersionIndex].scores.personalization}<span className="text-lg text-gray-500">/10</span></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-gray-400 text-sm mb-1 flex items-center gap-1"><Zap className="w-4 h-4"/> Impact</div>
                    <div className="text-3xl font-bold text-white">{versions[currentVersionIndex].scores.impact}<span className="text-lg text-gray-500">/10</span></div>
                  </div>
                </div>
              )}

              {/* Tone Switch & Version History */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-gray-400 flex items-center gap-2"><Globe className="w-4 h-4"/> Tone:</span>
                  <div className="flex bg-black/40 rounded-lg p-1">
                    {['Original', 'USA', 'UK', 'UAE'].map(tone => (
                      <button
                        key={tone}
                        onClick={() => {
                          if (tone !== 'Original' && tone !== versions[currentVersionIndex]?.tone) {
                            handleRewriteTone(tone);
                          }
                        }}
                        disabled={isRewriting}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${versions[currentVersionIndex]?.tone === tone ? 'bg-blue-600 text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/10'} ${tone === 'Original' ? 'pointer-events-none' : ''}`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                  {isRewriting && <span className="text-xs text-blue-400 animate-pulse">{rewriteStatus}</span>}
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 flex items-center gap-2"><History className="w-4 h-4"/> Version:</span>
                  <select 
                    className="bg-black/40 border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                    value={currentVersionIndex}
                    onChange={(e) => {
                      const idx = parseInt(e.target.value);
                      setCurrentVersionIndex(idx);
                      setGeneratedSOP(versions[idx].text);
                      setSuggestions(null);
                    }}
                  >
                    {versions.map((v, idx) => (
                      <option key={v.id} value={idx}>
                        Draft {idx + 1} ({v.tone}) - {new Date(v.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Suggestions Panel */}
              <div className="mb-6">
                {!suggestions ? (
                  <button 
                    onClick={handleSuggestImprovements}
                    disabled={isGettingSuggestions || isRewriting}
                    className="w-full py-4 border border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/5 flex items-center justify-center gap-2 transition-all"
                  >
                    {isGettingSuggestions ? (
                      <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> Analyzing SOP...</>
                    ) : (
                      <><Lightbulb className="w-5 h-5 text-blue-500" /> Get Expert Suggestions to Improve</>
                    )}
                  </button>
                ) : (
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-blue-500/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-blue-500" /> Expert Suggestions
                    </h3>
                    <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                      {suggestions.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Document Container */}
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Top decorative bar */}
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-400"></div>
                
                {/* Toolbar inside document */}
                <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="text-sm font-medium text-gray-500">
                    Word Count: <span className="text-gray-900">{wordCount} words</span>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-md transition-colors text-xs font-medium shadow-sm"
                  >
                    {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>

                {/* Actual Document Content */}
                <div 
                  id="sop-document-content" 
                  className="p-8 md:p-12 lg:p-16 max-h-[70vh] overflow-y-auto modern-scrollbar bg-white"
                >
                  <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-slate max-w-none">
                      {generatedSOP.split('\n\n').map((paragraph, idx) => (
                        <p 
                          key={idx} 
                          className="text-gray-800 leading-loose font-serif text-[1.1rem] mb-6 text-justify"
                        >
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => {
                    setStep(1);
                    setGeneratedSOP(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium underline underline-offset-4"
                >
                  Start Over Completely
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step <= totalSteps && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
              <button
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                disabled={step === 1 || isGenerating}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>

              {step < totalSteps ? (
                <button
                  onClick={() => setStep(prev => Math.min(totalSteps, prev + 1))}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold transition-all"
                >
                  Next Step <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-70"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {generationStatus || 'Generating...'}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> Generate Premium SOP
                    </>
                  )}
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SOPGenerator;
