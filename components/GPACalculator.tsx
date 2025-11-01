import React, { useState, useEffect } from 'react';
import { Page } from '../App';

interface Course {
  id: number;
  name: string;
  credits: string;
  grade: string;
}

type GradeScale = 'percentage' | '10-point' | 'letter';

interface GPACalculatorProps {
  onBack: () => void;
  navigateTo: (page: Page) => void;
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="p-5 bg-white/5 text-gray-400">
                <p>{faq.answer}</p>
            </div>
        </div>
    </div>
);


const GPACalculator: React.FC<GPACalculatorProps> = ({ onBack, navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([{ id: 1, name: '', credits: '', grade: '' }]);
  const [gradeScale, setGradeScale] = useState<GradeScale>('percentage');
  const [calculatedGpa, setCalculatedGpa] = useState<{ gpa: string, totalCredits: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  useEffect(() => {
    // Add JSON-LD Structured Data for SEO
    const scriptId = 'gpa-calculator-structured-data';
    document.getElementById(scriptId)?.remove();

    const howToStructuredData = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate Your GPA on a 4.0 Scale",
        "step": [
            { "@type": "HowToStep", "name": "Select Your Grading System", "text": "Choose the grading scale that matches your transcripts, such as Percentage (0-100), 10-Point Scale, or Letter Grades (A-F)." },
            { "@type": "HowToStep", "name": "Enter Your Courses and Credits", "text": "For each course, enter the number of credits and the grade you received. You can add as many courses as you need." },
            { "@type": "HowToStep", "name": "Calculate Your GPA", "text": "Click the 'Calculate GPA' button to see your GPA instantly converted to the standard 4.0 scale."}
        ]
    };

    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question", "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
        }))
    };
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify([howToStructuredData, faqStructuredData]);
    document.head.appendChild(script);

    return () => { document.getElementById(scriptId)?.remove(); };
  }, []);


  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', credits: '', grade: '' }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleCourseChange = (id: number, field: keyof Omit<Course, 'id'>, value: string) => {
    setCourses(courses.map(course => course.id === id ? { ...course, [field]: value } : course));
  };

  const resetCalculator = () => {
    setCourses([{ id: 1, name: '', credits: '', grade: '' }]);
    setCalculatedGpa(null);
    setError(null);
  };
  
  const calculateGpa = () => {
    setError(null);
    setCalculatedGpa(null);
    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
        if (!course.credits || !course.grade) continue;

        const credits = parseFloat(course.credits);
        if (isNaN(credits) || credits <= 0) {
            setError('Please enter valid, positive numbers for credits.');
            return;
        }

        const gradePoint = getGradePoint(course.grade, gradeScale);
        if (gradePoint === null) {
            setError(`Invalid grade '${course.grade}' for the selected scale. Please check your inputs.`);
            return;
        }

        totalPoints += gradePoint * credits;
        totalCredits += credits;
    }
    
    if (totalCredits === 0) {
        setError('Please enter at least one course with credits and a grade to calculate GPA.');
        return;
    }

    const gpa = (totalPoints / totalCredits).toFixed(2);
    setCalculatedGpa({ gpa, totalCredits });
  };
  
  const getGradePlaceholder = () => {
      switch(gradeScale) {
          case 'percentage': return 'e.g., 85';
          case '10-point': return 'e.g., 8.5';
          case 'letter': return 'e.g., A-';
          default: return '';
      }
  }

  return (
    <section className="py-20 bg-[#0a101f] min-h-screen">
      <div className="container mx-auto px-6">
         <div className="mb-8">
            <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back</span>
            </button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white">GPA Calculator for Study Abroad</h1>
           <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            Applying to universities in the US, Canada, or elsewhere? Convert your Indian percentage, 10-point CGPA, or letter grades to the 4.0 GPA scale to understand your academic standing.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">3 Simple Steps to Calculate Your GPA</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="bg-[#F6520C]/20 text-[#F6520C] rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold border-2 border-[#F6520C]">1</div>
                    <h3 className="text-xl font-semibold text-white mt-4">Select Your Scale</h3>
                    <p className="text-gray-400 mt-2">Choose the grading system that matches your mark sheets.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-[#F6520C]/20 text-[#F6520C] rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold border-2 border-[#F6520C]">2</div>
                    <h3 className="text-xl font-semibold text-white mt-4">Enter Your Courses</h3>
                    <p className="text-gray-400 mt-2">Add your courses, credits, and the grades you received.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <div className="bg-[#F6520C]/20 text-[#F6520C] rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold border-2 border-[#F6520C]">3</div>
                    <h3 className="text-xl font-semibold text-white mt-4">Get Your Converted GPA</h3>
                    <p className="text-gray-400 mt-2">Instantly see your GPA on the standard 4.0 scale.</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Calculator Form */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-gray-700 shadow-xl">
                <div className="mb-6 space-y-2">
                    <label className="block text-lg font-medium text-white text-center" htmlFor="grade-scale-selector">Step 1: Select Your Grading System</label>
                    <GradeScaleSelector selected={gradeScale} onSelect={setGradeScale} />
                </div>

                <div className="mb-6">
                     <label className="block text-lg font-medium text-white text-center mb-4">Step 2: Enter Your Courses</label>
                    <div className="space-y-4">
                        {courses.map((course, index) => (
                            <div key={course.id} className="grid grid-cols-12 gap-3 items-center">
                                <div className="col-span-12 sm:col-span-5">
                                    <label htmlFor={`course-name-${course.id}`} className="sr-only">Course Name {index + 1}</label>
                                    <input id={`course-name-${course.id}`} type="text" placeholder={`Course ${index + 1} (Optional)`} value={course.name} onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor={`course-credits-${course.id}`} className="sr-only">Credits for Course {index + 1}</label>
                                    <input id={`course-credits-${course.id}`} type="number" placeholder="Credits" value={course.credits} onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor={`course-grade-${course.id}`} className="sr-only">Grade for Course {index + 1}</label>
                                    <input id={`course-grade-${course.id}`} type="text" placeholder={getGradePlaceholder()} value={course.grade} onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)} className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white" />
                                </div>
                                <div className="col-span-12 sm:col-span-1 flex justify-end">
                                    {courses.length > 1 && (
                                        <button onClick={() => removeCourse(course.id)} aria-label="Remove course" className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                     <button onClick={addCourse} className="mt-4 text-sm font-semibold text-[#F6520C] hover:text-orange-400 transition flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        <span>Add Another Course</span>
                    </button>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button onClick={calculateGpa} className="w-full sm:w-auto bg-[#F6520C] text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#E84A00]">
                        Calculate My GPA
                    </button>
                    <button onClick={resetCalculator} className="w-full sm:w-auto bg-gray-700/50 text-gray-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-700 transition duration-300">
                        Clear All
                    </button>
                </div>
            </div>

            {/* Results Display */}
            <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-white text-center mb-4">Your Result</h2>
                <div className="p-8 bg-gray-800/50 border-2 border-gray-700 rounded-lg text-center transition-all duration-300 min-h-[300px] flex flex-col justify-center">
                    {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-md">{error}</p>}
                    {!calculatedGpa && !error && (
                        <div className="text-gray-500">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <p>Your calculated GPA will appear here.</p>
                        </div>
                    )}
                    {calculatedGpa && (
                        <div className="animate-fade-in">
                            <p className="text-lg text-gray-300">Your Calculated GPA is</p>
                            <GPAGauge gpa={parseFloat(calculatedGpa.gpa)} />
                            <p className="text-6xl font-extrabold text-white my-1" style={{ textShadow: "0 0 15px rgba(246, 82, 12, 0.5)"}}>{calculatedGpa.gpa}</p>
                            <p className="text-sm text-gray-500">Based on {calculatedGpa.totalCredits} total credits.</p>
                            <GPABreakdown gpa={parseFloat(calculatedGpa.gpa)} />
                             <div className="mt-6">
                                <button onClick={() => navigateTo('college-finder')} className="w-full bg-gray-700/50 text-[#F6520C] border border-[#F6520C] px-6 py-3 rounded-full hover:bg-[#F6520C] hover:text-white transition-colors duration-300 text-lg font-semibold">
                                    Find Universities Matching Your Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

         {/* FAQ Section */}
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
        
        {/* Disclaimer */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6">
                <h4 className="font-bold text-lg text-yellow-300 mb-2">Disclaimer</h4>
                <p className="text-sm text-yellow-400/80">
                    The GPA conversion provided by this calculator is an approximation for informational purposes only. Conversion methodologies can vary significantly between institutions. For all official academic or immigration purposes, you must use a professional credential evaluation service like WES. GradNiche is not responsible for any decisions made based on the results of this tool.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default GPACalculator;