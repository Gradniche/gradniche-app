
import React, { useState, useMemo } from 'react';
import { Program, University, universities as allUniversities } from '../data/universities';
import UniversityLogo from './UniversityLogo';

// Helper function to generate a clean program title
const getProgramTitle = (program: Program): string => {
    const { name, level } = program;
    const nameLower = name.toLowerCase();

    // Check if name already contains a degree type like "Master", "M.S.", "MBA", etc.
    const hasDegreeType = [
        'master', 'm.s', 'ms', 'msc', 'ma', 'meng', 'mphil', 'mse',
        'mba', 'mban', 'mfin', 'mpp', 'mids', 'mcit', 'mscac'
    ].some(keyword => nameLower.includes(keyword));

    if (hasDegreeType) {
        return name;
    }

    return `${level} in ${name}`;
};


interface ProgramDetailProps {
  program: Program;
  university: University;
  onBack: () => void;
  onNavigateToProgram: (university: University, program: Program) => void;
}

const TestScoreRequirement: React.FC<{ label: string; score: string | undefined }> = ({ label, score }) => {
    if (!score) return null;
    return (
        <div className="bg-white/5 backdrop-blur-md p-4 sm:p-5 rounded-2xl text-center border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-sm">
            <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium mb-1 sm:mb-2">{label}</p>
            <p className="text-lg sm:text-2xl font-semibold text-white tracking-tight">{score}</p>
        </div>
    )
};

const Disclaimer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start space-x-3 text-sm text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.636-1.21 2.252-1.21 2.888 0l6.294 12.022c.636 1.21-.247 2.629-1.444 2.629H3.407c-1.197 0-2.08-1.419-1.444-2.629L8.257 3.099zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        <span>{children}</span>
    </div>
);

const getPotentialJobTitles = (programName: string): string[] => {
    const nameLower = programName.toLowerCase();

    if (nameLower.includes('computer science') || nameLower.includes('information technology')) {
        return ['Software Engineer', 'Data Scientist', 'AI/ML Engineer', 'Cybersecurity Analyst', 'Cloud Engineer', 'DevOps Engineer'];
    }
    if (nameLower.includes('business analytics')) {
        return ['Business Analyst', 'Data Analyst', 'Product Manager', 'Consultant', 'Marketing Analyst', 'Financial Analyst'];
    }
    if (nameLower.includes('finance')) {
        return ['Investment Banker', 'Financial Analyst', 'Quantitative Analyst', 'Portfolio Manager', 'Risk Manager', 'Corporate Finance Associate'];
    }
    if (nameLower.includes('mba') || nameLower.includes('business administration')) {
        return ['Product Manager', 'Management Consultant', 'Marketing Manager', 'Operations Manager', 'Finance Manager', 'Entrepreneur'];
    }
    if (nameLower.includes('public policy') || nameLower.includes('public affairs')) {
        return ['Policy Analyst', 'Government Affairs Manager', 'Non-profit Program Manager', 'Public Sector Consultant', 'Legislative Aide'];
    }
    if (nameLower.includes('robotics')) {
        return ['Robotics Engineer', 'Mechatronics Engineer', 'Automation Engineer', 'Computer Vision Engineer', 'Control Systems Engineer'];
    }
    if (nameLower.includes('engineering') && (nameLower.includes('electrical') || nameLower.includes('ece'))) {
        return ['Hardware Engineer', 'VLSI Design Engineer', 'Signal Processing Engineer', 'Telecommunications Engineer', 'Embedded Systems Engineer'];
    }
    if (nameLower.includes('engineering') && nameLower.includes('mechanical')) {
        return ['Mechanical Design Engineer', 'Thermal Engineer', 'Manufacturing Engineer', 'Automotive Engineer', 'Aerospace Engineer'];
    }
    if (nameLower.includes('engineering') && nameLower.includes('aerospace')) {
        return ['Aerospace Engineer', 'Propulsion Engineer', 'Aerodynamics Engineer', 'Structural Analysis Engineer'];
    }
    if (nameLower.includes('engineering') && nameLower.includes('bioengineering')) {
        return ['Biomedical Engineer', 'R&D Scientist (Biotech)', 'Medical Device Engineer', 'Clinical Research Associate'];
    }
    if (nameLower.includes('data science')) {
        return ['Data Scientist', 'Machine Learning Engineer', 'Data Engineer', 'Business Intelligence Analyst', 'Statistician'];
    }
    if (nameLower.includes('public health')) {
        return ['Epidemiologist', 'Public Health Advisor', 'Healthcare Administrator', 'Health Policy Analyst', 'Biostatistician'];
    }
    if (nameLower.includes('engineering')) {
        return ['Project Engineer', 'Systems Engineer', 'R&D Engineer', 'Technical Consultant'];
    }

    return [];
};


