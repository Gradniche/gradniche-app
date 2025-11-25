
import React, { useState, useMemo } from 'react';
import { Program, University, universities as allUniversities } from '../data/universities';

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
        <div className="bg-gray-800/50 p-4 rounded-lg text-center">
            <p className="text-sm text-[#F6520C] font-semibold">{label}</p>
            <p className="text-lg font-bold text-white">{score}</p>
        </div>
    )
};

const Disclaimer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start space-x-3 text-sm text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
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
    const listStyles = 'class="list-disc list-outside pl-5 text-gray-400 space-y-2 mt-2 marker:text-[#F6520C]"';
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
    <section className="py-16 md:py-20 bg-[#0a101f] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8">
            <button onClick={onBack} className="text-[#F6520C] hover:text-orange-400 transition-colors duration-300 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#F6520C] rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to University Details</span>
            </button>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-lg mb-8 border border-gray-700">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{programTitle}</h1>
            <p className="text-lg text-gray-400 mt-1">at {university.name}</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 space-y-8 flex flex-col gap-8 order-2 lg:order-1">
                <div className="lg:hidden bg-gray-800/50 p-4 rounded-lg border border-gray-700 space-y-4">
                    <div className="flex justify-between items-baseline">
                        <span className="text-gray-400">Tuition Fee</span>
                        <span className="text-xl font-bold text-[#F6520C]">${program.tuition.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ year</span></span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-gray-400">Duration</span>
                        <span className="font-semibold text-white">{program.duration}</span>
                    </div>
                     <div className="flex justify-between items-baseline">
                       <span className="text-gray-400">School</span>
                       <span className="font-semibold text-white text-right">{program.school}</span>
                    </div>
                     {program.isSTEM && (
                       <div className="flex justify-center pt-2">
                           <span className="bg-orange-500/20 text-orange-300 text-sm font-bold px-4 py-2 rounded-full">STEM Designated</span>
                       </div>
                    )}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <a href={program.applyLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gray-700/50 text-gray-300 border border-gray-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-700 hover:text-white transition duration-300">Course Link</a>
                        <a href={program.applyLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[#F6520C] text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300">Apply Now</a>
                    </div>
                </div>

                <div className="bg-white/5 p-4 sm:p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Detailed Program Overview</h2>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">{enhancedAbout}</p>
                    
                    {program.sellingPoints && program.sellingPoints.length > 0 && (
                        <div className="mt-6 bg-orange-900/40 p-4 sm:p-6 rounded-lg border border-[#F6520C]/50">
                            <h3 className="text-lg sm:text-xl font-bold text-orange-300 mb-4">Why Choose This Program at {university.name}?</h3>
                            <ul className="space-y-3">
                                {program.sellingPoints.map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-orange-200">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="bg-white/5 p-4 sm:p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Admission Requirements</h2>
                    {program.gpa && (
                        <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                                <p className="text-md text-[#F6520C] font-semibold">Recommended GPA</p>
                                <p className="text-xl font-bold text-white">{program.gpa} / 4.0</p>
                            </div>
                        </div>
                    )}
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        {program.requirements.map((req, index) => <li key={index}>{req}</li>)}
                    </ul>
                </div>
                
                <div className="bg-white/5 p-4 sm:p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                        Career Outcomes & Opportunities
                    </h2>
                    <div className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: info.outcomes(program.isSTEM) }}></div>
                    {potentialJobTitles.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-white mb-3">Potential Job Roles</h3>
                            <div className="flex flex-wrap gap-2">
                                {potentialJobTitles.map(title => (
                                    <span key={title} className="bg-gray-700/50 text-gray-300 text-sm font-medium px-3 py-1.5 rounded-full">{title}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white/5 p-4 sm:p-6 rounded-lg border border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                        Return on Investment (ROI) Analysis
                    </h2>
                    <div className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: info.roi }}></div>
                </div>
                
                {englishTests.length > 0 && (
                  <div className="bg-white/5 p-4 sm:p-6 rounded-lg border border-gray-700">
                      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">English Language Proficiency</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {englishTests.map(test => <TestScoreRequirement key={test.label} label={test.label} score={test.score} />)}
                      </div>
                  </div>
                )}
                
                {standardizedTests.length > 0 && (
                  <div className="bg-white/5 p-4 sm:p-6 rounded-lg border border-gray-700">
                      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Standardized Tests</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {standardizedTests.map(test => <TestScoreRequirement key={test.label} label={test.label} score={test.score} />)}
                      </div>
                  </div>
                )}
                
                {program.insights && (
                     <div className="bg-orange-900/40 p-6 rounded-lg border border-[#F6520C]/50">
                        <h2 className="text-2xl font-semibold text-orange-300 mb-4">Extra Insights</h2>
                        <p className="text-orange-200 leading-relaxed">{program.insights}</p>
                    </div>
                )}
            </div>
            <div className="lg:col-span-1 order-1 lg:order-2 mb-8 lg:mb-0">
                <div className="lg:sticky top-24 space-y-6">
                     <div className="hidden lg:block bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                        <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                               <span className="text-gray-400">Tuition Fee</span>
                               <span className="text-2xl font-bold text-[#F6520C]">${program.tuition.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ year</span></span>
                            </div>
                            <div className="flex justify-between items-baseline">
                               <span className="text-gray-400">Duration</span>
                               <span className="font-semibold text-white">{program.duration}</span>
                            </div>
                             <div className="flex justify-between items-baseline">
                               <span className="text-gray-400">School</span>
                               <span className="font-semibold text-white text-right">{program.school}</span>
                            </div>
                             {program.isSTEM && (
                               <div className="flex justify-center pt-2">
                                   <span className="bg-orange-500/20 text-orange-300 text-sm font-bold px-4 py-2 rounded-full">
                                       STEM Designated
                                   </span>
                               </div>
                            )}
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <a href={program.applyLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gray-700/50 text-gray-300 border border-gray-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-700 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500">
                                Course Link
                            </a>
                            <a href={program.applyLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[#F6520C] text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#E84A00]">
                              Apply Now
                            </a>
                        </div>
                    </div>
                    {similarPrograms.length > 0 && (
                        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                            <h3 className="text-xl font-semibold text-white mb-4">Similar Programs</h3>
                            <div className="space-y-4">
                                {similarPrograms.map(({ university: simUni, program: simProg }) => (
                                    <button
                                        key={`${simUni.id}-${simProg.id}`}
                                        onClick={() => onNavigateToProgram(simUni, simProg)}
                                        className="w-full text-left p-4 rounded-lg bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700 hover:border-[#F6520C]/70 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#F6520C] flex items-center space-x-4"
                                    >
                                        <img src={simUni.logo} alt={`${simUni.name} logo`} className="w-12 h-12 rounded-full object-contain bg-white p-1 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-white truncate group-hover:text-orange-300">{simProg.name}</p>
                                            <p className="text-sm text-gray-400 truncate">{simUni.name}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0 ml-2">
                                            <p className="text-xs text-gray-400">QS Rank</p>
                                            <p className="font-bold text-white text-lg">#{simUni.qsRanking || 'N/A'}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="mt-12 bg-white/5 p-6 rounded-lg border border-gray-700 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Important Disclaimers</h3>
            <Disclaimer>Tuition fees are subject to periodic revisions by the university. For the latest fee structure and any additional costs, kindly check the university’s official website.</Disclaimer>
            <Disclaimer>Admission requirements, including GPA and test scores, may vary by program and intake. Please refer to the official university website for the most up-to-date information.</Disclaimer>
            <Disclaimer>Scholarship opportunities and financial aid options differ by university and program. Always verify details on the university's official financial aid page.</Disclaimer>
        </div>

        <div className="mt-8 text-center">
            <button onClick={() => setIsModalOpen(true)} className="text-sm text-gray-500 hover:text-[#F6520C] transition">
                Something doesn't look right? Let us know.
            </button>
        </div>

         {isModalOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-gray-900/80 backdrop-blur-lg border border-[#F6520C]/50 rounded-lg shadow-xl p-8 max-w-lg w-full">
                    <h2 className="text-2xl font-bold text-white mb-4">Report an Issue</h2>
                    <p className="text-gray-400 mb-6">Help us keep our information accurate. Please tell us what seems incorrect about the <strong>{program.name}</strong> program.</p>
                    <textarea 
                        rows={5} 
                        placeholder="e.g., The tuition fee seems outdated, the new fee is..." 
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F6520C] text-white"
                    ></textarea>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-md text-gray-400 hover:bg-gray-700 transition">Cancel</button>
                        <button onClick={() => { alert('Thank you for your feedback!'); setIsModalOpen(false); }} className="px-6 py-2 rounded-md bg-[#F6520C] text-white hover:bg-opacity-90 transition">Submit Feedback</button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default ProgramDetail;
