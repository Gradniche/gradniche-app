


import React, { useState, useEffect } from 'react';

interface Course {
  id: number;
  name: string;
  credits: string;
  grade: string;
}

type GradeScale = 'percentage' | '10-point' | 'letter';

interface GPACalculatorProps {
  onBack: () => void;
  // FIX: Changed navigateTo to navigate and Page to string to match props passed from App.tsx
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
        { id: '10-point', label: '10-Point Scale'},
        { id: 'letter', label: 'Letter Grade (A-F)'}
    ];

    return (
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 bg-black/20 p-2 rounded-xl border border-white/5">
            {scales.map(scale => (
                <button key={scale.id} onClick={() => onSelect(scale.id)} className={`w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#F6520C] ${selected === scale.id ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
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
        <div className="relative w-64 h-32 mx-auto mb-2">
            <svg viewBox="0 0 100 50" className="w-full h-full">
                <defs>
                    <linearGradient id="gpa-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
                        <stop offset="50%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#22c55e', stopOpacity: 1}} />
                    </linearGradient>
                </defs>
                <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="#4a5568" strokeWidth="8" fill="none" />
                <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    stroke="url(#gpa-gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="125.6"
                    strokeDashoffset={125.6 - (gpaPercentage / 100 * 125.6)}
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div
                className="absolute bottom-0 left-1/2 w-0.5 h-10 bg-[#F6520C] origin-bottom transition-transform duration-1000 ease-out"
                style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
            ></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 border-2 border-[#F6520C] rounded-full"></div>
        </div>
    );
};

const GPABreakdown: React.FC<{ gpa: number }> = ({ gpa }) => {
    let breakdown: { title: string; description: string; color: string };

    if (gpa >= 3.7) {
        breakdown = { title: "Excellent", description: "This GPA is highly competitive for top-tier universities worldwide. Focus on maintaining it and crafting a strong overall application with compelling essays and recommendations.", color: "green" };
    } else if (gpa >= 3.3) {
        breakdown = { title: "Good", description: "A strong GPA that makes you a competitive applicant for many excellent universities. Strengthen your application with high standardized test scores and relevant experience.", color: "yellow" };
    } else if (gpa >= 2.7) {
        breakdown = { title: "Average", description: "This GPA is acceptable for many good universities. Focus on highlighting your strengths in other areas like your Statement of Purpose, work experience, and projects.", color: "orange" };
    } else {
        breakdown = { title: "Needs Improvement", description: "This GPA may be below the minimum requirement for many graduate programs. Consider retaking exams or gaining significant work experience to strengthen your profile.", color: "red" };
    }

    const colorClasses = {
        green: 'border-green-500/30 bg-green-500/10 text-green-400',
        yellow: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
        orange: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
        red: 'border-red-500/30 bg-red-500/10 text-red-400',
    };

    return (
        <div className={`mt-6 p-6 rounded-2xl border backdrop-blur-sm ${colorClasses[breakdown.color as keyof typeof colorClasses]}`}>
            <h4 className={`text-xl font-bold tracking-tight mb-2`}>{breakdown.title}</h4>
            <p className="text-sm font-light leading-relaxed opacity-90">{breakdown.description}</p>
        </div>
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
            className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
            aria-expanded={isOpen}
        >
            <span className={`text-lg font-medium tracking-tight ${isOpen ? 'text-[#F6520C]' : 'text-white'}`}>{faq.question}</span>
            <svg
                className={`w-6 h-6 text-[#F6520C] transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2 font-light">
                <p>{faq.answer}</p>
            </div>
        </div>
    </div>
);


const GPACalculator: React.FC<GPACalculatorProps> = ({ onBack, navigate }) => {
    const [courses, setCourses] = useState<Course[]>([
        { id: 1, name: '', credits: '', grade: '' },
        { id: 2, name: '', credits: '', grade: '' },
        { id: 3, name: '', credits: '', grade: '' },
        { id: 4, name: '', credits: '', grade: '' },
    ]);
    const [scale, setScale] = useState<GradeScale>('percentage');
    const [gpa, setGpa] = useState<number | null>(null);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    
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

    const handleCourseChange = (id: number, field: 'name' | 'credits' | 'grade', value: string) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const addCourse = () => {
        setCourses([...courses, { id: Date.now(), name: '', credits: '', grade: '' }]);
    };
    
    const removeCourse = (id: number) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const calculateGPA = () => {
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
            return;
        }

        const calculatedGpa = totalPoints / totalCredits;
        setGpa(parseFloat(calculatedGpa.toFixed(2)));
    };

    return (
        <section className="py-24 relative bg-[#0a101f] min-h-screen overflow-hidden">
            {/* Subtle background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
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
                        <span className="text-xs font-semibold tracking-widest text-[#F6520C] uppercase">Academics</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>GPA Calculator</h1>
                    <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-3xl mx-auto font-light">
                        Convert your Indian percentage or 10-point CGPA to the 4.0 scale used by international universities. Understand your academic standing with our easy tool.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Input Section */}
                    <div className="bg-white/[0.02] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl space-y-8">
                        <div>
                            <label className="block text-xl font-bold text-white tracking-tight mb-4">1. Select Your Grading Scale</label>
                            <GradeScaleSelector selected={scale} onSelect={setScale} />
                        </div>
                        
                        <div className="pt-6 border-t border-white/5">
                            <label className="block text-xl font-bold text-white tracking-tight mb-4">2. Enter Your Courses</label>
                            <div className="space-y-4">
                                {courses.map((course, index) => (
                                    <div key={course.id} className="grid grid-cols-12 gap-3 items-center group">
                                        <input type="text" placeholder={`Course ${index + 1}`} value={course.name} onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)} className="col-span-5 w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white text-sm transition-all placeholder-gray-600" />
                                        <input type="number" placeholder="Credits" value={course.credits} onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)} className="col-span-3 w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white text-sm transition-all placeholder-gray-600" />
                                        <input type="text" placeholder={scale === 'percentage' ? '0-100' : scale === '10-point' ? '0-10' : 'A-F'} value={course.grade} onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)} className="col-span-3 w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white text-sm transition-all placeholder-gray-600" />
                                        <button onClick={() => removeCourse(course.id)} className="col-span-1 text-gray-600 hover:text-red-500 transition-colors disabled:opacity-30 flex justify-center" disabled={courses.length <= 1}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                             <button onClick={addCourse} className="mt-6 text-sm font-semibold text-[#F6520C] hover:text-orange-400 transition-colors flex items-center space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                <span>Add another course</span>
                             </button>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <button onClick={calculateGPA} className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-white/20 transform hover:-translate-y-0.5">
                                Calculate My GPA
                            </button>
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="bg-white/[0.02] backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/5 text-center sticky top-24 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white tracking-tight mb-8">Your Estimated GPA</h2>
                        {gpa !== null ? (
                            <div className="animate-fade-in">
                                <GPAGauge gpa={gpa} />
                                <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 my-6 tracking-tight">{gpa.toFixed(2)} <span className="text-3xl text-gray-500 font-medium">/ 4.0</span></p>
                                <GPABreakdown gpa={gpa} />
                                 <button onClick={() => navigate('/college-finder')} className="mt-8 w-full bg-white/5 text-white border border-white/10 px-6 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 group flex items-center justify-center space-x-2">
                                    <span>Find Universities with this GPA</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        ) : (
                            <div className="text-gray-500 py-16 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                </div>
                                <p className="font-light">Enter your courses and calculate to see your GPA.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-24 max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-12 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Understanding Your GPA</h2>
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
            </div>
        </section>
    );
};

export default GPACalculator;