const ProgramDetail: React.FC<ProgramDetailProps> = ({ program, university, onBack, onNavigateToProgram }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const programTitle = useMemo(() => getProgramTitle(program), [program]);

  const similarPrograms = useMemo(() => {
    const keywords = [
        "Computer Science", "Business Analytics", "Finance", "Engineering", "Robotics", 
        "Public Policy", "Data Science", "MBA", "Bioengineering", "Aerospace", 
        "Mechanical", "Public Health", "Information Technology", "Electrical"
    ];

    const currentProgramLower = program.name.toLowerCase();
    const programKeyword = keywords.find(k => currentProgramLower.includes(k.toLowerCase()));

    if (!programKeyword) {
        return [];
    }

    const keywordLower = programKeyword.toLowerCase();
    const results: { university: University; program: Program }[] = [];

    for (const uni of allUniversities) {
        if (uni.id === university.id) continue;

        const matchingProgram = uni.programs.find(p => 
            p.id !== program.id && p.name.toLowerCase().includes(keywordLower)
        );

        if (matchingProgram) {
            results.push({ university: uni, program: matchingProgram });
        }
    }

    return results
        .sort((a, b) => (a.university.qsRanking || 9999) - (b.university.qsRanking || 9999))
        .slice(0, 4); 
  }, [program.id, program.name, university.id]);

  const potentialJobTitles = useMemo(() => getPotentialJobTitles(program.name), [program.name]);


  const englishTests = [
    { label: 'IELTS', score: program.ieltsScore },
    { label: 'TOEFL', score: program.toeflScore },
    { label: 'Duolingo', score: program.duolingoScore },
    { label: 'PTE', score: program.pteScore },
  ].filter(test => test.score);

  const standardizedTests = [
    { label: 'GRE', score: program.greScore },
    { label: 'GMAT', score: program.gmatScore },
  ].filter(test => test.score);

  const enhancedAbout = `${program.about}\n\nBeyond the core curriculum, this program is designed to be a launchpad for your career. The school maintains strong ties with industry leaders, facilitating exclusive networking events, career fairs, and guest lectures from prominent professionals. Graduates from this program are highly sought after and go on to secure roles in top global firms, innovative startups, and influential research institutions. The dedicated career services team provides personalized support, from resume workshops to mock interviews, ensuring you are fully prepared to enter the competitive job market.\n\nYou will be learning from and collaborating with faculty who are not just teachers, but pioneers and leading researchers in their field. The program offers numerous opportunities to engage in cutting-edge research projects, contributing to work that has a real-world impact. This hands-on research experience, combined with a supportive, collaborative academic environment, will equip you with the critical thinking and problem-solving skills necessary to excel in your future endeavors.`;
  
  const countrySpecificInfo = useMemo(() => {
    const listStyles = 'class="list-disc list-outside pl-5 text-gray-400 space-y-2 mt-2 marker:text-blue-400"';
    const baseInfo = {
        outcomes: (isSTEM: boolean) => `Post-graduation opportunities vary. Please check the official government immigration website for the most current post-study work visa information.`,
        roi: 'Return on investment depends on many factors including career path, location, and personal financial management.'
    };
    
    const infoMap: Record<string, {outcomes: (isSTEM: boolean) => string, roi: string}> = {
        USA: {
            outcomes: (isSTEM: boolean) => `
                Graduates from US universities are highly sought after in the global job market. Key opportunities include:
                <ul ${listStyles}>
                    <li><strong>Optional Practical Training (OPT):</strong> You are eligible for up to 12 months of full-time work authorization in your field of study after graduation.</li>
                    ${isSTEM ? '<li><strong>STEM OPT Extension:</strong> As this is a STEM-designated program, you can apply for a 24-month extension, allowing for a total of <strong>3 years of post-study work experience</strong>. This is a significant advantage for gaining valuable industry experience and potentially securing long-term employment.</li>' : ''}
                    <li><strong>High-Demand Sectors:</strong> The US is a leader in technology, finance, healthcare, and research, offering abundant opportunities for skilled graduates.</li>
                </ul>
            `,
            roi: `
                The return on investment for a US degree is substantial, despite higher initial costs.
                <ul ${listStyles}>
                    <li><strong>High Earning Potential:</strong> The US boasts some of the highest postgraduate salaries in the world, allowing for a quicker recovery of educational investment.</li>
                    <li><strong>Global Recognition:</strong> A degree from a reputable US university significantly enhances your global career mobility and earning potential.</li>
                </ul>
            `
        },
        Canada: {
            outcomes: () => `
                Canada offers clear and welcoming pathways for international graduates to gain work experience and potentially immigrate.
                 <ul ${listStyles}>
                    <li><strong>Post-Graduation Work Permit (PGWP):</strong> Graduates are eligible for a PGWP for up to <strong>3 years</strong>, allowing you to work for any employer in Canada.</li>
                    <li><strong>Path to Permanent Residency:</strong> Work experience gained on a PGWP is a major factor in applying for Permanent Residency through programs like Express Entry.</li>
                 </ul>
            `,
            roi: `
                Canada provides an excellent ROI due to its balance of quality education, affordability, and strong post-study opportunities.
                <ul ${listStyles}>
                    <li><strong>Affordable Excellence:</strong> Tuition fees are generally lower than in the US and UK, reducing the initial investment.</li>
                    <li><strong>High Quality of Life:</strong> Access to a stable job market and universal healthcare contributes to a high standard of living, enhancing the overall value of your education.</li>
                </ul>
            `
        },
        UK: {
            outcomes: () => `
                The UK's education system is designed for a quick and effective transition into the professional world.
                <ul ${listStyles}>
                    <li><strong>Graduate Route Visa:</strong> Graduates can stay and work in the UK for <strong>2 years</strong> (3 years for PhDs) after their studies, providing a great platform to launch a career.</li>
                    <li><strong>Faster Career Entry:</strong> With most Master's programs being only one year long, you can enter the job market a year earlier than in many other countries.</li>
                </ul>
            `,
            roi: `
                The primary ROI advantage in the UK comes from the shorter duration of study.
                <ul ${listStyles}>
                    <li><strong>Reduced Costs:</strong> A one-year Master's degree means you save on a full year of tuition and living expenses compared to two-year programs.</li>
                    <li><strong>Quicker Earnings:</strong> By entering the workforce a year sooner, you begin earning a professional salary earlier, accelerating your return on investment.</li>
                </ul>
            `
        },
        Australia: {
            outcomes: () => `
                Australia provides generous post-study work rights in a growing economy.
                <ul ${listStyles}>
                    <li><strong>Temporary Graduate Visa (subclass 485):</strong> This visa allows graduates to stay and work for <strong>2 to 4 years</strong>, depending on the qualification and location of study.</li>
                    <li><strong>In-Demand Sectors:</strong> Opportunities are strong in fields like technology, healthcare, and engineering.</li>
                </ul>
            `,
            roi: `
                Australia offers a strong ROI with competitive salaries and a high standard of living.
                <ul ${listStyles}>
                    <li><strong>Strong Economy:</strong> Graduates can find well-paying jobs, allowing for a solid return on their educational investment.</li>
                    <li><strong>Lifestyle:</strong> The combination of a world-class education and an excellent lifestyle adds significant value to the overall experience.</li>
                </ul>
            `
        },
        Germany: {
            outcomes: () => `
                Germany's strong industrial base makes it a prime destination for skilled professionals.
                <ul ${listStyles}>
                    <li><strong>Job Seeker Visa:</strong> Graduates can stay for up to <strong>18 months</strong> to find a job related to their field of study.</li>
                    <li><strong>Industrial Powerhouse:</strong> Exceptional opportunities exist in engineering, automotive, and technology sectors.</li>
                </ul>
            `,
            roi: `
                The ROI for studying in Germany is arguably one of the highest in the world.
                <ul ${listStyles}>
                    <li><strong>Zero Tuition Fees:</strong> With public universities charging no tuition fees, the only major cost is living expenses.</li>
                    <li><strong>High Salaries:</strong> German salaries are competitive, meaning your initial investment in living costs can be recouped very quickly once you start working.</li>
                </ul>
            `
        },
        Ireland: {
            outcomes: () => `
                Ireland's booming tech and pharmaceutical sectors provide excellent career prospects for graduates.
                <ul ${listStyles}>
                    <li><strong>Third Level Graduate Programme:</strong> A <strong>2-year</strong> post-study work visa allows graduates to work and gain experience in Europe's tech hub.</li>
                    <li><strong>Industry Links:</strong> Close proximity to the European headquarters of major tech and pharma giants creates abundant job opportunities.</li>
                </ul>
            `,
            roi: `
                Ireland offers a fantastic ROI, particularly for tech and business students.
                <ul ${listStyles}>
                    <li><strong>High Demand for Graduates:</strong> The thriving economy has a high demand for skilled graduates, leading to competitive job offers.</li>
                    <li><strong>One-Year Masters:</strong> Similar to the UK, the shorter course duration reduces overall costs and accelerates entry into the workforce.</li>
                </ul>
            `
        },
        UAE: {
            outcomes: () => `
                The UAE offers a dynamic, tax-free environment for ambitious graduates.
                <ul ${listStyles}>
                    <li><strong>Golden Visa:</strong> Outstanding students may be eligible for a 10-year Golden Visa, providing long-term residency and work rights.</li>
                    <li><strong>Global Business Hub:</strong> Strong opportunities in finance, hospitality, trade, and logistics in a fast-growing economy.</li>
                </ul>
            `,
            roi: `
                The potential for tax-free income makes the ROI in the UAE extremely attractive.
                <ul ${listStyles}>
                    <li><strong>Tax-Free Salaries:</strong> Your entire income is your take-home pay, allowing for rapid savings and a fast return on your investment.</li>
                    <li><strong>Strategic Location:</strong> The UAE's position as a global hub can open doors to international career opportunities.</li>
                </ul>
            `
        },
        'New Zealand': {
            outcomes: () => `
                New Zealand provides a balanced approach with good work opportunities and an excellent quality of life.
                <ul ${listStyles}>
                    <li><strong>Post-study Work Visa:</strong> Graduates can work in New Zealand for up to <strong>3 years</strong>, depending on their qualification.</li>
                    <li><strong>Niche Sectors:</strong> Strong opportunities in unique fields like agri-tech, environmental science, and creative industries.</li>
                </ul>
            `,
            roi: `
                The ROI in New Zealand is a blend of financial return and an unparalleled lifestyle.
                <ul ${listStyles}>
                    <li><strong>Work-Life Balance:</strong> The country is known for its relaxed pace of life, offering a return that goes beyond just monetary value.</li>
                    <li><strong>Globally Recognized:</strong> A high-quality, British-based education system ensures your degree is respected worldwide.</li>
                </ul>
            `
        }
    };
    
    return infoMap[university.country] || baseInfo;

  }, [university.country]);

  const info = countrySpecificInfo;

  return (
    <section className="py-24 bg-[#050a14] min-h-screen relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-8">
            <button onClick={onBack} className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to University Details</span>
            </button>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-xl p-6 sm:p-10 rounded-3xl mb-12 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="relative z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{programTitle}</h1>
                <p className="text-xl text-gray-400 font-light">at <span className="font-medium text-white">{university.name}</span></p>
            </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2 space-y-10 flex flex-col order-2 lg:order-1">
                <div className="lg:hidden bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-5">
                    <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
                        <span className="text-gray-400 font-medium tracking-wide text-sm sm:text-base">Tuition Fee</span>
                        <span className="text-xl sm:text-2xl font-semibold text-white">${program.tuition.toLocaleString()} <span className="text-xs sm:text-sm font-normal text-gray-500">/ year</span></span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
                        <span className="text-gray-400 font-medium tracking-wide text-sm sm:text-base">Duration</span>
                        <span className="font-semibold text-white text-base sm:text-lg">{program.duration}</span>
                    </div>
                     <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
                       <span className="text-gray-400 font-medium tracking-wide text-sm sm:text-base">School</span>
                       <span className="font-semibold text-white text-right text-base sm:text-lg">{program.school}</span>
                    </div>
                     {program.isSTEM && (
                       <div className="flex justify-center pt-2">
                           <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full tracking-wide">STEM Designated</span>
                       </div>
                    )}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <a href={program.applyLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-white/10 text-white border border-white/20 px-6 py-3.5 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-sm text-sm sm:text-base">Course Link</a>
                        <a href={program.applyLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] text-sm sm:text-base">Apply Now</a>
                    </div>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Detailed Program Overview</h2>
                        <p className="text-gray-400 leading-relaxed whitespace-pre-line font-light text-lg">{enhancedAbout}</p>
                        
                        {program.sellingPoints && program.sellingPoints.length > 0 && (
                            <div className="mt-8 bg-blue-600/5 p-6 sm:p-8 rounded-2xl border border-blue-500/20">
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Why Choose This Program at {university.name}?</h3>
                                <ul className="space-y-4">
                                    {program.sellingPoints.map((point, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="bg-blue-600/20 p-1 rounded-full mr-4 mt-1 flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-300 leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Admission Requirements</h2>
                        {program.gpa && (
                            <div className="bg-black/20 p-6 rounded-2xl mb-6 border border-white/5">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">Recommended GPA</p>
                                    <p className="text-2xl font-bold text-white">{program.gpa} <span className="text-gray-500 text-lg font-normal">/ 4.0</span></p>
                                </div>
                            </div>
                        )}
                        <ul className="space-y-3">
                            {program.requirements.map((req, index) => (
                                <li key={index} className="flex items-start text-gray-400">
                                    <span className="text-blue-400 mr-3 mt-1.5 text-xl leading-none">&bull;</span>
                                    <span className="leading-relaxed">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="bg-white/[0.02] backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Career Outcomes & Opportunities
                        </h2>
                        <div className="text-gray-400 leading-relaxed font-light text-lg" dangerouslySetInnerHTML={{ __html: info.outcomes(program.isSTEM) }}></div>
                        {potentialJobTitles.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-white mb-4 tracking-tight">Potential Job Roles</h3>
                                <div className="flex flex-wrap gap-3">
                                    {potentialJobTitles.map(title => (
                                        <span key={title} className="bg-white/5 border border-white/10 text-gray-300 text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-colors cursor-default">{title}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Return on Investment (ROI) Analysis
                        </h2>
                        <div className="text-gray-400 leading-relaxed font-light text-lg" dangerouslySetInnerHTML={{ __html: info.roi }}></div>
                    </div>
                </div>
                
                {englishTests.length > 0 && (
                  <div className="bg-white/[0.02] backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                      <div className="relative z-10">
                          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>English Language Proficiency</h2>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              {englishTests.map(test => <TestScoreRequirement key={test.label} label={test.label} score={test.score} />)}
                          </div>
                      </div>
                  </div>
                )}
                
                {standardizedTests.length > 0 && (
                  <div className="bg-white/[0.02] backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                      <div className="relative z-10">
                          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Standardized Tests</h2>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              {standardizedTests.map(test => <TestScoreRequirement key={test.label} label={test.label} score={test.score} />)}
                          </div>
                      </div>
                  </div>
                )}
                
                {program.insights && (
                     <div className="bg-blue-600/5 p-8 sm:p-10 rounded-3xl border border-blue-500/20 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Extra Insights</h2>
                            <p className="text-gray-300 leading-relaxed font-light text-lg">{program.insights}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="lg:col-span-1 order-1 lg:order-2 mb-12 lg:mb-0">
                <div className="lg:sticky top-32 space-y-8">
                     <div className="hidden lg:block bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                        <div className="relative z-10">
                            <div className="space-y-6">
                                <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                                   <span className="text-gray-400 font-medium tracking-wide">Tuition Fee</span>
                                   <span className="text-3xl font-bold text-blue-400">${program.tuition.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ year</span></span>
                                </div>
                                <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                                   <span className="text-gray-400 font-medium tracking-wide">Duration</span>
                                   <span className="font-semibold text-white text-lg">{program.duration}</span>
                                </div>
                                 <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                                   <span className="text-gray-400 font-medium tracking-wide">School</span>
                                   <span className="font-semibold text-white text-right text-lg">{program.school}</span>
                                </div>
                                 {program.isSTEM && (
                                   <div className="flex justify-center pt-2">
                                       <span className="bg-blue-600/10 text-blue-400 border border-blue-500/20 text-sm font-bold px-5 py-2 rounded-full tracking-wide">
                                           STEM Designated
                                       </span>
                                   </div>
                                )}
                            </div>
                            <div className="mt-8 flex flex-col gap-4">
                                <a href={program.applyLink} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050a14] focus:ring-blue-500">
                                  Apply Now
                                </a>
                                <a href={program.applyLink} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-white/5 text-white border border-white/10 px-6 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050a14] focus:ring-white/20">
                                    Course Link
                                </a>
                            </div>
                        </div>
                    </div>
                    {similarPrograms.length > 0 && (
                        <div className="bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Similar Programs</h3>
                                <div className="space-y-4">
                                    {similarPrograms.map(({ university: simUni, program: simProg }) => (
                                        <button
                                            key={`${simUni.id}-${simProg.id}`}
                                            onClick={() => onNavigateToProgram(simUni, simProg)}
                                            className="w-full text-left p-5 rounded-2xl bg-black/20 hover:bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050a14] focus:ring-blue-500 flex items-center space-x-4"
                                        >
                                            <div className="w-14 h-14 rounded-xl bg-white/5 p-2 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10">
                                                <UniversityLogo src={simUni.logo} alt={simUni.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-white truncate group-hover:text-blue-400 transition-colors">{simProg.name}</p>
                                                <p className="text-sm text-gray-400 truncate mt-1">{simUni.name}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0 ml-2">
                                                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">QS Rank</p>
                                                <p className="font-bold text-white text-lg">#{simUni.qsRanking || 'N/A'}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="mt-16 bg-white/[0.02] backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Important Disclaimers</h3>
                <Disclaimer>Tuition fees are subject to periodic revisions by the university. For the latest fee structure and any additional costs, kindly check the university’s official website.</Disclaimer>
                <Disclaimer>Admission requirements, including GPA and test scores, may vary by program and intake. Please refer to the official university website for the most up-to-date information.</Disclaimer>
                <Disclaimer>Scholarship opportunities and financial aid options differ by university and program. Always verify details on the university's official financial aid page.</Disclaimer>
            </div>
        </div>

        <div className="mt-12 text-center">
            <button onClick={() => setIsModalOpen(true)} className="text-sm text-gray-500 hover:text-blue-400 transition-colors font-medium">
                Something doesn't look right? Let us know.
            </button>
        </div>

         {isModalOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-[#0a101f] border border-white/10 rounded-3xl shadow-2xl p-8 max-w-lg w-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Report an Issue</h2>
                        <p className="text-gray-400 mb-6 font-light">Help us keep our information accurate. Please tell us what seems incorrect about the <strong className="text-white font-medium">{program.name}</strong> program.</p>
                        <textarea 
                            rows={5} 
                            placeholder="e.g., The tuition fee seems outdated, the new fee is..." 
                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-600 resize-none"
                        ></textarea>
                        <div className="mt-8 flex justify-end space-x-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors font-medium">Cancel</button>
                            <button onClick={() => { alert('Thank you for your feedback!'); setIsModalOpen(false); }} className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">Submit Feedback</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default ProgramDetail;
