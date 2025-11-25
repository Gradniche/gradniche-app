
import React from 'react';
import { AvatarConfig } from './forums';

export interface FAQ {
    question: string;
    answer: string;
}

export interface VisaGuide {
    overview: string;
    documents: { item: string; icon: React.ReactElement<React.SVGProps<SVGSVGElement>>; }[];
    steps: { title: string; description: string; }[];
    financials: string[];
    interviewTips: string[];
    faq: FAQ[];
}

export type DestinationPage = 'destination-usa' | 'destination-canada' | 'destination-uk' | 'destination-australia' | 'destination-germany' | 'destination-ireland' | 'destination-uae' | 'destination-new-zealand';

export interface Destination {
    name: string;
    icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    heroImage: string;
    intro: string;
    whyStudy: {
        title: string;
        point: string;
        icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    }[];
    educationSystemInfo: string;
    admissionProcessInfo: string;
    costOfStudyingInfo: string;
    visaGuide: VisaGuide;
    postStudyWorkInfo: string;
    scholarshipsInfo: string;
    coursesInfo: string;
    faq: FAQ[];
    topUniversities: {
        name: string;
        qsRanking: number;
        logo: string;
    }[];
    avatarConfig: AvatarConfig;
}

interface DestinationData {
    [key: string]: Destination;
}

// Helper to create simple icons
const Icon = (path: string) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: path }));

// Common icon paths
const icons = {
    university: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7",
    globe: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.343a9 9 0 0110.592 0m-12.592 0A9 9 0 009.296 2.343M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    lightbulb: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    briefcase: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    cash: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    check: "M9 12l2 2 4-4",
    document: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    flag: "M3 21v-8a2 2 0 01-2-2h.01M17 5a2 2 0 10-4 0H9a2 2 0 00-2 2v10a2 2 0 002 2h4a2 2 0 104 0z", // Simple flag
    sparkles: "M5 3v4M3 5h4M6 17v4m-2-2h4M14 3v4m-2 2h4M15 17v4m-2-2h4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
};

