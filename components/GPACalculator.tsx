


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Plus, Trash2, ArrowLeft, Info, ChevronDown, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  credits: string;
  grade: string;
}

type GradeScale = 'percentage' | '10-point' | 'letter';

interface GPACalculatorProps {
  onBack: () => void;
  navigate: (path: string) => void;
}

const getGradePoint = (grade: string, scale: GradeScale): number | null => {
  const numGrade = parseFloat(grade);
  switch (scale) {
    case 'percentage':
      if (isNaN(numGrade) || numGrade < 0 || numGrade > 100) return null;
      if (numGrade >= 80) return 4.0;
      if (numGrade >= 75) return 3.5;
      if (numGrade >= 70) return 3.0;
      if (numGrade >= 65) return 2.5;
      if (numGrade >= 60) return 2.0;
      if (numGrade >= 55) return 1.5;
      if (numGrade >= 50) return 1.0;
      return 0.0;
    case '10-point':
      if (isNaN(numGrade) || numGrade < 0 || numGrade > 10) return null;
      return Math.min(4.0, numGrade * 0.4);
    case 'letter':
      const upperGrade = grade.toUpperCase();
      if (['A+', 'A'].includes(upperGrade)) return 4.0;
      if (upperGrade === 'A-') return 3.7;
      if (upperGrade === 'B+') return 3.3;
      if (upperGrade === 'B') return 3.0;
      if (upperGrade === 'B-') return 2.7;
      if (upperGrade === 'C+') return 2.3;
      if (upperGrade === 'C') return 2.0;
      if (upperGrade === 'D') return 1.0;
      if (upperGrade === 'F') return 0.0;
      return null;
    default:
      return null;
  }
};

