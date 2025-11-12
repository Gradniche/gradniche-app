


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
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700">
            {scales.map(scale => (
                <button key={scale.id} onClick={() => onSelect(scale.id)} className={`w-full text-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#F6520C] ${selected === scale.id ? 'bg-[#F6520C] text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}`}>
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
        green: 'border-green-500 bg-green-900/30 text-green-300',
        yellow: 'border-yellow-500 bg-yellow-900/30 text-yellow-300',
        orange: 'border-orange-500 bg-orange-900/30 text-orange-300',
        red: 'border-red-500 bg-red-900/30 text-red-300',
    };

    return (
        <div className={`mt-4 p-4 rounded-lg border-2 ${colorClasses[breakdown.color as keyof typeof colorClasses]}`}>
            <h4 className={`text-xl font-bold`}>{breakdown.title}</h4>
            <p className="text-sm mt-1">{breakdown.description}</p>
        </div>
    );
};

const faqData = [
    { question: "Why is GPA important for studying abroad?", answer: "GPA (Grade Point Average) is a standardized way for universities to assess your academic performance. A high GPA demonstrates your ability to handle challenging coursework and is a key factor in admissions decisions, especially for competitive programs." },
    { question: "How do US universities view Indian percentage/10-point grades?", answer: "Admissions committees are familiar with Indian grading systems. However, they will convert your scores to the 4.0 scale for standardized evaluation. This tool helps you see how your grades might be interpreted." },
    { question: "Can a low GPA be compensated by other parts of the application?", answer: "Yes, to an extent. A strong GRE/GMAT score, relevant work experience, impactful research or projects, and a compelling Statement of Purpose can help offset a lower GPA. However, most universities have a minimum GPA requirement you must meet." }
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
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="p-5 bg-white/5 text-gray-400">
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
        <section className="py-20 bg-[#0a101f] min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span>Back</span>
                    </button>
                </div>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">GPA Calculator</h1>
                    <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                        Convert your Indian percentage or 10-point CGPA to the 4.0 scale used by international universities. Understand your academic standing with our easy tool.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Input Section */}
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-gray-700 space-y-6">
                        <div>
                            <label className="block text-lg font-semibold text-white mb-3">1. Select Your Grading Scale</label>
                            <GradeScaleSelector selected={scale} onSelect={setScale} />
                        </div>
                        
                        <div>
                            <label className="block text-lg font-semibold text-white mb-3">2. Enter Your Courses</label>
                            <div className="space-y-3">
                                {courses.map((course, index) => (
                                    <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
                                        <input type="text" placeholder={`Course ${index + 1}`} value={course.name} onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)} className="col-span-5 w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F6520C] text-white text-sm" />
                                        <input type="number" placeholder="Credits" value={course.credits} onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)} className="col-span-3 w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F6520C] text-white text-sm" />
                                        <input type="text" placeholder={scale === 'percentage' ? '0-100' : scale === '10-point' ? '0-10' : 'A-F'} value={course.grade} onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)} className="col-span-3 w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F6520C] text-white text-sm" />
                                        <button onClick={() => removeCourse(course.id)} className="col-span-1 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50" disabled={courses.length <= 1}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                             <button onClick={addCourse} className="mt-4 text-sm font-semibold text-[#F6520C] hover:text-orange-400 transition-colors">+ Add another course</button>
                        </div>

                        <button onClick={calculateGPA} className="w-full bg-[#F6520C] text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition transform hover:scale-105">
                            Calculate My GPA
                        </button>
                    </div>

                    {/* Output Section */}
                    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700 text-center sticky top-24">
                        <h2 className="text-2xl font-bold text-white mb-4">Your Estimated GPA</h2>
                        {gpa !== null ? (
                            <div className="animate-fade-in">
                                <GPAGauge gpa={gpa} />
                                <p className="text-6xl font-extrabold text-white my-4">{gpa.toFixed(2)} / 4.0</p>
                                <GPABreakdown gpa={gpa} />
                                 <button onClick={() => navigate('/college-finder')} className="mt-6 w-full bg-gray-700/50 text-gray-300 border border-gray-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-700 hover:text-white transition duration-300">
                                    Find Universities with this GPA
                                </button>
                            </div>
                        ) : (
                            <div className="text-gray-500 py-12">
                                <p>Your calculated GPA will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Understanding Your GPA</h2>
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