export const destinationData: DestinationData = {
    usa: {
        name: "United States",
        icon: Icon(icons.flag),
        heroImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070&auto=format&fit=crop",
        intro: "The United States boasts one of the world's most renowned and flexible higher education systems, offering a vast array of programs at prestigious universities. It's a global leader in technology and research, providing unparalleled opportunities for innovation and career growth.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-usa', hair: 'short01', eyes: 'variant01', skinColor: 'F5C6A0', hairColor: '4D4D4D', clothing: 'shirt', clothingColor: 'F6520C' } },
        whyStudy: [
            { 
                title: "Top-Ranked Universities", 
                point: "Home to the highest number of world-class universities, including the Ivy League and top tech institutes like MIT and Stanford.",
                icon: Icon(icons.university)
            },
            { 
                title: "Flexibility in Academics", 
                point: "Offers incredible flexibility, allowing students to explore different subjects before declaring a major and even combine diverse fields of study.",
                icon: Icon("M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4") // Exchange/Switch arrows
            },
            { 
                title: "Research & Innovation", 
                point: "Unmatched opportunities for research, with universities at the forefront of technological advancements and scientific discoveries.",
                icon: Icon(icons.lightbulb)
            },
            { 
                title: "Global Career Path", 
                point: "The Optional Practical Training (OPT) program allows students to gain valuable work experience for up to 3 years in STEM fields.",
                icon: Icon(icons.briefcase)
            }
        ],
        educationSystemInfo: "The US education system is known for its well-rounded, liberal arts approach. An undergraduate degree (Bachelor's) is typically four years. Graduate studies include Master's degrees (1-2 years) and doctoral degrees (PhD), which are heavily research-focused and can take 5-7 years. The system emphasizes critical thinking, student participation, and practical experience.",
        admissionProcessInfo: "1. Standardized Tests: Take the GRE/GMAT for graduate programs and English proficiency tests like TOEFL/IELTS.\n2. University Shortlisting: Research and select universities based on your profile and program interests.\n3. Application Package: Prepare documents like Statement of Purpose (SOP), Letters of Recommendation (LORs), transcripts, and a resume.\n4. Application Submission: Apply directly to universities, usually through their online portals.",
        costOfStudyingInfo: "Costs vary significantly by university (public vs. private) and location. \n\nTuition Fees: \n- Public Universities: $25,000 - $40,000 per year\n- Private Universities: $40,000 - $65,000+ per year\n\nLiving Costs:\n- Average: $15,000 - $25,000 per year. This covers accommodation, food, transport, and health insurance. Costs are higher in major cities like New York and San Francisco.",
        visaGuide: {
            overview: "The F-1 Visa is the most common type of student visa for those wishing to study at an academic institution in the United States. It's for students enrolled in full-time academic programs at an accredited college, university, or other academic institution.",
            documents: [
                { item: 'Valid Passport', icon: Icon(icons.document) },
                { item: 'Form I-20', icon: Icon(icons.document) },
                { item: 'University Acceptance Letter', icon: Icon(icons.check) },
                { item: 'Financial Proof', icon: Icon(icons.cash) },
                { item: 'SEVIS Fee Receipt', icon: Icon(icons.document) },
                { item: 'DS-160 Confirmation Page', icon: Icon(icons.document) }
            ],
            steps: [
                { title: 'Receive Form I-20', description: "Once you accept your admission offer and provide proof of funds, your university will issue a Form I-20, which is a Certificate of Eligibility for Nonimmigrant Student Status." },
                { title: 'Pay the SEVIS I-901 Fee', description: "The Student and Exchange Visitor Information System (SEVIS) is a U.S. government database. You must pay the I-901 SEVIS fee online before you can schedule your visa interview." },
                { title: 'Complete the DS-160 Form', description: "Fill out the Online Nonimmigrant Visa Application (Form DS-160). You will need to upload a photo and print the confirmation page with the barcode." },
                { title: 'Schedule Your Interview', description: "Create an account on the U.S. embassy/consulate website for India, pay the visa application fee, and schedule two appointments: one for biometrics (fingerprinting and photo) and one for the visa interview." },
                { title: 'Attend the Interview', description: "Go to the consulate for your interview. A consular officer will ask questions about your choice of university, academic goals, financial situation, and your ties to India to assess your intent to return after your studies." }
            ],
            financials: [
                "You must prove sufficient funds to cover your first year of tuition and living expenses.",
                "The required amount is specified on your Form I-20.",
                "Acceptable proof includes bank statements, education loan approval letters, or scholarship letters."
            ],
            interviewTips: [
                "Be Clear and Concise: Answer the questions directly. Do not provide long, rambling answers.",
                "Know Your Program: Be prepared to talk about why you chose your specific university and program.",
                "Demonstrate Strong Ties to India: Explain your plans after graduation and show strong family, property, or job ties to your home country. This is crucial to prove non-immigrant intent.",
                "Dress Formally: Present yourself professionally.",
                "Stay Calm and Confident: Be honest and confident in your responses."
            ],
            faq: [
                { question: "How early can I apply for my F-1 visa?", answer: "You can apply for your F-1 visa up to 365 days before the program start date listed on your I-20. However, you can only enter the US on an F-1 visa 30 days or less before the start date." },
                { question: "What if my visa is rejected?", answer: "If your visa is rejected, the consular officer will provide a reason. You can reapply, but you must address the reasons for the initial rejection. This might involve providing stronger financial proof or better demonstrating your ties to India." }
            ]
        },
        postStudyWorkInfo: "Optional Practical Training (OPT) is the main avenue for post-study work. \n- Standard OPT: Graduates are eligible for up to 12 months of OPT, allowing them to work in a job directly related to their field of study.\n- STEM OPT Extension: If you have a degree in a designated Science, Technology, Engineering, or Mathematics (STEM) field, you can apply for a 24-month extension, allowing for a total of 36 months of work experience. This is a significant advantage for gaining valuable industry experience.",
        scholarshipsInfo: "Financial aid in the US is competitive but available.\n- University Scholarships: Most universities offer merit-based scholarships for international graduate students. These are often awarded at the time of admission and may cover full or partial tuition.\n- Assistantships: Research Assistantships (RAs) and Teaching Assistantships (TAs) are common for graduate students. They typically provide a tuition waiver and a stipend in exchange for work.\n- External Scholarships: Prestigious scholarships like the Fulbright-Nehru Fellowships and the Tata Scholarship (at Cornell) are available specifically for Indian students.",
        coursesInfo: "The USA offers an extensive range of courses. Popular fields for Indian students include:\n- Computer Science & IT (AI, Data Science, Cybersecurity)\n- Engineering (Mechanical, Electrical, Civil)\n- Business & Management (MBA, Finance, Analytics)\n- Medicine & Healthcare (Public Health, Biomedical Sciences)\n- Arts & Humanities (Design, Film, Liberal Arts)",
        faq: [
            { question: "Is the GRE/GMAT mandatory for all Master's programs?", answer: "Not anymore. While many top-tier programs still require or recommend GRE/GMAT scores, a growing number of universities are making them optional. Always check the specific requirements for each program you're interested in." },
            { question: "What is OPT and CPT?", answer: "CPT (Curricular Practical Training) allows you to work in a paid internship during your studies. OPT (Optional Practical Training) is a period of up to 12 months (extendable to 36 months for STEM fields) where you can work in your field of study after graduation." },
            { question: "How important is the Statement of Purpose (SOP)?", answer: "The SOP is extremely important. It's your opportunity to tell the admissions committee about your motivations, experiences, and future goals. A well-written SOP can significantly strengthen your application, especially if your academic scores are not perfect." }
        ],
        topUniversities: [
            { name: "Massachusetts Institute of Technology (MIT)", qsRanking: 1, logo: "https://logo.clearbit.com/mit.edu" },
            { name: "Harvard University", qsRanking: 4, logo: "https://logo.clearbit.com/harvard.edu" },
            { name: "Stanford University", qsRanking: 6, logo: "https://logo.clearbit.com/stanford.edu" },
            { name: "University of California, Berkeley (UCB)", qsRanking: 12, logo: "https://logo.clearbit.com/berkeley.edu" }
        ]
    },
    canada: {
        name: "Canada",
        icon: Icon("M3 21v-8a2 2 0 01-2-2h.01M17 5a2 2 0 10-4 0H9a2 2 0 00-2 2v10a2 2 0 002 2h4a2 2 0 104 0z"), // Placeholder for Maple Leaf like flag
        heroImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=2070&auto=format&fit=crop",
        intro: "Canada is celebrated for its high academic standards, welcoming and diverse culture, and high quality of life. It offers a world-class education at an affordable cost, with clear pathways to permanent residency for international graduates.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-canada-female', hair: 'long01', eyes: 'variant06', skinColor: 'E4A381', hairColor: 'A25900', clothing: 'hoodie', clothingColor: 'FF0000' } },
        whyStudy: [
            { 
                title: "Quality Education", 
                point: "Canadian universities are globally recognized for their quality and rigor, with strong government investment ensuring high standards.",
                icon: Icon(icons.university)
            },
            { 
                title: "Affordable Costs", 
                point: "Tuition fees and living costs in Canada are generally lower than in other major English-speaking countries like the USA and the UK.",
                icon: Icon(icons.cash)
            },
            { 
                title: "Welcoming & Safe", 
                point: "Known for its multicultural, tolerant, and safe society. Canada consistently ranks as one of the best countries in the world to live.",
                icon: Icon(icons.heart)
            },
            { 
                title: "Immigration Path", 
                point: "The Post-Graduation Work Permit (PGWP) allows graduates to work for up to three years, providing a clear route to permanent residency.",
                icon: Icon(icons.briefcase)
            }
        ],
        educationSystemInfo: "The Canadian education system is managed by provincial governments, but standards are uniformly high. Bachelor's degrees are typically 3-4 years. Master's degrees are 1-2 years and can be thesis-based or course-based. The system strongly emphasizes research and cooperative (co-op) education programs that integrate internships into the curriculum.",
        admissionProcessInfo: "1. Select a Program: Choose a program and a Designated Learning Institution (DLI).\n2. Meet Requirements: Fulfill the academic and English proficiency (IELTS/TOEFL) requirements for your chosen program.\n3. Letter of Acceptance: Apply to the DLI and receive an official Letter of Acceptance.",
        costOfStudyingInfo: "Tuition Fees:\n- Average for Master's Programs: $18,000 - $35,000 CAD per year.\n\nLiving Costs:\n- Besides tuition, you must show you have at least $10,200 CAD for your living expenses for the first year. A more realistic budget is around $15,000 - $20,000 CAD per year, especially in cities like Toronto or Vancouver.",
        visaGuide: {
            overview: "The Canadian Study Permit is the official document that allows foreign nationals to study at Designated Learning Institutions (DLIs) in Canada. For Indian students, the application process is streamlined through the Student Direct Stream (SDS).",
            documents: [
                { item: 'Valid Passport', icon: Icon(icons.document) },
                { item: 'Letter of Acceptance (LOA)', icon: Icon(icons.check) },
                { item: 'GIC of $10,200 CAD', icon: Icon(icons.cash) },
                { item: 'Proof of Tuition Payment', icon: Icon(icons.document) },
                { item: 'IELTS Score Card (SDS)', icon: Icon(icons.document) },
                { item: 'Medical Examination', icon: Icon(icons.shield) }
            ],
            steps: [
                { title: 'Get Letter of Acceptance (LOA)', description: "Apply to your chosen Designated Learning Institution (DLI). Once admitted, you will receive an official LOA." },
                { title: 'Fulfill SDS Requirements', description: "For the faster Student Direct Stream (SDS) process, you must pay your first year of tuition, get a Guaranteed Investment Certificate (GIC) of at least $10,200 CAD, and achieve an IELTS score of at least 6.0 in all four bands." },
                { title: 'Undergo a Medical Exam', description: "You may need to have an upfront medical examination from a panel physician approved by Immigration, Refugees and Citizenship Canada (IRCC)." },
                { title: 'Submit Your Application Online', description: "Create an account on the IRCC portal, fill out the application forms, upload all required documents, and pay the application fee." },
                { title: 'Provide Biometrics', description: "After submitting your application, you'll receive a letter instructing you to provide your fingerprints and photo (biometrics) at a Visa Application Centre (VAC)." }
            ],
            financials: [
                "For the SDS stream, a Guaranteed Investment Certificate (GIC) of at least $10,200 CAD is mandatory proof of living expenses.",
                "For the non-SDS stream, you must provide bank statements or other financial documents proving you can support yourself."
            ],
            interviewTips: [
                "Canada does not typically require an interview for a study permit application.",
                "However, a visa officer may request an interview in some cases. If so, be prepared to answer questions similar to those for an F-1 visa: your choice of program, future plans, and ties to your home country.",
                "The most important part of the Canadian application is the documentation. Ensure every document is clear, accurate, and meets the requirements."
            ],
            faq: [
                { question: "What is the Student Direct Stream (SDS)?", answer: "SDS is an expedited study permit processing program available to students from certain countries, including India. It has specific requirements (GIC, first-year tuition paid, IELTS 6.0 in all bands) but offers much faster processing times, typically around 20 calendar days." },
                { question: "What is a Guaranteed Investment Certificate (GIC)?", answer: "A GIC is an investment you make with a Canadian bank. For study permit purposes, it proves you have money to support yourself. The bank will give you a portion of the money when you arrive in Canada, and the rest in installments over the year." }
            ]
        },
        postStudyWorkInfo: "Post-Graduation Work Permit (PGWP):\nThis is a cornerstone of studying in Canada. \n- Duration: The length of the PGWP depends on your program duration, up to a maximum of 3 years.\n- Open Work Permit: It allows you to work for any employer, anywhere in Canada.\n- Path to PR: The Canadian work experience gained on a PGWP is highly valuable and is a major component in applying for Permanent Residency through programs like the Canadian Experience Class (CEC) under Express Entry.",
        scholarshipsInfo: "While large full-ride scholarships are rare, many funding options exist:\n- University Entrance Scholarships: Most universities automatically consider international applicants for entrance scholarships based on academic merit, typically ranging from $2,000 - $10,000 CAD.\n- Provincial Government Scholarships: Some provinces, like Ontario and British Columbia, offer scholarships for international students (e.g., Ontario Graduate Scholarship).\n- Program-Specific Awards: Many Master's programs, especially thesis-based ones, offer funding packages that include a stipend and teaching/research assistantship opportunities.",
        coursesInfo: "Canada excels in a variety of fields. Highly sought-after courses include:\n- Business & Finance\n- Computer Science & IT\n- Engineering (especially Civil, Mechanical, and Electrical)\n- Hospitality & Tourism Management\n- Health Sciences and Public Health\n- Media & Journalism",
        faq: [
            { question: "What is the Post-Graduation Work Permit (PGWP)?", answer: "The PGWP allows students who have graduated from an eligible Canadian DLI to obtain an open work permit. The permit's length depends on your study program's duration, up to a maximum of three years. It's a key step towards gaining Canadian work experience and qualifying for permanent residency." },
            { question: "Can I work while studying in Canada?", answer: "Yes. If your study permit includes a condition allowing you to work, you can work up to 20 hours per week during regular academic sessions and full-time during scheduled breaks like summer or winter holidays." },
            { question: "What is a Designated Learning Institution (DLI)?", answer: "A DLI is a school approved by a provincial or territorial government to host international students. You must have an acceptance letter from a DLI to apply for a study permit." }
        ],
        topUniversities: [
            { name: "University of Toronto", qsRanking: 25, logo: "https://logo.clearbit.com/utoronto.ca" },
            { name: "University of British Columbia", qsRanking: 38, logo: "https://logo.clearbit.com/ubc.ca" },
            { name: "McGill University", qsRanking: 29, logo: "https://logo.clearbit.com/mcgill.ca" },
            { name: "McMaster University", qsRanking: 176, logo: "https://logo.clearbit.com/mcmaster.ca" }
        ]
    },
    uk: {
        name: "United Kingdom",
        icon: Icon(icons.flag),
        heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
        intro: "The UK is home to some of the world's oldest and most prestigious universities, offering a rich academic heritage. Its courses are often shorter and more intensive, providing a fast-track to your career while immersing you in a vibrant, multicultural society.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-uk', hair: 'short02', eyes: 'variant02', skinColor: 'AF6E5A', hairColor: '282828', clothing: 'blazer', clothingColor: '00247D' } },
        whyStudy: [
            { 
                title: "Academic Heritage", 
                point: "The UK's reputation for quality education is world-renowned, with historic institutions like Oxford and Cambridge leading the way.",
                icon: Icon(icons.university)
            },
            { 
                title: "Shorter Course Duration", 
                point: "Master's degrees are typically one year long, and Bachelor's degrees are three years, saving students significant time and money.",
                icon: Icon("M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z")
            },
            { 
                title: "Multicultural Hub", 
                point: "Experience a diverse and inclusive society with a rich history and culture, attracting students from all over the globe.",
                icon: Icon(icons.globe)
            },
            { 
                title: "Graduate Route Visa", 
                point: "This post-study work visa allows graduates to work in the UK for two years (three for PhDs) after completing their studies.",
                icon: Icon(icons.briefcase)
            }
        ],
        educationSystemInfo: "The UK education system is known for its depth and specialization. Bachelor's degrees (except in Scotland) are three years. Master's degrees are intensive one-year programs. The teaching style encourages independent study, critical thinking, and in-depth analysis of your chosen subject.",
        admissionProcessInfo: "1. Course Selection: Choose a university and a postgraduate course.\n2. Application: Apply directly through the university's online portal.\n3. Offer Letter: Receive a conditional or unconditional offer letter.",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: £15,000 - £30,000 per year. MBA and medical programs can be significantly higher.\n\nLiving Costs:\n- You must show proof of funds for your living expenses. This is £1,334 per month for courses in London and £1,023 per month for courses outside London, for up to 9 months.",
        visaGuide: {
            overview: "The UK Student Visa allows you to study at a licensed student sponsor institution. The application is points-based, and you must meet the 70-point requirement, which includes having a Confirmation of Acceptance for Studies (CAS), meeting financial requirements, and proving English language proficiency.",
            documents: [
                { item: 'Valid Passport', icon: Icon(icons.document) },
                { item: 'CAS Reference Number', icon: Icon(icons.check) },
                { item: 'Proof of Financial Support', icon: Icon(icons.cash) },
                { item: 'English Language Test Results', icon: Icon(icons.document) },
                { item: 'Tuberculosis (TB) Test Results', icon: Icon(icons.shield) },
            ],
            steps: [
                { title: 'Receive your CAS', description: "After you've met all conditions of your offer and paid a tuition deposit, your university will issue a Confirmation of Acceptance for Studies (CAS). This is a unique reference number, not a physical document." },
                { title: 'Prepare Your Documents', description: "Gather all necessary documents, especially your financial proof. The funds must be held in your (or your parents') bank account for a minimum of 28 consecutive days before you apply." },
                { title: 'Complete the Online Application', description: "Fill out the visa application form on the official GOV.UK website. You will need your CAS number and other personal details." },
                { title: 'Pay Fees and Book an Appointment', description: "Pay the visa application fee and the Immigration Health Surcharge (IHS). After payment, you will be directed to book an appointment at a Visa Application Centre (VAC)." },
                { title: 'Attend VAC Appointment', description: "Visit the VAC at your scheduled time to submit your biometrics (fingerprints and photo) and your supporting documents." }
            ],
            financials: [
                "You must prove you have enough money to pay for one academic year of course fees (amount on your CAS).",
                "You must also show funds for living costs: £1,334 per month (in London) or £1,023 per month (outside London) for up to 9 months.",
                "The required funds must be held in your (or your parents') account for at least 28 consecutive days."
            ],
            interviewTips: [
                "A credibility interview may be part of your visa application process.",
                "Be Genuine: The purpose is to check that you are a genuine student.",
                "Know Your Course: Be able to discuss why you chose your specific course and university.",
                "Explain Your Finances: Be clear about how you are funding your education.",
                "Post-Study Plans: Explain your career plans after graduation in your home country."
            ],
            faq: [
                { question: "What is the IHS (Immigration Health Surcharge)?", answer: "The IHS is a mandatory fee for students coming to the UK for more than 6 months. Paying it gives you access to the UK's National Health Service (NHS) on the same basis as a permanent resident." },
                { question: "Can I apply for the Graduate Route from outside the UK?", answer: "No, you must apply for the Graduate Route visa from inside the UK and must have a valid Student Visa at the time of application. You must apply after your university has notified you that you have successfully completed your course." }
            ]
        },
        postStudyWorkInfo: "The Graduate Route:\nThis is the UK's post-study work visa. It allows eligible international students to stay in the UK to work, or look for work, for 2 years (3 years for PhD graduates) after their studies. This visa is a great opportunity to gain valuable work experience in the UK.",
        scholarshipsInfo: "The UK offers many prestigious scholarships for Indian students:\n- Chevening Scholarships: The UK government's global scholarship programme, offering full funding for Master's degrees.\n- Commonwealth Scholarships: For students from Commonwealth countries, offering various scholarships for Master's and PhD studies.\n- GREAT Scholarships: A joint programme by the British Council and UK universities, offering scholarships for Indian students for a one-year Master's degree.",
        coursesInfo: "The UK is a popular destination for a wide variety of subjects:\n- Business, Management & Finance\n- Engineering & Technology\n- Law\n- Art & Design\n- Computer Science and Data Science\n- Medicine and Life Sciences",
        faq: [
            { question: "Are one-year Master's degrees from the UK valuable?", answer: "Yes, absolutely. One-year Master's degrees from the UK are globally recognized and highly respected by employers. The intensive nature of the course is well understood and valued. It also allows you to enter the workforce a year earlier." },
            { question: "What is a 'conditional' vs 'unconditional' offer?", answer: "A conditional offer means you still need to meet certain requirements, such as achieving a specific score on your English test or in your final undergraduate exams. An unconditional offer means you have met all the requirements and your place is confirmed." },
            { question: "Can I bring my family with me on a Student Visa?", answer: "If you are studying a postgraduate course of 9 months or longer, or a government-sponsored student on a course of 6 months or longer, you may be able to bring your partner and children." }
        ],
        topUniversities: [
            { name: "University of Oxford", qsRanking: 3, logo: "https://logo.clearbit.com/ox.ac.uk" },
            { name: "University of Cambridge", qsRanking: 2, logo: "https://logo.clearbit.com/cam.ac.uk" },
            { name: "Imperial College London", qsRanking: 6, logo: "https://logo.clearbit.com/imperial.ac.uk" },
            { name: "UCL (University College London)", qsRanking: 9, logo: "https://logo.clearbit.com/ucl.ac.uk" }
        ]
    },
    australia: {
        name: "Australia",
        icon: Icon(icons.flag),
        heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
        intro: "Australia offers a high quality of life, excellent education system, and post-study work opportunities in a welcoming and multicultural environment.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-australia-female', hair: 'long02', eyes: 'variant07', skinColor: 'C47D6A', hairColor: 'B86B25', clothing: 'crewNeck', clothingColor: 'FFCD00' } },
        whyStudy: [
            { title: "Group of Eight", point: "Home to prestigious Group of Eight universities known for research excellence.", icon: Icon(icons.university) },
            { title: "Lifestyle", point: "World-famous for its relaxed lifestyle, stunning beaches, and vibrant cities.", icon: Icon(icons.heart) },
            { title: "Post-Study Work", point: "Generous post-study work rights for international graduates.", icon: Icon(icons.briefcase) },
            { title: "Research Focus", point: "Strong emphasis on research and development across various disciplines.", icon: Icon(icons.lightbulb) }
        ],
        educationSystemInfo: "Australian education is modeled on the British system. Bachelor's degrees are generally three years. Master's degrees are 1.5 to 2 years. The system emphasizes practical skills and independent thinking.",
        admissionProcessInfo: "1. Choose Course: Select a university and course.\n2. Check Eligibility: Ensure you meet academic and English requirements.\n3. Apply: Submit application directly or via agent.",
        costOfStudyingInfo: "Tuition Fees:\n- Master's Programs: $20,000 - $45,000 AUD per year.\n\nLiving Costs:\n- Approx. $20,000 - $25,000 AUD per year.",
        visaGuide: {
            overview: "The Subclass 500 Student Visa allows you to stay in Australia for up to 5 years for full-time study.",
            documents: [
                { item: 'Passport', icon: Icon(icons.document) },
                { item: 'CoE (Confirmation of Enrolment)', icon: Icon(icons.check) },
                { item: 'OSHC Health Insurance', icon: Icon(icons.shield) },
                { item: 'GTE Statement', icon: Icon(icons.document) }
            ],
            steps: [
                { title: 'Get Accepted', description: "Receive your CoE from the university." },
                { title: 'Arrange Health Cover', description: "Purchase Overseas Student Health Cover (OSHC)." },
                { title: 'Apply Online', description: "Submit visa application via ImmiAccount." }
            ],
            financials: ["Proof of funds to cover 1 year of tuition and living costs."],
            interviewTips: ["Be honest about your genuine intent to study."],
            faq: [{ question: "Can I work?", answer: "Yes, up to 48 hours per fortnight." }]
        },
        postStudyWorkInfo: "Graduates can apply for a Temporary Graduate Visa (Subclass 485) allowing work for 2-4 years.",
        scholarshipsInfo: "Australia Awards and various university-specific scholarships available.",
        coursesInfo: "Business, Engineering, Health Sciences, IT.",
        faq: [{ question: "Is it expensive?", answer: "Comparable to UK/USA but offers good part-time work wages." }],
        topUniversities: [
            { name: "Australian National University", qsRanking: 34, logo: "https://logo.clearbit.com/anu.edu.au" },
            { name: "University of Melbourne", qsRanking: 14, logo: "https://logo.clearbit.com/unimelb.edu.au" },
            { name: "University of Sydney", qsRanking: 19, logo: "https://logo.clearbit.com/sydney.edu.au" },
            { name: "University of New South Wales", qsRanking: 19, logo: "https://logo.clearbit.com/unsw.edu.au" }
        ]
    },
    germany: {
        name: "Germany",
        icon: Icon(icons.flag),
        heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop",
        intro: "Germany is the economic powerhouse of Europe, offering high-quality education with low or no tuition fees at public universities.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-germany', hair: 'short06', eyes: 'variant03', skinColor: 'D88C7A', hairColor: '2c1b18', clothing: 'blazer', clothingColor: '000000' } },
        whyStudy: [
            { title: "No Tuition Fees", point: "Most public universities charge little to no tuition fees.", icon: Icon(icons.cash) },
            { title: "Engineering Hub", point: "World leader in engineering and technology.", icon: Icon(icons.lightbulb) },
            { title: "Strong Economy", point: "Largest economy in Europe with ample job opportunities.", icon: Icon(icons.briefcase) },
            { title: "Schengen Access", point: "Easy travel across Europe.", icon: Icon(icons.globe) }
        ],
        educationSystemInfo: "German universities emphasize research and practical application. There are Universities (Universitäten) and Universities of Applied Sciences (Fachhochschulen).",
        admissionProcessInfo: "1. Check Requirements: Aptitude and language proficiency.\n2. Apply: Via Uni-Assist or university portal.",
        costOfStudyingInfo: "Tuition Fees:\n- Public: Semester contribution (~€250-€500).\n\nLiving Costs:\n- Approx. €850 - €1,000 per month.",
        visaGuide: {
            overview: "National Visa (Type D) for study purposes.",
            documents: [
                { item: 'Passport', icon: Icon(icons.document) },
                { item: 'Admission Letter', icon: Icon(icons.check) },
                { item: 'Blocked Account', icon: Icon(icons.cash) }
            ],
            steps: [
                { title: 'Open Blocked Account', description: "Deposit required living expenses." },
                { title: 'Apply at Embassy', description: "Submit documents and attend interview." }
            ],
            financials: ["Blocked account with approx €11,208 per year."],
            interviewTips: ["Know your course details and future plans."],
            faq: [{ question: "Is German required?", answer: "Many masters are in English, but basic German helps." }]
        },
        postStudyWorkInfo: "18-month Job Seeker Visa after graduation.",
        scholarshipsInfo: "DAAD scholarships are very popular and generous.",
        coursesInfo: "Engineering, Automotive, Computer Science.",
        faq: [{ question: "Is education free?", answer: "Yes, at public universities for most programs." }],
        topUniversities: [
            { name: "Technical University of Munich", qsRanking: 37, logo: "https://logo.clearbit.com/tum.de" },
            { name: "Ludwig Maximilian University of Munich", qsRanking: 54, logo: "https://logo.clearbit.com/uni-muenchen.de" },
            { name: "Heidelberg University", qsRanking: 87, logo: "https://logo.clearbit.com/uni-heidelberg.de" }
        ]
    },
    ireland: {
        name: "Ireland",
        icon: Icon(icons.flag),
        heroImage: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=2070&auto=format&fit=crop",
        intro: "Ireland is an English-speaking country in Europe known as the 'Silicon Valley of Europe' due to the presence of major tech companies.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-ireland-female', hair: 'long06', eyes: 'variant11', skinColor: 'F5C6A0', hairColor: 'cb6820', clothing: 'crewNeck', clothingColor: '009A44' } },
        whyStudy: [
            { title: "Tech Hub", point: "European HQ for Google, Facebook, etc.", icon: Icon(icons.lightbulb) },
            { title: "English Speaking", point: "Only English-speaking country in Eurozone.", icon: Icon(icons.globe) },
            { title: "Post-Study Work", point: "2-year stay back option for postgraduates.", icon: Icon(icons.briefcase) },
            { title: "Friendly Culture", point: "Known for warm hospitality.", icon: Icon(icons.heart) }
        ],
        educationSystemInfo: "Similar to the UK system with high standards. Masters are typically 1 year.",
        admissionProcessInfo: "Apply directly to universities.",
        costOfStudyingInfo: "Tuition Fees:\n- €12,000 - €20,000 per year.\n\nLiving Costs:\n- €10,000 - €15,000 per year.",
        visaGuide: {
            overview: "Student Visa required for non-EU/EEA nationals.",
            documents: [
                { item: 'Passport', icon: Icon(icons.document) },
                { item: 'Acceptance Letter', icon: Icon(icons.check) },
                { item: 'Proof of Fees Paid', icon: Icon(icons.cash) }
            ],
            steps: [
                { title: 'Pay Fees', description: "Pay first year tuition fees." },
                { title: 'Apply Online', description: "Apply via AVATS." }
            ],
            financials: ["Show €7,000-€10,000 for living expenses."],
            interviewTips: ["Explain why Ireland and this course."],
            faq: [{ question: "Can I work?", answer: "20h/week during term." }]
        },
        postStudyWorkInfo: "2 Years Post Study Work Visa (Third Level Graduate Scheme).",
        scholarshipsInfo: "Government of Ireland International Education Scholarship.",
        coursesInfo: "Computer Science, Pharmaceuticals, Business.",
        faq: [{ question: "Is it part of UK?", answer: "No, Republic of Ireland is independent and in EU." }],
        topUniversities: [
            { name: "Trinity College Dublin", qsRanking: 81, logo: "https://logo.clearbit.com/tcd.ie" },
            { name: "University College Dublin", qsRanking: 171, logo: "https://logo.clearbit.com/ucd.ie" }
        ]
    },
    uae: {
        name: "UAE",
        icon: Icon(icons.flag),
        heroImage: "https://images.unsplash.com/photo-1518684079-3c830dcefacf?q=80&w=2070&auto=format&fit=crop",
        intro: "The UAE offers a modern, safe, and multicultural environment with campuses of many top global universities.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-uae', hair: 'short08', eyes: 'variant12', skinColor: 'AF6E5A', hairColor: '000000', clothing: 'shirt', clothingColor: '000000', accessories: 'sunglasses', accessoriesProbability: 100 } },
        whyStudy: [
            { title: "International Campuses", point: "Study at branch campuses of top UK/US/Aus unis.", icon: Icon(icons.university) },
            { title: "Tax-Free Income", point: "Graduates enjoy tax-free salaries.", icon: Icon(icons.cash) },
            { title: "Safety", point: "One of the safest countries in the world.", icon: Icon(icons.shield) },
            { title: "Global Hub", point: "Central location connecting East and West.", icon: Icon(icons.globe) }
        ],
        educationSystemInfo: "Diverse, offering American, British, Australian curriculums.",
        admissionProcessInfo: "Direct application to university.",
        costOfStudyingInfo: "Tuition Fees:\n- 40,000 - 70,000 AED per year.\n\nLiving Costs:\n- High, similar to major western cities.",
        visaGuide: {
            overview: "Student residence visa sponsored by the university.",
            documents: [
                { item: 'Passport', icon: Icon(icons.document) },
                { item: 'Admission Offer', icon: Icon(icons.check) }
            ],
            steps: [
                { title: 'Accept Offer', description: "University initiates visa process." }
            ],
            financials: ["Proof of funds for tuition and living."],
            interviewTips: ["Usually handled by university."],
            faq: [{ question: "Visa duration?", answer: "1 year renewable." }]
        },
        postStudyWorkInfo: "Golden Visa possibilities for outstanding students.",
        scholarshipsInfo: "University specific merit scholarships.",
        coursesInfo: "Business, Engineering, Architecture.",
        faq: [{ question: "Is it hot?", answer: "Yes, very hot in summer." }],
        topUniversities: [
            { name: "Khalifa University", qsRanking: 230, logo: "https://logo.clearbit.com/ku.ac.ae" },
            { name: "United Arab Emirates University", qsRanking: 290, logo: "https://logo.clearbit.com/uaeu.ac.ae" },
            { name: "American University of Sharjah", qsRanking: 364, logo: "https://logo.clearbit.com/aus.edu" }
        ]
    },
    'new-zealand': {
        name: "New Zealand",
        icon: Icon(icons.flag),
        heroImage: "https://images.unsplash.com/photo-1469521669194-babb45599def?q=80&w=2070&auto=format&fit=crop",
        intro: "New Zealand is famous for its stunning landscapes, friendly people, and world-class education system.",
        avatarConfig: { style: 'adventurer', options: { seed: 'gradniche-nz-female', hair: 'long07', eyes: 'variant01', skinColor: 'E4A381', hairColor: '4D4D4D', clothing: 'blazer', clothingColor: '000000' } },
        whyStudy: [
            { title: "Quality of Life", point: "Relaxed pace of life and beautiful environment.", icon: Icon(icons.heart) },
            { title: "Post-Study Work", point: "Up to 3 years open work visa.", icon: Icon(icons.briefcase) },
            { title: "Research", point: "Innovative and research-led teaching.", icon: Icon(icons.lightbulb) },
            { title: "Safety", point: "Very safe and peaceful country.", icon: Icon(icons.shield) }
        ],
        educationSystemInfo: "British-based system with 8 state-funded universities.",
        admissionProcessInfo: "Direct application.",
        costOfStudyingInfo: "Tuition Fees:\n- $25,000 - $40,000 NZD per year.\n\nLiving Costs:\n- $15,000 - $20,000 NZD per year.",
        visaGuide: {
            overview: "Fee Paying Student Visa.",
            documents: [
                { item: 'Passport', icon: Icon(icons.document) },
                { item: 'Offer of Place', icon: Icon(icons.check) },
                { item: 'Funds Proof', icon: Icon(icons.cash) }
            ],
            steps: [
                { title: 'Apply', description: "Online via Immigration NZ." }
            ],
            financials: ["$20,000 NZD per year for living."],
            interviewTips: ["Be genuine."],
            faq: [{ question: "Work rights?", answer: "20h/week." }]
        },
        postStudyWorkInfo: "Post-study work visa for up to 3 years.",
        scholarshipsInfo: "New Zealand Government Scholarships.",
        coursesInfo: "Agriculture, Environmental Science, Engineering.",
        faq: [{ question: "Can I stay?", answer: "Yes, good pathways to residency." }],
        topUniversities: [
            { name: "University of Auckland", qsRanking: 68, logo: "https://logo.clearbit.com/auckland.ac.nz" },
            { name: "University of Otago", qsRanking: 206, logo: "https://logo.clearbit.com/otago.ac.nz" }
        ]
    }
};