const GradeScaleSelector: React.FC<{ selected: GradeScale; onSelect: (scale: GradeScale) => void }> = ({ selected, onSelect }) => {
    const scales: {id: GradeScale, label: string}[] = [
        { id: 'percentage', label: 'Percentage (0-100)'},
        { id: '10-point', label: '10-Point'},
        { id: 'letter', label: 'Letter (A-F)'}
    ];

    return (
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 relative overflow-hidden">
            {scales.map(scale => (
                <button 
                    key={scale.id} 
                    onClick={() => onSelect(scale.id)} 
                    className={`relative flex-1 text-center py-2.5 text-sm font-medium rounded-lg transition-colors z-10 ${selected === scale.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    {selected === scale.id && (
                        <motion.div
                            layoutId="activeScale"
                            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 rounded-lg -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    {scale.label}
                </button>
            ))}
        </div>
    )
};

const GPAGauge: React.FC<{ gpa: number }> = ({ gpa }) => {
    const gpaPercentage = (gpa / 4.0) * 100;
    const rotation = (gpa / 4.0) * 180 - 90;

    return (
        <div className="relative w-full max-w-[280px] aspect-[2/1] mx-auto mb-6">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="gpa-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
                        <stop offset="50%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#22c55e', stopOpacity: 1}} />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                {/* Background Track */}
                <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" fill="none" />
                
                {/* Animated Value Track */}
                <motion.path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    stroke="url(#gpa-gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="125.6"
                    initial={{ strokeDashoffset: 125.6 }}
                    animate={{ strokeDashoffset: 125.6 - (gpaPercentage / 100 * 125.6) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    filter="url(#glow)"
                />
            </svg>
            
            {/* Needle */}
            <motion.div
                className="absolute bottom-0 left-1/2 w-1 h-12 bg-white rounded-t-full origin-bottom z-10"
                initial={{ transform: `translateX(-50%) rotate(-90deg)` }}
                animate={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
                transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.2 }}
                style={{ boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}
            />
            {/* Needle Center */}
            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full z-20 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
        </div>
    );
};

const GPABreakdown: React.FC<{ gpa: number }> = ({ gpa }) => {
    let breakdown: { title: string; description: string; color: string; icon: React.ReactNode };

    if (gpa >= 3.7) {
        breakdown = { title: "Excellent", description: "Highly competitive for top-tier universities worldwide.", color: "text-green-400", icon: <Sparkles className="w-5 h-5 text-green-400" /> };
    } else if (gpa >= 3.3) {
        breakdown = { title: "Good", description: "A strong GPA. Competitive for many excellent universities.", color: "text-yellow-400", icon: <GraduationCap className="w-5 h-5 text-yellow-400" /> };
    } else if (gpa >= 2.7) {
        breakdown = { title: "Average", description: "Acceptable for many good universities. Highlight other strengths.", color: "text-orange-400", icon: <Info className="w-5 h-5 text-orange-400" /> };
    } else {
        breakdown = { title: "Needs Improvement", description: "May be below minimum requirements. Consider retaking exams.", color: "text-red-400", icon: <Info className="w-5 h-5 text-red-400" /> };
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 text-left"
        >
            <div className="mt-1 p-2 bg-white/5 rounded-full shrink-0">
                {breakdown.icon}
            </div>
            <div>
                <h4 className={`text-lg font-semibold tracking-tight mb-1 ${breakdown.color}`}>{breakdown.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{breakdown.description}</p>
            </div>
        </motion.div>
    );
};

const faqData = [
    { question: "Why is GPA important for studying abroad?", answer: "GPA (Grade Point Average) is a standardized way for universities to assess your academic performance. A high GPA demonstrates your ability to handle challenging coursework and is a key factor in admissions decisions, especially for competitive programs." },
    { question: "How do US universities view Indian percentage/10-point grades?", answer: "Admissions committees are familiar with Indian grading systems. However, they will convert your scores to the 4.0 scale for standardized evaluation. This tool helps you see how your grades might be interpreted." },
    { question: "Can a low GPA be compensated by other parts of the application?", answer: "Yes, to an extent. A strong GRE/GMAT score, relevant work experience, impactful research or projects, and a compelling Statement of Purpose can help offset a lower GPA. However, most universities have a minimum GPA requirement you must meet." }
];

const AccordionItem: React.FC<{ faq: { question: string, answer: string }, isOpen: boolean, onClick: () => void }> = ({ faq, isOpen, onClick }) => (
    <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-6 focus:outline-none group"
            aria-expanded={isOpen}
        >
            <span className={`text-lg font-medium tracking-tight transition-colors ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{faq.question}</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-white' : 'group-hover:text-gray-300'}`} />
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2 font-light">
                        <p>{faq.answer}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);


const GPACalculator: React.FC<GPACalculatorProps> = ({ onBack, navigate }) => {
    const [mode, setMode] = useState<'simple' | 'advanced'>('simple');
    const [simpleGrade, setSimpleGrade] = useState('');
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, name: '', credits: '', grade: '' },
        { id: 2, name: '', credits: '', grade: '' },
        { id: 3, name: '', credits: '', grade: '' },
    ]);
    const [scale, setScale] = useState<GradeScale>('percentage');
    const [gpa, setGpa] = useState<number | null>(null);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    const [isCalculating, setIsCalculating] = useState(false);
    
    useEffect(() => {
        const scriptId = 'gpa-calculator-structured-data';
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

    // Auto-calculate when inputs change if we already calculated once
    useEffect(() => {
        if (gpa !== null) {
            calculateGPA(false);
        }
    }, [courses, scale, simpleGrade, mode]);

    const handleCourseChange = (id: number, field: 'name' | 'credits' | 'grade', value: string) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const addCourse = () => {
        setCourses([...courses, { id: Date.now(), name: '', credits: '', grade: '' }]);
    };
    
    const removeCourse = (id: number) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const calculateGPA = (animate = true) => {
        if (animate) setIsCalculating(true);
        
        setTimeout(() => {
            if (mode === 'simple') {
                const point = getGradePoint(simpleGrade, scale);
                setGpa(point);
            } else {
                let totalPoints = 0;
                let totalCredits = 0;

                courses.forEach(course => {
                    const credits = parseFloat(course.credits);
                    const gradePoint = getGradePoint(course.grade, scale);

                    if (!isNaN(credits) && credits > 0 && gradePoint !== null) {
                        totalPoints += gradePoint * credits;
                        totalCredits += credits;
                    }
                });

                if (totalCredits === 0) {
                    setGpa(null);
                } else {
                    const calculatedGpa = totalPoints / totalCredits;
                    setGpa(parseFloat(calculatedGpa.toFixed(2)));
                }
            }
            if (animate) setIsCalculating(false);
        }, animate ? 600 : 0);
    };

    return (
        <section className="py-24 relative bg-[#0a0a0a] min-h-screen overflow-hidden font-sans text-white">
            {/* Minimalist Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/5 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/5 blur-[100px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-50"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
                    <button 
                        onClick={onBack} 
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit group"
                    >
                        <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm tracking-wide uppercase">Back</span>
                    </button>
                    
                    <div className="text-left md:text-right">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">GPA Calculator</h1>
                        <p className="text-gray-400 font-light max-w-md ml-auto">
                            Convert your grades to the standard 4.0 scale used globally.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Input Section */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* Mode Switcher */}
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 relative overflow-hidden w-full max-w-md">
                            <button 
                                onClick={() => { setMode('simple'); setGpa(null); }} 
                                className={`relative flex-1 text-center py-3 text-sm font-medium rounded-lg transition-colors z-10 ${mode === 'simple' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                {mode === 'simple' && (
                                    <motion.div
                                        layoutId="activeMode"
                                        className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                Simple Conversion
                            </button>
                            <button 
                                onClick={() => { setMode('advanced'); setGpa(null); }} 
                                className={`relative flex-1 text-center py-3 text-sm font-medium rounded-lg transition-colors z-10 ${mode === 'advanced' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                {mode === 'advanced' && (
                                    <motion.div
                                        layoutId="activeMode"
                                        className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                Advanced (Course-by-Course)
                            </button>
                        </div>

                        {mode === 'simple' ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-8"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-orange-500/10 rounded-lg">
                                            <Calculator className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold tracking-tight">Grading Scale</h2>
                                    </div>
                                    <GradeScaleSelector selected={scale} onSelect={setScale} />
                                </div>
                                
                                <div className="pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-pink-500/10 rounded-lg">
                                            <GraduationCap className="w-5 h-5 text-pink-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold tracking-tight">Your Overall Grade</h2>
                                    </div>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder={scale === 'percentage' ? 'e.g. 85' : scale === '10-point' ? 'e.g. 8.5' : 'e.g. A'} 
                                            value={simpleGrade} 
                                            onChange={(e) => setSimpleGrade(e.target.value)} 
                                            className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/5 text-white text-lg transition-all placeholder-gray-600 uppercase" 
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                            {scale === 'percentage' ? '%' : scale === '10-point' ? '/ 10' : 'Grade'}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <button 
                                        onClick={() => calculateGPA(true)} 
                                        disabled={isCalculating || !simpleGrade}
                                        className="w-full bg-white text-black px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {isCalculating ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                                            />
                                        ) : (
                                            'Convert to 4.0 Scale'
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {/* Scale Selector */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-orange-500/10 rounded-lg">
                                            <Calculator className="w-5 h-5 text-orange-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold tracking-tight">Grading Scale</h2>
                                    </div>
                                    <GradeScaleSelector selected={scale} onSelect={setScale} />
                                </div>
                                
                                {/* Course List */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-pink-500/10 rounded-lg">
                                                <GraduationCap className="w-5 h-5 text-pink-400" />
                                            </div>
                                            <h2 className="text-xl font-semibold tracking-tight">Your Courses</h2>
                                        </div>
                                        <span className="text-xs font-medium px-3 py-1 bg-white/5 rounded-full text-gray-400 border border-white/10">
                                            {courses.length} Courses
                                        </span>
                                    </div>
                                    
                                    {/* Table Headers */}
                                    <div className="grid grid-cols-12 gap-4 px-4 mb-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="col-span-12 sm:col-span-5">Course Name</div>
                                        <div className="col-span-5 sm:col-span-3">Credits</div>
                                        <div className="col-span-5 sm:col-span-3">Grade</div>
                                        <div className="col-span-2 sm:col-span-1"></div>
                                    </div>

                                    <div className="space-y-3">
                                        <AnimatePresence initial={false}>
                                            {courses.map((course, index) => (
                                                <motion.div 
                                                    key={course.id}
                                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                    animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="grid grid-cols-12 gap-3 sm:gap-4 items-center group relative"
                                                >
                                                    <div className="col-span-12 sm:col-span-5 relative">
                                                        <input 
                                                            type="text" 
                                                            placeholder={`Course ${index + 1}`} 
                                                            value={course.name} 
                                                            onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)} 
                                                            className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/5 text-white text-sm transition-all placeholder-gray-600" 
                                                        />
                                                    </div>
                                                    <div className="col-span-5 sm:col-span-3">
                                                        <input 
                                                            type="number" 
                                                            placeholder="Credits" 
                                                            value={course.credits} 
                                                            onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)} 
                                                            className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/5 text-white text-sm transition-all placeholder-gray-600" 
                                                        />
                                                    </div>
                                                    <div className="col-span-5 sm:col-span-3">
                                                        <input 
                                                            type="text" 
                                                            placeholder={scale === 'percentage' ? '0-100' : scale === '10-point' ? '0-10' : 'A-F'} 
                                                            value={course.grade} 
                                                            onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)} 
                                                            className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/5 text-white text-sm transition-all placeholder-gray-600 uppercase" 
                                                        />
                                                    </div>
                                                    <div className="col-span-2 sm:col-span-1 flex justify-end sm:justify-center">
                                                        <button 
                                                            onClick={() => removeCourse(course.id)} 
                                                            className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-30" 
                                                            disabled={courses.length <= 1}
                                                            aria-label="Remove course"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 pt-6 border-t border-white/5">
                                        <button 
                                            onClick={addCourse} 
                                            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Course
                                        </button>
                                        
                                        <button 
                                            onClick={() => calculateGPA(true)} 
                                            disabled={isCalculating}
                                            className="w-full sm:w-auto flex-1 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                        >
                                            {isCalculating ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                                                />
                                            ) : (
                                                'Calculate GPA'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Output Section */}
                    <div className="lg:col-span-5">
                        <div className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 p-8 sm:p-10 rounded-3xl text-center sticky top-24 backdrop-blur-xl">
                            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-10">Results</h2>
                            
                            <div className="min-h-[300px] flex flex-col justify-center">
                                {gpa !== null ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, type: "spring" }}
                                    >
                                        <GPAGauge gpa={gpa} />
                                        
                                        <div className="flex items-baseline justify-center gap-2 mb-2">
                                            <motion.span 
                                                key={gpa}
                                                initial={{ y: -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                className="text-7xl font-bold tracking-tighter"
                                            >
                                                {gpa.toFixed(2)}
                                            </motion.span>
                                            <span className="text-2xl text-gray-500 font-medium">/ 4.0</span>
                                        </div>
                                        
                                        <GPABreakdown gpa={gpa} />
                                        
                                        <button 
                                            onClick={() => navigate('/college-finder')} 
                                            className="mt-8 w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl font-medium hover:bg-white/10 transition-all group flex items-center justify-between"
                                        >
                                            <span>Find matching universities</span>
                                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="text-gray-500 flex flex-col items-center justify-center space-y-4">
                                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-2">
                                            <Calculator className="w-8 h-8 text-gray-600" />
                                        </div>
                                        <p className="font-light text-lg">Enter your {mode === 'simple' ? 'grade' : 'courses'} to see your GPA</p>
                                        <p className="text-sm text-gray-600 max-w-[200px]">Fill in the details on the left and hit calculate.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Understanding Your GPA</h2>
                        <p className="text-gray-400 font-light">Common questions about grading scales and international admissions.</p>
                    </div>
                    <div className="space-y-3">
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

                <GPASeoContent />
            </div>
        </section>
    );
};

const GPASeoContent: React.FC = () => (
    <div className="mt-32 max-w-4xl mx-auto text-gray-400 space-y-16 border-t border-white/10 pt-16 pb-12">
        <section>
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Comprehensive Guide to Converting Percentages to 4.0, 5.0, and 10.0 GPA Scales</h2>
            <p className="leading-relaxed mb-6">Understanding how your percentage translates to a standard GPA scale is crucial for international university applications. Depending on whether your school uses weighted or unweighted grading, the exact conversion can vary. Below is a general reference chart mapping percentage scores to 4.0, 5.0, and 10.0 GPA scales:</p>
            
            <div className="overflow-x-auto mb-6 bg-white/[0.02] rounded-2xl border border-white/5">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-white bg-white/5">
                            <th className="py-4 px-6 font-semibold">Percentage Range</th>
                            <th className="py-4 px-6 font-semibold">4.0 GPA Scale</th>
                            <th className="py-4 px-6 font-semibold">5.0 GPA Scale</th>
                            <th className="py-4 px-6 font-semibold">10.0 GPA Scale</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">90% – 100%</td><td className="py-3 px-6">4.0 (A+)</td><td className="py-3 px-6">5.0 (A+)</td><td className="py-3 px-6">9.0 – 10.0</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">85% – 89%</td><td className="py-3 px-6">3.7 – 3.9 (A)</td><td className="py-3 px-6">4.5 – 4.9 (A)</td><td className="py-3 px-6">8.5 – 8.9</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">80% – 84%</td><td className="py-3 px-6">3.3 – 3.6 (A-)</td><td className="py-3 px-6">4.0 – 4.4 (B+)</td><td className="py-3 px-6">8.0 – 8.4</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">75% – 79%</td><td className="py-3 px-6">3.0 – 3.2 (B+)</td><td className="py-3 px-6">3.5 – 3.9 (B)</td><td className="py-3 px-6">7.5 – 7.9</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">70% – 74%</td><td className="py-3 px-6">2.7 – 2.9 (B)</td><td className="py-3 px-6">3.0 – 3.4 (B-)</td><td className="py-3 px-6">7.0 – 7.4</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">65% – 69%</td><td className="py-3 px-6">2.3 – 2.6 (C+)</td><td className="py-3 px-6">2.5 – 2.9 (C+)</td><td className="py-3 px-6">6.5 – 6.9</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">60% – 64%</td><td className="py-3 px-6">2.0 – 2.2 (C)</td><td className="py-3 px-6">2.0 – 2.4 (C)</td><td className="py-3 px-6">6.0 – 6.4</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">55% – 59%</td><td className="py-3 px-6">1.7 – 1.9 (C-)</td><td className="py-3 px-6">1.5 – 1.9 (D)</td><td className="py-3 px-6">5.5 – 5.9</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">50% – 54%</td><td className="py-3 px-6">1.0 – 1.6 (D)</td><td className="py-3 px-6">1.0 – 1.4 (D)</td><td className="py-3 px-6">5.0 – 5.4</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">Below 50%</td><td className="py-3 px-6">0.0 (F)</td><td className="py-3 px-6">0.0 (F)</td><td className="py-3 px-6">&lt;5.0 (Fail)</td></tr>
                    </tbody>
                </table>
            </div>
            <p className="leading-relaxed">This table serves as a quick reference guide for converting your percentage to a GPA. In the following sections, we will break down exactly how these GPA calculations are computed.</p>
        </section>

        <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Step-by-Step Guide to Using Our GPA Converter</h3>
            <p className="leading-relaxed">Our Percentage to GPA Converter is designed for speed and accuracy. Here is how you can determine your international academic standing in just a few clicks:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Choose between the <strong>Simple Conversion</strong> or <strong>Advanced (Course-by-Course)</strong> mode at the top of the calculator.</li>
                <li>Select your current grading system (Percentage, 10-Point Scale, or Letter Grade).</li>
                <li>Enter your overall percentage or individual course grades.</li>
                <li>Click the calculate button to instantly view your equivalent GPA on a standard 4.0 scale.</li>
            </ul>
            <p className="leading-relaxed">It is a fast, reliable way to translate your academic performance for university admissions abroad.</p>
        </section>

        <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Who Benefits from This GPA Calculator?</h3>
            <p className="leading-relaxed">This tool is incredibly useful for a wide range of individuals involved in the international education process. High school and college students applying for higher education abroad can use it to evaluate their semester or annual academic performance. Parents assisting their children with college applications can quickly understand their child's academic standing. Additionally, academic counselors and teachers can use the percentage to GPA converter to accurately assess student profiles when writing Letters of Recommendation (LORs).</p>
        </section>

        <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">The Math Behind Percentage to GPA Conversion</h3>
            <p className="leading-relaxed">The standard formula for converting a percentage to any GPA scale is straightforward:</p>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                <code className="text-xl text-orange-400 font-mono">GPA = (Percentage / 100) × Target Scale</code>
            </div>
            <p className="leading-relaxed text-sm italic">Note: While the 4.0 scale is the most common requirement for US universities, some institutions may request a 5.0 or 10.0 scale. The formula remains the same; simply swap the target scale multiplier.</p>
        </section>

        <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Calculating a 4.0 Scale GPA from a Percentage</h3>
            <p className="leading-relaxed">To manually calculate your GPA on a standard 4.0 scale, simply divide your percentage by 100 and multiply by 4.</p>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <code className="text-white font-mono">Formula: GPA = (Percentage / 100) × 4</code>
            </div>
            <p className="leading-relaxed">For instance, if you achieved an 80% overall score, the calculation would look like this:</p>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2 font-mono text-gray-300">
                <p>GPA = (80 / 100) × 4</p>
                <p className="text-white font-bold">GPA = 3.2</p>
            </div>
            <p className="leading-relaxed">Alternatively, you can skip the manual math and use our automated GPA calculator above.</p>
        </section>

        <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Converting Percentages to a 10-Point CGPA</h3>
            <p className="leading-relaxed">In many educational systems, particularly in India and parts of Europe, a 10-point Cumulative Grade Point Average (CGPA) is standard. A common method to estimate your CGPA from a percentage is to divide your score by 9.5.</p>
            <p className="leading-relaxed">For example, an 80% translates to roughly an 8.4 CGPA. Here is how different CGPA ranges generally reflect academic performance:</p>
            
            <div className="overflow-x-auto mb-6 bg-white/[0.02] rounded-2xl border border-white/5">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-white bg-white/5">
                            <th className="py-4 px-6 font-semibold">CGPA Range</th>
                            <th className="py-4 px-6 font-semibold">Academic Performance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">9.5 - 10.0 CGPA</td><td className="py-3 px-6 text-green-400">Outstanding</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">8.5 - 9.4 CGPA</td><td className="py-3 px-6 text-green-400">Excellent</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">7.5 - 8.4 CGPA</td><td className="py-3 px-6 text-yellow-400">Very Good</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">6.5 - 7.4 CGPA</td><td className="py-3 px-6 text-yellow-400">Good</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">5.5 - 6.4 CGPA</td><td className="py-3 px-6 text-orange-400">Average</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-3 px-6">Below 5.5 CGPA</td><td className="py-3 px-6 text-red-400">Below Average</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Quick Reference: Percentage Conversion Examples</h3>
            <p className="leading-relaxed">Here are a few practical examples demonstrating how an 85% score translates across different international grading scales:</p>
            
            <div className="overflow-x-auto mb-6 bg-white/[0.02] rounded-2xl border border-white/5">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-white bg-white/5">
                            <th className="py-4 px-6 font-semibold">Target Scale</th>
                            <th className="py-4 px-6 font-semibold">Formula Used</th>
                            <th className="py-4 px-6 font-semibold">Example (85%)</th>
                            <th className="py-4 px-6 font-semibold">Final GPA</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-6">4.0 Scale</td>
                            <td className="py-3 px-6 font-mono text-sm">GPA = (Percentage / 100) × 4</td>
                            <td className="py-3 px-6 font-mono text-sm">GPA = (85 / 100) × 4</td>
                            <td className="py-3 px-6 font-bold text-white">3.40</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-6">5.0 Scale</td>
                            <td className="py-3 px-6 font-mono text-sm">GPA = (Percentage / 100) × 5</td>
                            <td className="py-3 px-6 font-mono text-sm">GPA = (85 / 100) × 5</td>
                            <td className="py-3 px-6 font-bold text-white">4.25</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-6">10.0 Scale</td>
                            <td className="py-3 px-6 font-mono text-sm">GPA = (Percentage / 100) × 10</td>
                            <td className="py-3 px-6 font-mono text-sm">GPA = (85 / 100) × 10</td>
                            <td className="py-3 px-6 font-bold text-white">8.50</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Percentage vs. GPA vs. CGPA: What's the Difference?</h3>
            <p className="leading-relaxed">Academic performance is typically measured in three distinct ways: Percentage, GPA, and CGPA. <strong className="text-white">Percentage</strong> reflects your raw academic score, showing the exact proportion of marks you earned out of the total possible marks. <strong className="text-white">GPA (Grade Point Average)</strong> evaluates your performance over a specific term or semester, often factoring in course credits to weigh core subjects more heavily than electives. <strong className="text-white">CGPA (Cumulative Grade Point Average)</strong> provides a holistic view of your entire academic journey by averaging your GPAs across all completed semesters. While percentages are great for precise local grading, CGPA and GPA are the preferred global standards for university admissions because they reward steady academic growth and consistency.</p>
        </section>
    </div>
);

export default GPACalculator;